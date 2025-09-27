import { atom } from 'jotai';
import { splitAtom } from 'jotai/utils';
import { v4 } from 'uuid';
import type { Buff } from '../data/types';

export const startingBuffsAtom = atom<Buff[]>([]);
export const startingBuffAtomsAtom = splitAtom(startingBuffsAtom, (buff) => buff.id);

export const addBuffsAtom = atom(null, (get, set, buffs: Omit<Buff, 'id'>[]) => {
  set(startingBuffsAtom, [...get(startingBuffsAtom), ...buffs.map((buff) => ({ ...buff, id: v4() }))]);
});

export const defaultBuff: Omit<Buff, 'id'> = {
  name: '',
  type: 'atkBuff',
  amount: null,
  turn: null,
  count: null
};
