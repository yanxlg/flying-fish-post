import { Request, Response } from "express";

import Mock from "mockjs";

const sleep = async (second: number) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, second * 1000);
    });
};

const returnList = Mock.mock({
    "list|100-500": [
        {
            "number": "@string('number',10)",
            "logistics_mode|+1": [0, 1, 2, 3, 4],
            "return_platform|+1": [0, 1, 2, 3, 4],
            "status|1": [0, 1, 2, 3, 4],
            "track_number": "@string('number',10)",
            "physical_channel": "@increment",
            "current_node": "@cword(6)",
            "cost|20.1": 1,
            "return_warehouse": "@cword(6)",
            "warehouse_receipt": "@string('number',10)",
            "create_time": "@datetime()"
        }
    ]
});

const optionList = Mock.mock({
    "logistics_mode_list|5": [
        {
            "value|+1": [0, 1, 2, 3, 4],
            "name": "@cword"
        }
    ],
    "return_type_list|5": [
        {
            "value|+1": [0, 1, 2, 3, 4],
            "name": "@cword"
        }
    ],
    "return_platform_list|5": [
        {
            "value|+1": [0, 1, 2, 3, 4],
            "name": "@cword"
        }
    ],
    "status_list|5": [
        {
            "value|+1": [0, 1, 2, 3, 4],
            "name": "@cword"
        }
    ]
});

export default {
    "GET /*/return/list": async (req: Request, res: Response) => {
        const { page, page_count } = req.query;
        const { list } = returnList;
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
    "GET /*/return/options": async (req: Request, res: Response) => {
        await sleep(4);
        res.status(200).send({
            code: 200,
            message: "By mock.js",
            data: optionList
        });
    },
    "GET /*/return/his_list": async (req: Request, res: Response) => {
        const { page, page_count } = req.query;
        const { list } = returnList;
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
    }
};
