import { Button } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { SaveLoadModal } from './SaveLoadModal';
import { useBoolean } from '../../hooks/useBoolean';

export function SaveLoadButtonSection() {
  const [isModalOpen, openModal, closeModal] = useBoolean(false);
  return (
    <>
      <Button icon={<SaveOutlined />} onClick={openModal}>
        保存・読み込み
      </Button>
      <SaveLoadModal closeModal={closeModal} open={isModalOpen} />
    </>
  );
}
