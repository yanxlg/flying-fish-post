import React, { useMemo, useCallback } from "react";
import { Radio } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";

const BtnGroup: React.FC = props => {
    const handleStatusChange = useCallback((e: RadioChangeEvent) => {}, []);

    return useMemo(() => {
        return (
            // value="1"
            <Radio.Group defaultValue="1" onChange={handleStatusChange}>
                <Radio.Button value="1">全部(0)</Radio.Button>
                <Radio.Button value="2">待揽收(0)</Radio.Button>
                <Radio.Button value="3">已揽收(0)</Radio.Button>
                <Radio.Button value="4">已入库(0)</Radio.Button>
                <Radio.Button value="5">已出库(0)</Radio.Button>
                <Radio.Button value="6">已起运(0)</Radio.Button>
                <Radio.Button value="7">已抵达(0)</Radio.Button>
                <Radio.Button value="8">清关完成(0)</Radio.Button>
                <Radio.Button value="9">派送中(0)</Radio.Button>
                <Radio.Button value="10">已妥投(0)</Radio.Button>
            </Radio.Group>
        );
    }, []);
};

export default BtnGroup;
