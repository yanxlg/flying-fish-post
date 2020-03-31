export enum SupplierApiPath {
    queryLogisticsList = "/v1/logistics/list",
    exportLogisticsList = "/v1/logistics/export",
    addLogistic = "/v1/logistics/add",
    queryLogistic = "/v1/logistics/query",
    editLogistic = "/v1/logistics/edit",
    queryOptionList = "/v1/logistics/options",

    queryChannelsList = "/v1/channels/list",
    exportChannelsList = "/v1/channels/export",
    queryChannelsOptionsList = "/v1/channels/options",
    editChannel = "/v1/channels/edit",
    addChannel = "/v1/channels/add",
    queryChannel = "/v1/channels/query",
    updateChannelActiveState = "/v1/channels/update_active",
    removeChannel = "/v1/channels/remove",

    queryOffersList = "/v1/offers/list",
    queryOffersOptionsList = "/v1/offers/options",
    downloadOfferTemplate = "/v1/offers/template",
    exportOffersList = "/v1/offers/export",
    uploadOfferFile = "/v1/offers/upload",
    queryOfferDetail = "/v1/offers/detail",

    queryKpiList = "/v1/kpi/list",
    uploadKpiFile = "/v1/kpi/upload",
    downloadKpiTemplate = "/v1/kpi/template",
    queryKpiOptionsList = "/v1/offers/options",
}
