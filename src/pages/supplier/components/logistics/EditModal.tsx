import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Form, Input, message, Modal, Select, Spin, Upload } from "antd";
import { Button } from "antd/lib/radio";
import { UploadOutlined } from "@ant-design/icons";
import { UploadChangeParam } from "antd/lib/upload/interface";
import { addLogistic, queryLogistic, editLogistic } from "@/services/supplier";
import { ILogisticsBody, IOptionListResponse, ILogisticsEditBody } from "@/interface/ISupplier";
import { EmptyObject } from "@/config/global";
import { IResponse } from "@/interface/IGlobal";
import styles from "@/styles/_supplier.less";

declare interface EditModalProps {
    visible: boolean | string;
    onCancel: () => void;
    queryOptions: () => Promise<IResponse<IOptionListResponse>>;
}

const EditModal: React.FC<EditModalProps> = ({ visible, onCancel, queryOptions }) => {
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);

    const [optionList, setOptionList] = useState<IOptionListResponse>({
        service_method_list: [],
        service_type_list: [],
        service_country_list: [],
        track_query_list: [],
    });

    const [optionLoading, setOptionLoading] = useState(false);

    const [form] = Form.useForm();
    const beforeUpload = useCallback(() => {
        return false;
    }, []);
    const normFile = useCallback((e: UploadChangeParam) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }, []);

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
        const {
            service_method_list = [],
            service_type_list = [],
            service_country_list = [],
            track_query_list = [],
        } = optionList;
        return (
            <Modal
                afterClose={afterClose}
                confirmLoading={submitting}
                title={typeof visible === "string" ? "编辑物流商" : "新增物流商"}
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
                                label="中文名"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入中文名",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="英文名"
                                name="name_en"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入英文名",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="服务方式"
                                name="service_method"
                                rules={[
                                    {
                                        required: true,
                                        message: "请选择服务方式",
                                    },
                                ]}
                            >
                                <Select loading={optionLoading}>
                                    {service_method_list.map(({ name, value }) => {
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
                                <Select loading={optionLoading}>
                                    {service_type_list.map(({ name, value }) => {
                                        return (
                                            <Select.Option key={value} value={value}>
                                                {name}
                                            </Select.Option>
                                        );
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="服务国家"
                                name="service_country"
                                rules={[
                                    {
                                        required: true,
                                        message: "请选择服务国家",
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
                                label="官网地址"
                                name="home_page"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入官网地址",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="轨迹查询方式"
                                name="track_query"
                                rules={[
                                    {
                                        required: true,
                                        message: "请选择轨迹查询方式",
                                    },
                                ]}
                            >
                                <Select loading={optionLoading}>
                                    {track_query_list.map(({ name, value }) => {
                                        return (
                                            <Select.Option key={value} value={value}>
                                                {name}
                                            </Select.Option>
                                        );
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="联系人"
                                name="contact"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入联系人",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="联系电话"
                                name="phone_number"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入联系电话",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="联系人邮箱"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入联系人邮箱",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="合同"
                                name="contract"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                                rules={[
                                    {
                                        required: true,
                                        message: "请上传合同文件",
                                    },
                                ]}
                            >
                                <Upload beforeUpload={beforeUpload}>
                                    <Button>
                                        <UploadOutlined /> Click to Upload
                                    </Button>
                                </Upload>
                            </Form.Item>
                        </Form>
                    </div>
                </Spin>
            </Modal>
        );
    }, [visible, submitting, optionList, loading, optionLoading]);
};

export default EditModal;
