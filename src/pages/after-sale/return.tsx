import React, { useEffect, useMemo, useRef, useState } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { Card } from "antd";
import SearchForm, { IFieldItem } from "@/components/SearchForm";
import formStyles from "@/styles/_form.less";
import btnStyles from "@/styles/_btn.less";
import LoadingButton from "@/components/LoadingButton";
import { IFormItems, TableListItem } from "@/interface/IReturn";
import { queryReturnList, exportReturnList, queryOptionList } from "@/services/afterSale";
import { optionListToMap } from "@/utils/utils";
import ProTable from "@/components/ProTable";
import { PaginationConfig } from "antd/es/pagination";
import { ProColumns } from "@ant-design/pro-table";

declare interface IOptionItemProps {
    type: "logistics_mode" | "return_type" | "return_platform" | "status";
    value: number;
}

const queryOptions = queryOptionList();

const queryOptionMap = queryOptions.then(
    ({
        data: {
            logistics_mode_list = [],
            return_type_list = [],
            return_platform_list = [],
            status_list = [],
        },
    }) => {
        return {
            logisticsModeMap: optionListToMap(logistics_mode_list),
            returnTypeMap: optionListToMap(return_type_list),
            returnPlatformMap: optionListToMap(return_platform_list),
            statusMap: optionListToMap(status_list),
        };
    },
);

const OptionItem: React.FC<IOptionItemProps> = ({ type, value }) => {
    const [label, setLabel] = useState("");
    useMemo(() => {
        queryOptionMap.then(({ logisticsModeMap, returnTypeMap, returnPlatformMap, statusMap }) => {
            setLabel(
                type == "logistics_mode"
                    ? logisticsModeMap[value]
                    : type === "return_type"
                    ? returnTypeMap[value]
                    : type === "return_platform"
                    ? returnPlatformMap[value]
                    : type === "status"
                    ? statusMap[value]
                    : "",
            );
        });
    }, []);
    return useMemo(() => {
        return <span>{label}</span>;
    }, [label]);
};

const formConfig: IFieldItem<keyof IFormItems>[] = [
    {
        label: "单号",
        type: "input",
        name: "number",
    },
    {
        label: "物流方式",
        type: "select",
        name: "logistics_mode",
        formatter: "number",
        syncDefaultOption: {
            name: "全部",
            value: "",
        },
        optionList: () => {
            return queryOptions.then(({ data: { logistics_mode_list = [] } }) => {
                return logistics_mode_list;
            });
        },
    },
    {
        label: "退货类型",
        type: "select",
        name: "return_type",
        formatter: "number",
        syncDefaultOption: {
            name: "全部",
            value: "",
        },
        optionList: () => {
            return queryOptions.then(({ data: { return_type_list = [] } }) => {
                return return_type_list;
            });
        },
    },
    {
        label: "退货平台",
        type: "select",
        name: "return_platform",
        formatter: "number",
        syncDefaultOption: {
            name: "全部",
            value: "",
        },
        optionList: () => {
            return queryOptions.then(({ data: { return_type_list = [] } }) => {
                return return_type_list;
            });
        },
    },
    {
        label: "创建时间",
        type: "dateRanger",
        name: ["create_time_start", "create_time_end"],
        formatter: ["start_date", "end_date"],
    },
];

const columns: ProColumns<TableListItem>[] = [
    {
        title: "单号",
        dataIndex: "number",
        align: "center",
    },
    {
        title: "类型",
        dataIndex: "logistics_mode",
        align: "center",
        render: (value: any) => {
            return <OptionItem type="logistics_mode" value={value} />;
        },
    },
    {
        title: "平台类型",
        dataIndex: "return_platform",
        align: "center",
        render: (value: any) => {
            return <OptionItem type="return_platform" value={value} />;
        },
    },
    {
        title: "状态",
        dataIndex: "status",
        align: "center",
        render: (value: any) => {
            return <OptionItem type="status" value={value} />;
        },
    },
    {
        title: "运单号",
        dataIndex: "track_number",
        align: "center",
    },
    {
        title: "物流渠道",
        dataIndex: "physical_channel",
        align: "center",
    },
    {
        title: "当前节点",
        dataIndex: "current_node",
        align: "center",
    },
    {
        title: "费用",
        dataIndex: "cost",
        align: "center",
    },
    {
        title: "退入仓库",
        dataIndex: "return_warehouse",
        align: "center",
    },
    {
        title: "入库单号",
        dataIndex: "warehouse_receipt",
        align: "center",
    },
    {
        title: "创建时间",
        dataIndex: "create_time",
        align: "center",
    },
    {
        title: "操作",
        dataIndex: "option",
        align: "center",
        render: (_, record: TableListItem) => <span>1</span>,
    },
];

const ReturnPage: React.FC = props => {
    const [loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const [dataSource, setDataSource] = useState<TableListItem[]>([]);
    const [total, setTotal] = useState(0);
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
        return queryReturnList(query)
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
        return exportReturnList(query);
    };

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
        onSearch();
    }, []);

    return useMemo(() => {
        console.log("render");
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
                <ProTable<TableListItem>
                    search={false}
                    headerTitle="查询表格"
                    rowKey="number"
                    pagination={{
                        total: total,
                        current: pageNumber,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        pageSizeOptions: ["50", "100", "200"],
                    }}
                    toolBarRender={(action, { selectedRows }) => [
                        <LoadingButton type="primary" onClick={exportTable}>
                            批量导出
                        </LoadingButton>,
                    ]}
                    tableAlertRender={(selectedRowKeys, selectedRows) => (
                        <div>
                            已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项
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
    }, [loading]);
};

export default ReturnPage;
