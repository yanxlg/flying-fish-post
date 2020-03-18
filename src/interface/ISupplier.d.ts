import { IOptionItem } from "@/interface/IGlobal";

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
    service_method: string;
    service_type: string;
    service_country: string;
    home_page: string;
    track_query: string;
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
