import { type PrimitiveAtom, useAtom, useSetAtom } from 'jotai';
import { useCallback } from 'react';
import AddBuffButton from '../../components/AddBuffButton';
import { classScores } from '../../data/templateBuffs';
import type { Buff } from '../../data/types';
import { addBuffsAtom, defaultBuff, startingBuffAtomsAtom } from '../../store/startingBuffs';
import AddTemplateBuffsButton from './AddTemplateBuffsButton';
import AddPresetBuffsButton from './AddPresetBuffsButton';
import { MemoizedBuffForm } from './BuffForm';
import { Card } from '../../components/Card';
import { FormContainer } from '../../components/FormContainer';
import { PrimaryOutlinedButton } from '../../components/Button.tsx/PrimaryOutlinedButton';

function AddClassScoresButton() {
  const addEffect = useSetAtom(addBuffsAtom);
  const addClassScores = useCallback(() => {
    addEffect(classScores);
  }, [addEffect]);
  return <PrimaryOutlinedButton onClick={addClassScores}>スコア</PrimaryOutlinedButton>;
}

function BuffFormsSection() {
  const [effectAtoms, dispatch] = useAtom(startingBuffAtomsAtom);
  const handleRemove = useCallback(
    (atom: PrimitiveAtom<Buff>) => {
      dispatch({ type: 'remove', atom });
    },
    [dispatch]
  );
  const handleMove = useCallback(
    (atom: PrimitiveAtom<Buff>, before: PrimitiveAtom<Buff>) => {
      dispatch({ type: 'move', atom, before });
    },
    [dispatch]
  );
  return effectAtoms.map((effectAtom, index) => (
    <MemoizedBuffForm
      key={`${effectAtom}`}
      buffAtom={effectAtom}
      remove={handleRemove}
      move={handleMove}
      beforeAtom={effectAtoms[index - 1]}
    />
  ));
}

export function StartingBuffsSection() {
  const addBuff = useSetAtom(addBuffsAtom);
  const handleAddBuff = useCallback(() => {
    addBuff([{ ...defaultBuff, turn: -1 }]);
  }, [addBuff]);
  return (
    <Card header="パッシブ・開始時効果" style={{ width: '100%' }}>
      <FormContainer style={{ gap: 2, width: '100%' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <AddBuffButton onClick={handleAddBuff} />
          <AddClassScoresButton />
          <AddTemplateBuffsButton />
          <AddPresetBuffsButton addEffect={addBuff} />
        </div>
        <BuffFormsSection />
      </FormContainer>
    </Card>
  );
}
