import { type WritableAtom, useAtomValue } from 'jotai';
import { focusAtom } from 'jotai-optics';
import { splitAtom, useAtomCallback } from 'jotai/utils';
import { type SetStateAction, memo, useCallback, useMemo } from 'react';
import { v4 } from 'uuid';
import AddBuffButton from '../../../components/AddBuffButton';
import AddPresetBuffsButton from '../AddPresetBuffsButton';
import type { Buff, CardFormValue, CardParams } from '../../../data/types';
import { isColoredAtom } from '../../../store/jotai';
import { npColorAtom } from '../../../store/servantParams';
import { defaultBuff } from '../../../store/startingBuffs';
import { CardBuffForms } from './CardBuffForms';
import { CardParamsSection } from './CardParamsSection';
import { Card } from '../../../components/Card';
import { FormContainer } from '../../../components/FormContainer';
import { cardColorStyles } from '../../../data/options';

interface CardCardInnerProps {
  title: string;
  cardParamsAtom: WritableAtom<CardParams, [SetStateAction<CardParams>], void>;
  cardBuffsAtom: WritableAtom<Buff[], [SetStateAction<Buff[]>], void>;
}

function CardCardInner(props: CardCardInnerProps) {
  const { title, cardParamsAtom, cardBuffsAtom } = props;

  const cardBuffAtomsAtom = useMemo(() => splitAtom(cardBuffsAtom, (effect) => effect.id), [cardBuffsAtom]);
  const addBuff = useAtomCallback(
    useCallback(
      (get, set) => {
        set(cardBuffsAtom, [...get(cardBuffsAtom), { ...defaultBuff, id: v4() }]);
      },
      [cardBuffsAtom]
    )
  );

  const addBuffFromPreset = useAtomCallback(
    useCallback(
      (get, set, buffs: Omit<typeof defaultBuff, 'id'>[]) => {
        set(cardBuffsAtom, [...get(cardBuffsAtom), ...buffs.map((buff) => ({ ...buff, id: v4() }))]);
      },
      [cardBuffsAtom]
    )
  );

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', gap: 8, width: '100%' }}>
        <div style={{ fontSize: '1.2em', alignSelf: 'center' }}>{title}</div>
        <CardParamsSection cardParamsAtom={cardParamsAtom} />
      </div>
      <FormContainer style={{ gap: 2, width: '100%' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <AddBuffButton onClick={addBuff} />
          <AddPresetBuffsButton addEffect={addBuffFromPreset} />
        </div>
        <CardBuffForms cardBuffAtomsAtom={cardBuffAtomsAtom} />
      </FormContainer>
    </div>
  );
}

const MemoizedCardCardInner = memo(CardCardInner);

interface CardCardProps {
  title: string;
  cardAtom: WritableAtom<CardFormValue, [SetStateAction<CardFormValue>], void>;
}

export function CardCard(props: CardCardProps) {
  const { title, cardAtom } = props;
  const cardParamsAtom = useMemo(() => focusAtom(cardAtom, (optic) => optic.prop('params')), [cardAtom]);
  const cardBuffsAtom = useMemo(() => focusAtom(cardAtom, (optic) => optic.prop('buffs')), [cardAtom]);
  const isColored = useAtomValue(isColoredAtom);
  const cardType = useAtomValue(cardParamsAtom).type;
  const npColor = useAtomValue(npColorAtom);
  const bgColor = useMemo(() => {
    if (!isColored) {
      return undefined;
    }
    if (cardType === 'noblePhantasm') {
      return cardColorStyles[npColor];
    }
    return cardColorStyles[cardType];
  }, [isColored, cardType, npColor]);
  return (
    <Card header={null} style={{ width: '100%', backgroundColor: bgColor, transition: 'background-color 0.2s' }}>
      <MemoizedCardCardInner title={title} cardParamsAtom={cardParamsAtom} cardBuffsAtom={cardBuffsAtom} />
    </Card>
  );
}
