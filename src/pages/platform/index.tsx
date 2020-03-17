import React, { useMemo, useRef, useState } from "react";
import { Divider, Button, Card } from "antd";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import ProTable, { ProColumns, ActionType } from "@ant-design/pro-table";
import { PlusOutlined, DownOutlined } from "@ant-design/icons";
import SearchForm, { IFieldItem } from "@/components/SearchForm";
import LoadingButton from "@/components/LoadingButton";

import { SorterResult } from "antd/lib/table/interface";
import { platformList, platformStatusList } from "@/enums/StatusEnum";

import formStyles from "@/styles/_form.less";
import btnStyles from "@/styles/_btn.less";

const fieldsList: IFieldItem[] = [
    {
        label: "上级平台",
        type: "select",
        name: "pid",
        className: "select-default",
        formatter: "number",
        optionList: [
            {
                name: "全部",
                value: "",
            },
        ].concat(
            platformList.map(({ id, name }) => {
                return {
                    name,
                    value: id,
                };
            }),
        ),
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
    // const [loading, setLoading] = useState(true);
    // const [pageNumber, setPageNumber] = useState(1);
    // const [pageSize, setPageSize] = useState(50);
    // const [dataSource, setDataSource] = useState<TableListItem[]>([]);
    // const [total, setTotal] = useState(0);
    // const [createModalVisible, handleModalVisible] = useState<boolean>(false);
    // const searchRef = useRef<SearchForm>(null);

    // const columns = useMemo(() => {
    //     return [
    //         {
    //             title: '上级平台',
    //             dataIndex: 'pid',
    //             align: 'center',
    //             width: 120,
    //         },
    //         {
    //             title: '平台ID',
    //             dataIndex: 'platform_id',
    //             align: 'center',
    //             width: 120,
    //         },
    //         {
    //             title: '平台名称',
    //             dataIndex: 'platform_name',
    //             align: 'center',
    //             width: 120,
    //         },
    //         {
    //             title: 'app_key',
    //             dataIndex: 'app_key',
    //             align: 'center',
    //             width: 120,
    //         },
    //         {
    //             title: 'app_secret',
    //             dataIndex: 'app_secret',
    //             align: 'center',
    //             width: 120,
    //         },
    //         {
    //             title: '创建时间',
    //             dataIndex: 'create_time',
    //             align: 'center',
    //             width: 120,
    //         },
    //         {
    //             title: '状态',
    //             dataIndex: 'status',
    //             align: 'center',
    //             width: 120,
    //         },
    //         {
    //             fixed: 'right',
    //             title: '操作',
    //             dataIndex: 'operation',
    //             align: 'center',
    //             width: 120,
    //             render: (_, row) => {
    //                 return <Button type="link">编辑</Button>;
    //             },
    //         },
    //     ];
    // }, ['']);

    // return useMemo(() => {
    //     return (
    //         <PageHeaderWrapper>
    //             <Card
    //                 bordered={false}
    //                 className={[formStyles.formItem, formStyles.formCard].join(" ")}
    //             >
    //                 <SearchForm fieldList={fieldsList} initialValues={initialValues}>
    //                     <LoadingButton
    //                         type="primary"
    //                         className={btnStyles.btnGroup}
    //                         onClick={handleSearch}
    //                     >
    //                         搜索
    //                     </LoadingButton>
    //                 </SearchForm>
    //             </Card>
    //             <ProTable<TableListItem>
    //                 search={false}
    //                 headerTitle="平台列表"
    //                 // actionRef={actionRef}
    //                 rowKey="key"
    //                 toolBarRender={(action, { selectedRows }) => [
    //                     <Button type="primary" onClick={() => handleModalVisible(true)}>
    //                         <PlusOutlined /> 新建
    //                     </Button>
    //                 ]}
    //                 columns={columns}
    //                 pagination={{

    //                 }}
    //             />
    //         </PageHeaderWrapper>
    //     )
    // }, [])
    return <div>111</div>;
};

export default IndexPage;
