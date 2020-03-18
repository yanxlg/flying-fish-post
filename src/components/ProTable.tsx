import React, { useCallback, useMemo, useState } from "react";
import { ProTableProps } from "@ant-design/pro-table/lib/Table";
import { default as DefaultProTable, ProColumns } from "@ant-design/pro-table";
import { Card, Pagination } from "antd";
import { Key, SorterResult, TableCurrentDataSource } from "antd/es/table/interface";
import { PaginationConfig } from "antd/es/pagination";
import cardStyle from "@/styles/card.less";

const ProTable = <
    T,
    U extends {
        [key: string]: any;
    } = {}
>(
    props: ProTableProps<T, U>,
) => {
    const [filters, setFilters] = useState<Record<string, Key[] | null>>({});
    const [sorters, setSorters] = useState<SorterResult<T> | SorterResult<T>[]>({});
    const [extra, setExtra] = useState<TableCurrentDataSource<T>>({ currentDataSource: [] });

    const onDefaultChange = useCallback(
        (
            pagination: PaginationConfig,
            filters: Record<string, Key[] | null>,
            sorter: SorterResult<T> | SorterResult<T>[],
            extra: TableCurrentDataSource<T>,
        ) => {
            setFilters(filters);
            setSorters(sorter);
            setExtra(extra);
        },
        [],
    );
    const onChange = useCallback(
        (current: number, pageSize?: number) => {
            props.onChange &&
                props.onChange({ pageSize: pageSize!, current: current }, filters, sorters, extra);
        },
        [props.onChange, filters, sorters, extra],
    );

    const onShowSizeChange = useCallback(
        (current: number, pageSize: number) => {
            props.onChange &&
                props.onChange({ pageSize: pageSize!, current: current }, filters, sorters, extra);
        },
        [props.onChange, filters, sorters, extra],
    );

    return useMemo(() => {
        const { pagination } = props;
        return (
            <Card className={cardStyle.cardPlain}>
                <DefaultProTable<T, U> {...props} pagination={false} onChange={onDefaultChange} />
                {pagination ? (
                    <Pagination
                        className="ant-table-pagination"
                        {...pagination}
                        onChange={onChange}
                        onShowSizeChange={onShowSizeChange}
                    />
                ) : null}
            </Card>
        );
    }, [props]);
};

export default ProTable;
