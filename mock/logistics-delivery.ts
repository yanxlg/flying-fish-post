import { Request, Response } from "express";

import Mock, { Random } from "mockjs";
import { Simulate } from "react-dom/test-utils";

const sleep = async (second: number) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, second * 1000);
    });
};

const orderList = Mock.mock({
    "list|100-500": [
        {
            "logistics_no": "@string('number',10)",
            "delivery_no": "@string('number',10)",
            "waybill_no": "@string('number',10)",
            "type": "@increment",
            "warehouse": "@increment",
            "status": "@increment",
            "platform": "@increment",
            "logistics_channel": "@cword(6)",
            "associated_waybill": "@cword(6)",
            "current_node": "@cword(6)",
            "fee": "@string('number', 2)",
            "create_time": "@datetime()"
        }
    ]
});

const optionList = Mock.mock({
    "platform_list|10-30": [
        {
            "value|1": "@increment",
            "name": "@cword"
        }
    ],
    "warehouse_list|10-30": [
        {
            "value|1": "@increment",
            "name": "@cword"
        }
    ],
    "shipping_way_list|10-30": [
        {
            "value|1": "@increment",
            "name": "@cword"
        }
    ]
});

export default {
    "GET /*/order/list": async (req: Request, res: Response) => {
        const { page, page_count } = req.query;
        const { list } = orderList;
        await sleep(4);
        res.status(200).send({
            code: 200,
            message: "By mock.js",
            data: {
                list: list.slice(
                    Number(page_count) * Number(page - 1),
                    Number(page_count) * Number(page)
                ),
                total: list.length
            }
        });
    },
    "GET /*/logistics/delivery/options": async (req: Request, res: Response) => {
        await sleep(4);
        res.status(200).send({
            code: 200,
            message: "By mock.js",
            data: optionList
        });
    }
};
