import { ModalProps, Modal, Typography, Tabs } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
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

  const tabItems = [
    {
      key: 'localStorage',
      label: 'ローカルストレージ',
      children: <LocalStorageSection />
    },
    {
      key: 'file',
      label: 'ファイル',
      children: <FileSection />
    },
    {
      key: 'migration',
      label: 'データ移行',
      children: <MigrationSection />
    }
  ];

  return (
    <Modal title="入力データ管理" open={open} onCancel={closeModal} width={600} footer={null} {...props}>
      <Tabs items={tabItems} />
    </Modal>
  );
}

function LocalStorageSection() {
  return (
    <>
      <Typography.Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
        ブラウザのローカルストレージに保存されます
      </Typography.Text>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <Typography.Title level={5} style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
            保存
          </Typography.Title>
          <LocalStorageSaveSection />
        </div>
        <div>
          <Typography.Title level={5} style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
            読み込み
          </Typography.Title>
          <LocalStorageSelectSection />
        </div>
      </div>
    </>
  );
}

function FileSection() {
  const [file, setFile] = useState<File | null>(null);
  return (
    <>
      <Typography.Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
        JSON形式で保存・読み込みます
      </Typography.Text>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <Typography.Title level={5} style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
            保存
          </Typography.Title>
          <ExportFormValuesButton />
        </div>
        <div>
          <Typography.Title level={5} style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
            読み込み
          </Typography.Title>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
            <FileUploader onFileLoaded={setFile} accept=".json" />
            <ImportFormValuesButton file={file} />
          </div>
        </div>
      </div>
    </>
  );
}

function MigrationSection() {
  return (
    <>
      <Typography.Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
        旧版のダメージ計算ツールからデータを移行できます
      </Typography.Text>
      <Link to="/convert-from-old-service" style={{ fontSize: '16px' }}>
        データ移行ページへ →
      </Link>
    </>
  );
}
