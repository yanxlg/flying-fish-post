import React, { useEffect, useMemo, useState } from "react";
import { optionListToMap } from "@/utils/utils";
import { IResponse } from "@/interface/IGlobal";
import Highlighter from "react-highlight-words";
import styles from "@/styles/_table.less";

declare interface IOptionItemProps<T> {
    type: string;
    value: number;
    syncCallback: ISyncCallback;
    filter?: boolean;
    filterText?: string;
    record?: any;
    recordKey?: string;
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

const OptionItem = <T,>({
    filterText = "",
    filter,
    type,
    value,
    syncCallback,
    record,
    recordKey,
}: IOptionItemProps<T>) => {
    const [label, setLabel] = useState("");
    useEffect(() => {
        queryOptionMap(syncCallback).then(data => {
            setLabel(data?.[type]?.[value]);
        });
    }, []);
    return useMemo(() => {
        if (record && recordKey) {
            record["__" + recordKey] = label;
        }
        return filter ? (
            <Highlighter
                highlightClassName={styles.tableHighlight}
                searchWords={[filterText]}
                autoEscape
                textToHighlight={label.toString()}
            />
        ) : (
            <span>{label}</span>
        );
    }, [label, filterText]);
};

export default OptionItem;
