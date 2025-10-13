import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const isColoredAtom = atomWithStorage<boolean>('isColored', false);
export const isRequiredNpStarCalcAtom = atom(false);
