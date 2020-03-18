import request from "@/utils/request";
import { IPaginationResponse, IRequestPagination, IResponse } from "@/interface/IGlobal";
import { PlatformApiPath } from "@/config/api/PlatformApiPath";
import {
    IFormItems,
    ITableListItem,
    IOptionListResponse,
    IRequestEdit,
} from "@/interface/IPlatform";

export async function getPlatformList(params: IFormItems & IRequestPagination) {
    return request.get<IResponse<IPaginationResponse<ITableListItem>>>(
        PlatformApiPath.getPlatformList,
        {
            params,
        },
    );
}

export async function queryOptionList() {
    return request.get<IResponse<IOptionListResponse>>(PlatformApiPath.queryOptionList);
}

export async function editPlatform(data: IRequestEdit) {
    return request.post<IResponse<null>>(PlatformApiPath.editPlatform, {
        data,
    });
}
