import { PlusOutlined } from '@ant-design/icons';
import { useAtom } from 'jotai';
import type { PrimitiveAtom } from 'jotai';
import { useCallback } from 'react';
import type { TurnFormValue } from '../../data/types';
import { addTurnAtom, defaultTurn, turnAtomsAtom, turnsAtom } from '../../store/turns';
import { ServantParamsSection } from './ServantParamsSection';
import { StartingBuffsSection } from './StartingBuffsSection';
import { TurnCard } from './TurnCard/TurnCard';
import styled from 'styled-components';
import { PrimaryOutlinedButton } from '../../components/Button.tsx/PrimaryOutlinedButton';
import { useAtomCallback } from 'jotai/utils';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 580px;
`;

function TurnCardsSection() {
  const [turnAtoms, dispatch] = useAtom(turnAtomsAtom);
  const handleRemove = useCallback(
    (turnAtom: PrimitiveAtom<TurnFormValue>) => dispatch({ type: 'remove', atom: turnAtom }),
    [dispatch]
  );
  return (
    <>
      {turnAtoms.map((turnAtom, index) => (
        <TurnCard key={`${turnAtom}`} turnAtom={turnAtom} turnNumber={index + 1} remove={handleRemove} />
      ))}
    </>
  );
}

function AddTurnCardButton() {
  const handleAddTurn = useAtomCallback(
    useCallback((get, set) => {
      const clonedDefaultTurn = window.structuredClone(defaultTurn);
      const turns = get(turnsAtom);
      const lastTurnParams = turns[turns.length - 1]?.params;
      set(addTurnAtom, {
        ...clonedDefaultTurn,
        params: lastTurnParams ?? clonedDefaultTurn.params
      });
    }, [])
  );

  return (
    <PrimaryOutlinedButton onClick={handleAddTurn} startIcon={<PlusOutlined />}>
      ターン追加
    </PrimaryOutlinedButton>
  );
}

export function DamageCalcInputSection() {
  return (
    <CardContainer>
      <ServantParamsSection />
      <StartingBuffsSection />
      <TurnCardsSection />
      <AddTurnCardButton />
    </CardContainer>
  );
}
