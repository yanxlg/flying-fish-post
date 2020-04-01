/**
 * 物流订单管理
 */
import { IOptionItem } from "../IGlobal";

export declare interface IFormItems {
    shipping_order_sn?: number;
    platform_id?: string[];
    warehouse_code?: string[];
    shipping_way?: string[];
    reservation_start?: number;
    reservation_end?: number;
}

export interface IOptionListResponse {
    platform_list: IOptionItem[];
    warehouse_list: IOptionItem[];
    shipping_way_list: IOptionItem[];
}

export interface ITableListItem {
    logistics_no: string; // 物流单号
    delivery_no: string; // 发货单号（平台）
    waybill_no: string; // 运单号
    type: number; // 类型
    warehouse: number; // 仓库
    status: number; // 状态
    platform: number; // 平台
    logistics_channel: string; // 物流渠道
    associated_waybill: string; // 关联运单
    current_node: string; // 当前节点
    fee: string; // 费用
    create_time: string; // 创建时间
}
