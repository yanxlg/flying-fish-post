import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { Button, Card } from "antd";
import SearchForm, { FormField, SearchFormRef } from "@/components/SearchForm";
import formStyles from "@/components/SearchForm/_form.less";
import LoadingButton from "@/components/LoadingButton";
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
import ProTable, { ProColumns } from "@/components/OptimizeProTable";
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
        label: "物流商ID",
        type: "input",
        name: "country",
        formItemClassName: formStyles.formItem,
    },
    {
        label: "渠道ID",
        type: "input",
        name: "country",
        formItemClassName: formStyles.formItem,
    },
    {
        label: "渠道编号",
        type: "input",
        name: "country",
        formItemClassName: formStyles.formItem,
    },
    {
        label: "打单账号标识",
        type: "input",
        name: "country",
        formItemClassName: formStyles.formItem,
    },
];

const OrderPage: React.FC = () => {
    const searchRef = useRef<SearchFormRef>(null);
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
                title: "渠道编号",
                dataIndex: "country",
                align: "center",
                width: "150px",
            },
            {
                title: "渠道Code",
                dataIndex: "trans_type",
                align: "center",
                width: "150px",
            },
            {
                title: "渠道名称",
                dataIndex: "aging",
                align: "center",
                width: "150px",
            },
            {
                title: "物流商ID",
                dataIndex: "effective_time",
                align: "center",
                width: "150px",
            },
            {
                title: "打单账号标识",
                dataIndex: "operation",
                align: "center",
                width: "150px",
            },
            {
                title: "打单账号信息",
                dataIndex: "operation",
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
                            <SearchForm
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
                            </SearchForm>
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

export default OrderPage;
