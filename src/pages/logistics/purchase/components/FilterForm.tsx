import React, {
    useMemo,
    forwardRef,
    useImperativeHandle,
    useRef,
    ForwardRefRenderFunction,
} from "react";
import SearchForm, { FormField, SearchFormRef } from "@/components/SearchForm";

import LoadingButton from "@/components/LoadingButton";
import { queryOptionList } from "@/services/logistics/delivery";

import styles from "../index.less";
import formStyles from "@/components/SearchForm/_form.less";

const queryOptions = queryOptionList();

// <keyof IFormItems>
const fieldsList: FormField[] = [
    {
        label: <span>&emsp;单&emsp;&emsp;号&emsp;</span>,
        type: "input",
        name: "shipping_order_sn",
        className: styles.defaultInput,
        formItemClassName: formStyles.formItem,
        formatter: "number",
        placeholder: "物流单号/运单号/平台单号/关联运单",
    },
    {
        label: <span>&emsp;仓&emsp;&emsp;库&emsp;</span>,
        type: "select",
        isShortcut: true,
        mode: "multiple",
        name: "a2",
        className: styles.defaultInput,
        formItemClassName: formStyles.formItem,
        placeholder: "选择物流渠道",
        optionList: () => {
            return queryOptions.then(({ data: { warehouse_list = [] } }) => {
                return warehouse_list;
            });
        },
    },
    {
        label: <span>&emsp;物流渠道&emsp;</span>,
        type: "select",
        isShortcut: true,
        mode: "multiple",
        name: "a3",
        className: styles.defaultInput,
        formItemClassName: formStyles.formItem,
        placeholder: "选择物流渠道",
        optionList: () => {
            return queryOptions.then(({ data: { warehouse_list = [] } }) => {
                return warehouse_list;
            });
        },
    },
    {
        label: <span>商家标记发货</span>,
        type: "select",
        name: "a4",
        className: styles.defaultInput,
        formItemClassName: formStyles.formItem,
        optionList: () => {
            return queryOptions.then(({ data: { warehouse_list = [] } }) => {
                return warehouse_list;
            });
        },
    },
    {
        label: <span>&emsp;创建时间&emsp;</span>,
        type: "dateRanger",
        formItemClassName: formStyles.formItem,
        name: ["reservation_start", "reservation_end"],
        formatter: ["start_date", "end_date"],
    },
    {
        label: <span>&emsp;入库时间&emsp;</span>,
        type: "dateRanger",
        formItemClassName: formStyles.formItem,
        name: ["delivered_start", "delivered_end"],
        formatter: ["start_date", "end_date"],
    },
];

export interface FilterFormRef {
    getFieldsValue: any;
}

declare interface IProps {
    getPageData(): Promise<void>;
}

const FilterForm: ForwardRefRenderFunction<FilterFormRef, IProps> = (props: IProps, ref) => {
    // console.log('1111',props);
    const searchRef = useRef<SearchFormRef>(null);
    // getFieldsValue: ()
    useImperativeHandle(ref, () => ({
        getFieldsValue: () => {
            return searchRef.current!.getFieldsValue();
        },
    }));

    return useMemo(() => {
        return (
            <SearchForm ref={searchRef} fieldList={fieldsList}>
                <LoadingButton
                    type="primary"
                    className={formStyles.formItem}
                    onClick={() => props.getPageData()}
                >
                    搜索
                </LoadingButton>
            </SearchForm>
        );
    }, [props]);
};

export default forwardRef(FilterForm);
