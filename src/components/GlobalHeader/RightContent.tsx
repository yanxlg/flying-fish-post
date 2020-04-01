import React, { useEffect, useState } from "react";

import styles from "./_index.less";
import { Button, Menu } from "antd";
import { BasicLayoutProps, MenuDataItem } from "@ant-design/pro-layout";
import formStyles from "react-components/es/JsonForm/_form.less";
import { debounce } from "lodash";

export type SiderTheme = "light" | "dark";
export interface GlobalHeaderRightProps extends BasicLayoutProps {
    theme?: SiderTheme;
    layout?: "sidemenu" | "topmenu";
    breadcrumb?: {
        [path: string]: MenuDataItem;
    };
}

const GlobalHeaderRight: React.FC<GlobalHeaderRightProps> = props => {
    const [small, setSmall] = useState(document.body.offsetWidth < 768);
    useEffect(() => {
        const onResize = debounce(() => {
            setSmall(document.body.offsetWidth < 768);
        }, 300);
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return (
        <div className={styles.rightContent}>
            {small ? (
                <Menu
                    mode="horizontal"
                    defaultSelectedKeys={["2"]}
                    className={formStyles.inlineBlock}
                >
                    <Menu.SubMenu title={"Submenu"}>
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu.SubMenu>
                </Menu>
            ) : (
                <Menu
                    mode="horizontal"
                    defaultSelectedKeys={["2"]}
                    className={formStyles.inlineBlock}
                >
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
            )}
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
