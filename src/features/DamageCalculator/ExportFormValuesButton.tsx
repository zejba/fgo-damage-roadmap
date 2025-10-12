import { useAtomCallback } from 'jotai/utils';
import { useCallback, useState } from 'react';
import { Button, Input, Space } from 'antd';
import { format } from 'date-fns';
import { DownloadOutlined } from '@ant-design/icons';
import { currentFormDataAtom } from '../../store/formData';

export function ExportFormValuesButton() {
  const handleExport = useAtomCallback(
    useCallback((get, _set, fileName: string) => {
      const values = get(currentFormDataAtom);
      const json = JSON.stringify(values, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName
        ? `${fileName}.json`
        : `fgo_damage_roadmap_input_${format(new Date(), 'yyyyMMddHHmmss')}.json`;
      a.click();
      URL.revokeObjectURL(url);
      a.remove();
    }, [])
  );

  const [fileName, setFileName] = useState('');

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
  }, []);

  const handleSaveClick = useCallback(() => {
    handleExport(fileName);
  }, [handleExport, fileName]);

  return (
    <Space>
      <Input
        placeholder="ファイル名を入力"
        value={fileName}
        onChange={handleInputChange}
        onPressEnter={handleSaveClick}
      />
      <Button type="primary" onClick={handleSaveClick} icon={<DownloadOutlined />}>
        エクスポート
      </Button>
    </Space>
  );
}
