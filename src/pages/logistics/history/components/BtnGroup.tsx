import React, { useMemo, useCallback } from "react";
import { Radio } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";

const BtnGroup: React.FC = props => {
    const handleStatusChange = useCallback((e: RadioChangeEvent) => {}, []);

    return useMemo(() => {
        return (
            // value="1"
            <Radio.Group defaultValue="1" onChange={handleStatusChange}>
                <Radio.Button value="1">全部</Radio.Button>
                <Radio.Button value="2">已完成</Radio.Button>
                <Radio.Button value="3">已关闭</Radio.Button>
                <Radio.Button value="4">已取消</Radio.Button>
            </Radio.Group>
        );
    }, []);
};

export default BtnGroup;
