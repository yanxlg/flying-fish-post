import React, { useMemo, useState, useEffect, useCallback, useRef } from "react";
import { Button } from "antd";
import FilterForm, { FilterFormRef } from "./FilterForm";
import BtnGroup from "./BtnGroup";
import ProTable from "@/components/ProTable";
import { ProColumns } from "@ant-design/pro-table";

import { getOrderList } from "@/services/logistics/delivery";
import { ITableListItem } from "@/interface/logistics/IDelivery";
import { PaginationConfig } from "antd/lib/pagination";

const columns: ProColumns<ITableListItem>[] = [
    {
        title: "单号",
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
        title: "状态",
        dataIndex: "type",
        align: "center",
        width: 120,
    },
    {
        title: "平台",
        dataIndex: "warehouse",
        align: "center",
        width: 120,
    },
    {
        title: "异常原因",
        dataIndex: "status",
        align: "center",
        width: 120,
    },
    {
        title: "处理类型",
        dataIndex: "platform",
        align: "center",
        width: 120,
    },
    {
        title: "处理备注",
        dataIndex: "logistics_channel",
        align: "center",
        width: 120,
    },
    {
        title: "物流渠道",
        dataIndex: "associated_waybill",
        align: "center",
        width: 120,
    },
    {
        title: "关联运单",
        dataIndex: "current_node",
        align: "center",
        width: 120,
    },
    {
        title: "费用",
        dataIndex: "fee",
        align: "center",
        width: 120,
    },
    {
        title: "当前节点",
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
        title: "处理人",
        dataIndex: "a2",
        align: "center",
        width: 120,
    },
    {
        title: "处理时间",
        dataIndex: "a4",
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

const Order3PL: React.FC = props => {
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
            <>
                <FilterForm ref={filterFormRef} getPageData={getPageData} />
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
                    rowSelection={{
                        columnWidth: 60,
                    }}
                    toolBarRender={() => [
                        <Button key="1" type="primary">
                            批量导出
                        </Button>,
                    ]}
                />
            </>
        );
    }, [loading, orderList]);
};

export default Order3PL;
