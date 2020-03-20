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

const channelsList = Mock.mock({
    "list|100-500": [
        {
            "id": "@string('number',10)",
            "name": "@cname",
            "show_name": "@name",
            "type|1": [0, 1, 2, 3, 4],
            "service_type|1": [0, 1, 2, 3, 4],
            "service_country|1": [0, 1, 2, 3, 4],
            "platform|1": [0, 1, 2, 3, 4],
            "settlement_mode|1": [1, 2],
            "active|1": [0, 1],
            "logistic|1": [0, 1, 2, 3, 4],
            "channel_code": "@string",
            "cpcode": "@string",
            "app_secret": "@string",
            "create_time": "@datetime()",
            "logistic_address": "@city(true)"
        }
    ]
});

const channelsOptionsList = Mock.mock({
    "type_list|5": [
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
    "platform_list|5": [
        {
            "value|+1": [0, 1, 2, 3, 4],
            "name": "@cword"
        }
    ],
    "logistic_list|5": [
        {
            "value|+1": [0, 1, 2, 3, 4],
            "name": "@cword"
        }
    ]
});

const offersList = Mock.mock({
    "list|100-500": [
        {
            "id": "@string('number',10)",
            "target_country": "@country",
            "channel|1": [0, 1, 2, 3, 4],
            "logistic|1": [0, 1, 2, 3, 4],
            "country|1": [0, 1, 2, 3, 4],
            "hair_area|1": [0, 1, 2, 3, 4],
            "offer_mode|1": [0, 1, 2, 3, 4],
            "uploader": "@cname",
            "upload_time": "@datetime()",
            "active_time": "@datetime()"
        }
    ]
});

const offersOptionsList = Mock.mock({
    "logistic_list|5": [
        {
            "value|+1": [0, 1, 2, 3, 4],
            "name": "@cword"
        }
    ],
    "channel_list|5": [
        {
            "value|+1": [0, 1, 2, 3, 4],
            "name": "@cword"
        }
    ],
    "country_list|5": [
        {
            "value|+1": [0, 1, 2, 3, 4],
            "name": "@cword"
        }
    ],
    "offer_mode_list|5": [
        {
            "value|+1": [0, 1, 2, 3, 4],
            "name": "@cword"
        }
    ],
    "hair_area_list|5": [
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
    "POST /*/logistics/edit": async (req: Request, res: Response) => {
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
                "contract": "@string",
                "contact": "@cname",
                "email": "@string"
            })
        });
    },

    "GET /*/channels/list": async (req: Request, res: Response) => {
        const { page, page_count } = req.query;
        const { list } = channelsList;
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
    "GET /*/channels/options": async (req: Request, res: Response) => {
        await sleep(4);
        res.status(200).send({
            code: 200,
            message: "By mock.js",
            data: channelsOptionsList
        });
    },
    "POST /*/channels/add": async (req: Request, res: Response) => {
        await sleep(4);
        res.status(200).send({
            code: 200,
            message: "By mock.js",
            data: null
        });
    },
    "POST /*/channels/edit": async (req: Request, res: Response) => {
        await sleep(4);
        res.status(200).send({
            code: 200,
            message: "By mock.js",
            data: null
        });
    },
    "GET /*/channels/query": async (req: Request, res: Response) => {
        await sleep(4);
        res.status(200).send({
            code: 200,
            message: "By mock.js",
            data: Mock.mock({
                "id": "@string('number',10)",
                "name": "@cname",
                "show_name": "@name",
                "type|1": [0, 1, 2, 3, 4],
                "service_type|1": [0, 1, 2, 3, 4],
                "service_country|1": [0, 1, 2, 3, 4],
                "platform|1": [0, 1, 2, 3, 4],
                "settlement_mode|1": [1, 2],
                "active|1": [0, 1],
                "logistic|1": [0, 1, 2, 3, 4],
                "logistic_address": "@city(true)",
                "is_docking|1": [0, 1]
            })
        });
    },
    "POST /*/channels/update_active": async (req: Request, res: Response) => {
        await sleep(4);
        res.status(200).send({
            code: 200,
            message: "By mock.js",
            data: null
        });
    },
    "POST /*/channels/remove": async (req: Request, res: Response) => {
        await sleep(4);
        res.status(200).send({
            code: 200,
            message: "By mock.js",
            data: null
        });
    },

    "GET /*/offers/list": async (req: Request, res: Response) => {
        const { page, page_count } = req.query;
        const { list } = offersList;
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
    "GET /*/offers/options": async (req: Request, res: Response) => {
        await sleep(4);
        res.status(200).send({
            code: 200,
            message: "By mock.js",
            data: offersOptionsList
        });
    },

    "POST /*/offers/upload": async (req: Request, res: Response) => {
        await sleep(4);
        res.status(200).send({
            code: 200,
            message: "By mock.js"
        });
    },

    "GET /*/offers/detail": async (req: Request, res: Response) => {
        await sleep(4);
        res.status(200).send({
            code: 200,
            message: "By mock.js",
            data: Mock.mock({
                "channel": "@string()",
                "country": "@country",
                "target_country": "@city(true)",
                "hair_area1": "@country",
                "offer_mode": "@string",
                "active_time": "@datetime()",
                "fuel_price": "@string('number')",
                "plus_price": "@string('number')",
                "vat_price": "@string('number')",
                "cod_price": "@string('number')",
                "extra": "@string",
                "remark": "@string",
                "order_count": "@integer",
                "weight_range": "@string",
                "registration_fee": "@string('number')",
                "kilogram_fee": "@string('number')"
            })
        });
    }
};
