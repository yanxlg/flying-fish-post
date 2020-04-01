import React, { RefObject, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button, Input } from "antd";
import { FilterDropdownProps } from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons/lib";
import Highlighter from "react-highlight-words";
import { SearchFormRef } from "@/components/SearchForm";
import { IPaginationResponse, IRequestPagination, IResponse } from "@/interface/IGlobal";
import { PaginationConfig } from "antd/es/pagination";

import styles from "@/styles/_table.less";
import { defaultPageNumber, defaultPageSize, EmptyObject } from "@/config/global";
import { ProColumns } from "@/components/OptimizeProTable";
const EmptyArray: string[] = [];

export type IWrappedProColumns<T> = Omit<ProColumns<T>, "render"> & {
    filterType?: "input";
    render?: (
        text: React.ReactNode,
        record: T,
        index: number,
        filterText?: string,
    ) => React.ReactNode | React.ReactNode[];
};

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

    return useMemo<ProColumns<T>[]>(() => {
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
                                render(text, record, index, search.searchText)
                            ) : (
                                <Highlighter
                                    highlightClassName={styles.tableHighlight}
                                    searchWords={[search.searchText]}
                                    autoEscape
                                    textToHighlight={text.toString()}
                                />
                            )
                        ) : (
                            render?.(text, record, index) ?? text
                        ),
                };
            } else {
                return column;
            }
        });
    }, [columns]);
}

function useList<T, Q extends IRequestPagination = any, S = any>({
    queryList,
    formRef,
    extraQuery,
    defaultState,
    autoQuery = true,
}: {
    queryList: (query: Q) => Promise<IResponse<IPaginationResponse<T>>>;
    formRef?: RefObject<SearchFormRef>;
    extraQuery?: { [key: string]: any };
    defaultState?: { pageNumber?: number; pageSize?: number };
    autoQuery?: boolean;
}) {
    const [loading, setLoading] = useState(autoQuery);

    const extraQueryRef = useRef<{ [key: string]: any } | undefined>(undefined);
    extraQueryRef.current = extraQuery;

    const pageNumber = useRef<number>(defaultState?.pageNumber ?? defaultPageNumber);
    const pageSize = useRef<number>(defaultState?.pageSize ?? defaultPageSize);

    const [dataSource, setDataSource] = useState<T[]>([]);
    const [total, setTotal] = useState(0);
    const [extraData, setExtraData] = useState<S | undefined>(undefined);
    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>(EmptyArray);

    const query = useRef<object>({});
    const setQuery = useCallback((nextQuery: object) => {
        query.current = nextQuery;
    }, []);

    const getListData = useCallback(
        ({
            page = pageNumber.current,
            page_count = pageSize.current,
            ...extra
        }: { page?: number; page_count?: number; [key: string]: any } = {}) => {
            return Promise.resolve()
                .then(() => {
                    return formRef ? formRef.current!.validateFields() : undefined;
                })
                .then(formValues => {
                    setLoading(true);
                    const query = {
                        page: page,
                        page_count: page_count,
                        ...extra,
                        ...formValues,
                    };
                    setQuery(query);
                    setSelectedRowKeys(EmptyArray);
                    return queryList(query as Q)
                        .then(({ data: { total = 0, list = [], ...extraData } = EmptyObject }) => {
                            pageNumber.current = page;
                            pageSize.current = page_count;
                            setDataSource(list);
                            setTotal(total);
                            setExtraData(extraData);
                        })
                        .finally(() => {
                            setLoading(false);
                        });
                });
        },
        [],
    );

    const onReload = useCallback(
        () =>
            getListData({
                ...extraQueryRef.current,
            }),
        [],
    );

    const onSearch = useCallback(
        () =>
            getListData({
                page: 1,
                page_count: defaultState?.pageSize ?? defaultPageSize,
                ...extraQueryRef.current,
            }),
        [],
    );

    const onChange = useCallback(({ current, pageSize }: PaginationConfig, filters, sorter) => {
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
            ...extraQueryRef.current,
        });
    }, []);

    useEffect(() => {
        if (autoQuery) {
            // 有些场景可能不需要立即调用接口，添加参数控制，默认为true
            onSearch();
        }
    }, []);

    const setPageSize = useCallback((size: number) => {
        pageSize.current = size;
    }, []);

    const setPageNumber = useCallback((current: number) => {
        pageNumber.current = current;
    }, []);

    return {
        get query() {
            return query.current;
        },
        get pageNumber() {
            return pageNumber.current;
        },
        get pageSize() {
            return pageSize.current;
        },
        loading,
        dataSource,
        extraData,
        total,
        setLoading,
        setDataSource,
        selectedRowKeys,
        setTotal,
        onReload,
        onSearch,
        onChange,
        getListData,
        setSelectedRowKeys,
        setPageSize,
        setPageNumber,
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
