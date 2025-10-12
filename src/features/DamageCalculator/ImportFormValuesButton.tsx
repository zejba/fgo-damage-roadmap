import { useCallback } from 'react';
import { Button, message } from 'antd';
import { FileAddOutlined } from '@ant-design/icons';
import { validateDamageCalcFormValue } from '../../zod-schema/damageCalcFormSchema';
import { setFormDataAtom } from '../../store/formData';
import { useSetAtom } from 'jotai';

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
    <Button type="default" onClick={handleClick} disabled={disabled || !file} icon={<FileAddOutlined />}>
      適用
    </Button>
  );
}
