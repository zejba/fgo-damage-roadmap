import { Button, Select, Space, Popconfirm } from 'antd';
import { useState, useCallback, useMemo } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { message } from 'antd';
import { DeleteOutlined, SaveOutlined, FileAddOutlined } from '@ant-design/icons';
import {
  servantClassAtom,
  servantAttributeAtom,
  servantAtkAtom,
  craftEssenceAtkAtom,
  npColorAtom,
  npValueAtom,
  footprintBAtom,
  footprintAAtom,
  footprintQAtom,
  npGainAtom,
  starRateAtom,
  hitCountNAtom,
  hitCountBAtom,
  hitCountAAtom,
  hitCountQAtom,
  hitCountEXAtom
} from '../../store/servantParams';
import { startingBuffsAtom } from '../../store/startingBuffs';
import { turnsAtom } from '../../store/turns';
import { isColoredAtom, isRequiredNpStarCalcAtom } from '../../store/jotai';
import {
  savedFormsArrayAtom,
  overwriteFormDataAtom,
  deleteFormDataAtom,
  getFormDataByIdAtom
} from '../../store/localStorage';
import { currentFormDataAtom } from '../../store/formData';

export function LocalStorageSelectSection() {
  const [selectedSaveId, setSelectedSaveId] = useState<string | undefined>(undefined);
  const savedDataList = useAtomValue(savedFormsArrayAtom);
  const overwriteFormData = useSetAtom(overwriteFormDataAtom);
  const deleteFormData = useSetAtom(deleteFormDataAtom);
  const getFormDataById = useAtomValue(getFormDataByIdAtom);

  // データを読み込み
  const loadData = useAtomCallback(
    useCallback(
      (_get, set, id: string) => {
        try {
          const savedData = getFormDataById(id);
          if (!savedData) {
            message.error('データが見つかりません');
            return false;
          }

          const data = savedData.data;
          set(servantClassAtom, data.servantClass);
          set(servantAttributeAtom, data.servantAttribute);
          set(servantAtkAtom, data.servantAtk);
          set(craftEssenceAtkAtom, data.craftEssenceAtk);
          set(npColorAtom, data.npColor);
          set(npValueAtom, data.npValue);
          set(footprintBAtom, data.footprintB);
          set(footprintAAtom, data.footprintA);
          set(footprintQAtom, data.footprintQ);
          set(npGainAtom, data.npGain);
          set(starRateAtom, data.starRate);
          set(hitCountNAtom, data.hitCountN);
          set(hitCountBAtom, data.hitCountB);
          set(hitCountAAtom, data.hitCountA);
          set(hitCountQAtom, data.hitCountQ);
          set(hitCountEXAtom, data.hitCountEX);
          set(startingBuffsAtom, data.startingBuffs);
          set(turnsAtom, data.turns);
          set(isColoredAtom, data.isColored);
          set(isRequiredNpStarCalcAtom, data.isNpStarCalculated);

          message.success(`"${savedData.name}" を読み込みました`);
          return true;
        } catch (error) {
          console.error('Load failed:', error);
          message.error('読み込みに失敗しました');
          return false;
        }
      },
      [getFormDataById]
    )
  );

  const handleLoad = useCallback(() => {
    if (!selectedSaveId) return;
    loadData(selectedSaveId);
  }, [loadData, selectedSaveId]);

  const handleOverwrite = useAtomCallback(
    useCallback(
      (get, _set, selectedId: string | undefined) => {
        try {
          if (!selectedId) return;
          const formData = get(currentFormDataAtom);
          const updatedData = overwriteFormData({ id: selectedId, data: formData });
          message.success(`"${updatedData.name}" を上書きしました`);
        } catch (error) {
          console.error('Overwrite failed:', error);
          if (error instanceof Error) {
            message.error(error.message);
          } else {
            message.error('上書き保存に失敗しました');
          }
        }
      },
      [overwriteFormData]
    )
  );

  const handleOverwriteClick = useCallback(() => {
    if (!selectedSaveId) return;
    handleOverwrite(selectedSaveId);
  }, [handleOverwrite, selectedSaveId]);

  const handleDelete = useCallback(() => {
    if (!selectedSaveId) return;
    try {
      const deletedData = deleteFormData(selectedSaveId);
      if (deletedData) {
        message.success(`"${deletedData.name}" を削除しました`);
        setSelectedSaveId(undefined);
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
        <Select
          style={{ width: '100%' }}
          placeholder="データを選択"
          value={selectedSaveId}
          onChange={setSelectedSaveId}
          options={selectOptions}
          allowClear
        />
        <Space>
          <Button icon={<FileAddOutlined />} onClick={handleLoad} disabled={!selectedSaveId}>
            適用
          </Button>
          <Popconfirm
            title="上書き保存の確認"
            description="選択したデータに現在の入力内容を上書きしますか？"
            onConfirm={handleOverwriteClick}
            okText="上書き保存"
            cancelText="キャンセル"
          >
            <Button type="primary" icon={<SaveOutlined />} disabled={!selectedSaveId}>
              上書き保存
            </Button>
          </Popconfirm>
          <Popconfirm
            title="削除の確認"
            description="選択したデータを削除しますか？"
            onConfirm={handleDelete}
            okText="削除"
            cancelText="キャンセル"
          >
            <Button danger icon={<DeleteOutlined />} disabled={!selectedSaveId}>
              削除
            </Button>
          </Popconfirm>
        </Space>
      </Space>
    </div>
  );
}
