import { transStatusList } from '@/utils/transform';

//======================= 平台管理 ======================//
export const platformMap = {
    1: 'flyfish',
    2: 'VOVA',
    3: 'jjshouse',
    4: 'VeryVoga',
    5: 'Tendaisy',
    6: 'AiryDress-New',
    7: 'floryday',
    8: 'AiryDress',
    9: 'SisDress',
    10: 'Lambkingo',
    11: 'Azazie'
};

export const platformList = transStatusList(platformMap);

export const platformStatusMap = {
    0: '有效',
    1: '无效'
}

export const platformStatusList = transStatusList(platformStatusMap);