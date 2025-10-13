import { Space, Popconfirm } from 'antd';
import { useState, useCallback, useMemo } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { message } from 'antd';
import { DeleteOutlined, FileAddOutlined } from '@ant-design/icons';
import { savedFormsArrayAtom, deleteFormDataAtom, getFormDataByIdAtom } from '../../store/localStorage';
import { setFormDataAtom } from '../../store/formData';
import { validateDamageCalcFormValue } from '../../zod-schema/damageCalcFormSchema';
import { Select } from '../../components/Select';
import { Compact } from '../../components/Compact';
import { PrimaryOutlinedButton } from '../../components/Button.tsx/PrimaryOutlinedButton';
import { DangerOutlinedButton } from '../../components/Button.tsx/DangerOutlinedButton';

export function LocalStorageSelectSection() {
  const [selectedSaveId, setSelectedSaveId] = useState<string | null>(null);
  const savedDataList = useAtomValue(savedFormsArrayAtom);
  const deleteFormData = useSetAtom(deleteFormDataAtom);
  const getFormDataById = useAtomValue(getFormDataByIdAtom);
  const setFormData = useSetAtom(setFormDataAtom);

  // データを読み込み
  const loadData = useCallback(
    (id: string) => {
      try {
        const savedData = getFormDataById(id);
        if (!savedData) {
          message.error('データが見つかりません');
          return false;
        }
        const data = validateDamageCalcFormValue(savedData.data);
        setFormData(data);
        message.success(`${savedData.name} を反映しました`);
        return true;
      } catch (error) {
        console.error('Load failed:', error);
        message.error('読み込みに失敗しました');
        return false;
      }
    },
    [getFormDataById, setFormData]
  );

  const handleLoad = useCallback(() => {
    if (!selectedSaveId) return;
    loadData(selectedSaveId);
  }, [loadData, selectedSaveId]);

  const handleDelete = useCallback(() => {
    if (!selectedSaveId) return;
    try {
      const deletedData = deleteFormData(selectedSaveId);
      if (deletedData) {
        message.success(`${deletedData.name} を削除しました`);
        setSelectedSaveId(null);
      } else {
        message.error('データが見つかりません');
      }
    } catch (error) {
      console.error('Delete failed:', error);
      message.error('削除に失敗しました');
    }
  }, [deleteFormData, selectedSaveId]);

  const selectOptions = useMemo(
    () =>
      savedDataList.map((save) => ({
        label: `${save.name} (${new Date(save.updatedAt).toLocaleString()})`,
        value: save.id
      })),
    [savedDataList]
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Compact>
          <Select
            style={{ width: '100%', paddingLeft: 4 }}
            value={selectedSaveId}
            onValueChange={setSelectedSaveId}
            options={selectOptions}
          />
        </Compact>
        <Space>
          <PrimaryOutlinedButton startIcon={<FileAddOutlined />} onClick={handleLoad} disabled={!selectedSaveId}>
            適用
          </PrimaryOutlinedButton>
          <Popconfirm
            title="削除の確認"
            description="選択したデータを削除しますか？"
            onConfirm={handleDelete}
            okText="削除"
            cancelText="キャンセル"
            okType="danger"
          >
            <DangerOutlinedButton startIcon={<DeleteOutlined />} disabled={!selectedSaveId}>
              削除
            </DangerOutlinedButton>
          </Popconfirm>
        </Space>
      </Space>
    </div>
  );
}
