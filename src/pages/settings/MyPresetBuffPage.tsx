import { type PrimitiveAtom, useAtom, useSetAtom, WritableAtom } from 'jotai';
import { SetStateAction, useCallback, useEffect, useMemo } from 'react';
import { splitAtom, useAtomCallback } from 'jotai/utils';
import { v4 } from 'uuid';
import styled from 'styled-components';
import AddBuffButton from '../../components/AddBuffButton';
import { FormContainer } from '../../components/FormContainer';
import { PrimaryButton } from '../../components/Button.tsx/PrimaryButton';
import { PrimaryOutlinedButton } from '../../components/Button.tsx/PrimaryOutlinedButton';
import { PageTitle } from '../../components/PageTitle';
import { Input } from '../../components/Input';
import type { Buff, BuffSet } from '../../data/types';
import {
  addTmpPresetBuffSetAtom,
  tmpPresetBuffSetAtomsAtom,
  savePresetBuffSetsAtom,
  resetPresetBuffSetsAtom
} from '../../store/myPresetBuffs';
import { MemoizedBuffForm } from '../../features/DamageCalculator/BuffForm';
import { useSnackbar } from '../../hooks/useSnackbarContext';
import { Card } from '../../components/Card';
import { Compact } from '../../components/Compact';
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { focusAtom } from 'jotai-optics';
import { defaultBuff } from '../../store/startingBuffs';

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

const SetHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function BuffNameInput({ buffNameAtom }: { buffNameAtom: WritableAtom<string, [SetStateAction<string>], void> }) {
  const [name, setName] = useAtom(buffNameAtom);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    },
    [setName]
  );

  return (
    <Compact style={{ flex: 1, maxWidth: '300px' }}>
      <Input style={{ width: '100%' }} value={name} onChange={handleChange} placeholder="セット名" />
    </Compact>
  );
}

interface BuffFormsProps {
  buffsAtom: WritableAtom<Buff[], [SetStateAction<Buff[]>], void>;
}

function BuffForms(props: BuffFormsProps) {
  const { buffsAtom } = props;
  const buffAtomsAtom = useMemo(() => splitAtom(buffsAtom, (effect) => effect.id), [buffsAtom]);

  const addBuff = useAtomCallback(
    useCallback(
      (get, set) => {
        set(buffsAtom, [...get(buffsAtom), { ...defaultBuff, id: v4() }]);
      },
      [buffsAtom]
    )
  );
  const [buffAtoms, dispatch] = useAtom(buffAtomsAtom);
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
  return (
    <FormContainer style={{ gap: 2, width: '100%' }}>
      <div style={{ marginTop: '8px' }}>
        <AddBuffButton onClick={addBuff} />
      </div>
      {buffAtoms.map((buffAtom, index) => (
        <MemoizedBuffForm
          key={`${buffAtom}`}
          buffAtom={buffAtom}
          remove={handleRemove}
          move={handleMove}
          beforeAtom={buffAtoms[index - 1]}
        />
      ))}
    </FormContainer>
  );
}

interface BuffSetCardProps {
  buffSetAtom: PrimitiveAtom<BuffSet>;
  remove: (atom: PrimitiveAtom<BuffSet>) => void;
}

function BuffSetCard({ buffSetAtom, remove }: BuffSetCardProps) {
  const buffNameAtom = useMemo(() => focusAtom(buffSetAtom, (optic) => optic.prop('name')), [buffSetAtom]);

  const buffsAtom = useMemo(() => focusAtom(buffSetAtom, (optic) => optic.prop('buffs')), [buffSetAtom]);

  const handleRemoveSet = useCallback(() => {
    remove(buffSetAtom);
  }, [remove, buffSetAtom]);

  return (
    <Card style={{ width: '100%' }}>
      <SetHeader>
        <BuffNameInput buffNameAtom={buffNameAtom} />
        <IconButton size="small" onClick={handleRemoveSet}>
          {<Close />}
        </IconButton>
      </SetHeader>
      <BuffForms buffsAtom={buffsAtom} />
    </Card>
  );
}

function MyPresetBuffPage() {
  const addBuffSet = useSetAtom(addTmpPresetBuffSetAtom);
  const [buffSetAtoms, dispatchBuffSet] = useAtom(tmpPresetBuffSetAtomsAtom);
  const saveBuffSets = useSetAtom(savePresetBuffSetsAtom);
  const resetBuffSets = useSetAtom(resetPresetBuffSetsAtom);
  const { success } = useSnackbar();

  // コンポーネントマウント時に保存済みデータを読み込む
  useEffect(() => {
    resetBuffSets();
  }, [resetBuffSets]);

  const handleAddBuffSet = useCallback(() => {
    addBuffSet([{ name: '', buffs: [] }]);
  }, [addBuffSet]);

  const handleRemoveBuffSet = useCallback(
    (atom: PrimitiveAtom<BuffSet>) => {
      dispatchBuffSet({ type: 'remove', atom });
    },
    [dispatchBuffSet]
  );

  const handleSave = useCallback(() => {
    saveBuffSets();
    success('バフセットを保存しました');
  }, [saveBuffSets, success]);

  const handleReset = useCallback(() => {
    resetBuffSets();
  }, [resetBuffSets]);

  return (
    <>
      <PageTitle>バフセット設定</PageTitle>
      <div style={{ marginBottom: '8px' }}>
        ブラウザのローカルストレージにバフセットを保存します。ダメージ計算画面で呼び出せます。
      </div>
      <FormContainer style={{ gap: 2, width: '100%' }}>
        <PrimaryOutlinedButton onClick={handleAddBuffSet}>セット追加</PrimaryOutlinedButton>
        {buffSetAtoms.map((buffSetAtom) => (
          <BuffSetCard key={`${buffSetAtom}`} buffSetAtom={buffSetAtom} remove={handleRemoveBuffSet} />
        ))}
      </FormContainer>
      <ButtonContainer>
        <PrimaryButton onClick={handleSave}>保存</PrimaryButton>
        <PrimaryOutlinedButton onClick={handleReset}>リセット</PrimaryOutlinedButton>
      </ButtonContainer>
    </>
  );
}

export default MyPresetBuffPage;
