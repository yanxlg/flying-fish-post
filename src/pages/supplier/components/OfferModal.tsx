import React, { useEffect, useMemo, useState } from "react";
import { Modal, Descriptions, Spin, Card } from "antd";
import styles from "@/styles/_supplier.less";
import formStyles from "@/components/SearchForm/_form.less";
import { IOfferDetail } from "@/interface/ISupplier";
import { queryOfferDetail } from "@/services/supplier";
import { EmptyObject } from "@/config/global";

declare interface OfferModalProps {
    visible: string | false;
    onCancel: () => void;
}

const OfferModal: React.FC<OfferModalProps> = ({ visible, onCancel }) => {
    const [loading, setLoading] = useState(false);
    const [detail, setDetail] = useState<IOfferDetail>(EmptyObject);
    useEffect(() => {
        if (visible) {
            setDetail(EmptyObject);
            setLoading(true);
            queryOfferDetail(visible)
                .then(({ data = EmptyObject }) => {
                    setDetail(data);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [visible]);
    return useMemo(() => {
        return (
            <Modal
                visible={!!visible}
                onCancel={onCancel}
                className={styles.offerModal}
                footer={false}
                destroyOnClose={true}
            >
                <Spin spinning={loading}>
                    <Card className={formStyles.formItem}>
                        <Descriptions>
                            <Descriptions.Item label="渠道">{detail.channel}</Descriptions.Item>
                            <Descriptions.Item label="国家">{detail.country}</Descriptions.Item>
                            <Descriptions.Item label="目的国区域">
                                {detail.target_country}
                            </Descriptions.Item>
                            <Descriptions.Item label="发件区域">
                                {detail.hair_area}
                            </Descriptions.Item>
                            <Descriptions.Item label="报价模式">
                                {detail.offer_mode}
                            </Descriptions.Item>
                            <Descriptions.Item label="生效日期">
                                {detail.active_time}
                            </Descriptions.Item>
                            <Descriptions.Item label="燃油费%">
                                {detail.fuel_price}
                            </Descriptions.Item>
                            <Descriptions.Item label="偏远地址附加费">
                                {detail.plus_price}
                            </Descriptions.Item>
                            <Descriptions.Item label="vat费">{detail.vat_price}</Descriptions.Item>
                            <Descriptions.Item label="cod服务费">
                                {detail.cod_price}
                            </Descriptions.Item>
                            <Descriptions.Item label="其他">{detail.extra}</Descriptions.Item>
                            <Descriptions.Item label="备注">{detail.remark}</Descriptions.Item>
                        </Descriptions>
                    </Card>
                    <Card>
                        <Descriptions>
                            <Descriptions.Item label="订单量">
                                {detail.order_count}
                            </Descriptions.Item>
                            <Descriptions.Item label="重量范围（kg）">
                                {detail.weight_range}
                            </Descriptions.Item>
                            <Descriptions.Item label="挂号费（包裹价格）">
                                {detail.registration_fee}
                            </Descriptions.Item>
                            <Descriptions.Item label="公斤费">
                                {detail.kilogram_fee}
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Spin>
            </Modal>
        );
    }, [visible, loading]);
};

export default OfferModal;
