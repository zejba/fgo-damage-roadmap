import { CameraOutlined } from '@ant-design/icons';
import { message } from 'antd';
import html2canvas from 'html2canvas';
import type { RefObject } from 'react';
import { PrimaryButton } from '../../components/Button.tsx/PrimaryButton';

type SaveResultAsImageButtonProps = {
  targetRef: RefObject<HTMLDivElement>;
};

function SaveResultAsImageButton({ targetRef }: SaveResultAsImageButtonProps) {
  const handleSaveAsImage = async () => {
    if (!targetRef.current) {
      message.error('対象の要素が見つかりません');
      return;
    }

    const hideLoading = message.loading('画像を生成中...', 0);
    try {
      const canvas = await html2canvas(targetRef.current, {
        backgroundColor: '#ffffff',
        scale: 2
      });

      const link = document.createElement('a');
      link.download = `result-table-${new Date().getTime()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      hideLoading();
      message.success('画像を保存しました');
    } catch (error) {
      hideLoading();
      console.error(error);
      message.error('画像の保存に失敗しました');
    }
  };

  return (
    <PrimaryButton onClick={handleSaveAsImage} startIcon={<CameraOutlined />}>
      結果を画像として保存
    </PrimaryButton>
  );
}

export default SaveResultAsImageButton;
