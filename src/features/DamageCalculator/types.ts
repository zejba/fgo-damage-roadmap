export interface SkillData {
	skillName?: string
	skillType?: SkillType
	amount?: number
	turns?: number
	times?: number
}

export interface TurnData {
	classAffinity?: number
	attributeAffinity?: number
	targetDamage?: number
	dtdr?: number
	dsr?: number
	turnEffects?: SkillData[]
	card1Effects?: SkillData[]
	card2Effects?: SkillData[]
	card3Effects?: SkillData[]
	card4Effects?: SkillData[]
	card1Type?: CommandCard
	card2Type?: CommandCard
	card3Type?: CommandCard
	card1IsCritical?: boolean
	card2IsCritical?: boolean
	card3IsCritical?: boolean
	card1DamageJudgement?: string
	card2DamageJudgement?: string
	card3DamageJudgement?: string
	card4DamageJudgement?: string
	card1OverKillCount?: number
	card2OverKillCount?: number
	card3OverKillCount?: number
	card4OverKillCount?: number
}

export interface DamageCalculatorInputValue {
	title?: string
	servantClass?: string
	servantAttribute?: string
	servantAtk?: number
	craftEssenceAtk?: number
	npColor?: CardColor
	npValue?: number
	footprintB?: number
	footprintA?: number
	footprintQ?: number
	npGain?: number
	starRate?: number
	hitCountN?: number
	hitCountB?: number
	hitCountA?: number
	hitCountQ?: number
	hitCountEX?: number
	passiveEffects?: SkillData[]
	turns?: TurnData[]
}

export type SkillType =
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
	| 'starGetBuff'

export type CardColor = 'buster' | 'arts' | 'quick' | 'extra'

export type CommandCard =
	| 'buster'
	| 'arts'
	| 'quick'
	| 'noblePhantasm'
	| 'extra'

export type CardType = 'normal' | 'noblePhantasm' | 'extra'
