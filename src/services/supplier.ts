import request from "@/utils/request";
import { SupplierApiPath } from "@/config/api/SupplierApiPath";
import { downloadExcel } from "@/utils/common";
import { message } from "antd";
import {
    ILogisticsRequestForm,
    ILogistics,
    IOptionListResponse,
    ILogisticsBody,
    ILogisticsEditBody,
} from "@/interface/ISupplier";
import { IPaginationResponse, IRequestPagination, IResponse } from "@/interface/IGlobal";

export async function queryLogisticsList(query: ILogisticsRequestForm & IRequestPagination) {
    return request.get<IResponse<IPaginationResponse<ILogistics>>>(
        SupplierApiPath.queryLogisticsList,
        {
            params: query,
        },
    );
}

export async function queryOptionList() {
    return request.get<IResponse<IOptionListResponse>>(SupplierApiPath.queryOptionList);
}

export async function exportLogisticsList(query: ILogisticsRequestForm) {
    return request
        .get(SupplierApiPath.exportLogisticsList, {
            params: query,
            responseType: "blob",
            parseResponse: false,
        })
        .then(downloadExcel)
        .catch(() => {
            message.error("导出失败，请稍后重试！");
        });
}

export async function addLogistic(body: ILogisticsBody) {
    return request.post(SupplierApiPath.addLogistic, {
        data: body,
    });
}

export async function editLogistic(body: ILogisticsEditBody) {
    return request.post(SupplierApiPath.editLogistic, {
        data: body,
    });
}

export async function queryLogistic(id: string) {
    return request.get<IResponse<ILogisticsBody>>(SupplierApiPath.queryLogistic, {
        params: {
            id,
        },
    });
}
