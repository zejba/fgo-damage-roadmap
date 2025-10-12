import { Input, Button, Space } from 'antd';
import { useState, useCallback } from 'react';
import { useSetAtom } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { message } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { saveFormDataAtom } from '../../store/localStorage';
import { currentFormDataAtom } from '../../store/formData';

export function LocalStorageSaveSection() {
  const [saveName, setSaveName] = useState('');
  const saveFormData = useSetAtom(saveFormDataAtom);

  const handleSave = useAtomCallback(
    useCallback(
      (get, _set, name: string) => {
        try {
          const formData = get(currentFormDataAtom);
          saveFormData({ name: name.trim() ? name.trim() : '無題', data: formData });
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

  const handleSaveClick = useCallback(() => {
    const success = handleSave(saveName);
    if (success) {
      setSaveName('');
    }
  }, [handleSave, saveName]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSaveName(e.target.value);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
      <Space>
        <Input placeholder="無題" value={saveName} onChange={handleInputChange} onPressEnter={handleSaveClick} />
        <Button type="primary" icon={<SaveOutlined />} onClick={handleSaveClick}>
          保存
        </Button>
      </Space>
    </div>
  );
}
