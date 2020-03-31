import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { Button, Card } from "antd";
import SearchForm, { FormField, SearchFormRef } from "@/components/SearchForm";
import formStyles from "@/components/SearchForm/_form.less";
import btnStyles from "@/styles/_btn.less";
import LoadingButton from "@/components/LoadingButton";
import { exportLogisticsList, queryLogisticsList, queryOptionList } from "@/services/supplier";
import { ILogistics, IOptionListResponse, ILogisticsRequestForm } from "@/interface/ISupplier";
import { PlusOutlined } from "@ant-design/icons";
import { IResponse } from "@/interface/IGlobal";
import OptionItem from "../../components/OptionItem";
import EditModal from "@/pages/supplier/components/logistics/EditModal";
import { useList } from "@/utils/hooks";
import ProTable, { ProColumns } from "@/components/OptimizeProTable";

export const queryOptions = (() => {
    let syncPromise: Promise<IResponse<IOptionListResponse>>;
    return () => {
        if (syncPromise) {
            return syncPromise;
        } else {
            syncPromise = queryOptionList();
        }
        return syncPromise;
    };
})();

const formConfig: FormField<keyof ILogisticsRequestForm>[] = [
    {
        label: "物流商",
        type: "input",
        name: "keyword",
        placeholder: "ID/中文名/英文名",
        formItemClassName: formStyles.formItem,
    },
];

const LogisticsPage: React.FC = () => {
    const searchRef = useRef<SearchFormRef>(null);
    const [visible, setVisible] = useState<boolean | string>(false);
    const {
        loading,
        pageNumber,
        pageSize,
        dataSource,
        total,
        onSearch,
        onReload,
        onChange,
    } = useList({ formRef: searchRef, queryList: queryLogisticsList });

    const exportTable = useCallback(() => {
        const query = searchRef.current!.getFieldsValue();
        return exportLogisticsList(query);
    }, []);

    const newLogistic = useCallback(() => {
        setVisible(true);
    }, []);

    const onCancel = useCallback(() => {
        setVisible(false);
    }, []);

    // componentDidMount
    useEffect(() => {
        queryOptions(); // 获取分类
    }, []);

    const editLogistic = useCallback((id: string) => {
        setVisible(id);
    }, []);

    const columns = useMemo<ProColumns<ILogistics>[]>(() => {
        return [
            {
                title: "物流商ID",
                dataIndex: "id",
                align: "center",
                width: "150px",
            },
            {
                title: "中文名",
                dataIndex: "name",
                align: "center",
                width: "150px",
            },
            {
                title: "英文名",
                dataIndex: "name_en",
                align: "center",
                width: "150px",
            },
            {
                title: "服务方式",
                dataIndex: "service_method",
                align: "center",
                width: "150px",
                render: (value: any) => {
                    return (
                        <OptionItem
                            syncCallback={queryOptions}
                            type="service_method_list"
                            value={value}
                        />
                    );
                },
            },
            {
                title: "服务类型",
                dataIndex: "service_type",
                align: "center",
                width: "150px",
                render: (value: any) => {
                    return (
                        <OptionItem
                            syncCallback={queryOptions}
                            type="service_type_list"
                            value={value}
                        />
                    );
                },
            },
            {
                title: "服务国家",
                dataIndex: "service_country",
                align: "center",
                width: "150px",
                render: (value: any) => {
                    return (
                        <OptionItem
                            syncCallback={queryOptions}
                            type="service_country_list"
                            value={value}
                        />
                    );
                },
            },
            {
                title: "官网地址",
                dataIndex: "home_page",
                align: "center",
                width: "200px",
            },
            {
                title: "轨迹查询方式",
                dataIndex: "track_query",
                align: "center",
                width: "150px",
                render: (value: any) => {
                    return (
                        <OptionItem
                            syncCallback={queryOptions}
                            type="track_query_list"
                            value={value}
                        />
                    );
                },
            },
            {
                title: "联系方式",
                dataIndex: "phone_number",
                align: "center",
                width: "150px",
            },
            {
                title: "创建时间",
                dataIndex: "create_time",
                align: "center",
                width: "150px",
            },
            {
                title: "更新时间",
                dataIndex: "update_time",
                align: "center",
                width: "150px",
            },
            {
                title: "cpcode",
                dataIndex: "cpcode",
                align: "center",
                width: "150px",
            },
            {
                title: "app_secret",
                dataIndex: "app_secret",
                align: "center",
                width: "150px",
            },
            {
                title: "最近操作人",
                dataIndex: "operator",
                align: "center",
                width: "150px",
            },
            {
                title: "合同",
                dataIndex: "contract",
                align: "center",
                width: "200px",
            },
            {
                title: "操作",
                dataIndex: "opt",
                align: "center",
                width: "150px",
                render: (_, record) => {
                    return (
                        <Button type="link" onClick={() => editLogistic(record.id)}>
                            编辑
                        </Button>
                    );
                },
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
                                    logistics_mode: "",
                                    return_type: "",
                                    return_platform: "",
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
                        <ProTable<ILogistics>
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
                                <Button type="primary" onClick={newLogistic}>
                                    <PlusOutlined />
                                    新建
                                </Button>,
                                <LoadingButton type="primary" onClick={exportTable}>
                                    批量导出
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
                    <EditModal visible={visible} onCancel={onCancel} queryOptions={queryOptions} />
                );
            }, [visible])}
        </>
    );
};

export default LogisticsPage;
