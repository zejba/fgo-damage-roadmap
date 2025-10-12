import { Button, message, Select, Space, Typography } from 'antd';
import { useAtomCallback } from 'jotai/utils';
import { useCallback, useState } from 'react';
import { FormContainer } from '../../../components/FormContainer';
import SpaceCompactHeader from '../../../components/SpaceCompactHeader';
import { defaultTurn, turnsAtom } from '../../../store/turns';
import { v4 } from 'uuid';
import questData from '../../../data/quest_data';
import { enemyClassOptions, enemyAttrOptions } from '../../../data/options';

const questOptions = questData.map((quest) => ({
  value: quest.id,
  label: quest.name
}));

export function QuestAutoFillTab() {
  const [selectedQuestId, setSelectedQuestId] = useState<string | null>(null);
  const [classAffinity, setClassAffinity] = useState<number>(1.0);
  const [attributeAffinity, setAttributeAffinity] = useState<number>(1.0);

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
        message.success(`${quest.name}の情報を入力しました`);
      },
      [selectedQuestId, classAffinity, attributeAffinity]
    )
  );

  return (
    <FormContainer>
      <Select
        placeholder="クエスト名"
        options={questOptions}
        showSearch
        optionFilterProp="label"
        value={selectedQuestId}
        onChange={setSelectedQuestId}
        style={{ width: 400, maxWidth: '100%' }}
      />

      <Space.Compact>
        <SpaceCompactHeader>クラス相性</SpaceCompactHeader>
        <Select value={classAffinity} onSelect={setClassAffinity} options={enemyClassOptions} style={{ width: 68 }} />
        <SpaceCompactHeader>属性相性</SpaceCompactHeader>
        <Select
          value={attributeAffinity}
          onSelect={setAttributeAffinity}
          options={enemyAttrOptions}
          style={{ width: 68 }}
        />
      </Space.Compact>
      <Typography.Text>※ 入力済みのターン情報は上書きされます</Typography.Text>

      <Button type="primary" onClick={handleSubmit} disabled={selectedQuestId === null} style={{ marginTop: 16 }}>
        入力
      </Button>
    </FormContainer>
  );
}
