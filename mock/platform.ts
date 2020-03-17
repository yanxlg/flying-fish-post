import { Request, Response } from "express";

import Mock, { Random } from "mockjs";

const list = Mock.mock({
    "data|100-500": [
        {
            "pid": "pid",
            "platform_id": "platform_id",
            "platform_name": "platform_name",
            "app_key": "app_key",
            "app_secret": "app_secret",
            "create_time": "create_time",
            "status": "status"
        }
    ]
});

export default {
    "GET /v1/platform/list": (req: Request, res: Response) => {
        const { page, page_count } = req.query;
        setTimeout(() => {
            res.status(200).send({
                code: 200,
                message: "By mock.js",
                data: {
                    list: list.data.slice(
                        Number(page_count) * (Number(page) - 1),
                        Number(page_count) * Number(page)
                    ),
                    all_count: list.data.length,
                    page: page,
                    size: page_count
                }
            });
        }, 500);
    }
};
