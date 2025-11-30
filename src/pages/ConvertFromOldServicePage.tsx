import { FileUploader } from '../components/FileUploader';
import { useState } from 'react';
import { DownloadConvertedFileButton } from '../features/ConvertFromOldService/DownloadConvertedFileButton';
import { PageTitle } from '../components/PageTitle';

export function ConvertFromOldServicePage() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <>
      <PageTitle>旧サービスからのデータ移行</PageTitle>
      <FileUploader accept=".csv" onFileLoaded={setFile} />
      <DownloadConvertedFileButton file={file} />
    </>
  );
}
