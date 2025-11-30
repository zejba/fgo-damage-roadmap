import { type PrimitiveAtom, useAtom, useSetAtom } from 'jotai';
import { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import AddBuffButton from '../../components/AddBuffButton';
import { FormContainer } from '../../components/FormContainer';
import { PrimaryButton } from '../../components/Button.tsx/PrimaryButton';
import { PrimaryOutlinedButton } from '../../components/Button.tsx/PrimaryOutlinedButton';
import type { Buff } from '../../data/types';
import {
  addTmpPresetBuffsAtom,
  tmpPresetBuffAtomsAtom,
  savePresetBuffsAtom,
  resetPresetBuffsAtom
} from '../../store/myPresetBuffs';
import { MemoizedBuffForm } from '../../features/DamageCalculator/BuffForm';
import { useSnackbar } from '../../hooks/useSnackbarContext';
import { defaultBuff } from '../../store/startingBuffs';

const Title = styled.h2`
  margin-top: 4px;
  margin-left: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

function BuffFormsSection() {
  const [buffAtoms, dispatch] = useAtom(tmpPresetBuffAtomsAtom);
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
  return buffAtoms.map((buffAtom, index) => (
    <MemoizedBuffForm
      key={`${buffAtom}`}
      buffAtom={buffAtom}
      remove={handleRemove}
      move={handleMove}
      beforeAtom={buffAtoms[index - 1]}
    />
  ));
}

function MyPresetBuffPage() {
  const addBuff = useSetAtom(addTmpPresetBuffsAtom);
  const saveBuffs = useSetAtom(savePresetBuffsAtom);
  const resetBuffs = useSetAtom(resetPresetBuffsAtom);
  const { success } = useSnackbar();

  // コンポーネントマウント時に保存済みデータを読み込む
  useEffect(() => {
    resetBuffs();
  }, [resetBuffs]);

  const handleAddBuff = useCallback(() => {
    addBuff([{ ...defaultBuff, turn: -1 }]);
  }, [addBuff]);

  const handleSave = useCallback(() => {
    saveBuffs();
    success('プリセットバフを保存しました');
  }, [saveBuffs, success]);

  const handleReset = useCallback(() => {
    resetBuffs();
  }, [resetBuffs]);

  return (
    <>
      <Title>プリセットバフ設定</Title>
      <div style={{ marginBottom: '8px' }}>
        ブラウザのローカルストレージにプリセットバフを保存します。ダメージ計算画面で呼び出せます。
      </div>
      <FormContainer style={{ gap: 2, width: '100%' }}>
        <AddBuffButton onClick={handleAddBuff} />
        <BuffFormsSection />
      </FormContainer>
      <ButtonContainer>
        <PrimaryButton onClick={handleSave}>保存</PrimaryButton>
        <PrimaryOutlinedButton onClick={handleReset}>リセット</PrimaryOutlinedButton>
      </ButtonContainer>
    </>
  );
}

export default MyPresetBuffPage;
