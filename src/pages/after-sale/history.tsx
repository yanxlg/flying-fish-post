import React, { useCallback, useMemo, useRef } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { Card } from "antd";
import SearchForm, { FormField, SearchFormRef } from "@/components/SearchForm";
import formStyles from "@/components/SearchForm/_form.less";
import LoadingButton from "@/components/LoadingButton";
import { IReturnRequestForm, TableListItem } from "@/interface/IAfterSale";
import { queryHistoryReturnList, exportHistoryReturnList } from "@/services/afterSale";
import ProTable, { ProColumns } from "@/components/OptimizeProTable";
import { queryOptions } from "@/pages/after-sale/return";
import OptionItem from "@/components/OptionItem";
import { useList } from "@/utils/hooks";

const formConfig: FormField<keyof IReturnRequestForm>[] = [
    {
        label: "单号",
        type: "input",
        name: "number",
        formItemClassName: formStyles.formItem,
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
            return queryOptions().then(({ data: { logistics_mode_list = [] } }) => {
                return logistics_mode_list;
            });
        },
        formItemClassName: formStyles.formItem,
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
            return queryOptions().then(({ data: { return_type_list = [] } }) => {
                return return_type_list;
            });
        },
        formItemClassName: formStyles.formItem,
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
            return queryOptions().then(({ data: { return_type_list = [] } }) => {
                return return_type_list;
            });
        },
        formItemClassName: formStyles.formItem,
    },
    {
        label: "创建时间",
        type: "dateRanger",
        name: ["create_time_start", "create_time_end"],
        formatter: ["start_date", "end_date"],
        formItemClassName: formStyles.formItem,
    },
];

const columns: ProColumns<TableListItem>[] = [
    {
        title: "单号",
        dataIndex: "number",
        align: "center",
        width: "150px",
    },
    {
        title: "类型",
        dataIndex: "logistics_mode",
        align: "center",
        width: "120px",
        render: (value: any) => {
            return (
                <OptionItem syncCallback={queryOptions} type="logistics_mode_list" value={value} />
            );
        },
    },
    {
        title: "平台类型",
        dataIndex: "return_platform",
        align: "center",
        width: "120px",
        render: (value: any) => {
            return (
                <OptionItem syncCallback={queryOptions} type="return_platform_list" value={value} />
            );
        },
    },
    {
        title: "状态",
        dataIndex: "status",
        align: "center",
        width: "120px",
        render: (value: any) => {
            return <OptionItem syncCallback={queryOptions} type="status_list" value={value} />;
        },
    },
    {
        title: "运单号",
        dataIndex: "track_number",
        align: "center",
        width: "150px",
    },
    {
        title: "物流渠道",
        dataIndex: "physical_channel",
        align: "center",
        width: "120px",
    },
    {
        title: "当前节点",
        dataIndex: "current_node",
        align: "center",
        width: "150px",
    },
    {
        title: "费用",
        dataIndex: "cost",
        align: "center",
        width: "120px",
    },
    {
        title: "退入仓库",
        dataIndex: "return_warehouse",
        align: "center",
        width: "150px",
    },
    {
        title: "入库单号",
        dataIndex: "warehouse_receipt",
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
        title: "操作",
        dataIndex: "option",
        align: "center",
        width: "120px",
        render: (_, record: TableListItem) => <span>1</span>,
    },
];

const HistoryPage: React.FC = props => {
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
    } = useList({
        queryList: queryHistoryReturnList,
        formRef: searchRef,
    });

    const exportTable = useCallback(() => {
        const query = searchRef.current!.getFieldsValue();
        return exportHistoryReturnList(query);
    }, []);

    return useMemo(() => {
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
                        enableCollapse={false}
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
                <ProTable<TableListItem>
                    headerTitle="查询表格"
                    className={formStyles.formItem}
                    rowKey="number"
                    pagination={{
                        total: total,
                        current: pageNumber,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        pageSizeOptions: ["50", "100", "200"],
                    }}
                    toolBarRender={() => [
                        <LoadingButton type="primary" onClick={exportTable}>
                            批量导出
                        </LoadingButton>,
                    ]}
                    tableAlertRender={false}
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
    }, [loading]);
};

export default HistoryPage;
