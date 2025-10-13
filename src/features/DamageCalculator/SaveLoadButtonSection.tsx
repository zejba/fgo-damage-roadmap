import { SaveOutlined } from '@ant-design/icons';
import { SaveLoadModal } from './SaveLoadModal';
import { useBoolean } from '../../hooks/useBoolean';
import { PrimaryOutlinedButton } from '../../components/Button.tsx/PrimaryOutlinedButton';

export function SaveLoadButtonSection() {
  const [isModalOpen, openModal, closeModal] = useBoolean(false);
  return (
    <>
      <PrimaryOutlinedButton startIcon={<SaveOutlined />} onClick={openModal}>
        データ管理
      </PrimaryOutlinedButton>
      <SaveLoadModal closeModal={closeModal} open={isModalOpen} />
    </>
  );
}
