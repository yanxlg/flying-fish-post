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
        label: <span>单&emsp;&emsp;号</span>,
        type: "input",
        name: "shipping_order_sn",
        className: styles.defaultInput,
        formItemClassName: formStyles.formItem,
        formatter: "number",
        placeholder: "物流单号/运单号/平台单号/关联运单",
    },
    {
        label: <span>状&emsp;&emsp;态</span>,
        type: "select",
        name: "warehouse_code",
        className: styles.defaultInput,
        formItemClassName: formStyles.formItem,
        optionList: () => {
            return queryOptions.then(({ data: { warehouse_list = [] } }) => {
                return warehouse_list;
            });
        },
    },
    {
        label: <span>物流渠道</span>,
        type: "select",
        isShortcut: true,
        mode: 'multiple',
        name: "warehouse_code",
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
        label: <span>平&emsp;&emsp;台</span>,
        type: "select",
        isShortcut: true,
        mode: 'multiple',
        name: "platform_id",
        className: styles.defaultInput,
        formItemClassName: formStyles.formItem,
        placeholder: "选择平台",
        optionList: () => {
            return queryOptions.then(({ data: { platform_list = [] } }) => {
                return platform_list;
            });
        },
    },
    {
        label: "创建时间",
        type: "dateRanger",
        formItemClassName: formStyles.formItem,
        name: ["reservation_start", "reservation_end"],
        formatter: ["start_date", "end_date"],
    },
    {
        label: "处理时间",
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
