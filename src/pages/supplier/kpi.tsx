import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { Button, Card } from "antd";
import { JsonForm } from "react-components";
import { FormField, JsonFormRef } from "react-components/es/JsonForm";
import formStyles from "react-components/es/JsonForm/_form.less";
import { LoadingButton } from "react-components";
import {
    queryKpiList,
    uploadKpi,
    downloadKpiTemplate,
    queryKpiOptionsList,
} from "@/services/supplier";
import { IKpiItem, IOffersRequestForm, IKpiOptionListResponse } from "@/interface/ISupplier";
import { DownloadOutlined, PlusOutlined } from "@ant-design/icons";
import { IResponse } from "@/interface/IGlobal";
import { useList, useModal } from "@/utils/hooks";
import UploadLoadingBtn from "@/components/UploadLoadingBtn";
import { ProTable } from "react-components";
import { ProColumns } from "react-components/es/ProTable";
import OptionItem from "@/components/OptionItem";
import KpiEditModal from "@/pages/supplier/components/KpiEditModal";

export const queryOptions = (() => {
    let syncPromise: Promise<IResponse<IKpiOptionListResponse>>;
    return () => {
        if (syncPromise) {
            return syncPromise;
        } else {
            syncPromise = queryKpiOptionsList();
        }
        return syncPromise;
    };
})();

const formConfig: FormField<keyof IOffersRequestForm>[] = [
    {
        label: "国家",
        type: "select",
        name: "country",
        formItemClassName: formStyles.formItem,
        formatter: "number",
        syncDefaultOption: {
            name: "全部",
            value: "",
        },
        optionList: () => {
            return queryOptions().then(({ data: { country_list = [] } }) => {
                return country_list;
            });
        },
    },
];

const KPIPage: React.FC = () => {
    const searchRef = useRef<JsonFormRef>(null);
    const {
        loading,
        pageNumber,
        pageSize,
        dataSource,
        total,
        onSearch,
        onReload,
        onChange,
    } = useList({ formRef: searchRef, queryList: queryKpiList });

    const { visible, onClose, setVisibleProps } = useModal<boolean>();

    // componentDidMount
    useEffect(() => {
        queryOptions(); // 获取分类
    }, []);

    const newKpi = useCallback(() => {
        setVisibleProps(true);
    }, []);

    const columns = useMemo<ProColumns<IKpiItem>[]>(() => {
        return [
            {
                title: "国家",
                dataIndex: "country",
                align: "center",
                width: "150px",
                render: (value: any, record, index, filterText) => {
                    return (
                        <OptionItem
                            syncCallback={queryOptions}
                            type="country_list"
                            value={value}
                            record={record}
                            recordKey="country"
                        />
                    );
                },
            },
            {
                title: "运输方式",
                dataIndex: "trans_type",
                align: "center",
                width: "150px",
            },
            {
                title: "时效/天",
                dataIndex: "aging",
                align: "center",
                width: "150px",
            },
            {
                title: "生效日期",
                dataIndex: "effective_time",
                align: "center",
                width: "150px",
            },
            {
                title: "操作",
                dataIndex: "operation",
                align: "center",
                width: "150px",
            },
        ];
    }, []);

    return (
        <>
            {useMemo(() => {
                return (
                    <PageHeaderWrapper>
                        <Card
                            bordered={false}
                            className={[formStyles.formItem, formStyles.formCard].join(" ")}
                        >
                            <JsonForm
                                fieldList={formConfig}
                                enableCollapse={false}
                                ref={searchRef}
                                initialValues={{
                                    logistic: "",
                                    country: "",
                                    channel: "",
                                    offer_mode: "",
                                    hair_area: "",
                                }}
                            >
                                <LoadingButton
                                    className={formStyles.formItem}
                                    type="primary"
                                    onClick={onSearch}
                                >
                                    搜索
                                </LoadingButton>
                            </JsonForm>
                        </Card>
                        <ProTable<IKpiItem>
                            className={formStyles.formItem}
                            headerTitle="查询表格"
                            rowKey="id"
                            pagination={{
                                total: total,
                                current: pageNumber,
                                pageSize: pageSize,
                                showSizeChanger: true,
                                pageSizeOptions: ["50", "100", "200"],
                            }}
                            toolBarRender={() => [
                                <Button type="primary" onClick={newKpi}>
                                    <PlusOutlined />
                                    新增
                                </Button>,
                                <UploadLoadingBtn
                                    beforeUpload={uploadKpi}
                                    multiple={false}
                                    showUploadList={false}
                                />,
                                <LoadingButton type="primary" onClick={downloadKpiTemplate}>
                                    <DownloadOutlined />
                                    下载模版
                                </LoadingButton>,
                            ]}
                            columns={columns}
                            dataSource={dataSource}
                            loading={loading}
                            onChange={onChange}
                            options={{
                                density: true,
                                fullScreen: true,
                                reload: onReload,
                                setting: true,
                            }}
                        />
                    </PageHeaderWrapper>
                );
            }, [loading])}
            {useMemo(() => {
                return (
                    <KpiEditModal
                        visible={visible}
                        onCancel={onClose}
                        queryOptions={queryOptions}
                    />
                );
            }, [visible])}
        </>
    );
};

export default KPIPage;
