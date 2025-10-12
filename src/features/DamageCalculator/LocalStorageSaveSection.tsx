import { Button, Space } from 'antd';
import { useCallback } from 'react';
import { useSetAtom } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { message } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { saveFormDataAtom } from '../../store/localStorage';
import { currentFormDataAtom } from '../../store/formData';

export function LocalStorageSaveSection() {
  const saveFormData = useSetAtom(saveFormDataAtom);

  const handleSave = useAtomCallback(
    useCallback(
      (get) => {
        try {
          const formData = get(currentFormDataAtom);
          saveFormData({ name: formData.title.trim() || '無題', data: formData });
          message.success('データを保存しました');
          return true;
        } catch (error) {
          console.error('Save failed:', error);
          if (error instanceof Error) {
            message.error(error.message);
          } else {
            message.error('保存に失敗しました');
          }
          return false;
        }
      },
      [saveFormData]
    )
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
      <Space>
        <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
          保存
        </Button>
      </Space>
    </div>
  );
}
