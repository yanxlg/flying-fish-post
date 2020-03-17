export interface IRequestPagination {
    page: number;
    page_count: number;
}

export interface IResponse<T> {
    code: number;
    message: string;
    data: T;
}

export interface IPaginationResponse<T> {
    total: number;
    list: T[];
}

export type IBoolean = 0 | 1;

export declare interface IOptionItem {
    name: string;
    value: number;
}
