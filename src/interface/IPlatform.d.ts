/**
 * 平台管理
 */
import { IOptionItem } from "./IGlobal";

export declare interface IFormItems {
    pid?: number;
    platform_id?: string;
    platform_name?: string;
    status?: number;
}

export declare interface ITableListItem {
    pid: number;
    platform_id: string;
    platform_name: string;
    app_key: string;
    app_secret: string;
    create_time: string;
    status: number;
}

export interface IOptionListResponse {
    platform_list: IOptionItem[];
}
