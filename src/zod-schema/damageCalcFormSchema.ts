import { z } from 'zod';
import type { DamageCalcFormValue } from '../data/types';

export const damageJudgementSchema = z.enum(['default', 'noDamage', 'nothing']);

export const servantClassSchema = z.enum([
  'saber',
  'archer',
  'lancer',
  'rider',
  'caster',
  'assassin',
  'berserker',
  'ruler',
  'avenger',
  'alterEgo',
  'moonCancer',
  'pretender',
  'foreigner',
  'shielder',
  'beast'
]);

export const servantAttributeSchema = z.enum(['sky', 'earth', 'human', 'star', 'beast']);

export const buffTypeSchema = z.enum([
  'atkBuff',
  'busterBuff',
  'busterPowerBuff',
  'artsBuff',
  'artsPowerBuff',
  'quickBuff',
  'quickPowerBuff',
  'extraBuff',
  'extraPowerBuff',
  'noblePhantasmBuff',
  'criticalBuff',
  'busterCriticalBuff',
  'artsCriticalBuff',
  'quickCriticalBuff',
  'spBuff',
  'cardCriticalBuff',
  'npSuperEffectiveCorrection',
  'npValueUp',
  'spDef',
  'damagePlus',
  'npGetBuff',
  'starGetBuff'
]);

export const cardColorSchema = z.enum(['buster', 'arts', 'quick']);

export const cardTypeSchema = z.enum(['buster', 'arts', 'quick', 'noblePhantasm', 'extra']);

export const buffSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: buffTypeSchema,
  amount: z.number().nullable(),
  turn: z.number().nullable(),
  count: z.number().nullable()
});

export const cardParamsSchema = z.object({
  type: cardTypeSchema,
  isCritical: z.boolean(),
  damageJudgement: damageJudgementSchema,
  overKillCount: z.number().nullable()
});

export const turnParamsSchema = z.object({
  classAffinity: z.number(),
  attributeAffinity: z.number(),
  targetDamage: z.number().nullable(),
  dtdr: z.number().nullable(),
  dsr: z.number().nullable()
});

export const cardFormValueSchema = z.object({
  params: cardParamsSchema,
  buffs: z.array(buffSchema)
});

export const turnFormValueSchema = z.object({
  id: z.string(),
  params: turnParamsSchema,
  buffs: z.array(buffSchema),
  card1: cardFormValueSchema,
  card2: cardFormValueSchema,
  card3: cardFormValueSchema,
  card4: cardFormValueSchema
});

export const damageCalcFormValueSchema = z.object({
  title: z.string(),
  servantClass: servantClassSchema,
  servantAttribute: servantAttributeSchema,
  servantAtk: z.number().nullable(),
  craftEssenceAtk: z.number().nullable(),
  npColor: cardColorSchema,
  npValue: z.number().nullable(),
  footprintB: z.number().nullable(),
  footprintA: z.number().nullable(),
  footprintQ: z.number().nullable(),
  npGain: z.number().nullable(),
  starRate: z.number().nullable(),
  hitCountN: z.number().nullable(),
  hitCountB: z.number().nullable(),
  hitCountA: z.number().nullable(),
  hitCountQ: z.number().nullable(),
  hitCountEX: z.number().nullable(),
  startingBuffs: z.array(buffSchema),
  turns: z.array(turnFormValueSchema),
  isColored: z.boolean(),
  isNpStarCalculated: z.boolean()
});

export const validateDamageCalcFormValue = (data: unknown): DamageCalcFormValue => {
  return damageCalcFormValueSchema.parse(data);
};
