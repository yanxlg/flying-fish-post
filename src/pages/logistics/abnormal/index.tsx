import React, { useMemo } from "react";
import { Tabs } from "antd";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import Order3PL from "./components/Order3PL";

import styles from "./index.less";

const { TabPane } = Tabs;

const LogisticsAbnormal: React.FC = props => {
    return useMemo(() => {
        return (
            <PageHeaderWrapper>
                <Tabs type="card" className={styles.tabs}>
                    <TabPane tab="3PL订单-非平邮" key="1">
                        <div className={styles.wrap}>
                            <Order3PL />
                        </div>
                    </TabPane>
                    <TabPane tab="4PL订单" key="2">
                        <div className={styles.wrap}>
                            <Order3PL />
                        </div>
                    </TabPane>
                    <TabPane tab="海外仓订单" key="3">
                        <div className={styles.wrap}>
                            <Order3PL />
                        </div>
                    </TabPane>
                </Tabs>
            </PageHeaderWrapper>
        );
    }, []);
};

export default LogisticsAbnormal;
