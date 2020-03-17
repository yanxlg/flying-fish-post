import React, { useMemo, useRef, useState } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import ProTable, { ProColumns, ActionType } from "@ant-design/pro-table";
import { Divider, Button, Dropdown, Menu, Card } from "antd";
import { SorterResult } from "antd/lib/table/interface";
import { PlusOutlined, DownOutlined } from "@ant-design/icons";
import SearchForm, { IFieldItem } from "@/components/SearchForm";
import formStyles from "@/styles/_form.less";
import btnStyles from "@/styles/_btn.less";
import LoadingButton from "@/components/LoadingButton";

const formConfig: IFieldItem[] = [
    {
        label: "任务ID",
        type: "input",
        name: "task_id",
    },
    {
        label: "任务SN",
        type: "number",
        name: "task_sn",
        formatter: "number",
    },
];

const ReturnPage: React.FC = () => {
    const [sorter, setSorter] = useState<string>("");
    const [createModalVisible, handleModalVisible] = useState<boolean>(false);
    const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
    const [stepFormValues, setStepFormValues] = useState({});
    const actionRef = useRef<ActionType>();
    const columns: ProColumns<TableListItem>[] = [
        {
            title: "规则名称",
            dataIndex: "name",
            rules: [
                {
                    required: true,
                    message: "规则名称为必填项",
                },
            ],
        },
        {
            title: "描述",
            dataIndex: "desc",
        },
        {
            title: "服务调用次数",
            dataIndex: "callNo",
            sorter: true,
            renderText: (val: string) => `${val} 万`,
        },
        {
            title: "状态",
            dataIndex: "status",
            valueEnum: {
                0: { text: "关闭", status: "Default" },
                1: { text: "运行中", status: "Processing" },
                2: { text: "已上线", status: "Success" },
                3: { text: "异常", status: "Error" },
            },
        },
        {
            title: "上次调度时间",
            dataIndex: "updatedAt",
            sorter: true,
        },
        {
            title: "操作",
            dataIndex: "option",
            render: (_, record) => (
                <>
                    <a
                        onClick={() => {
                            handleUpdateModalVisible(true);
                            setStepFormValues(record);
                        }}
                    >
                        配置
                    </a>
                    <Divider type="vertical" />
                    <a href="">订阅警报</a>
                </>
            ),
        },
    ];
    return useMemo(() => {
        return (
            <PageHeaderWrapper>
                <Card
                    bordered={false}
                    className={[formStyles.formItem, formStyles.formCard].join(" ")}
                >
                    <SearchForm fieldList={formConfig}>
                        <LoadingButton
                            className={btnStyles.btnGroup}
                            type="primary"
                            onClick={() => {}}
                        >
                            搜索
                        </LoadingButton>
                    </SearchForm>
                </Card>
                <ProTable<TableListItem>
                    search={false}
                    headerTitle="查询表格"
                    actionRef={actionRef}
                    rowKey="key"
                    onChange={(_, _filter, _sorter) => {
                        const sorterResult = _sorter as SorterResult<TableListItem>;
                        if (sorterResult.field) {
                            setSorter(`${sorterResult.field}_${sorterResult.order}`);
                        }
                    }}
                    params={{
                        sorter,
                    }}
                    toolBarRender={(action, { selectedRows }) => [
                        <Button type="primary" onClick={() => handleModalVisible(true)}>
                            <PlusOutlined /> 新建
                        </Button>,
                        selectedRows && selectedRows.length > 0 && (
                            <Dropdown
                                overlay={
                                    <Menu
                                        onClick={async e => {
                                            if (e.key === "remove") {
                                                action.reload();
                                            }
                                        }}
                                        selectedKeys={[]}
                                    >
                                        <Menu.Item key="remove">批量删除</Menu.Item>
                                        <Menu.Item key="approval">批量审批</Menu.Item>
                                    </Menu>
                                }
                            >
                                <Button>
                                    批量操作 <DownOutlined />
                                </Button>
                            </Dropdown>
                        ),
                    ]}
                    tableAlertRender={(selectedRowKeys, selectedRows) => (
                        <div>
                            已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项
                        </div>
                    )}
                    // request={params => {}}
                    columns={columns}
                    rowSelection={{}}
                />
            </PageHeaderWrapper>
        );
    }, []);
};

export default ReturnPage;
