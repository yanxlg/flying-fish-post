import { IPaginationResponse, IRequestPagination, IResponse } from "@/interface/IGlobal";
import { IFormItems, TableListItem, IOptionListResponse } from "@/interface/IReturn";
import request from "@/utils/request";
import { AfterSaleApiPath } from "@/config/api/AfterSaleApiPath";
import { message } from "antd";

export async function queryReturnList(query: IFormItems & IRequestPagination) {
    return request.get<IResponse<IPaginationResponse<TableListItem>>>(
        AfterSaleApiPath.queryReturnList,
        {
            params: query,
        },
    );
}

export async function exportReturnList(query: IFormItems) {
    return request
        .get(AfterSaleApiPath.exportReturnList, {
            params: query,
        })
        .catch(() => {
            message.error("导出失败，请重试！");
        });
}

export async function queryOptionList() {
    return request.get<IResponse<IOptionListResponse>>(AfterSaleApiPath.queryOptionList);
}
