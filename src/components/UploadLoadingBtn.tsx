import React, { useCallback, useMemo, useState } from "react";
import { Button, Upload } from "antd";
import { RcFile, UploadProps } from "antd/lib/upload/interface";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons/lib";

declare interface IUploadLoadingBtn extends UploadProps {
    beforeUpload?: (file: RcFile, FileList: RcFile[]) => Promise<void>;
}

const UploadLoadingBtn: React.FC<IUploadLoadingBtn> = props => {
    const [loading, setLoading] = useState(false);
    const { beforeUpload, children, ...prop } = props;
    const upload = useCallback((file: RcFile, FileList: RcFile[]) => {
        setLoading(true);
        if (file) {
            beforeUpload?.(file, FileList).finally(() => {
                setLoading(false);
            });
        }
        return false;
    }, []);
    return useMemo(() => {
        return (
            <Upload multiple={false} {...prop} beforeUpload={upload}>
                <Button type="primary" loading={loading}>
                    {loading ? <LoadingOutlined /> : <UploadOutlined />} 上传
                </Button>
            </Upload>
        );
    }, [loading]);
};

export default UploadLoadingBtn;
