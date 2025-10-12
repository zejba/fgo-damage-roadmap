import { atom } from 'jotai';
import { splitAtom } from 'jotai/utils';
import { v4 } from 'uuid';
import type { TurnFormValue } from '../data/types';

export const turnsAtom = atom<TurnFormValue[]>([]);
export const turnAtomsAtom = splitAtom(turnsAtom, (turnEffect) => turnEffect.id);

export const addTurnAtom = atom(null, (get, set, newTurn: Omit<TurnFormValue, 'id'>) => {
  set(turnsAtom, [...get(turnsAtom), { ...newTurn, id: v4() }]);
});

export const defaultTurn: Omit<TurnFormValue, 'id'> = {
  params: {
    classAffinity: 2,
    attributeAffinity: 1,
    targetDamage: null,
    dtdr: 100,
    dsr: null
  },
  buffs: [],
  card1: {
    params: {
      type: 'noblePhantasm',
      isCritical: true,
      damageJudgement: 'default',
      overKillCount: null
    },
    buffs: []
  },
  card2: {
    params: {
      type: 'buster',
      isCritical: true,
      damageJudgement: 'default',
      overKillCount: null
    },
    buffs: []
  },
  card3: {
    params: {
      type: 'buster',
      isCritical: true,
      damageJudgement: 'default',
      overKillCount: null
    },
    buffs: []
  },
  card4: {
    params: {
      type: 'extra',
      isCritical: false,
      damageJudgement: 'default',
      overKillCount: null
    },
    buffs: []
  }
};
