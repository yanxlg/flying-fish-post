import request from "@/utils/request";
import { DeliveryApiPath } from "@/config/api/logistics/DeliveryApiPath";
import { IPaginationResponse, IRequestPagination, IResponse } from "@/interface/IGlobal";
import { IFormItems, IOptionListResponse, ITableListItem } from "@/interface/logistics/IDelivery";

export async function getOrderList(params: IFormItems & IRequestPagination) {
    return request.get<IResponse<IPaginationResponse<ITableListItem>>>(
        DeliveryApiPath.getOrderList,
        {
            params,
        },
    );
}

export async function queryOptionList() {
    return request.get<IResponse<IOptionListResponse>>(DeliveryApiPath.queryOptionList);
}
