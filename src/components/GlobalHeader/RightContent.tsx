import React from "react";

import styles from "./_index.less";
import { Breadcrumb, Button } from "antd";
import { genBreadcrumbProps } from "@ant-design/pro-layout/es/utils/getBreadcrumbProps";
import { BasicLayoutProps, getMenuData, MenuDataItem } from "@ant-design/pro-layout";

export type SiderTheme = "light" | "dark";
export interface GlobalHeaderRightProps extends BasicLayoutProps {
    theme?: SiderTheme;
    layout?: "sidemenu" | "topmenu";
    breadcrumb?: {
        [path: string]: MenuDataItem;
    };
}

const GlobalHeaderRight: React.FC<GlobalHeaderRightProps> = props => {
    return (
        <div>
            <div className={styles.right}>
                用户名，
                <Button
                    type="link"
                    className="padding-none"
                    onClick={() => {
                        // alert('退出');
                    }}
                >
                    退出
                </Button>
            </div>
        </div>
    );
};

export default GlobalHeaderRight;
