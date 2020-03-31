import { IOptionItem } from "./IGlobal";

export declare interface TableListItem {
    number: string;
    logistics_mode: number;
    return_platform: number;
    status: number;
    track_number: string;
    physical_channel: string;
    current_node: string;
    cost: number;
    return_warehouse: string;
    warehouse_receipt: string;
    create_time: string;
}

export declare interface IReturnRequestForm {
    number?: string;
    logistics_mode?: number;
    return_type?: number;
    return_platform?: number;
    create_time_start?: number;
    create_time_end?: number;
    tabType?: number;
}

export interface IOptionListResponse {
    logistics_mode_list: IOptionItem[];
    return_type_list: IOptionItem[];
    return_platform_list: IOptionItem[];
    status_list: IOptionItem[];
}
