import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { Button, Card } from "antd";
import SearchForm, { IFieldItem } from "@/components/SearchForm";
import formStyles from "@/styles/_form.less";
import btnStyles from "@/styles/_btn.less";
import LoadingButton from "@/components/LoadingButton";
import { IReturnRequestForm } from "@/interface/IAfterSale";
import ProTable from "@/components/ProTable";
import { PaginationConfig } from "antd/es/pagination";
import { ProColumns } from "@ant-design/pro-table";
import { exportLogisticsList, queryLogisticsList, queryOptionList } from "@/services/supplier";
import { ILogistics, IOptionListResponse } from "@/interface/ISupplier";
import EditModal from "@/pages/supplier/components/logistics/EditModal";
import { PlusOutlined } from "@ant-design/icons";
import { IResponse } from "@/interface/IGlobal";
import OptionItem from "../../components/OptionItem";

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

const formConfig: IFieldItem<keyof IReturnRequestForm>[] = [
    {
        label: "物流商",
        type: "input",
        name: "number",
        placeholder: "ID/中文名/英文名",
    },
];

const LogisticsPage: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const [dataSource, setDataSource] = useState<ILogistics[]>([]);
    const [total, setTotal] = useState(0);
    const [visible, setVisible] = useState<boolean | string>(false);
    const searchRef = useRef<SearchForm>(null);

    const getListData = ({
        page = pageNumber,
        page_count = pageSize,
    }: { page?: number; page_count?: number } = {}) => {
        const formValues = searchRef.current!.getFieldsValue();
        setLoading(true);
        const query = {
            ...formValues,
            page: page,
            page_count: page_count,
        };
        return queryLogisticsList(query)
            .then(({ data: { list = [], total = 0 } }) => {
                setDataSource(list);
                setTotal(total);
                setPageNumber(page);
                setPageSize(page_count);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const exportTable = () => {
        const query = searchRef.current!.getFieldsValue();
        return exportLogisticsList(query);
    };

    const newLogistic = useCallback(() => {
        setVisible(true);
    }, []);

    const onCancel = useCallback(() => {
        setVisible(false);
    }, []);

    const onSearch = () => {
        return getListData({
            page: 1,
        });
    };

    const onChange = ({ current, pageSize }: PaginationConfig) => {
        getListData({
            page: current,
            page_count: pageSize,
        });
    };

    const reload = () => getListData();

    // componentDidMount
    useEffect(() => {
        queryOptions(); // 获取分类
        onSearch();
    }, []);

    const editLogistic = useCallback((id: string) => {
        setVisible(id);
    }, []);

    const columns: ProColumns<ILogistics>[] = [
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
                    <OptionItem syncCallback={queryOptions} type="track_query_list" value={value} />
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
                                ref={searchRef}
                                initialValues={{
                                    logistics_mode: "",
                                    return_type: "",
                                    return_platform: "",
                                }}
                            >
                                <LoadingButton
                                    className={btnStyles.btnGroup}
                                    type="primary"
                                    onClick={onSearch}
                                >
                                    搜索
                                </LoadingButton>
                            </SearchForm>
                        </Card>
                        <ProTable<ILogistics>
                            search={false}
                            headerTitle="查询表格"
                            rowKey="id"
                            pagination={{
                                total: total,
                                current: pageNumber,
                                pageSize: pageSize,
                                showSizeChanger: true,
                                pageSizeOptions: ["50", "100", "200"],
                            }}
                            toolBarRender={(action, { selectedRows }) => [
                                <Button type="primary" onClick={newLogistic}>
                                    <PlusOutlined />
                                    新建
                                </Button>,
                                <LoadingButton type="primary" onClick={exportTable}>
                                    批量导出
                                </LoadingButton>,
                            ]}
                            tableAlertRender={(selectedRowKeys, selectedRows) => (
                                <div>
                                    已选择{" "}
                                    <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项
                                </div>
                            )}
                            columns={columns}
                            dataSource={dataSource}
                            loading={loading}
                            onChange={onChange}
                            options={{
                                density: true,
                                fullScreen: true,
                                reload: reload,
                                setting: true,
                            }}
                        />
                    </PageHeaderWrapper>
                );
            }, [loading, visible])}
            {useMemo(() => {
                return (
                    <EditModal visible={visible} onCancel={onCancel} queryOptions={queryOptions} />
                );
            }, [visible])}
        </>
    );
};

export default LogisticsPage;
