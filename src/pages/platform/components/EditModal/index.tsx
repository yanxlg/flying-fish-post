import React, { useMemo, useCallback, useRef, useState } from "react";
import { Modal } from "antd";
import { JsonForm } from "react-components";
import SearchForm, { FormField, SearchFormRef } from "@/components/SearchForm";
import { IEditFormItems } from "@/interface/IPlatform";
import { platformStatusList } from "@/enums/StatusEnum";
import { editPlatform } from "@/services/platform";

import styles from "./index.less";

const fieldsList: FormField<keyof IEditFormItems>[] = [
    {
        label: "上级平台",
        type: "select",
        name: "pid",
        className: styles.input,
        formatter: "number",
        optionList: [
            {
                name: "一级平台无需设置",
                value: "",
            },
        ],
    },
    {
        label: "平台名称",
        type: "input",
        name: "platform_name",
        className: styles.input,
        placeholder: "请输入平台名称",
    },
    {
        label: "平台状态",
        type: "select",
        name: "status",
        className: styles.input,
        formatter: "number",
        optionList: [
            {
                name: "全部",
                value: "",
            },
            ...platformStatusList.map(({ id, name }) => {
                return {
                    name,
                    value: id,
                };
            }),
        ],
    },
    // {
    //     label: "平台描述",
    //     type: "textarea",
    //     name: "description",
    //     className: "",
    //     placeholder: "请输入平台描述",
    // },
];

const initialValues = {
    pid: "",
    status: "",
};
declare interface IProps {
    visible: boolean;
    type: "add" | "edit";
    hideModal(): void;
}

const EditModal: React.FC<IProps> = props => {
    const [loading, setLoading] = useState<boolean>(false);
    const searchRef = useRef<SearchFormRef>(null);

    const handleOk = useCallback(() => {
        const formValues = searchRef.current!.getFieldsValue();
        setLoading(true);
        editPlatform(formValues)
            .then(res => {
                // console.log(res);
                props.hideModal();
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return useMemo(() => {
        const { visible, type, hideModal } = props;
        const title = type === "add" ? "新增平台" : "编辑平台信息";
        return (
            <Modal
                title={title}
                visible={visible}
                okText="确定"
                cancelText="取消"
                onOk={handleOk}
                onCancel={hideModal}
                confirmLoading={loading}
            >
                <SearchForm
                    ref={searchRef}
                    layout="horizontal"
                    fieldList={fieldsList}
                    initialValues={initialValues}
                />
            </Modal>
        );
    }, [props, loading]);
};

export default EditModal;
