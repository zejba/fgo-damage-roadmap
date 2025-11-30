import { Tabs, Tab, DialogTitle } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExportFormValuesButton } from './ExportFormValuesButton';
import { FileUploader } from '../../components/FileUploader';
import { ImportFormValuesButton } from './ImportFormValuesButton';
import { LocalStorageSaveSection } from './LocalStorageSaveSection';
import { LocalStorageSelectSection } from './LocalStorageSelectSection';
import { Dialog } from '../../components/Dialog';
import { DialogContent } from '../../components/DialogContent';
import { styled } from 'styled-components';

interface Props {
  open: boolean;
  closeModal: () => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanelWrapper = styled.div`
  padding: 16px;
  min-height: 200px;
`;

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
      {value === index && <TabPanelWrapper>{children}</TabPanelWrapper>}
    </div>
  );
}

export function SaveLoadModal(props: Props) {
  const { closeModal, open } = props;
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Dialog open={open} onClose={closeModal} fullWidth>
      <DialogTitle>入力データ管理</DialogTitle>
      <DialogContent>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="ローカルストレージ" />
          <Tab label="ファイル" />
          <Tab label="データ移行" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <LocalStorageSection />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FileSection />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <MigrationSection />
        </TabPanel>
      </DialogContent>
    </Dialog>
  );
}

function LocalStorageSection() {
  return (
    <>
      <div style={{ marginBottom: 16 }}>ブラウザのローカルストレージに保存</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <LocalStorageSaveSection />
        <div>
          <div style={{ marginBottom: 4, marginLeft: 4 }}>読み込み</div>
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
      <div style={{ marginBottom: 16 }}>JSONファイルで保存</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <ExportFormValuesButton />
        <div>
          <div style={{ marginBottom: 4, marginLeft: 4 }}>読み込み</div>
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
      <div style={{ marginBottom: 16 }}>旧版のダメージ計算ツールからデータを移行できます</div>
      <Link to="/convert-from-old-service" style={{ fontSize: '16px' }}>
        データ移行ページへ →
      </Link>
    </>
  );
}
