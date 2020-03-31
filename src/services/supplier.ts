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
    IChannelsRequestForm,
    IChannel,
    IChannelsOptionListResponse,
    IChannelForm,
    IOffersRequestForm,
    IOffer,
    IOffersOptionListResponse,
    IOfferDetail,
    IKpiRequest,
    IKpiItem,
    IKpiOptionListResponse,
} from "@/interface/ISupplier";
import { IBoolean, IPaginationResponse, IRequestPagination, IResponse } from "@/interface/IGlobal";

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

export async function queryChannelsList(query: IChannelsRequestForm & IRequestPagination) {
    return request.get<IResponse<IPaginationResponse<IChannel>>>(
        SupplierApiPath.queryChannelsList,
        {
            params: query,
        },
    );
}

export async function queryChannelsOptionsList() {
    return request.get<IResponse<IChannelsOptionListResponse>>(
        SupplierApiPath.queryChannelsOptionsList,
    );
}

export async function queryChannel(id: string) {
    return request.post<IResponse<IChannelForm>>(SupplierApiPath.queryChannel, {
        params: { id },
    });
}

export async function editChannel(body: IChannelForm) {
    return request.post(SupplierApiPath.editChannel, {
        data: body,
    });
}

export async function addChannel(body: IChannelForm) {
    return request.post(SupplierApiPath.addChannel, {
        data: body,
    });
}

export async function exportChannelsList(query: IChannelsRequestForm) {
    return request
        .get(SupplierApiPath.exportChannelsList, {
            params: query,
            responseType: "blob",
            parseResponse: false,
        })
        .then(downloadExcel)
        .catch(() => {
            message.error("导出失败，请稍后重试！");
        });
}

export async function setChannelActiveState(id: string, active: IBoolean) {
    return request.post(SupplierApiPath.updateChannelActiveState, {
        data: {
            id,
            active,
        },
    });
}

export async function removeChannel(id: string) {
    return request.post(SupplierApiPath.removeChannel, {
        data: {
            id,
        },
    });
}

export async function queryOffersList(query: IOffersRequestForm & IRequestPagination) {
    return request.get<IResponse<IPaginationResponse<IOffer>>>(SupplierApiPath.queryOffersList, {
        params: query,
    });
}

export async function queryOffersOptionsList() {
    return request.get<IResponse<IOffersOptionListResponse>>(
        SupplierApiPath.queryOffersOptionsList,
    );
}

export async function downloadOfferTemplate() {
    return request
        .get(SupplierApiPath.downloadOfferTemplate, {
            responseType: "blob",
            parseResponse: false,
        })
        .then(downloadExcel)
        .catch(() => {
            message.error("下载失败，请稍后重试！");
        });
}

export async function exportOffersList(query: IChannelsRequestForm) {
    return request
        .get(SupplierApiPath.exportOffersList, {
            params: query,
            responseType: "blob",
            parseResponse: false,
        })
        .then(downloadExcel)
        .catch(() => {
            message.error("导出失败，请稍后重试！");
        });
}

export async function uploadOffer(file: File) {
    const forms = new FormData();
    forms.append("file", file);
    return request.post(SupplierApiPath.uploadOfferFile, {
        requestType: "form",
        data: forms,
    });
}

export async function queryOfferDetail(id: string) {
    return request.get<IResponse<IOfferDetail>>(SupplierApiPath.queryOfferDetail, {
        params: {
            id,
        },
    });
}

export async function queryKpiList(query: IKpiRequest & IRequestPagination) {
    return request.get<IResponse<IPaginationResponse<IKpiItem>>>(SupplierApiPath.queryKpiList, {
        params: query,
    });
}

export async function uploadKpi(file: File) {
    const forms = new FormData();
    forms.append("file", file);
    return request.post(SupplierApiPath.uploadKpiFile, {
        requestType: "form",
        data: forms,
    });
}

export async function downloadKpiTemplate() {
    return request
        .get(SupplierApiPath.downloadKpiTemplate, {
            responseType: "blob",
            parseResponse: false,
        })
        .then(downloadExcel)
        .catch(() => {
            message.error("下载失败，请稍后重试！");
        });
}

export async function queryKpiOptionsList() {
    return request.get<IResponse<IKpiOptionListResponse>>(SupplierApiPath.queryKpiOptionsList);
}
