import type { SkillData } from '../features/DamageCalculator/types'

const CLASS_SCORE_SKILL_NAME = 'スコア'

export const classScores: Required<SkillData>[] = [
	{
		skillName: CLASS_SCORE_SKILL_NAME,
		skillType: 'busterPowerBuff',
		amount: 20,
		turns: -1,
		times: -1,
	},
	{
		skillName: CLASS_SCORE_SKILL_NAME,
		skillType: 'artsPowerBuff',
		amount: 20,
		turns: -1,
		times: -1,
	},
	{
		skillName: CLASS_SCORE_SKILL_NAME,
		skillType: 'quickPowerBuff',
		amount: 20,
		turns: -1,
		times: -1,
	},
	{
		skillName: CLASS_SCORE_SKILL_NAME,
		skillType: 'busterCriticalBuff',
		amount: 20,
		turns: -1,
		times: -1,
	},
	{
		skillName: CLASS_SCORE_SKILL_NAME,
		skillType: 'artsCriticalBuff',
		amount: 40,
		turns: -1,
		times: -1,
	},
	{
		skillName: CLASS_SCORE_SKILL_NAME,
		skillType: 'quickCriticalBuff',
		amount: 60,
		turns: -1,
		times: -1,
	},
	{
		skillName: CLASS_SCORE_SKILL_NAME,
		skillType: 'extraBuff',
		amount: 50,
		turns: -1,
		times: -1,
	},
	{
		skillName: CLASS_SCORE_SKILL_NAME,
		skillType: 'criticalBuff',
		amount: 10,
		turns: -1,
		times: -1,
	},
	{
		skillName: CLASS_SCORE_SKILL_NAME,
		skillType: 'noblePhantasmBuff',
		amount: 10,
		turns: -1,
		times: -1,
	},
	{
		skillName: CLASS_SCORE_SKILL_NAME,
		skillType: 'starGetBuff',
		amount: 50,
		turns: -1,
		times: -1,
	},
]

export const appendSkills: Required<SkillData>[] = [
	{
		skillName: 'AS1(EX)',
		skillType: 'extraBuff',
		amount: 50,
		turns: -1,
		times: -1,
	},
	{
		skillName: 'AS3(攻)',
		skillType: 'atkBuff',
		amount: 30,
		turns: -1,
		times: -1,
	},
	{
		skillName: 'AS4(クリ)',
		skillType: 'criticalBuff',
		amount: 30,
		turns: -1,
		times: -1,
	},
]

export const craftEssences: Required<SkillData>[] = [
	{
		skillName: '黒聖杯',
		skillType: 'noblePhantasmBuff',
		amount: 80,
		turns: -1,
		times: -1,
	},
	{
		skillName: '牛魔王',
		skillType: 'busterBuff',
		amount: 15,
		turns: 3,
		times: -1,
	},
	{
		skillName: '未凸王',
		skillType: 'atkBuff',
		amount: 10,
		turns: 3,
		times: -1,
	},
	{
		skillName: '凸王',
		skillType: 'atkBuff',
		amount: 15,
		turns: 3,
		times: -1,
	},
]
