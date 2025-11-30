import { FileUploader } from '../components/FileUploader';
import { useState } from 'react';
import { DownloadConvertedFileButton } from '../features/ConvertFromOldService/DownloadConvertedFileButton';
import { styled } from 'styled-components';

const Title = styled.h2`
  margin-top: 4px;
  margin-left: 8px;
`;

export function ConvertFromOldServicePage() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <>
      <Title>旧サービスからのデータ移行</Title>
      <FileUploader accept=".csv" onFileLoaded={setFile} />
      <DownloadConvertedFileButton file={file} />
    </>
  );
}
