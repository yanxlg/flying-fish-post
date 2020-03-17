import React from 'react';
import { Modal } from 'antd';

interface IProps {
    visible: boolean;
    type: 'add' | 'edit';
    hideModal(): void;
}

class EditModal extends React.PureComponent<IProps> {
    // constructor(props: IProps) {
    //     super(props);
    // }

    handleOk = () => {};

    render() {
        const { visible, type, hideModal } = this.props;
        const title = type === 'add' ? '新增平台' : '编辑平台信息';
        return (
            <Modal
                title={title}
                visible={visible}
                okText="确定"
                cancelText="取消"
                onOk={this.handleOk}
                onCancel={hideModal}
            >
                <div>111</div>
            </Modal>
        );
    }
}

export default EditModal;
