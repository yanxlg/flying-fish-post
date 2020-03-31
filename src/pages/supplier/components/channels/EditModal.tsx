import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Form, Input, message, Modal, Radio, Select, Spin, TreeSelect, Upload } from "antd";
import { editChannel, addChannel, queryChannel } from "@/services/supplier";
import { IChannelsOptionListResponse, IChannelForm } from "@/interface/ISupplier";
import { EmptyObject } from "@/config/global";
import { IResponse } from "@/interface/IGlobal";
import styles from "@/styles/_supplier.less";
import { Truth, False } from "@/utils/utils";
import { SettlementModesList } from "@/config/dictionaries/Supplier";

declare interface EditModalProps {
    visible: boolean | string;
    onCancel: () => void;
    queryOptions: () => Promise<IResponse<IChannelsOptionListResponse>>;
}

const EditModal: React.FC<EditModalProps> = ({ visible, onCancel, queryOptions }) => {
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);

    const [optionList, setOptionList] = useState<IChannelsOptionListResponse>({
        type_list: [],
        service_type_list: [],
        service_country_list: [],
        platform_list: [],
        logistic_list: [],
    });

    const [optionLoading, setOptionLoading] = useState(false);

    const [form] = Form.useForm();

    const onOKey = useCallback(() => {
        form.validateFields().then(values => {
            setSubmitting(true);
            console.log(values);

            if (typeof visible === "string") {
                editChannel(({ ...values, id: visible } as unknown) as IChannelForm)
                    .then(() => {
                        message.success("编辑成功");
                        onCancel();
                    })
                    .finally(() => {
                        setSubmitting(false);
                    });
            } else {
                addChannel((values as unknown) as IChannelForm)
                    .then(() => {
                        message.success("添加成功");
                        onCancel();
                    })
                    .finally(() => {
                        setSubmitting(false);
                    });
            }
        });
    }, [visible]);

    useEffect(() => {
        if (visible) {
            setOptionLoading(true);
            queryOptions()
                .then(({ data = EmptyObject }) => {
                    setOptionList(data);
                })
                .finally(() => {
                    setOptionLoading(false);
                });
            if (typeof visible === "string") {
                setLoading(true);
                queryChannel(visible)
                    .then(({ data = EmptyObject }) => {
                        form.setFieldsValue(data);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            }
        }
    }, [visible]);

    const afterClose = useCallback(() => {
        form.resetFields();
    }, []);

    return useMemo(() => {
        const {
            type_list = [],
            service_type_list = [],
            service_country_list = [],
            platform_list = [],
            logistic_list = [],
        } = optionList;
        return (
            <Modal
                afterClose={afterClose}
                confirmLoading={submitting}
                title={typeof visible === "string" ? "编辑渠道" : "新增渠道"}
                okText="提交"
                visible={!!visible}
                onOk={onOKey}
                onCancel={onCancel}
            >
                <Spin tip="Loading..." spinning={loading}>
                    <div className={styles.supplierEditModal}>
                        <Form
                            form={form}
                            layout="horizontal"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                            initialValues={{
                                settlement_mode: Number(SettlementModesList[0].id),
                                is_docking: False,
                                active: Truth,
                            }}
                        >
                            <Form.Item
                                label="渠道名称"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入渠道名称",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="渠道显示名称"
                                name="show_name"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入渠道显示名称",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="平台"
                                name="platform"
                                rules={[
                                    {
                                        required: true,
                                        message: "请选择平台",
                                    },
                                ]}
                            >
                                <Select loading={optionLoading}>
                                    {platform_list.map(({ name, value }) => {
                                        return (
                                            <Select.Option key={value} value={value}>
                                                {name}
                                            </Select.Option>
                                        );
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="物流服务商"
                                name="logistic"
                                rules={[
                                    {
                                        required: true,
                                        message: "请选择物流服务商",
                                    },
                                ]}
                            >
                                <Select loading={optionLoading}>
                                    {logistic_list.map(({ name, value }) => {
                                        return (
                                            <Select.Option key={value} value={value}>
                                                {name}
                                            </Select.Option>
                                        );
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="渠道类型"
                                name="type"
                                rules={[
                                    {
                                        required: true,
                                        message: "请选择渠道类型",
                                    },
                                ]}
                            >
                                <Select loading={optionLoading}>
                                    {type_list.map(({ name, value }) => {
                                        return (
                                            <Select.Option key={value} value={value}>
                                                {name}
                                            </Select.Option>
                                        );
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="服务类型"
                                name="service_type"
                                rules={[
                                    {
                                        required: true,
                                        message: "请选择服务类型",
                                    },
                                ]}
                            >
                                <TreeSelect
                                    loading={optionLoading}
                                    treeCheckable={true}
                                    treeData={service_type_list.map(({ name, value }) => {
                                        return {
                                            title: name,
                                            value: value,
                                            key: value,
                                        };
                                    })}
                                />
                            </Form.Item>
                            <Form.Item
                                label="服务国家"
                                name="service_country"
                                rules={[
                                    {
                                        required: true,
                                        message: "请选择服务国家式",
                                    },
                                ]}
                            >
                                <Select loading={optionLoading}>
                                    {service_country_list.map(({ name, value }) => {
                                        return (
                                            <Select.Option key={value} value={value}>
                                                {name}
                                            </Select.Option>
                                        );
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="结算方式"
                                name="settlement_mode"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Radio.Group>
                                    {SettlementModesList.map(({ name, id }) => (
                                        <Radio key={id} value={Number(id)}>
                                            {name}
                                        </Radio>
                                    ))}
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item
                                label="对接物流轨迹"
                                name="is_docking"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Radio.Group>
                                    <Radio value={False}>未对接</Radio>
                                    <Radio value={Truth}>已对接</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item
                                label="是否启用"
                                name="active"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Radio.Group>
                                    <Radio value={Truth}>是</Radio>
                                    <Radio value={False}>否</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item label="物流地址" name="logistic_address">
                                <Input />
                            </Form.Item>
                        </Form>
                    </div>
                </Spin>
            </Modal>
        );
    }, [visible, submitting, optionList, loading, optionLoading]);
};

export default EditModal;
