import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { Button, Card } from "antd";
import SearchForm, { FormField, SearchFormRef } from "@/components/SearchForm";
import formStyles from "@/components/SearchForm/_form.less";
import btnStyles from "@/styles/_btn.less";
import LoadingButton from "@/components/LoadingButton";
import {
    queryOffersList,
    queryOffersOptionsList,
    exportOffersList,
    downloadOfferTemplate,
    uploadOffer,
} from "@/services/supplier";
import { IOffer, IOffersOptionListResponse, IOffersRequestForm } from "@/interface/ISupplier";
import { DownloadOutlined } from "@ant-design/icons";
import { IResponse } from "@/interface/IGlobal";
import OptionItem from "../../components/OptionItem";
import { IWrappedProColumns, useFilterTable, useList, useModal } from "@/utils/hooks";
import UploadLoadingBtn from "@/components/UploadLoadingBtn";
import OfferModal from "./components/OfferModal";
import ProTable from "@/components/OptimizeProTable";

export const queryOptions = (() => {
    let syncPromise: Promise<IResponse<IOffersOptionListResponse>>;
    return () => {
        if (syncPromise) {
            return syncPromise;
        } else {
            syncPromise = queryOffersOptionsList();
        }
        return syncPromise;
    };
})();

const formConfig: FormField<keyof IOffersRequestForm>[] = [
    {
        label: "物流商",
        type: "select",
        name: "logistic",
        formatter: "number",
        formItemClassName: formStyles.formItem,
        syncDefaultOption: {
            name: "全部",
            value: "",
        },
        optionList: () => {
            return queryOptions().then(({ data: { logistic_list = [] } }) => {
                return logistic_list;
            });
        },
    },
    {
        label: "快递渠道",
        type: "select",
        name: "channel",
        formItemClassName: formStyles.formItem,
        formatter: "number",
        syncDefaultOption: {
            name: "全部",
            value: "",
        },
        optionList: () => {
            return queryOptions().then(({ data: { channel_list = [] } }) => {
                return channel_list;
            });
        },
    },
    {
        label: <span>国&emsp;&emsp;家</span>,
        type: "select",
        name: "country",
        formItemClassName: formStyles.formItem,
        formatter: "number",
        syncDefaultOption: {
            name: "全部",
            value: "",
        },
        optionList: () => {
            return queryOptions().then(({ data: { country_list = [] } }) => {
                return country_list;
            });
        },
    },
    {
        label: "报价模式",
        type: "select",
        name: "offer_mode",
        formItemClassName: formStyles.formItem,
        formatter: "number",
        syncDefaultOption: {
            name: "全部",
            value: "",
        },
        optionList: () => {
            return queryOptions().then(({ data: { offer_mode_list = [] } }) => {
                return offer_mode_list;
            });
        },
    },
    {
        label: "发件区域",
        type: "select",
        name: "hair_area",
        formItemClassName: formStyles.formItem,
        formatter: "number",
        syncDefaultOption: {
            name: "全部",
            value: "",
        },
        optionList: () => {
            return queryOptions().then(({ data: { hair_area_list = [] } }) => {
                return hair_area_list;
            });
        },
    },
];

