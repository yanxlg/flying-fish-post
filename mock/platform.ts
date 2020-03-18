import { Request, Response } from "express";

import Mock, { Random } from "mockjs";

const sleep = async (second: number) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, second * 1000);
    });
};

const list = Mock.mock({
    "data|100-500": [
        {
            "pid": "@increment(0)",
            "platform_id": "@string('number',2)",
            "platform_name": "@cword(6)",
            "app_key": "@string('number',10)",
            "app_secret": "@string('number',10)",
            "create_time": "@datetime()",
            "status|+1": [0, 1]
        }
    ]
});

const optionList = Mock.mock({
    "platform_list|10-30": [
        {
            "value": "@increment(0)",
            "name": "@cword"
        }
    ]
});

export default {
    "GET /*/platform/list": async (req: Request, res: Response) => {
        const { page, page_count } = req.query;
        await sleep(2);
        res.status(200).send({
            code: 200,
            message: "By mock.js",
            data: {
                list: list.data.slice(
                    Number(page_count) * (Number(page) - 1),
                    Number(page_count) * Number(page)
                ),
                total: list.data.length
            }
        });
    },
    "GET /*/platform/options": async (req: Request, res: Response) => {
        await sleep(2);
        res.status(200).send({
            code: 200,
            message: "By mock.js",
            data: optionList
        });
    },
    "post /*/platform/edit": async (req: Request, res: Response) => {
        await sleep(2);
        res.status(200).send({
            code: 200,
            message: "By mock.js"
        });
    }
};
