import { useCallback } from 'react';
import { FileAddOutlined } from '@ant-design/icons';
import { useSnackbar } from '../../hooks/useSnackbarContext';
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
  const snackbar = useSnackbar();

  const handleClick = useCallback(() => {
    if (!file) {
      snackbar.error('ファイルが選択されていません');
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
        snackbar.success('ファイルの内容を反映しました');
      } catch (error) {
        console.error(error);
        snackbar.error('ファイルの読み込みに失敗しました');
      }
    };
    reader.onerror = (error) => {
      console.error(error);
      snackbar.error('ファイルの読み込みに失敗しました');
    };
    reader.readAsText(file);
  }, [file, setFormData, snackbar]);

  return (
    <PrimaryOutlinedButton onClick={handleClick} disabled={disabled || !file} startIcon={<FileAddOutlined />}>
      適用
    </PrimaryOutlinedButton>
  );
}
