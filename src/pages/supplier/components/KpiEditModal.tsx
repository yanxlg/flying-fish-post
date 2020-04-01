import React, { useCallback, useEffect, useMemo, useState } from "react";
import { DatePicker, Form, message, Modal, Select, Spin } from "antd";
import { addLogistic, queryLogistic, editLogistic } from "@/services/supplier";
import { ILogisticsBody, ILogisticsEditBody, IKpiOptionListResponse } from "@/interface/ISupplier";
import { EmptyObject } from "@/config/global";
import { IResponse } from "@/interface/IGlobal";
import styles from "@/styles/_supplier.less";
import { RichInput } from "react-components";

declare interface KpiEditModalProps {
    visible: boolean | string;
    onCancel: () => void;
    queryOptions: () => Promise<IResponse<IKpiOptionListResponse>>;
}

const KpiEditModal: React.FC<KpiEditModalProps> = ({ visible, onCancel, queryOptions }) => {
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);

    const [optionList, setOptionList] = useState<IKpiOptionListResponse>({
        country_list: [],
        trans_type_list: [],
    });

    const [optionLoading, setOptionLoading] = useState(false);

    const [form] = Form.useForm();

    const onOKey = useCallback(() => {
        form.validateFields().then(values => {
            setSubmitting(true);
            if (typeof visible === "string") {
                editLogistic(({ ...values, id: visible } as unknown) as ILogisticsEditBody)
                    .then(() => {
                        message.success("编辑成功");
                        onCancel();
                    })
                    .finally(() => {
                        setSubmitting(false);
                    });
            } else {
                addLogistic((values as unknown) as ILogisticsBody)
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
                queryLogistic(visible)
                    .then(({ data = EmptyObject }) => {
                        const { contract, ...extra } = data;
                        const fileList = contract
                            ? [
                                  {
                                      uid: "1",
                                      name: contract,
                                      status: "done",
                                      url: contract,
                                  },
                              ]
                            : [];
                        form.setFieldsValue({
                            ...extra,
                            contract: fileList,
                        });
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
        const { country_list = [], trans_type_list = [] } = optionList;
        return (
            <Modal
                afterClose={afterClose}
                confirmLoading={submitting}
                title={typeof visible === "string" ? "编辑KPI渠道" : "新增KPI渠道"}
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
                        >
                            <Form.Item
                                label="国家"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入中文名",
                                    },
                                ]}
                            >
                                <Select>
                                    {country_list.map(({ name, value }) => {
                                        return (
                                            <Select.Option key={value} value={value}>
                                                {name}
                                            </Select.Option>
                                        );
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="运输方式"
                                name="name_en"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入英文名",
                                    },
                                ]}
                            >
                                <Select>
                                    {trans_type_list.map(({ name, value }) => {
                                        return (
                                            <Select.Option key={value} value={value}>
                                                {name}
                                            </Select.Option>
                                        );
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="时效"
                                name="service_method"
                                rules={[
                                    {
                                        required: true,
                                        message: "请选择服务方式",
                                    },
                                ]}
                            >
                                <RichInput richType="number" />
                            </Form.Item>
                            <Form.Item
                                label="生效日期"
                                name="service_type"
                                rules={[
                                    {
                                        required: true,
                                        message: "请选择服务类型",
                                    },
                                ]}
                            >
                                <DatePicker />
                            </Form.Item>
                        </Form>
                    </div>
                </Spin>
            </Modal>
        );
    }, [visible, submitting, optionList, loading, optionLoading]);
};

export default KpiEditModal;
