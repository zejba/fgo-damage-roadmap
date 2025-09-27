import { PlusOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import { useAtom, useSetAtom } from 'jotai';
import type { PrimitiveAtom } from 'jotai';
import { useCallback } from 'react';
import type { TurnFormValue } from '../../data/types';
import { addTurnAtom, defaultTurn, turnAtomsAtom } from '../../store/turns';
import CalcButtonSection from './CalcButtonSection';
import { ServantParamsSection } from './ServantParamsSection';
import { StartingBuffsSection } from './StartingBuffsSection';
import { TurnCard } from './TurnCard/TurnCard';

function TurnCardsSection() {
  const [turnAtoms, dispatch] = useAtom(turnAtomsAtom);
  const handleRemove = useCallback(
    (turnAtom: PrimitiveAtom<TurnFormValue>) => dispatch({ type: 'remove', atom: turnAtom }),
    [dispatch]
  );
  return (
    <Flex vertical gap={12} align="flex-start" style={{ width: '100%' }}>
      {turnAtoms.map((turnAtom, index) => (
        <TurnCard key={`${turnAtom}`} turnAtom={turnAtom} turnNumber={index + 1} remove={handleRemove} />
      ))}
    </Flex>
  );
}

function AddTurnCardButton() {
  const addTurn = useSetAtom(addTurnAtom);
  const handleAddTurn = useCallback(() => {
    addTurn(window.structuredClone(defaultTurn));
  }, [addTurn]);
  return (
    <Button onClick={handleAddTurn} icon={<PlusOutlined />}>
      ターン追加
    </Button>
  );
}

export function DamageCalcInputSection() {
  return (
    <>
      <Flex vertical gap={12} align="center" style={{ width: 648, marginBottom: 12 }}>
        <ServantParamsSection />
        <StartingBuffsSection />
        <TurnCardsSection />
        <AddTurnCardButton />
      </Flex>
      <CalcButtonSection />
    </>
  );
}
