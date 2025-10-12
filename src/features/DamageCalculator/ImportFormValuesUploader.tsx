import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useCallback, useState } from 'react';
import styled from 'styled-components';

interface ImportFormValuesUploaderProps {
  onFileLoaded: (file: File) => void;
  style?: React.CSSProperties;
}

const StyledUpload = styled(Upload)`
  width: 100%;
  .ant-upload.ant-upload-select {
    width: 100%;
  }
`;

export function ImportFormValuesUploader({ onFileLoaded, style }: ImportFormValuesUploaderProps) {
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
    <StyledUpload accept=".json" beforeUpload={handleFileUpload} showUploadList={false} style={style}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          cursor: 'pointer',
          width: '100%'
        }}
      >
        <Button icon={<UploadOutlined />}>ファイルを選択</Button>
        <p
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            wordBreak: 'break-all'
          }}
        >
          {fileName ?? '選択してください'}
        </p>
      </div>
    </StyledUpload>
  );
}
