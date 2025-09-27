import { Button, Card, Flex, Space } from 'antd';
import { type PrimitiveAtom, useAtom, useSetAtom } from 'jotai';
import { useCallback } from 'react';
import AddBuffButton from '../../components/AddBuffButton';
import { classScores } from '../../data/templateBuffs';
import type { Buff } from '../../data/types';
import { addBuffsAtom, defaultBuff, startingBuffAtomsAtom } from '../../store/startingBuffs';
import AddTemplateBuffsButton from './AddTemplateBuffsButton';
import { MemoizedBuffForm } from './BuffForm';

function AddClassScoresButton() {
  const addEffect = useSetAtom(addBuffsAtom);
  const addClassScores = useCallback(() => {
    addEffect(classScores);
  }, [addEffect]);
  return <Button onClick={addClassScores}>スコア追加</Button>;
}

function BuffFormsSection() {
  const [effectAtoms, dispatch] = useAtom(startingBuffAtomsAtom);
  const handleRemove = useCallback(
    (atom: PrimitiveAtom<Buff>) => {
      dispatch({ type: 'remove', atom });
    },
    [dispatch]
  );
  return effectAtoms.map((effectAtom) => (
    <MemoizedBuffForm key={`${effectAtom}`} buffAtom={effectAtom} remove={handleRemove} />
  ));
}

export function StartingBuffsSection() {
  const addBuff = useSetAtom(addBuffsAtom);
  const handleAddBuff = useCallback(() => {
    addBuff([defaultBuff]);
  }, [addBuff]);
  return (
    <Card title="パッシブ・開始時効果" style={{ width: '100%' }}>
      <Flex vertical gap={4} align="flex-start">
        <Space>
          <AddBuffButton onClick={handleAddBuff} />
          <AddClassScoresButton />
          <AddTemplateBuffsButton />
        </Space>
        <BuffFormsSection />
      </Flex>
    </Card>
  );
}
