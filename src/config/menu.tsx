import React from 'react';
import { DashboardOutlined } from '@ant-design/icons/lib';
import { Icons } from '@/components/Icon';
export default [
    {
        path: '/',
        name: '首页',
        icon: <DashboardOutlined />,
    },
    {
        path: '/platform',
        name: '平台管理',
        icon: <Icons type="scm-setting" />,
        children: [
            {
                path: '/platform/index',
                name: '接入平台',
            }
        ],
    },
    {
        path: '/logistics',
        name: '物流订单管理',
        icon: <Icons type="scm-task" />,
        children: [
            {
                path: '/logistics/delivery',
                name: '发货订单',
            },
            {
                path: '/logistics/abnormal',
                name: '异常订单'
            },
            {
                path: '/logistics/history',
                name: '历史订单'
            },
            {
                path: '/logistics/purchase',
                name: '采购订单'
            },
            {
                path: '/logistics/log',
                name: '打单日志'
            },
        ],
    },
];
