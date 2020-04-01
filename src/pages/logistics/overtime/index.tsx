import React, { useMemo, useState, useEffect, useCallback, useRef } from "react";
import { Card } from "antd";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { InfoCircleOutlined } from "@ant-design/icons";
import FilterForm, { FilterFormRef } from "./components/FilterForm";
import classnames from "classnames";
import ProTable, { ProColumns } from "@/components/OptimizeProTable";

import { getOrderList } from "@/services/logistics/delivery";
import { PaginationConfig } from "antd/lib/pagination";
import { ITableListItem } from "@/interface/logistics/IDelivery";

import indexStyles from "@/styles/_index.less";
import formStyles from "@/components/SearchForm/_form.less";

const columns: ProColumns<ITableListItem>[] = [
    {
        title: "发货物流单",
        dataIndex: "logistics_no",
        align: "center",
        width: 120,
    },
    {
        title: "仓库",
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
        title: "目的国",
        dataIndex: "status",
        align: "center",
        width: 120,
    },
    {
        title: "渠道类型",
        dataIndex: "platform",
        align: "center",
        width: 120,
    },
    {
        title: "物流渠道",
        dataIndex: "logistics_channel",
        align: "center",
        width: 120,
    },
    {
        title: "运单号",
        dataIndex: "associated_waybill",
        align: "center",
        width: 120,
    },
    {
        title: "出库时间",
        dataIndex: "current_node",
        align: "center",
        width: 120,
    },
    {
        title: "超时标准",
        dataIndex: "fee",
        align: "center",
        width: 120,
    },
    {
        title: "超时时间",
        dataIndex: "fee",
        align: "center",
        width: 120,
    },
    {
        title: "创建时间 ",
        dataIndex: "fee",
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

const LogisticsOvertime: React.FC = props => {
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

    const Desc = useMemo(() => {
        return (
            <div>
                <InfoCircleOutlined
                    className={indexStyles.floatLeft}
                    style={{ margin: "3px 4px 0 0", fontSize: 16 }}
                />
                <div className={indexStyles.overflowHidden}>
                    <div>
                        本报表展示所有出库超规定时间后未收到干线揽收节点，且到目前为止仍未揽收的订单
                    </div>
                    <div>
                        最新标准：
                        <div className={indexStyles.inlineBlock}>快速类:24H</div>
                        &emsp;&emsp;
                        <div className={indexStyles.inlineBlock}>标准类:48H</div>
                        &emsp;&emsp;
                        <div className={indexStyles.inlineBlock}>经济类:25H</div>
                    </div>
                </div>
            </div>
        );
    }, []);

    return useMemo(() => {
        return (
            <PageHeaderWrapper content={Desc}>
                <Card
                    bordered={false}
                    className={classnames(formStyles.formItem, formStyles.formCard)}
                >
                    <FilterForm ref={filterFormRef} getPageData={getPageData} />
                </Card>
                <ProTable<ITableListItem>
                    // search={false}
                    className={formStyles.formItem}
                    headerTitle="订单列表"
                    rowKey="logistics_no"
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

export default LogisticsOvertime;
