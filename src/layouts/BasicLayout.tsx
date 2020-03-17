import ProLayout, {
    MenuDataItem,
    BasicLayoutProps as ProLayoutProps,
    DefaultFooter,
} from "@ant-design/pro-layout";
import React, { useEffect } from "react";
import { Link } from "umi";
import { Dispatch } from "redux";
import { connect } from "dva";
import { GithubOutlined } from "@ant-design/icons";
import { Result, Button } from "antd";
import Authorized from "@/utils/Authorized";
import RightContent from "@/components/GlobalHeader/RightContent";
import { ConnectState } from "@/models/connect";
import { getAuthorityFromRouter } from "@/utils/utils";
import logo from "../assets/logo.png";
import MenuData from "@/config/menu";

const noMatch = (
    <Result
        status={403}
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
            <Button type="primary">
                <Link to="/user/login">Go Login</Link>
            </Button>
        }
    />
);
export interface BasicLayoutProps extends ProLayoutProps {
    breadcrumbNameMap: {
        [path: string]: MenuDataItem;
    };
    route: ProLayoutProps["route"] & {
        authority: string[];
    };
    dispatch: Dispatch;
}
export type BasicLayoutContext = { [K in "location"]: BasicLayoutProps[K] } & {
    breadcrumbNameMap: {
        [path: string]: MenuDataItem;
    };
};
/**
 * use Authorized check all menu item
 */

/*const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
    menuList.map(item => {
        const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };
        return Authorized.check(item.authority, localItem, null) as MenuDataItem;
    });*/

const menuDataRender = () =>
    MenuData.map(item => {
        // filter
        return item as any;
    });

const defaultFooterDom = (
    <DefaultFooter
        copyright="2019 蚂蚁金服体验技术部出品"
        links={[
            {
                key: "Ant Design Pro",
                title: "Ant Design Pro",
                href: "https://pro.ant.design",
                blankTarget: true,
            },
            {
                key: "github",
                title: <GithubOutlined />,
                href: "https://github.com/ant-design/ant-design-pro",
                blankTarget: true,
            },
            {
                key: "Ant Design",
                title: "Ant Design",
                href: "https://ant.design",
                blankTarget: true,
            },
        ]}
    />
);

const BasicLayout: React.FC<BasicLayoutProps> = props => {
    const {
        dispatch,
        children,
        location = {
            pathname: "/",
        },
    } = props;
    /**
     * constructor
     */

    useEffect(() => {
        if (dispatch) {
            dispatch({
                type: "user/fetchCurrent",
            });
        }
    }, []);
    /**
     * init variables
     */

    const handleMenuCollapse = (payload: boolean): void => {
        if (dispatch) {
            dispatch({
                type: "global/changeLayoutCollapsed",
                payload,
            });
        }
    }; // get children authority

    const authorized = getAuthorityFromRouter(props.route.routes, location.pathname || "/") || {
        authority: undefined,
    };
    return (
        <ProLayout
            title="FF Post"
            logo={<img src={logo} className="menu-logo" alt="" />}
            onCollapse={handleMenuCollapse}
            menuItemRender={(menuItemProps, defaultDom) => {
                if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
                    return defaultDom;
                }

                return <Link to={menuItemProps.path}>{defaultDom}</Link>;
            }}
            breadcrumbRender={(routers = []) => [
                {
                    path: "/",
                    breadcrumbName: "首页",
                },
                ...routers,
            ]}
            itemRender={(route, params, routes, paths) => {
                const last = routes.indexOf(route) === routes.length - 1;
                const first = routes.indexOf(route) === 0;
                const path = paths.join("/");
                if (path === "/") {
                    return null;
                } // 删除首页

                return !last && !first ? (
                    <Link to={path}>{route.breadcrumbName}</Link>
                ) : (
                    <span>{route.breadcrumbName}</span>
                );
            }}
            footerRender={() => defaultFooterDom}
            menuDataRender={menuDataRender}
            rightContentRender={() => <RightContent />}
            {...props}
        >
            {children}
            {/*  <Authorized authority={authorized!.authority} noMatch={noMatch}>
                {children}
            </Authorized>*/}
        </ProLayout>
    );
};

export default connect(({ global }: ConnectState) => ({
    collapsed: global.collapsed,
}))(BasicLayout);
