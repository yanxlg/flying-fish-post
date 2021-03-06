import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Collapse } from "antd";
import "./index.less";
import CollapsePanel from "antd/es/collapse/CollapsePanel";

const { Panel } = Collapse;

declare interface ICollapsePopOverProps {
    collapse: boolean;
}

const Index: React.FC<ICollapsePopOverProps> = ({ collapse, children }) => {
    const [x, setX] = useState<number>();
    const ref = useRef<CollapsePanel>(null);

    useEffect(() => {
        const container = ReactDOM.findDOMNode(ref.current) as HTMLDivElement;
        const onClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const rect = target.getBoundingClientRect();
            const rect1 = container!.getBoundingClientRect();
            setX(rect.x - rect1.x + rect.width / 2);
        };
        window.addEventListener("mousedown", onClick);
        return () => {
            window.removeEventListener("mousedown", onClick);
        };
    }, []);

    return useMemo(() => {
        return (
            <Collapse activeKey={collapse ? "1" : undefined} bordered={false}>
                <Panel
                    forceRender={true}
                    ref={ref}
                    header={null}
                    key="1"
                    showArrow={false}
                    className="collapse-pannel"
                >
                    <div className="ant-popover-arrow collapse-arrow" style={{ left: x }} />
                    {children}
                </Panel>
            </Collapse>
        );
    }, [collapse, children]);
};

export default Index;
