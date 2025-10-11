import { atom } from 'jotai';
import type { ProcessedTurnResult } from '../utils/calcDamage';
import { CardColor } from '../data/types';

export const damageCalcResultAtom = atom<ProcessedTurnResult[]>([]);
export const damageCalcResultNpColorAtom = atom<CardColor | undefined>(undefined);
export const isNpStarCalculatedAtom = atom<boolean>(false);
