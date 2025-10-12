import { Typography } from 'antd';
import { FileUploader } from '../components/FileUploader';
import { useState } from 'react';
import { DownloadConvertedFileButton } from '../features/ConvertFromOldService/DownloadConvertedFileButton';

export function ConvertFromOldServicePage() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <>
      <Typography.Title level={3} style={{ marginTop: 4 }}>
        旧サービスからのデータ移行
      </Typography.Title>
      <FileUploader accept=".csv" onFileLoaded={setFile} />
      <DownloadConvertedFileButton file={file} />
    </>
  );
}
