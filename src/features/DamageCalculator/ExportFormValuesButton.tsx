import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { Button, Space } from 'antd';
import { format } from 'date-fns';
import { DownloadOutlined } from '@ant-design/icons';
import { currentFormDataAtom } from '../../store/formData';

export function ExportFormValuesButton() {
  const handleExport = useAtomCallback(
    useCallback((get) => {
      const values = get(currentFormDataAtom);
      const title = values.title.trim();
      const fileNameSafeTitle = title.replace(/[/\\?%*:|"<>]/g, '_');
      const json = JSON.stringify(values, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileNameSafeTitle
        ? `${fileNameSafeTitle}.json`
        : `fgo_damage_roadmap_input_${format(new Date(), 'yyyyMMddHHmmss')}.json`;
      a.click();
      URL.revokeObjectURL(url);
      a.remove();
    }, [])
  );

  return (
    <Space>
      <Button type="primary" onClick={handleExport} icon={<DownloadOutlined />}>
        エクスポート
      </Button>
    </Space>
  );
}