const ChannelsPage: React.FC = () => {
    const searchRef = useRef<SearchFormRef>(null);
    const {
        loading,
        pageNumber,
        pageSize,
        dataSource,
        total,
        onSearch,
        onReload,
        onChange,
    } = useList({ formRef: searchRef, queryList: queryOffersList });

    const { visible, onClose, setVisibleProps } = useModal();

    const exportTable = useCallback(() => {
        const query = searchRef.current!.getFieldsValue();
        return exportOffersList(query);
    }, []);

    // componentDidMount
    useEffect(() => {
        queryOptions(); // 获取分类
    }, []);

    const primaryColumns = useMemo<IWrappedProColumns<IOffer>[]>(() => {
        return [
            {
                title: "物流商",
                dataIndex: "logistic",
                align: "center",
                width: "150px",
                filterType: "input",
                sorter: true,
                render: (value: any, record, index, filterText) => {
                    return (
                        <OptionItem
                            syncCallback={queryOptions}
                            type="logistic_list"
                            value={value}
                            filter={true}
                            filterText={filterText}
                            record={record}
                            recordKey="logistic"
                        />
                    );
                },
            },
            {
                title: "快递渠道",
                dataIndex: "channel",
                align: "center",
                width: "150px",
                filterType: "input",
                sorter: true,
                render: (value: any, record, index, filterText) => {
                    return (
                        <OptionItem
                            syncCallback={queryOptions}
                            type="channel_list"
                            value={value}
                            filter={true}
                            filterText={filterText}
                            record={record}
                            recordKey="channel"
                        />
                    );
                },
            },
            {
                title: "国家",
                dataIndex: "country",
                align: "center",
                width: "150px",
                filterType: "input",
                sorter: true,
                render: (value: any, record, index, filterText) => {
                    return (
                        <OptionItem
                            syncCallback={queryOptions}
                            type="country_list"
                            value={value}
                            filter={true}
                            filterText={filterText}
                            record={record}
                            recordKey="country"
                        />
                    );
                },
            },
            {
                title: "目的国区域",
                dataIndex: "target_country",
                align: "center",
                width: "150px",
                filterType: "input",
                sorter: true,
            },
            {
                title: "发件区域",
                dataIndex: "hair_area",
                align: "center",
                width: "150px",
                filterType: "input",
                sorter: true,
                render: (value: any, record, index, filterText) => {
                    return (
                        <OptionItem
                            syncCallback={queryOptions}
                            type="hair_area_list"
                            value={value}
                            filter={true}
                            filterText={filterText}
                            record={record}
                            recordKey="hair_area"
                        />
                    );
                },
            },
            {
                title: "报价模式",
                dataIndex: "offer_mode",
                align: "center",
                width: "150px",
                filterType: "input",
                sorter: true,
                render: (value: any, record, index, filterText) => {
                    return (
                        <OptionItem
                            syncCallback={queryOptions}
                            type="offer_mode_list"
                            value={value}
                            filter={true}
                            filterText={filterText}
                            record={record}
                            recordKey="offer_mode"
                        />
                    );
                },
            },
            {
                title: "上传人",
                dataIndex: "uploader",
                align: "center",
                width: "150px",
                filterType: "input",
                sorter: true,
            },
            {
                title: "上传时间",
                dataIndex: "upload_time",
                align: "center",
                width: "250px",
            },
            {
                title: "生效日期",
                dataIndex: "active_time",
                align: "center",
                width: "150px",
            },
            {
                title: "操作",
                dataIndex: "opt",
                align: "center",
                width: "120px",
                fixed: "right",
                render: (_, record) => {
                    return (
                        <Button type="link" size="small" onClick={() => setVisibleProps(record.id)}>
                            查看
                        </Button>
                    );
                },
            },
        ];
    }, []);
    const columns = useFilterTable<IOffer>(primaryColumns);

    return (
        <>
            {useMemo(() => {
                return (
                    <PageHeaderWrapper>
                        <Card
                            bordered={false}
                            className={[formStyles.formItem, formStyles.formCard].join(" ")}
                        >
                            <SearchForm
                                fieldList={formConfig}
                                enableCollapse={false}
                                ref={searchRef}
                                initialValues={{
                                    logistic: "",
                                    country: "",
                                    channel: "",
                                    offer_mode: "",
                                    hair_area: "",
                                }}
                            >
                                <LoadingButton
                                    className={formStyles.formItem}
                                    type="primary"
                                    onClick={onSearch}
                                >
                                    搜索
                                </LoadingButton>
                            </SearchForm>
                        </Card>
                        <ProTable<IOffer>
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
                                <UploadLoadingBtn
                                    beforeUpload={uploadOffer}
                                    multiple={false}
                                    showUploadList={false}
                                />,
                                <LoadingButton type="primary" onClick={downloadOfferTemplate}>
                                    <DownloadOutlined />
                                    下载模版
                                </LoadingButton>,
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
                return <OfferModal visible={visible} onCancel={onClose} />;
            }, [visible])}
        </>
    );
};

export default ChannelsPage;
