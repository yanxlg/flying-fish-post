import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Divider, Button, Card } from "antd";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import ProTable, { ProColumns, ActionType } from "@ant-design/pro-table";
import { PlusOutlined, DownOutlined } from "@ant-design/icons";
import SearchForm, { IFieldItem } from "@/components/SearchForm";
import LoadingButton from "@/components/LoadingButton";
import { PaginationConfig } from "antd/es/pagination";
import EditModal from "./components/EditModal/index";

import { platformList, platformStatusList } from "@/enums/StatusEnum";
import { getPlatformList, queryOptionList } from "@/services/platform";
import { IFormItems, ITableListItem } from "@/interface/IPlatform";

import formStyles from "@/styles/_form.less";
import btnStyles from "@/styles/_btn.less";

const queryOptions = queryOptionList();

const fieldsList: IFieldItem<keyof IFormItems>[] = [
    {
        label: "上级平台",
        type: "select",
        name: "pid",
        className: "select-default",
        formatter: "number",
        syncDefaultOption: {
            name: "全部",
            value: "",
        },
        optionList: () => {
            return queryOptions.then(({ data: { platform_list = [] } }) => {
                return platform_list;
            });
        },
    },
    {
        label: "平台id",
        type: "input",
        name: "platform_id",
        className: "input-default",
        placeholder: "请输入平台id",
    },
    {
        label: "平台名称",
        type: "input",
        name: "platform_name",
        className: "input-default",
        placeholder: "请输入平台名称",
    },
    {
        label: "平台状态",
        type: "select",
        name: "status",
        className: "select-default",
        formatter: "number",
        optionList: [
            {
                name: "全部",
                value: "",
            },
        ].concat(
            platformStatusList.map(({ id, name }) => {
                return {
                    name,
                    value: id,
                };
            }),
        ),
    },
];

const initialValues = {
    pid: "",
    status: "",
};

const IndexPage: React.FC = props => {
    const [loading, setLoading] = useState(true);
    const [dataSource, setDataSource] = useState<ITableListItem[]>([]);
    const [pageConfig, setPageConfig] = useState({
        pageNumber: 1,
        pageSize: 50,
        total: 0,
    });
    const searchRef = useRef<SearchForm>(null);
    const [editModalVisible, setModalVisible] = useState<boolean>(false);
    const [editType, setEditType] = useState<"add" | "edit">("add");

    const columns: ProColumns<ITableListItem>[] = useMemo(() => {
        return [
            {
                title: "上级平台",
                dataIndex: "pid",
                align: "center",
                width: 120,
            },
            {
                title: "平台ID",
                dataIndex: "platform_id",
                align: "center",
                width: 120,
            },
            {
                title: "平台名称",
                dataIndex: "platform_name",
                align: "center",
                width: 120,
            },
            {
                title: "app_key",
                dataIndex: "app_key",
                align: "center",
                width: 120,
            },
            {
                title: "app_secret",
                dataIndex: "app_secret",
                align: "center",
                width: 120,
            },
            {
                title: "创建时间",
                dataIndex: "create_time",
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
                fixed: "right",
                title: "操作",
                dataIndex: "operation",
                align: "center",
                width: 120,
                render: (_, row) => {
                    return <Button type="link">编辑</Button>;
                },
            },
        ];
    }, []);
    const getPageList = ({
        page = pageConfig.pageNumber,
        page_count = pageConfig.pageSize,
    }: { page?: number; page_count?: number } = {}) => {
        const formValues = searchRef.current!.getFieldsValue();
        const params = {
            ...formValues,
            page: page,
            page_count: page_count,
        };
        setLoading(true);
        return getPlatformList(params)
            .then(({ data: { list = [], total = 0 } }) => {
                setPageConfig({
                    pageNumber: page,
                    pageSize: page_count,
                    total: total,
                });
                setDataSource(list);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleSearch = useCallback(() => {
        // console.log(111111, _pageConfig);
        return getPageList({
            page: 1,
            // page_count: pageConfig.pageSize
        });
    }, [pageConfig]);

    const onChange = useCallback(({ current, pageSize }: PaginationConfig) => {
        getPageList({
            page: current,
            page_count: pageSize,
        });
    }, []);

    const addPlatform = useCallback(() => {
        setModalVisible(true);
        setEditType("add");
    }, []);

    const hideModal = useCallback(() => {
        setModalVisible(false);
    }, []);

    const reload = useCallback(() => {
        getPageList();
    }, []);

    useEffect(() => {
        getPageList();
    }, []);

    return useMemo(() => {
        const { total, pageNumber, pageSize } = pageConfig;
        return (
            <PageHeaderWrapper>
                <Card
                    bordered={false}
                    className={[formStyles.formItem, formStyles.formCard].join(" ")}
                >
                    <SearchForm
                        ref={searchRef}
                        fieldList={fieldsList}
                        initialValues={initialValues}
                    >
                        <LoadingButton
                            type="primary"
                            className={btnStyles.btnGroup}
                            onClick={handleSearch}
                        >
                            搜索
                        </LoadingButton>
                    </SearchForm>
                </Card>
                <ProTable<ITableListItem>
                    rowKey="platform_id"
                    headerTitle="平台列表"
                    // actionRef={actionRef}
                    search={false}
                    loading={loading}
                    toolBarRender={() => [
                        <Button type="primary" onClick={addPlatform}>
                            <PlusOutlined /> 新建
                        </Button>,
                    ]}
                    columns={columns}
                    dataSource={dataSource}
                    onChange={onChange}
                    pagination={{
                        total: total,
                        current: pageNumber,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        pageSizeOptions: ["50", "100", "200"],
                    }}
                    options={{
                        density: true,
                        fullScreen: true,
                        reload: reload,
                        setting: true,
                    }}
                    scroll={{ y: 600 }}
                />
                <EditModal visible={editModalVisible} type={editType} hideModal={hideModal} />
            </PageHeaderWrapper>
        );
    }, [loading, dataSource, pageConfig, editModalVisible, editType]);
};

export default IndexPage;
