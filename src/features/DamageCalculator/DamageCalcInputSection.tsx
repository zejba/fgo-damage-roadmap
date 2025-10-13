import { PlusOutlined } from '@ant-design/icons';
import { useAtom, useSetAtom } from 'jotai';
import type { PrimitiveAtom } from 'jotai';
import { useCallback } from 'react';
import type { TurnFormValue } from '../../data/types';
import { addTurnAtom, defaultTurn, turnAtomsAtom } from '../../store/turns';
import { ServantParamsSection } from './ServantParamsSection';
import { StartingBuffsSection } from './StartingBuffsSection';
import { TurnCard } from './TurnCard/TurnCard';
import styled from 'styled-components';
import { PrimaryOutlinedButton } from '../../components/Button.tsx/PrimaryOutlinedButton';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 580px;
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
  const addTurn = useSetAtom(addTurnAtom);
  const handleAddTurn = useCallback(() => {
    addTurn(window.structuredClone(defaultTurn));
  }, [addTurn]);
  return (
    <PrimaryOutlinedButton onClick={handleAddTurn} startIcon={<PlusOutlined />}>
      ターン追加
    </PrimaryOutlinedButton>
  );
}

export function DamageCalcInputSection() {
  return (
    <>
      <CardContainer>
        <ServantParamsSection />
        <StartingBuffsSection />
        <TurnCardsSection />
        <AddTurnCardButton />
      </CardContainer>
    </>
  );
}
