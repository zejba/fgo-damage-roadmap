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
  hitCountEXAtom,
  titleAtom
} from '../store/servantParams';
import { startingBuffsAtom } from '../store/startingBuffs';
import { turnsAtom } from '../store/turns';
import { DamageCalcFormValue } from '../data/types';

export const currentFormDataAtom = atom((get) => {
  const formData: DamageCalcFormValue = {
    title: get(titleAtom),
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

export const setFormDataAtom = atom(null, (_get, set, formData: DamageCalcFormValue) => {
  set(titleAtom, formData.title);
  set(servantClassAtom, formData.servantClass);
  set(servantAttributeAtom, formData.servantAttribute);
  set(servantAtkAtom, formData.servantAtk);
  set(craftEssenceAtkAtom, formData.craftEssenceAtk);
  set(npColorAtom, formData.npColor);
  set(npValueAtom, formData.npValue);
  set(footprintBAtom, formData.footprintB);
  set(footprintAAtom, formData.footprintA);
  set(footprintQAtom, formData.footprintQ);
  set(npGainAtom, formData.npGain);
  set(starRateAtom, formData.starRate);
  set(hitCountNAtom, formData.hitCountN);
  set(hitCountBAtom, formData.hitCountB);
  set(hitCountAAtom, formData.hitCountA);
  set(hitCountQAtom, formData.hitCountQ);
  set(hitCountEXAtom, formData.hitCountEX);
  set(startingBuffsAtom, formData.startingBuffs);
  set(turnsAtom, formData.turns);
  set(isColoredAtom, formData.isColored);
  set(isRequiredNpStarCalcAtom, formData.isNpStarCalculated);
});
