import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { Button, Card } from "antd";
import { JsonForm } from "react-components";
import { FormField, JsonFormRef } from "react-components/es/JsonForm";
import formStyles from "react-components/es/JsonForm/_form.less";
import { LoadingButton } from "react-components";
import {
    queryChannelsList,
    queryChannelsOptionsList,
    setChannelActiveState,
    removeChannel,
    exportChannelsList,
} from "@/services/supplier";
import { IChannelsRequestForm, IChannel, IChannelsOptionListResponse } from "@/interface/ISupplier";
import EditModal from "@/pages/supplier/components/channels/EditModal";
import { PlusOutlined } from "@ant-design/icons";
import { IBoolean, IResponse } from "@/interface/IGlobal";
import OptionItem from "../../components/OptionItem";
import { bool, reverseBool } from "@/utils/utils";
import { SettlementModes, SettlementModesCode } from "@/config/dictionaries/Supplier";
import { IWrappedProColumns, useFilterTable, useList } from "@/utils/hooks";
import { PopConfirmLoadingButton } from "react-components";
import ProTable from "@/components/OptimizeProTable";

export const queryOptions = (() => {
    let syncPromise: Promise<IResponse<IChannelsOptionListResponse>>;
    return () => {
        if (syncPromise) {
            return syncPromise;
        } else {
            syncPromise = queryChannelsOptionsList();
        }
        return syncPromise;
    };
})();

const formConfig: FormField<keyof IChannelsRequestForm>[] = [
    {
        label: "渠道",
        type: "input",
        name: "keyword",
        placeholder: "编码/名称/物流商/平台",
        formItemClassName: formStyles.formItem,
    },
];

