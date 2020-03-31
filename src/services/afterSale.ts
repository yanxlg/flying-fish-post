import { IPaginationResponse, IRequestPagination, IResponse } from "@/interface/IGlobal";
import { IReturnRequestForm, TableListItem, IOptionListResponse } from "@/interface/IAfterSale";
import request from "@/utils/request";
import { AfterSaleApiPath } from "@/config/api/AfterSaleApiPath";
import { message } from "antd";
import { downloadExcel } from "@/utils/common";

export async function queryReturnList(query: IReturnRequestForm & IRequestPagination) {
    return request.get<IResponse<IPaginationResponse<TableListItem>>>(
        AfterSaleApiPath.queryReturnList,
        {
            params: query,
        },
    );
}

export async function exportReturnList(query: IReturnRequestForm) {
    return request
        .get(AfterSaleApiPath.exportReturnList, {
            params: query,
            responseType: "blob",
            parseResponse: false,
        })
        .then(downloadExcel)
        .catch(() => {
            message.error("导出失败，请稍后重试！");
        });
}

export async function queryOptionList() {
    return request.get<IResponse<IOptionListResponse>>(AfterSaleApiPath.queryOptionList);
}

export async function queryHistoryReturnList(query: IReturnRequestForm & IRequestPagination) {
    return request.get<IResponse<IPaginationResponse<TableListItem>>>(
        AfterSaleApiPath.queryHistoryReturnList,
        {
            params: query,
        },
    );
}

export async function exportHistoryReturnList(query: IReturnRequestForm) {
    return request
        .get(AfterSaleApiPath.exportHistoryReturnList, {
            params: query,
            responseType: "blob",
            parseResponse: false,
        })
        .then(downloadExcel)
        .catch(() => {
            message.error("导出失败，请稍后重试！");
        });
}
