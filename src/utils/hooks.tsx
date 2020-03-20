import { ProColumns } from "@ant-design/pro-table";
import React, { RefObject, useCallback, useEffect, useMemo, useState } from "react";
import { Button, Input } from "antd";
import { FilterDropdownProps } from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons/lib";
import Highlighter from "react-highlight-words";
import SearchForm from "@/components/SearchForm";
import { IPaginationResponse, IRequestPagination, IResponse } from "@/interface/IGlobal";
import { PaginationConfig } from "antd/es/pagination";
import { RequestData, UseFetchDataAction } from "@ant-design/pro-table/lib/useFetchData";

import styles from "@/styles/_table.less";

export declare interface IWrappedProColumns<T> extends ProColumns<T> {
    filterType?: "input";
    render?: (
        text: React.ReactNode,
        record: T,
        index: number,
        action: UseFetchDataAction<RequestData<T>>,
        filterText?: string,
    ) => React.ReactNode | React.ReactNode[];
}

function useFilterTable<T>(columns: IWrappedProColumns<T>[]): ProColumns<T>[] {
    const [search, setSearch] = useState<{ searchText: string; searchedColumn: string }>({
        searchText: "",
        searchedColumn: "",
    });
    const handleSearch = useCallback((searchText, searchedColumn) => {
        setSearch({
            searchText: searchText,
            searchedColumn: searchedColumn,
        });
    }, []);
    const handleReset = useCallback(searchedColumn => {
        setSearch({
            searchText: "",
            searchedColumn: searchedColumn,
        });
    }, []);

    const [searchInput] = useState<RefObject<Input>>(React.createRef());

    return useMemo(() => {
        return columns.map(column => {
            const { filterType, dataIndex, title, render } = column;
            if (filterType === "input") {
                return {
                    ...column,
                    filterDropdown: ({
                        setSelectedKeys,
                        selectedKeys,
                        confirm,
                        clearFilters,
                    }: FilterDropdownProps) => (
                        <div style={{ padding: 8 }}>
                            <Input
                                ref={searchInput}
                                placeholder={`筛选 ${title}`}
                                value={selectedKeys[0]}
                                onChange={e =>
                                    setSelectedKeys(e.target.value ? [e.target.value] : [])
                                }
                                onPressEnter={() => {
                                    confirm();
                                    handleSearch(selectedKeys[0], dataIndex);
                                }}
                                className={styles.tableFilterInput}
                            />
                            <Button
                                type="primary"
                                onClick={() => {
                                    confirm();
                                    handleSearch(selectedKeys[0], dataIndex);
                                }}
                                icon={<SearchOutlined />}
                                size="small"
                                className={styles.tableFilterBtn}
                            >
                                筛选
                            </Button>
                            <Button
                                onClick={() => {
                                    clearFilters?.();
                                    handleReset(dataIndex);
                                }}
                                size="small"
                                className={styles.tableFilterBtn}
                            >
                                清空
                            </Button>
                        </div>
                    ),
                    filterIcon: (filtered: boolean) => (
                        <SearchOutlined className={filtered ? styles.tableIconActive : undefined} />
                    ),
                    onFilter: (value: string, record: any) => {
                        const showText = record.hasOwnProperty("__" + dataIndex)
                            ? record["__" + dataIndex]
                            : record[dataIndex as any];
                        return showText
                            .toString()
                            .toLowerCase()
                            .includes(value.toLowerCase());
                    },
                    onFilterDropdownVisibleChange: (visible: boolean) => {
                        if (visible) {
                            setTimeout(() => searchInput.current?.select());
                        }
                    },
                    render: (text: any, record: T, index: number, action) =>
                        search.searchedColumn === dataIndex ? (
                            render ? (
                                render(text, record, index, action, search.searchText)
                            ) : (
                                <Highlighter
                                    highlightClassName={styles.tableHighlight}
                                    searchWords={[search.searchText]}
                                    autoEscape
                                    textToHighlight={text.toString()}
                                />
                            )
                        ) : (
                            render?.(text, record, index, action) ?? text
                        ),
                };
            } else {
                return column;
            }
        });
    }, [columns]);
}

function useList<T, Q extends IRequestPagination>(
    searchRef: RefObject<SearchForm>,
    queryList: (query: Q) => Promise<IResponse<IPaginationResponse<T>>>,
    extraQuery?: { [key: string]: any },
) {
    const [loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const [dataSource, setDataSource] = useState<T[]>([]);
    const [total, setTotal] = useState(0);

    const getListData = useCallback(
        ({
            page = pageNumber,
            page_count = pageSize,
            ...extra
        }: { page?: number; page_count?: number; [key: string]: any } = {}) => {
            const formValues = searchRef.current!.getFieldsValue();
            setLoading(true);
            const query = {
                ...formValues,
                page: page,
                page_count: page_count,
                ...extra,
            };
            return queryList(query as Q)
                .then(({ data: { list = [], total = 0 } }) => {
                    setDataSource(list);
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

    const onReload = useCallback(() => getListData(), [pageNumber, pageSize]);

    const onSearch = useCallback(
        () =>
            getListData({
                page: 1,
                ...extraQuery,
            }),
        [pageNumber, pageSize, extraQuery],
    );

    const onChange = useCallback(
        ({ current, pageSize }: PaginationConfig, filters, sorter) => {
            console.log(sorter);
            const sorterConfig =
                sorter && sorter.field
                    ? {
                          sort_by: sorter.field,
                          sort_order: sorter.order,
                      }
                    : {};
            getListData({
                page: current,
                page_count: pageSize,
                ...sorterConfig,
                ...extraQuery,
            });
        },
        [extraQuery],
    );

    useEffect(() => {
        onSearch();
    }, []);

    return {
        loading,
        pageNumber,
        pageSize,
        dataSource,
        total,
        setLoading,
        setPageNumber,
        setPageSize,
        setDataSource,
        setTotal,
        onReload,
        onSearch,
        onChange,
        getListData,
    };
}

function useModal<T = string>() {
    const [visible, setVisible] = useState<T | false>(false);

    const onClose = useCallback(() => {
        setVisible(false);
    }, []);

    const setVisibleProps = useCallback((visibleProps: T) => {
        setVisible(visibleProps);
    }, []);

    return {
        visible,
        onClose,
        setVisibleProps,
    };
}

export { useFilterTable, useList, useModal };
