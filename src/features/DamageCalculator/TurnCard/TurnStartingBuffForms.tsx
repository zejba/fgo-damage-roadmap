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
  return effectAtoms.map((effectAtom) => (
    <MemoizedBuffForm key={`${effectAtom}`} buffAtom={effectAtom} remove={handleRemove} />
  ));
}
