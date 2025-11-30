import { Tabs, Tab, DialogTitle } from '@mui/material';
import { useState } from 'react';
import { Dialog } from '../../../components/Dialog';
import { QuestAutoFillTab } from './QuestAutoFillTab';
import { ServantAutoFillTab } from './ServantAutoFillTab';
import { DialogContent } from '../../../components/DialogContent';
import styled from 'styled-components';

interface AutoFillModalProps {
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
  min-height: 260px;
`;

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
      {value === index && <TabPanelWrapper>{children}</TabPanelWrapper>}
    </div>
  );
}

function AutoFillModal(props: AutoFillModalProps) {
  const { closeModal, ...rest } = props;
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Dialog onClose={closeModal} fullWidth {...rest}>
      <DialogTitle>自動入力</DialogTitle>
      <DialogContent>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="サーヴァント情報" />
          <Tab label="クエスト情報" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <ServantAutoFillTab />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <QuestAutoFillTab />
        </TabPanel>
      </DialogContent>
    </Dialog>
  );
}

export default AutoFillModal;
