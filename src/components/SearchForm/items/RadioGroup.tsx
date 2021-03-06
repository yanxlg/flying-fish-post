import React, { useMemo } from "react";
import { Form, Radio } from "antd";
import { CustomFormProps, FormItemName } from "@/components/SearchForm";
import { FormItemLabelProps } from "antd/es/form/FormItemLabel";
import { FormInstance, Rule } from "antd/es/form";
import { RadioGroupProps as AntdRadioGroupProps } from "antd/lib/radio/interface";

export type RadioGroupType = "radioGroup";
const typeList = ["radioGroup"];

export type RadioGroupProps<T = string> = FormItemLabelProps &
    CustomFormProps & {
        form: FormInstance;
        type: RadioGroupType;
        className?: string;
        formItemClassName?: string;
        onChange?: (name: FormItemName<T>, form: FormInstance) => void; // change监听，支持外部执行表单操作，可以实现关联筛选，重置等操作
        name: FormItemName<T>;
        formatter?: undefined;
        rules?: Rule[];
    } & AntdRadioGroupProps;

const FormRadioGroup = (props: RadioGroupProps) => {
    const {
        name,
        label,
        labelClassName,
        formItemClassName,
        className,
        onChange,
        form,
        rules,
        ..._props
    } = props;

    const eventProps = useMemo(() => {
        return onChange
            ? {
                  onChange: () => {
                      onChange(name as FormItemName, form);
                  },
              }
            : {};
    }, []);

    return (
        <Form.Item
            name={name}
            label={label ? <span className={labelClassName}>{label}</span> : undefined}
            className={formItemClassName}
            rules={rules}
        >
            <Radio.Group className={className} {...eventProps} {..._props} />
        </Form.Item>
    );
};

FormRadioGroup.typeList = typeList;

export default FormRadioGroup;
