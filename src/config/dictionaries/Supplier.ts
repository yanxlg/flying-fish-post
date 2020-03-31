import { transStatusList } from "@/utils/transform";

export const SettlementModes = {
    1: "线上",
    2: "线下",
};

export type SettlementModesCode = keyof typeof SettlementModes;
export const SettlementModesList = transStatusList(SettlementModes);
