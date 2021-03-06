import React from "react";
import { InputNumber } from "antd";
import { InputNumberProps } from "antd/lib/input-number";
import { positiveIntFormatter, intFormatter } from "@/components/Input/RichInput";

declare interface IIntegerInputProps extends InputNumberProps {
    positive?: boolean; // 正整数
}

const IntegerInput: React.FC<IIntegerInputProps> = ({ positive, ...props }) => {
    return (
        <InputNumber
            {...props}
            min={0}
            formatter={positive ? positiveIntFormatter : intFormatter}
        />
    );
};

export default IntegerInput;
