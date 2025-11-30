import { useCallback } from 'react';
import { useSetAtom } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { useSnackbar } from '../../hooks/useSnackbarContext';
import { SaveOutlined } from '@ant-design/icons';
import { saveFormDataAtom } from '../../store/localStorage';
import { currentFormDataAtom } from '../../store/formData';
import { PrimaryButton } from '../../components/Button.tsx/PrimaryButton';

export function LocalStorageSaveSection() {
  const saveFormData = useSetAtom(saveFormDataAtom);
  const snackbar = useSnackbar();

  const handleSave = useAtomCallback(
    useCallback(
      (get) => {
        try {
          const formData = get(currentFormDataAtom);
          saveFormData({ name: formData.title.trim() || '無題', data: formData });
          snackbar.success('データを保存しました');
          return true;
        } catch (error) {
          console.error('Save failed:', error);
          if (error instanceof Error) {
            snackbar.error(error.message);
          } else {
            snackbar.error('保存に失敗しました');
          }
          return false;
        }
      },
      [saveFormData, snackbar]
    )
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
      <PrimaryButton startIcon={<SaveOutlined />} onClick={handleSave} style={{ height: 36 }}>
        保存
      </PrimaryButton>
    </div>
  );
}
