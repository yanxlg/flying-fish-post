import React, { useMemo, useState } from "react";
import { optionListToMap } from "@/utils/utils";
import { IResponse } from "@/interface/IGlobal";

declare interface IOptionItemProps<T> {
    type: string;
    value: number;
    syncCallback: ISyncCallback;
}

declare type ISyncCallback = (() => Promise<IResponse<any>>) & {
    promise?: Promise<{ [key: string]: { [key: number]: string } }>;
};

const queryOptionMap = (() => {
    return (syncCallback: ISyncCallback) => {
        if (syncCallback.promise) {
            return syncCallback.promise;
        } else {
            syncCallback.promise = syncCallback().then(({ data = {} }) => {
                let response: {
                    [key: string]: { [key: number]: string };
                } = {};
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        response[key] = optionListToMap(data[key]);
                    }
                }
                return response;
            });
            return syncCallback.promise;
        }
    };
})();

const OptionItem = <T,>({ type, value, syncCallback }: IOptionItemProps<T>) => {
    const [label, setLabel] = useState("");
    useMemo(() => {
        queryOptionMap(syncCallback).then(data => {
            setLabel(data?.[type]?.[value]);
        });
    }, []);
    return useMemo(() => {
        return <span>{label}</span>;
    }, [label]);
};

export default OptionItem;
