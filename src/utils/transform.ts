export function transStatusList(statusMap: { [key: number]: string; [key: string]: string }) {
    let statusList = [];
    for (let key in statusMap) {
        if (statusMap.hasOwnProperty(key)) {
            statusList.push({
                id: key,
                name: statusMap[key],
            });
        }
    }
    return statusList;
}

export function getStatusDesc(
    list: any[],
    val: any,
    valKey: string = "value",
    nameKey: string = "name",
) {
    const index = list.findIndex(item => item[valKey] === val);
    if (index > -1) {
        return list[index][nameKey];
    }
    return "";
}