const ChannelsPage: React.FC = () => {
    const searchRef = useRef<JsonFormRef>(null);
    const {
        loading,
        pageNumber,
        pageSize,
        dataSource,
        total,
        onSearch,
        onReload,
        onChange,
    } = useList({
        queryList: queryChannelsList,
        formRef: searchRef,
    });

    const [visible, setVisible] = useState<boolean | string>(false);

    const exportTable = useCallback(() => {
        const query = searchRef.current!.getFieldsValue();
        return exportChannelsList(query);
    }, []);

    const addChannel = useCallback(() => {
        setVisible(true);
    }, []);

    const onCancel = useCallback(() => {
        setVisible(false);
    }, []);

    // componentDidMount
    useEffect(() => {
        queryOptions(); // 获取分类
    }, []);

    const editChannel = useCallback((id: string) => {
        setVisible(id);
    }, []);

    const primaryColumns = useMemo<IWrappedProColumns<IChannel>[]>(() => {
        return [
            {
                title: "渠道编码",
                dataIndex: "id",
                align: "center",
                width: "150px",
            },
            {
                title: "渠道名称",
                dataIndex: "name",
                align: "center",
                width: "150px",
                filterType: "input",
            },
            {
                title: "渠道显示名称",
                dataIndex: "show_name",
                align: "center",
                width: "150px",
            },
            {
                title: "渠道类型",
                dataIndex: "type",
                align: "center",
                width: "150px",
                render: (value: any) => {
                    return (
                        <OptionItem syncCallback={queryOptions} type="type_list" value={value} />
                    );
                },
            },
            {
                title: "服务类型",
                dataIndex: "service_type",
                align: "center",
                width: "150px",
                render: (value: any) => {
                    return (
                        <OptionItem
                            syncCallback={queryOptions}
                            type="service_type_list"
                            value={value}
                        />
                    );
                },
            },
            {
                title: "服务国家",
                dataIndex: "service_country",
                align: "center",
                width: "150px",
                render: (value: any) => {
                    return (
                        <OptionItem
                            syncCallback={queryOptions}
                            type="service_country_list"
                            value={value}
                        />
                    );
                },
            },
            {
                title: "平台",
                dataIndex: "platform",
                align: "center",
                width: "250px",
                render: (value: any) => {
                    return (
                        <OptionItem
                            syncCallback={queryOptions}
                            type="platform_list"
                            value={value}
                        />
                    );
                },
            },
            {
                title: "结算方式",
                dataIndex: "settlement_mode",
                align: "center",
                width: "150px",
                render: _ => SettlementModes[_ as SettlementModesCode],
            },
            {
                title: "是否启用",
                dataIndex: "active",
                align: "center",
                width: "150px",
                render: _ => bool(_ as IBoolean, "已启用", "未启用"),
            },
            {
                title: "物流商",
                dataIndex: "logistic",
                align: "center",
                width: "150px",
                render: (value: any) => {
                    return (
                        <OptionItem
                            syncCallback={queryOptions}
                            type="logistic_list"
                            value={value}
                        />
                    );
                },
            },
            {
                title: "渠道Code",
                dataIndex: "channel_code",
                align: "center",
                width: "150px",
            },
            {
                title: "cpcode",
                dataIndex: "cpcode",
                align: "center",
                width: "150px",
            },
            {
                title: "app_secret",
                dataIndex: "app_secret",
                align: "center",
                width: "150px",
            },
            {
                title: "物流地址",
                dataIndex: "logistic_address",
                align: "center",
                width: "150px",
            },
            {
                title: "创建时间",
                dataIndex: "create_time",
                align: "center",
                width: "200px",
            },
            {
                title: "操作",
                dataIndex: "opt",
                align: "center",
                width: "180px",
                fixed: "right",
                render: (_, record) => {
                    const active = record.active;
                    return (
                        <>
                            <PopConfirmLoadingButton
                                popConfirmProps={{
                                    title: bool(
                                        active,
                                        "确定要停用该渠道吗？",
                                        "确定要启用该渠道吗",
                                    ),
                                    onConfirm: () =>
                                        setChannelActiveState(record.id, reverseBool(active)),
                                }}
                                buttonProps={{
                                    type: "link",
                                    size: "small",
                                    children: bool(active, "停用", "启用"),
                                }}
                            />
                            <Button type="link" onClick={() => editChannel(record.id)} size="small">
                                编辑
                            </Button>
                            <PopConfirmLoadingButton
                                popConfirmProps={{
                                    title: "确定要删除该渠道吗？",
                                    onConfirm: () => removeChannel(record.id),
                                    placement: "topRight",
                                }}
                                buttonProps={{
                                    type: "link",
                                    children: "删除",
                                    size: "small",
                                }}
                            />
                        </>
                    );
                },
            },
        ];
    }, []);
    const columns = useFilterTable<IChannel>(primaryColumns);

    return (
        <>
            {useMemo(() => {
                return (
                    <PageHeaderWrapper>
                        <Card
                            bordered={false}
                            className={[formStyles.formItem, formStyles.formCard].join(" ")}
                        >
                            <JsonForm
                                enableCollapse={false}
                                fieldList={formConfig}
                                ref={searchRef}
                                initialValues={{
                                    logistics_mode: "",
                                    return_type: "",
                                    return_platform: "",
                                }}
                            >
                                <LoadingButton
                                    className={formStyles.formItem}
                                    type="primary"
                                    onClick={onSearch}
                                >
                                    搜索
                                </LoadingButton>
                            </JsonForm>
                        </Card>
                        <ProTable<IChannel>
                            className={formStyles.formItem}
                            headerTitle="查询表格"
                            rowKey="id"
                            pagination={{
                                total: total,
                                current: pageNumber,
                                pageSize: pageSize,
                                showSizeChanger: true,
                                pageSizeOptions: ["50", "100", "200"],
                            }}
                            toolBarRender={() => [
                                <Button type="primary" onClick={addChannel}>
                                    <PlusOutlined />
                                    新建
                                </Button>,
                                <LoadingButton type="primary" onClick={exportTable}>
                                    批量导出
                                </LoadingButton>,
                            ]}
                            columns={columns}
                            dataSource={dataSource}
                            loading={loading}
                            onChange={onChange}
                            options={{
                                density: true,
                                fullScreen: true,
                                reload: onReload,
                                setting: true,
                            }}
                        />
                    </PageHeaderWrapper>
                );
            }, [loading])}
            {useMemo(() => {
                return (
                    <EditModal visible={visible} onCancel={onCancel} queryOptions={queryOptions} />
                );
            }, [visible])}
        </>
    );
};

export default ChannelsPage;
