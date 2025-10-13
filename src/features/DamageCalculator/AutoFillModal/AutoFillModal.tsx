import { type ModalProps, Tabs } from 'antd';
import { QuestAutoFillTab } from './QuestAutoFillTab';
import { ServantAutoFillTab } from './ServantAutoFillTab';
import { Modal } from '../../../components/Modal';

interface AutoFillModalProps extends ModalProps {
  closeModal: () => void;
}

function AutoFillModal(props: AutoFillModalProps) {
  const { closeModal, ...rest } = props;

  const tabItems = [
    {
      key: 'servant',
      label: 'サーヴァント情報',
      children: <ServantAutoFillTab />
    },
    {
      key: 'quest',
      label: 'クエスト情報',
      children: <QuestAutoFillTab />
    }
  ];

  return (
    <Modal title="自動入力" onCancel={closeModal} footer={null} width={600} {...rest}>
      <Tabs items={tabItems} />
    </Modal>
  );
}

export default AutoFillModal;
