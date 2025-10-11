export interface Buff {
  id: string;
  name: string;
  type: BuffType;
  amount: number | null;
  turn: number | null;
  count: number | null;
}

export interface CardParams {
  type: CardType;
  isCritical: boolean;
  damageJudgement: DamageJudgement;
  overKillCount: number | null;
}

export interface TurnParams {
  classAffinity: number;
  attributeAffinity: number;
  targetDamage: number | null;
  dtdr: number | null;
  dsr: number | null;
}

export interface CardFormValue {
  params: CardParams;
  buffs: Buff[];
}

export interface TurnFormValue {
  id: string;
  params: TurnParams;
  buffs: Buff[];
  card1: CardFormValue;
  card2: CardFormValue;
  card3: CardFormValue;
  card4: CardFormValue;
}

export type DamageJudgement = 'default' | 'noDamage' | 'nothing';

export type ServantClass =
  | 'saber'
  | 'archer'
  | 'lancer'
  | 'rider'
  | 'caster'
  | 'assassin'
  | 'berserker'
  | 'ruler'
  | 'avenger'
  | 'alterEgo'
  | 'moonCancer'
  | 'pretender'
  | 'foreigner'
  | 'shielder'
  | 'beast';

export type ServantAttribute = 'sky' | 'earth' | 'human' | 'star' | 'beast';

export type BuffType =
  | 'atkBuff'
  | 'busterBuff'
  | 'busterPowerBuff'
  | 'artsBuff'
  | 'artsPowerBuff'
  | 'quickBuff'
  | 'quickPowerBuff'
  | 'extraBuff'
  | 'extraPowerBuff'
  | 'noblePhantasmBuff'
  | 'criticalBuff'
  | 'busterCriticalBuff'
  | 'artsCriticalBuff'
  | 'quickCriticalBuff'
  | 'spBuff'
  | 'cardCriticalBuff'
  | 'npSuperEffectiveCorrection'
  | 'npValueUp'
  | 'spDef'
  | 'damagePlus'
  | 'npGetBuff'
  | 'starGetBuff';

export type CardColor = 'buster' | 'arts' | 'quick';

export type CardType = 'buster' | 'arts' | 'quick' | 'noblePhantasm' | 'extra';

export type SelectableCardType = 'buster' | 'arts' | 'quick' | 'noblePhantasm';

export type CardCategory = 'normal' | 'noblePhantasm' | 'extra';

export type CardInitial = 'B' | 'A' | 'Q' | 'N' | 'EX';

export interface DamageCalcFormValue {
  servantClass: ServantClass;
  servantAttribute: ServantAttribute;
  atk: number;
  npColor: CardColor;
  npValue: number;
  footprintB: number;
  footprintA: number;
  footprintQ: number;
  npGain: number;
  starRate: number;
  hitCountN: number;
  hitCountB: number;
  hitCountA: number;
  hitCountQ: number;
  hitCountEX: number;
  startingBuffs: Buff[];
  turns: TurnFormValue[];
}
