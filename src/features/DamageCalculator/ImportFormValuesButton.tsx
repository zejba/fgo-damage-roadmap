import { useCallback } from 'react';
import { message } from 'antd';
import { FileAddOutlined } from '@ant-design/icons';
import { validateDamageCalcFormValue } from '../../zod-schema/damageCalcFormSchema';
import { setFormDataAtom } from '../../store/formData';
import { useSetAtom } from 'jotai';
import { PrimaryOutlinedButton } from '../../components/Button.tsx/PrimaryOutlinedButton';

interface ImportFormValuesButtonProps {
  file: File | null;
  disabled?: boolean;
}

export function ImportFormValuesButton({ file, disabled }: ImportFormValuesButtonProps) {
  const setFormData = useSetAtom(setFormDataAtom);

  const handleClick = useCallback(() => {
    if (!file) {
      message.error('ファイルが選択されていません');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        if (typeof e.target?.result !== 'string') {
          throw new Error('Invalid file content');
        }
        const data = validateDamageCalcFormValue(JSON.parse(e.target.result));
        setFormData(data);
        message.success('ファイルの内容を反映しました');
      } catch (error) {
        console.error(error);
        message.error('ファイルの読み込みに失敗しました');
      }
    };
    reader.onerror = (error) => {
      console.error(error);
      message.error('ファイルの読み込みに失敗しました');
    };
    reader.readAsText(file);
  }, [file, setFormData]);

  return (
    <PrimaryOutlinedButton onClick={handleClick} disabled={disabled || !file} startIcon={<FileAddOutlined />}>
      適用
    </PrimaryOutlinedButton>
  );
}
