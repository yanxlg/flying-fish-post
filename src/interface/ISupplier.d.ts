import { IBoolean, IOptionItem } from "@/interface/IGlobal";

export declare interface ILogisticsRequestForm {
    keyword?: string;
}

export interface ILogistics extends ILogisticsEditBody {
    create_time: string;
    update_time: string;
    cpcode: string;
    app_secret: string;
    operator: string;
}

export interface ILogisticsEditBody extends ILogisticsBody {
    id: string;
}

export interface ILogisticsBody {
    name: string;
    name_en: string;
    service_method: number;
    service_type: number;
    service_country: number;
    home_page: string;
    track_query: number;
    phone_number: string;
    contract: string;
    contact: string;
    email: string;
}

export interface IOptionListResponse {
    service_method_list: IOptionItem[];
    service_type_list: IOptionItem[];
    service_country_list: IOptionItem[];
    track_query_list: IOptionItem[];
}

export declare interface IChannelsRequestForm {
    keyword?: string;
}

export declare interface IChannel extends IChannelItem {
    id: string; // 编码
    channel_code: string;
    cpcode: string;
    app_secret: string;
    create_time: string;
}

export interface IChannelsOptionListResponse {
    type_list: IOptionItem[];
    service_type_list: IOptionItem[];
    service_country_list: IOptionItem[];
    platform_list: IOptionItem[];
    logistic_list: IOptionItem[];
}

declare interface IChannelItem {
    name: string; // 名称
    show_name: string;
    type: number;
    service_type: number;
    service_country: number;
    platform: number;
    settlement_mode: 1 | 2; // 线上线下
    active: IBoolean;
    logistic: number;
    logistic_address: string;
}

export declare interface IChannelForm extends IChannelItem {
    id?: string; // 编码
    is_docking: IBoolean;
}

declare interface IOffer {
    logistic: number;
    channel: number;
    country: number;
    target_country: string;
    hair_area: number;
    offer_mode: number;
    uploader: string;
    upload_time: string;
    active_time: string;
    id: number;
}

export declare interface IOffersRequestForm {
    logistic?: number;
    channel?: number;
    country?: number;
    offer_mode?: number;
    hair_area?: number;
}

export interface IOffersOptionListResponse {
    logistic_list: IOptionItem[];
    channel_list: IOptionItem[];
    country_list: IOptionItem[];
    offer_mode_list: IOptionItem[];
    hair_area_list: IOptionItem[];
}

declare interface IOfferDetail {
    channel: string;
    country: string;
    target_country: string;
    hair_area: string;
    offer_mode: string;
    active_time: string;
    fuel_price: string;
    plus_price: string;
    vat_price: string;
    cod_price: string;
    extra: string;
    remark: string;

    order_count: number;
    weight_range: string;
    registration_fee: string;
    kilogram_fee: string;
}

export interface IKpiRequest {
    country?: string;
}

export interface IKpiItem {
    country: string;
    trans_type: string;
    aging: string;
    effective_time: string;
}

export interface IKpiOptionListResponse {
    country_list: IOptionItem[];
    trans_type_list: IOptionItem[];
}
