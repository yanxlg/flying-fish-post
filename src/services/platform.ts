import request, { errorHandlerFactory } from "@/utils/request";
import { IResponse } from "@/interface/IGlobal";
import { PlatformApiPath } from "@/config/api/PlatformApiPath";
import { IPlatformListQuery } from "@/interface/IPlatform";

export async function getPlatformList(params: IPlatformListQuery) {
    return request.get<IResponse<any>>(PlatformApiPath.getProductList, {
        params,
    });
}
