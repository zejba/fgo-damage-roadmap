import type { PrimitiveAtom } from 'jotai';
import { focusAtom } from 'jotai-optics';
import { splitAtom, useAtomCallback } from 'jotai/utils';
import { memo, useCallback, useMemo } from 'react';
import { v4 } from 'uuid';
import AddBuffButton from '../../../components/AddBuffButton';
import type { TurnFormValue } from '../../../data/types';
import { defaultBuff } from '../../../store/startingBuffs';
import { CardCard } from '../CardCard/CardCard';
import { TurnParamsSection } from './TurnParamsSection';
import { TurnStartingBuffForms } from './TurnStartingBuffForms';
import { Card } from '../../../components/Card';
import { FormContainer } from '../../../components/FormContainer';
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { DeleteConfirmDialog } from '../../../components/DeleteConfirmDialog';
import { useBoolean } from '../../../hooks/useBoolean';

interface TurnCardInnerProps {
  turnAtom: PrimitiveAtom<TurnFormValue>;
}

const TurnCardInner = memo((props: TurnCardInnerProps) => {
  const { turnAtom } = props;
  const turnParamsAtom = useMemo(() => focusAtom(turnAtom, (optic) => optic.prop('params')), [turnAtom]);
  const turnBuffsAtom = useMemo(() => focusAtom(turnAtom, (optic) => optic.prop('buffs')), [turnAtom]);
  const turnBuffAtomsAtom = useMemo(() => splitAtom(turnBuffsAtom, (effect) => effect.id), [turnBuffsAtom]);
  const card1Atom = useMemo(() => focusAtom(turnAtom, (optic) => optic.prop('card1')), [turnAtom]);
  const card2Atom = useMemo(() => focusAtom(turnAtom, (optic) => optic.prop('card2')), [turnAtom]);
  const card3Atom = useMemo(() => focusAtom(turnAtom, (optic) => optic.prop('card3')), [turnAtom]);
  const card4Atom = useMemo(() => focusAtom(turnAtom, (optic) => optic.prop('card4')), [turnAtom]);

  const addTurnBuff = useAtomCallback(
    useCallback(
      (get, set) => {
        set(turnBuffsAtom, [...get(turnBuffsAtom), { ...defaultBuff, id: v4() }]);
      },
      [turnBuffsAtom]
    )
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start', width: '100%' }}>
      <TurnParamsSection turnParamsAtom={turnParamsAtom} />
      <FormContainer style={{ gap: 2, width: '100%' }}>
        <AddBuffButton onClick={addTurnBuff} />
        <TurnStartingBuffForms turnBuffAtomsAtom={turnBuffAtomsAtom} />
      </FormContainer>
      <CardCard title="1st" cardAtom={card1Atom} />
      <CardCard title="2nd" cardAtom={card2Atom} />
      <CardCard title="3rd" cardAtom={card3Atom} />
      <CardCard title="4th" cardAtom={card4Atom} />
    </div>
  );
});

interface TurnCardProps {
  turnAtom: PrimitiveAtom<TurnFormValue>;
  turnNumber: number;
  remove: (turnAtom: PrimitiveAtom<TurnFormValue>) => void;
}

export const TurnCard = memo((props: TurnCardProps) => {
  const { turnAtom, turnNumber, remove } = props;
  const [openDeleteDialog, handleOpenDeleteDialog, handleCloseDeleteDialog] = useBoolean(false);

  const handleConfirmDelete = useCallback(() => {
    remove(turnAtom);
  }, [remove, turnAtom]);

  const CardHeader = useMemo(() => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        {`${turnNumber}T目`}

        <IconButton size="small" onClick={handleOpenDeleteDialog}>
          {<Close />}
        </IconButton>
      </div>
    );
  }, [turnNumber, handleOpenDeleteDialog]);

  return (
    <>
      <Card header={CardHeader} style={{ width: '100%' }}>
        <TurnCardInner turnAtom={turnAtom} />
      </Card>
      <DeleteConfirmDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
        title="ターンを削除"
        description={`${turnNumber}T目を削除しますか？`}
      />
    </>
  );
});
