import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { PrimaryOutlinedButton } from './Button.tsx/PrimaryOutlinedButton';

interface FileUploaderProps {
  onFileLoaded: (file: File) => void;
  style?: React.CSSProperties;
  accept?: string;
}

const StyledUpload = styled(Upload)`
  width: 100%;
  .ant-upload.ant-upload-select {
    width: 100%;
  }
`;

export function FileUploader({ onFileLoaded, style, accept }: FileUploaderProps) {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileUpload = useCallback(
    (file: File) => {
      setFileName(file.name);
      onFileLoaded(file);
      return false;
    },
    [onFileLoaded]
  );

  return (
    <StyledUpload accept={accept} beforeUpload={handleFileUpload} showUploadList={false} style={style}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          cursor: 'pointer',
          width: '100%'
        }}
      >
        <PrimaryOutlinedButton startIcon={<UploadOutlined />}>ファイルを選択</PrimaryOutlinedButton>
        <p
          style={{
            flex: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            wordBreak: 'break-all',
            margin: 0
          }}
        >
          {fileName ?? '選択してください'}
        </p>
      </div>
    </StyledUpload>
  );
}
