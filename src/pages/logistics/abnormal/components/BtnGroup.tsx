import React, { useMemo, useCallback } from "react";
import { Radio } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";

const BtnGroup: React.FC = props => {
    const handleStatusChange = useCallback((e: RadioChangeEvent) => {}, []);

    return useMemo(() => {
        return (
            // value="1"
            <Radio.Group defaultValue="1" onChange={handleStatusChange}>
                <Radio.Button value="1">揽收异常(0)</Radio.Button>
                <Radio.Button value="2">离港异常(0)</Radio.Button>
                <Radio.Button value="3">清关异常(0)</Radio.Button>
                <Radio.Button value="4">派送异常(0)</Radio.Button>
                <Radio.Button value="5">已处理(0)</Radio.Button>
            </Radio.Group>
        );
    }, []);
};

export default BtnGroup;
