import request from "@/utils/request";
import { IPaginationResponse, IRequestPagination, IResponse } from "@/interface/IGlobal";
import { PlatformApiPath } from "@/config/api/PlatformApiPath";
import { IFormItems, ITableListItem, IOptionListResponse } from "@/interface/IPlatform";

export async function getPlatformList(params: IFormItems & IRequestPagination) {
    return request.get<IResponse<IPaginationResponse<ITableListItem>>>(
        PlatformApiPath.getProductList,
        {
            params,
        },
    );
}

export async function queryOptionList() {
    return request.get<IResponse<IOptionListResponse>>(PlatformApiPath.queryOptionList);
}
