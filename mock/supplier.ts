import { Request, Response } from "express";

import Mock from "mockjs";

const sleep = async (second: number) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, second * 1000);
    });
};

const logisticsList = Mock.mock({
    "list|100-500": [
        {
            "id": "@string('number',10)",
            "name": "@cname",
            "name_en": "@name",
            "service_method|+1": [0, 1, 2, 3, 4],
            "service_type|+1": [0, 1, 2, 3, 4],
            "service_country|+1": [0, 1, 2, 3, 4],
            "track_query|+1": [0, 1, 2, 3, 4],
            "home_page": "@url",
            "phone_number": "@string('number',11)",
            "cpcode": "@string",
            "app_secret": "@string",
            "operator": "@cname",
            "contract": "@string",
            "create_time": "@datetime()",
            "update_time": "@datetime()"
        }
    ]
});

const optionList = Mock.mock({
    "service_method_list|5": [
        {
            "value|+1": [0, 1, 2, 3, 4],
            "name": "@cword"
        }
    ],
    "service_type_list|5": [
        {
            "value|+1": [0, 1, 2, 3, 4],
            "name": "@cword"
        }
    ],
    "service_country_list|5": [
        {
            "value|+1": [0, 1, 2, 3, 4],
            "name": "@cword"
        }
    ],
    "track_query_list|5": [
        {
            "value|+1": [0, 1, 2, 3, 4],
            "name": "@cword"
        }
    ]
});

export default {
    "GET /*/logistics/list": async (req: Request, res: Response) => {
        const { page, page_count } = req.query;
        const { list } = logisticsList;
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
    "GET /*/logistics/options": async (req: Request, res: Response) => {
        await sleep(4);
        res.status(200).send({
            code: 200,
            message: "By mock.js",
            data: optionList
        });
    },
    "POST /*/logistics/add": async (req: Request, res: Response) => {
        await sleep(4);
        res.status(200).send({
            code: 200,
            message: "By mock.js",
            data: null
        });
    },
    "GET /*/logistics/query": async (req: Request, res: Response) => {
        await sleep(4);
        res.status(200).send({
            code: 200,
            message: "By mock.js",
            data: Mock.mock({
                "id": "@string('number',10)",
                "name": "@cname",
                "name_en": "@name",
                "service_method|+1": [0, 1, 2, 3, 4],
                "service_type|+1": [0, 1, 2, 3, 4],
                "service_country|+1": [0, 1, 2, 3, 4],
                "track_query|+1": [0, 1, 2, 3, 4],
                "home_page": "@url",
                "phone_number": "@string('number',11)",
                "cpcode": "@string",
                "app_secret": "@string",
                "operator": "@cname",
                "contract": "@string",
                "create_time": "@datetime()",
                "update_time": "@datetime()"
            })
        });
    }
};
