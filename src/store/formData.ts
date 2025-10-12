import { atom } from 'jotai';
import { isColoredAtom, isRequiredNpStarCalcAtom } from '../store/jotai';
import {
  servantClassAtom,
  servantAttributeAtom,
  servantAtkAtom,
  craftEssenceAtkAtom,
  npColorAtom,
  npValueAtom,
  footprintBAtom,
  footprintAAtom,
  footprintQAtom,
  npGainAtom,
  starRateAtom,
  hitCountNAtom,
  hitCountBAtom,
  hitCountAAtom,
  hitCountQAtom,
  hitCountEXAtom
} from '../store/servantParams';
import { startingBuffsAtom } from '../store/startingBuffs';
import { turnsAtom } from '../store/turns';
import { DamageCalcFormValue } from '../data/types';

export const currentFormDataAtom = atom((get) => {
  const formData: DamageCalcFormValue = {
    servantClass: get(servantClassAtom),
    servantAttribute: get(servantAttributeAtom),
    servantAtk: get(servantAtkAtom),
    craftEssenceAtk: get(craftEssenceAtkAtom),
    npColor: get(npColorAtom),
    npValue: get(npValueAtom),
    footprintB: get(footprintBAtom),
    footprintA: get(footprintAAtom),
    footprintQ: get(footprintQAtom),
    npGain: get(npGainAtom),
    starRate: get(starRateAtom),
    hitCountN: get(hitCountNAtom),
    hitCountB: get(hitCountBAtom),
    hitCountA: get(hitCountAAtom),
    hitCountQ: get(hitCountQAtom),
    hitCountEX: get(hitCountEXAtom),
    startingBuffs: get(startingBuffsAtom),
    turns: get(turnsAtom),
    isColored: get(isColoredAtom),
    isNpStarCalculated: get(isRequiredNpStarCalcAtom)
  };
  return formData;
});
