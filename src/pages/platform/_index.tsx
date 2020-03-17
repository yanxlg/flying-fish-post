import React, { RefObject } from "react";
import { Button } from "antd";
import { ColumnProps } from "antd/es/table";
import SearchForm, { IFieldItem } from "@/components/SearchForm";
import { FitTable } from "@/components/FitTable";
import EditModal from "./components/EditModal";

import { platformList, platformStatusList } from "@/enums/StatusEnum";
import { getPlatformList } from "@/services/platform";

declare interface IPlatformItem {
    pid: string;
    platform_id: string;
    platform_name: string;
    app_key: string;
    app_secret: string;
    create_time: string;
    status: string;
}

interface IState {
    loading: boolean;
    editModalStatus: boolean;
    type: "add" | "edit";
    platformList: IPlatformItem[];
}

class Index extends React.PureComponent<{}, IState> {
    private formRef: RefObject<SearchForm> = React.createRef();
    private fieldsList: IFieldItem[] = [
        {
            label: "上级平台",
            type: "select",
            name: "pid",
            className: "select-default",
            formItemClassName: "form-item",
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
            formItemClassName: "form-item",
            placeholder: "请输入平台id",
        },
        {
            label: "平台名称",
            type: "input",
            name: "platform_name",
            className: "input-default",
            formItemClassName: "form-item",
            placeholder: "请输入平台名称",
        },
        {
            label: "平台状态",
            type: "select",
            name: "status",
            className: "select-default",
            formItemClassName: "form-item",
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
    private initialValues = {
        pid: "",
        status: "",
    };
    private columns: ColumnProps<IPlatformItem>[] = [
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
            render: (val: undefined, row: IPlatformItem) => {
                return <Button type="link">编辑</Button>;
            },
        },
    ];
    constructor(props: {}) {
        super(props);
        this.state = {
            loading: false,
            editModalStatus: false,
            type: "add",
            platformList: [],
        };
    }

    componentDidMount() {
        this.getPlatformList();
    }

    private getPlatformList() {
        this.setState({
            loading: true,
        });
        getPlatformList({
            page: 1,
            page_count: 50,
        })
            .then(res => {
                console.log("getPlatformList", res);
                const { list } = res.data;
                this.setState({
                    platformList: list,
                });
            })
            .finally(() => {
                this.setState({
                    loading: false,
                });
            });
    }

    private addPlatform = () => {
        this.setState({
            editModalStatus: true,
            type: "add",
        });
    };

    private hideModal = () => {
        this.setState({
            editModalStatus: false,
        });
    };

    render() {
        const { loading, editModalStatus, type, platformList } = this.state;
        return (
            <>
                <SearchForm
                    ref={this.formRef}
                    fieldList={this.fieldsList}
                    initialValues={this.initialValues}
                >
                    <Button className="btn-group" type="primary" loading={loading}>
                        搜索
                    </Button>
                    <Button className="btn-group" type="primary" onClick={this.addPlatform}>
                        新增
                    </Button>
                </SearchForm>
                <FitTable
                    bordered
                    pagination={false}
                    loading={loading}
                    columns={this.columns}
                    dataSource={platformList}
                />
                <EditModal type={type} visible={editModalStatus} hideModal={this.hideModal} />
            </>
        );
    }
}

export default Index;
