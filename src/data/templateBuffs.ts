import type { Buff } from './types';

const CLASS_SCORE_SKILL_NAME = 'スコア';

export const classScores: Omit<Buff, 'id'>[] = [
  {
    name: CLASS_SCORE_SKILL_NAME,
    type: 'busterPowerBuff',
    amount: 20,
    turn: -1,
    count: -1
  },
  {
    name: CLASS_SCORE_SKILL_NAME,
    type: 'artsPowerBuff',
    amount: 20,
    turn: -1,
    count: -1
  },
  {
    name: CLASS_SCORE_SKILL_NAME,
    type: 'quickPowerBuff',
    amount: 20,
    turn: -1,
    count: -1
  },
  {
    name: CLASS_SCORE_SKILL_NAME,
    type: 'busterCriticalBuff',
    amount: 20,
    turn: -1,
    count: -1
  },
  {
    name: CLASS_SCORE_SKILL_NAME,
    type: 'artsCriticalBuff',
    amount: 40,
    turn: -1,
    count: -1
  },
  {
    name: CLASS_SCORE_SKILL_NAME,
    type: 'quickCriticalBuff',
    amount: 60,
    turn: -1,
    count: -1
  },
  {
    name: CLASS_SCORE_SKILL_NAME,
    type: 'extraBuff',
    amount: 50,
    turn: -1,
    count: -1
  },
  {
    name: CLASS_SCORE_SKILL_NAME,
    type: 'criticalBuff',
    amount: 10,
    turn: -1,
    count: -1
  },
  {
    name: CLASS_SCORE_SKILL_NAME,
    type: 'noblePhantasmBuff',
    amount: 10,
    turn: -1,
    count: -1
  },
  {
    name: CLASS_SCORE_SKILL_NAME,
    type: 'starGetBuff',
    amount: 50,
    turn: -1,
    count: -1
  }
];

export const appendSkills: Omit<Buff, 'id'>[] = [
  {
    name: 'AS1(EX)',
    type: 'extraBuff',
    amount: 50,
    turn: -1,
    count: -1
  },
  {
    name: 'AS3(攻)',
    type: 'atkBuff',
    amount: 30,
    turn: -1,
    count: -1
  },
  {
    name: 'AS4(クリ)',
    type: 'criticalBuff',
    amount: 30,
    turn: -1,
    count: -1
  }
];

export const craftEssences: Omit<Buff, 'id'>[] = [
  {
    name: '黒聖杯',
    type: 'noblePhantasmBuff',
    amount: 80,
    turn: -1,
    count: -1
  },
  {
    name: '牛魔王',
    type: 'busterBuff',
    amount: 15,
    turn: 3,
    count: -1
  },
  {
    name: '未凸王',
    type: 'atkBuff',
    amount: 10,
    turn: 3,
    count: -1
  },
  {
    name: '凸王',
    type: 'atkBuff',
    amount: 15,
    turn: 3,
    count: -1
  }
];
