import { useState, useCallback, useMemo } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { useSnackbar } from '../../hooks/useSnackbarContext';
import { DeleteOutlined, FileAddOutlined } from '@ant-design/icons';
import { savedFormsArrayAtom, deleteFormDataAtom, getFormDataByIdAtom } from '../../store/localStorage';
import { setFormDataAtom } from '../../store/formData';
import { validateDamageCalcFormValue } from '../../zod-schema/damageCalcFormSchema';
import { Select } from '../../components/Select';
import { Compact } from '../../components/Compact';
import { PrimaryOutlinedButton } from '../../components/Button.tsx/PrimaryOutlinedButton';
import { DangerOutlinedButton } from '../../components/Button.tsx/DangerOutlinedButton';
import { DeleteConfirmDialog } from '../../components/DeleteConfirmDialog';
import { useBoolean } from '../../hooks/useBoolean';

export function LocalStorageSelectSection() {
  const [selectedSaveId, setSelectedSaveId] = useState<string | null>(null);
  const savedDataList = useAtomValue(savedFormsArrayAtom);
  const deleteFormData = useSetAtom(deleteFormDataAtom);
  const getFormDataById = useAtomValue(getFormDataByIdAtom);
  const setFormData = useSetAtom(setFormDataAtom);
  const snackbar = useSnackbar();
  const [openDeleteDialog, handleOpenDeleteDialog, handleCloseDeleteDialog] = useBoolean(false);

  // データを読み込み
  const loadData = useCallback(
    (id: string) => {
      try {
        const savedData = getFormDataById(id);
        if (!savedData) {
          snackbar.error('データが見つかりません');
          return false;
        }
        const data = validateDamageCalcFormValue(savedData.data);
        setFormData(data);
        snackbar.success(`${savedData.name} を反映しました`);
        return true;
      } catch (error) {
        console.error('Load failed:', error);
        snackbar.error('読み込みに失敗しました');
        return false;
      }
    },
    [getFormDataById, setFormData, snackbar]
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
        snackbar.success(`${deletedData.name} を削除しました`);
        setSelectedSaveId(null);
      } else {
        snackbar.error('データが見つかりません');
      }
    } catch (error) {
      console.error('Delete failed:', error);
      snackbar.error('削除に失敗しました');
    }
  }, [deleteFormData, selectedSaveId, snackbar]);

  const selectOptions = useMemo(
    () =>
      savedDataList.map((save) => ({
        label: `${save.name} (${new Date(save.updatedAt).toLocaleString()})`,
        value: save.id
      })),
    [savedDataList]
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8, width: '100%' }}>
      <Compact style={{ width: '100%' }}>
        <Select
          style={{ width: '100%', paddingLeft: 4 }}
          value={selectedSaveId}
          onValueChange={setSelectedSaveId}
          options={selectOptions}
          placeholder="選択してください"
        />
      </Compact>
      <div style={{ display: 'flex', gap: 8 }}>
        <PrimaryOutlinedButton startIcon={<FileAddOutlined />} onClick={handleLoad} disabled={!selectedSaveId}>
          適用
        </PrimaryOutlinedButton>
        <DangerOutlinedButton
          startIcon={<DeleteOutlined />}
          disabled={!selectedSaveId}
          onClick={handleOpenDeleteDialog}
        >
          削除
        </DangerOutlinedButton>
        <DeleteConfirmDialog
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          onConfirm={handleDelete}
          title="削除の確認"
          description="選択したデータを削除しますか？"
        />
      </div>
    </div>
  );
}
