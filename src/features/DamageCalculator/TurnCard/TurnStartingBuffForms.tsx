import { type PrimitiveAtom, type WritableAtom, useAtom } from 'jotai';
import { useCallback } from 'react';
import type { Buff } from '../../../data/types';
import type { SplitAtomAction } from '../../../types/jotaiSplitAtomAction';
import { MemoizedBuffForm } from '../BuffForm';

interface TurnStartingBuffFormsProps {
  turnBuffAtomsAtom: WritableAtom<PrimitiveAtom<Buff>[], [SplitAtomAction<Buff>], void>;
}

export function TurnStartingBuffForms(props: TurnStartingBuffFormsProps) {
  const { turnBuffAtomsAtom } = props;
  const [effectAtoms, dispatch] = useAtom(turnBuffAtomsAtom);
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
