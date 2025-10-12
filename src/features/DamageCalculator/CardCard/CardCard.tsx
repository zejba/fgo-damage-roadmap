import { type WritableAtom, useAtomValue } from 'jotai';
import { focusAtom } from 'jotai-optics';
import { splitAtom, useAtomCallback } from 'jotai/utils';
import { type SetStateAction, memo, useCallback, useMemo } from 'react';
import { v4 } from 'uuid';
import AddBuffButton from '../../../components/AddBuffButton';
import { cardColorStyles, cardColorStylesThin } from '../../../data/options';
import type { Buff, CardFormValue, CardParams } from '../../../data/types';
import { isColoredAtom } from '../../../store/jotai';
import { npColorAtom } from '../../../store/servantParams';
import { defaultBuff } from '../../../store/startingBuffs';
import { CardBuffForms } from './CardBuffForms';
import { CardParamsSection } from './CardParamsSection';
import { Card } from '../../../components/Card';
import { FormContainer } from '../../../components/FormContainer';

interface CardCardInnerProps {
  cardParamsAtom: WritableAtom<CardParams, [SetStateAction<CardParams>], void>;
  cardBuffsAtom: WritableAtom<Buff[], [SetStateAction<Buff[]>], void>;
}

function CardCardInner(props: CardCardInnerProps) {
  const { cardParamsAtom, cardBuffsAtom } = props;

  const cardBuffAtomsAtom = useMemo(() => splitAtom(cardBuffsAtom, (effect) => effect.id), [cardBuffsAtom]);
  const addBuff = useAtomCallback(
    useCallback(
      (get, set) => {
        set(cardBuffsAtom, [...get(cardBuffsAtom), { ...defaultBuff, id: v4() }]);
      },
      [cardBuffsAtom]
    )
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      <CardParamsSection cardParamsAtom={cardParamsAtom} />
      <FormContainer style={{ gap: 4 }}>
        <AddBuffButton onClick={addBuff} />
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
      return cardColorStylesThin[npColor];
    }
    return cardColorStylesThin[cardType];
  }, [isColored, cardType, npColor]);
  const titleBgColor = useMemo(() => {
    if (!isColored) {
      return undefined;
    }
    if (cardType === 'noblePhantasm') {
      return cardColorStyles[npColor];
    }
    return cardColorStyles[cardType];
  }, [isColored, cardType, npColor]);
  return (
    <Card
      title={title}
      style={{ width: '100%' }}
      styles={{
        header: { backgroundColor: titleBgColor, transition: 'background-color 0.2s', minHeight: '40px' },
        body: { backgroundColor: bgColor, transition: 'background-color 0.2s' }
      }}
    >
      <MemoizedCardCardInner cardParamsAtom={cardParamsAtom} cardBuffsAtom={cardBuffsAtom} />
    </Card>
  );
}
