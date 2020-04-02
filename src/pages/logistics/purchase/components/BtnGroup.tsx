import React, { useMemo, useCallback } from "react";
import { Radio } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";

const BtnGroup: React.FC = props => {
    const handleStatusChange = useCallback((e: RadioChangeEvent) => {}, []);

    return useMemo(() => {
        return (
            // value="1"
            <Radio.Group defaultValue="1" onChange={handleStatusChange}>
                <Radio.Button value="1">全部()</Radio.Button>
                <Radio.Button value="2">异常(0)</Radio.Button>
                <Radio.Button value="3">待揽收(0)</Radio.Button>
                <Radio.Button value="4">已揽收(0)</Radio.Button>
                <Radio.Button value="5">已签收(0)</Radio.Button>
                <Radio.Button value="6">已入库(0)</Radio.Button>
                <Radio.Button value="7">商家自寄(0)</Radio.Button>
            </Radio.Group>
        );
    }, []);
};

export default BtnGroup;
