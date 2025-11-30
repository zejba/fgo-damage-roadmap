import { useAtomCallback } from 'jotai/utils';
import { useSnackbar } from '../../../hooks/useSnackbarContext';
import { useCallback, useState } from 'react';
import { FormContainer } from '../../../components/FormContainer';
import { defaultTurn, turnsAtom } from '../../../store/turns';
import { v4 } from 'uuid';
import questData from '../../../data/quest_data';
import { enemyClassOptions, enemyAttrOptions } from '../../../data/options';
import { Compact } from '../../../components/Compact';
import { CompactItemText } from '../../../components/CompactItemText';
import { Select } from '../../../components/Select';
import { PrimaryOutlinedButton } from '../../../components/Button.tsx/PrimaryOutlinedButton';
import { Autocomplete, TextField } from '@mui/material';

const questOptions = questData.map((quest) => ({
  value: quest.id,
  label: quest.name
}));

export function QuestAutoFillTab() {
  const [selectedQuestId, setSelectedQuestId] = useState<string | null>(null);
  const [classAffinity, setClassAffinity] = useState<number>(1.0);
  const [attributeAffinity, setAttributeAffinity] = useState<number>(1.0);
  const snackbar = useSnackbar();

  const handleSubmit = useAtomCallback(
    useCallback(
      (_get, set) => {
        if (!selectedQuestId) return;
        const quest = questData.find((q) => q.id === selectedQuestId);
        if (!quest) return;
        const turns = quest.turns.map((turn) => ({
          id: v4(),
          ...defaultTurn,
          params: {
            ...defaultTurn.params,
            classAffinity,
            attributeAffinity,
            targetDamage: turn.targetDamage,
            dtdr: turn.dtdr ?? 100,
            dsr: turn.dsr
          }
        }));

        set(turnsAtom, turns);
        snackbar.success(`${quest.name}の情報を入力しました`);
      },
      [selectedQuestId, classAffinity, attributeAffinity, snackbar]
    )
  );

  return (
    <FormContainer>
      <Autocomplete
        options={questOptions}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => <TextField {...params} size="small" style={{ width: 300 }} label="クエスト選択" />}
        value={selectedQuestId ? questOptions.find((option) => option.value === selectedQuestId) || null : null}
        onChange={(_event, newValue) => {
          setSelectedQuestId(newValue ? newValue.value : null);
        }}
      />
      <Compact>
        <CompactItemText>クラス相性</CompactItemText>
        <Select
          value={classAffinity.toString()}
          onValueChange={(value) => setClassAffinity(parseFloat(value))}
          options={enemyClassOptions}
          style={{ width: 60 }}
        />
        <CompactItemText>属性相性</CompactItemText>
        <Select
          value={attributeAffinity.toString()}
          onValueChange={(value) => setAttributeAffinity(parseFloat(value))}
          options={enemyAttrOptions}
          style={{ width: 60 }}
        />
      </Compact>
      ※ 入力済みのターン情報は上書きされます
      <PrimaryOutlinedButton onClick={handleSubmit} disabled={selectedQuestId === null}>
        入力
      </PrimaryOutlinedButton>
    </FormContainer>
  );
}
