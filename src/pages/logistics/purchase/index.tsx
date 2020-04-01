import React, { useMemo, useState, useEffect, useCallback, useRef } from "react";
import { Button, Card } from "antd";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import FilterForm, { FilterFormRef } from "./components/FilterForm";
import ProTable from "@/components/ProTable";
import { ProColumns } from "@ant-design/pro-table";
import BtnGroup from "./components/BtnGroup";

import { getOrderList } from "@/services/logistics/delivery";
import { ITableListItem } from "@/interface/logistics/IDelivery";
import { PaginationConfig } from "antd/lib/pagination";

import formStyles from "@/styles/_form.less";

const columns: ProColumns<ITableListItem>[] = [
    {
        title: "采购物流单号",
        dataIndex: "logistics_no",
        align: "center",
        width: 120,
    },
    {
        title: "运单号",
        dataIndex: "waybill_no",
        align: "center",
        width: 120,
    },
    {
        title: "仓库",
        dataIndex: "type",
        align: "center",
        width: 120,
    },
    {
        title: "物流渠道",
        dataIndex: "warehouse",
        align: "center",
        width: 120,
    },
    {
        title: "状态",
        dataIndex: "status",
        align: "center",
        width: 120,
    },
    {
        title: "平台类型",
        dataIndex: "platform",
        align: "center",
        width: 120,
    },
    {
        title: "关联运单",
        dataIndex: "logistics_channel",
        align: "center",
        width: 120,
    },
    {
        title: "发货物流单号",
        dataIndex: "associated_waybill",
        align: "center",
        width: 120,
    },
    {
        title: "当前节点",
        dataIndex: "current_node",
        align: "center",
        width: 120,
    },
    {
        title: "商家是否标记发货",
        dataIndex: "fee",
        align: "center",
        width: 120,
    },
    {
        title: "入库时间",
        dataIndex: "create_time",
        align: "center",
        width: 120,
    },
    {
        title: "创建时间",
        dataIndex: "a1",
        align: "center",
        width: 120,
    },
    {
        title: "操作",
        dataIndex: "option",
        align: "center",
        width: 120,
        render: (_, record: ITableListItem) => <a>详情</a>,
    },
];

const LogisticsPurchase: React.FC = props => {
    const [loading, setLoading] = useState<boolean>(true);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(50);
    const [total, setTotal] = useState<number>(0);
    const [orderList, setOrderList] = useState<ITableListItem[]>([]);
    // typeof FilterForm
    const filterFormRef = useRef<FilterFormRef>(null);

    const getPageData = useCallback(
        ({
            page = pageNumber,
            page_count = pageSize,
        }: { page?: number; page_count?: number } = {}) => {
            setLoading(true);
            // console.log(111111, filterFormRef.current.getFieldsValue());
            const values = filterFormRef.current?.getFieldsValue();
            const params = {
                page: page,
                page_count: page_count,
                ...values,
            };
            return getOrderList(params)
                .then(({ data: { list = [], total = 0 } }) => {
                    setOrderList(list);
                    setTotal(total);
                    setPageNumber(page);
                    setPageSize(page_count);
                })
                .finally(() => {
                    setLoading(false);
                });
        },
        [pageNumber, pageSize],
    );

    const onSearch = () => {
        return getPageData({
            page: 1,
        });
    };

    const onChange = ({ current, pageSize }: PaginationConfig) => {
        getPageData({
            page: current,
            page_count: pageSize,
        });
    };

    const reload = () => getPageData();

    useEffect(() => {
        onSearch();
    }, []);

    return useMemo(() => {
        return (
            <PageHeaderWrapper>
                <Card
                    bordered={false}
                    className={[formStyles.formItem, formStyles.formCard].join(" ")}
                >
                    <FilterForm ref={filterFormRef} getPageData={getPageData} />
                </Card>
                <BtnGroup />
                <ProTable<ITableListItem>
                    search={false}
                    headerTitle="订单列表"
                    rowKey="waybill_no"
                    pagination={{
                        total: total,
                        current: pageNumber,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        pageSizeOptions: ["50", "100", "200"],
                    }}
                    columns={columns}
                    dataSource={orderList}
                    loading={loading}
                    onChange={onChange}
                    options={{
                        density: true,
                        fullScreen: true,
                        reload: reload,
                        setting: true,
                    }}
                    scroll={{ x: "max-content" }}
                />
            </PageHeaderWrapper>
        );
    }, [loading, orderList]);
};

export default LogisticsPurchase;
