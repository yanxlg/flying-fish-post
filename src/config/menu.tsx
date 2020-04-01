import React from "react";
import { DashboardOutlined } from "@ant-design/icons/lib";
import { Icons } from "@/components/Icon";
export default [
    {
        path: "/",
        name: "首页",
        icon: <DashboardOutlined />,
    },
    {
        path: "/platform",
        name: "平台管理",
        icon: <Icons type="scm-setting" />,
        children: [
            {
                path: "/platform",
                name: "接入平台",
            },
        ],
    },
    {
        path: "/logistics",
        name: "物流订单管理",
        icon: <Icons type="scm-task" />,
        children: [
            {
                path: "/logistics/delivery",
                name: "发货订单",
            },
            {
                path: "/logistics/abnormal",
                name: "异常订单",
            },
            {
                path: "/logistics/history",
                name: "历史订单",
            },
            {
                path: "/logistics/purchase",
                name: "采购订单",
            },
            {
                path: "/logistics/overtime",
                name: "履约超时订单",
            },
            {
                path: "/logistics/billingLog",
                name: "打单日志",
            },
        ],
    },
    {
        path: "after-sale",
        name: "售后管理",
        icon: <Icons type="scm-task" />,
        children: [
            {
                path: "/after-sale/return",
                name: "退货单管理",
            },
            {
                path: "/after-sale/history",
                name: "历史退货单",
            },
        ],
    },
    {
        path: "supplier",
        name: "供应商管理",
        icon: <Icons type="scm-task" />,
        children: [
            {
                path: "/supplier/logistics",
                name: "物流商管理",
            },
            {
                path: "/supplier/channels",
                name: "渠道管理",
            },
            {
                path: "/supplier/offers",
                name: "渠道报价",
            },
            {
                path: "/supplier/kpi",
                name: "KPI渠道配置",
            },
            {
                path: "/supplier/order",
                name: "物流打单配置",
            },
        ],
    },
];
