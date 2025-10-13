import { type PrimitiveAtom, type WritableAtom, useAtom } from 'jotai';
import { useCallback } from 'react';
import type { Buff } from '../../../data/types';
import type { SplitAtomAction } from '../../../types/jotaiSplitAtomAction';
import { MemoizedBuffForm } from '../BuffForm';

interface CardBuffFormsProps {
  cardBuffAtomsAtom: WritableAtom<PrimitiveAtom<Buff>[], [SplitAtomAction<Buff>], void>;
}

export function CardBuffForms(props: CardBuffFormsProps) {
  const { cardBuffAtomsAtom } = props;
  const [buffAtoms, dispatch] = useAtom(cardBuffAtomsAtom);
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
