import { ModalProps, Modal, Typography } from 'antd';
import { useState } from 'react';
import { ExportFormValuesButton } from './ExportFormValuesButton';
import { FileUploader } from '../../components/FileUploader';
import { ImportFormValuesButton } from './ImportFormValuesButton';
import { LocalStorageSaveSection } from './LocalStorageSaveSection';
import { LocalStorageSelectSection } from './LocalStorageSelectSection';

interface Props extends ModalProps {
  closeModal: () => void;
}

export function SaveLoadModal(props: Props) {
  const { closeModal, open } = props;

  return (
    <Modal title="入力データ管理" open={open} onCancel={closeModal} width={600} {...props} footer={null}>
      <LocalStorageSection />
      <FileSection />
    </Modal>
  );
}

function LocalStorageSection() {
  return (
    <>
      <Typography.Title level={5}>ローカルストレージで管理</Typography.Title>
      <p>ブラウザのローカルストレージに保存されます</p>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
        <LocalStorageSaveSection />
        <LocalStorageSelectSection />
      </div>
    </>
  );
}

function FileSection() {
  const [file, setFile] = useState<File | null>(null);
  return (
    <>
      <Typography.Title level={5}>ファイルで管理</Typography.Title>
      <p>JSON形式で保存されます</p>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <ExportFormValuesButton />
        <FileUploader onFileLoaded={setFile} accept=".json" />
        <ImportFormValuesButton file={file} />
      </div>
    </>
  );
}
