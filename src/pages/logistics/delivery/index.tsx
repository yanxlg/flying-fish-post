import React, { useMemo } from "react";
import { Tabs, Card } from "antd";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import SearchForm, { IFieldItem } from "@/components/SearchForm";

import styles from "./delivery.less";
import formStyles from "@/styles/_form.less";

// <keyof IFormItems>
const fieldsList: IFieldItem[] = [
    {
        label: "平台状态",
        type: "shortcutSelect",
        name: "status",
        className: "select-default",
        formatter: "number",
        optionList: [
            {
                name: "1",
                value: "1",
            },
            {
                name: "2",
                value: "2",
            },
        ],
    },
];

const { TabPane } = Tabs;

const Delivery: React.FC = props => {
    return useMemo(() => {
        return (
            <PageHeaderWrapper>
                <Tabs type="card" className={styles.tabs}>
                    {/* onChange={callback} */}
                    <TabPane tab="3PL订单-非平邮" key="1">
                        <Card
                            bordered={false}
                            className={[formStyles.formItem, formStyles.formCard].join(" ")}
                        >
                            <SearchForm
                                // ref={searchRef}
                                fieldList={fieldsList}
                                // initialValues={initialValues}
                            >
                                {/* <LoadingButton
                                    type="primary"
                                    className={btnStyles.btnGroup}
                                    onClick={handleSearch}
                                >
                                    搜索
                                </LoadingButton> */}
                            </SearchForm>
                        </Card>
                    </TabPane>
                    <TabPane tab="4PL订单" key="2">
                        Content of Tab Pane 2
                    </TabPane>
                    <TabPane tab="海外仓订单" key="3">
                        Content of Tab Pane 3
                    </TabPane>
                </Tabs>
            </PageHeaderWrapper>
        );
    }, []);
};

export default Delivery;
