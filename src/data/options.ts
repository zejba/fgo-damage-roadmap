import type {
	BuffType,
	CardColor,
	CardType,
	DamageJudgement,
	ServantAttribute,
	ServantClass,
} from './types'

export const servantClasses: { value: ServantClass; label: string }[] = [
	{ value: 'saber', label: '剣' },
	{ value: 'archer', label: '弓' },
	{ value: 'lancer', label: '槍' },
	{ value: 'rider', label: '騎' },
	{ value: 'caster', label: '術' },
	{ value: 'assassin', label: '殺' },
	{ value: 'berserker', label: '狂' },
	{ value: 'ruler', label: '裁' },
	{ value: 'avenger', label: '讐' },
	{ value: 'alterego', label: '分' },
	{ value: 'mooncancer', label: '月' },
	{ value: 'pretender', label: '詐' },
	{ value: 'foreigner', label: '降' },
	{ value: 'shielder', label: '盾' },
	{ value: 'beast', label: '獣' },
]

export const servantRarities: { value: string; label: string }[] = [
	{ value: '0', label: '★0' },
	{ value: '1', label: '★1' },
	{ value: '2', label: '★2' },
	{ value: '3', label: '★3' },
	{ value: '4', label: '★4' },
	{ value: '5', label: '★5' },
]

export const servantAttributes: { value: ServantAttribute; label: string }[] = [
	{ value: 'sky', label: '天' },
	{ value: 'earth', label: '地' },
	{ value: 'human', label: '人' },
	{ value: 'star', label: '星' },
	{ value: 'beast', label: '獣' },
]

export const cardColors: { value: CardColor; label: string }[] = [
	{ value: 'buster', label: 'B' },
	{ value: 'arts', label: 'A' },
	{ value: 'quick', label: 'Q' },
]

export const cardTypeOptions: { value: CardType; label: string }[] = [
	{ value: 'noblePhantasm', label: 'N' },
	{ value: 'buster', label: 'B' },
	{ value: 'arts', label: 'A' },
	{ value: 'quick', label: 'Q' },
]

export const skillTypes: { value: BuffType; label: string }[] = [
	{ value: 'atkBuff', label: '攻撃バフ' },
	{ value: 'busterBuff', label: 'Bバフ' },
	{ value: 'busterPowerBuff', label: 'B威力バフ' },
	{ value: 'artsBuff', label: 'Aバフ' },
	{ value: 'artsPowerBuff', label: 'A威力バフ' },
	{ value: 'quickBuff', label: 'Qバフ' },
	{ value: 'quickPowerBuff', label: 'Q威力バフ' },
	{ value: 'extraBuff', label: 'EXバフ' },
	{ value: 'noblePhantasmBuff', label: '宝具バフ' },
	{ value: 'criticalBuff', label: 'クリバフ' },
	{ value: 'busterCriticalBuff', label: 'Bクリバフ' },
	{ value: 'artsCriticalBuff', label: 'Aクリバフ' },
	{ value: 'quickCriticalBuff', label: 'Qクリバフ' },
	{ value: 'spBuff', label: '特攻バフ' },
	{ value: 'cardCriticalBuff', label: 'クリ耐性ダウン' },
	{ value: 'npSuperEffectiveCorrection', label: '特攻宝具' },
	{ value: 'npValueUp', label: '宝具倍率増加' },
	{ value: 'spDef', label: '特殊耐性' },
	{ value: 'damagePlus', label: 'ダメージ＋' },
	{ value: 'npGetBuff', label: 'NP獲得バフ' },
	{ value: 'starGetBuff', label: '星発生バフ' },
]

export const turnOptions: { value: number; label: string }[] = [
	{ value: 1, label: '1' },
	{ value: 2, label: '2' },
	{ value: 3, label: '3' },
	{ value: 4, label: '4' },
	{ value: 5, label: '5' },
	{ value: 6, label: '6' },
	{ value: 7, label: '7' },
	{ value: 8, label: '8' },
	{ value: 9, label: '9' },
	{ value: 10, label: '10' },
	{ value: -1, label: '-' },
]

export const enemyClassOptions: { value: number; label: string }[] = [
	{ value: 0.5, label: '0.5' },
	{ value: 1.0, label: '1.0' },
	{ value: 1.2, label: '1.2' },
	{ value: 1.5, label: '1.5' },
	{ value: 2.0, label: '2.0' },
]

export const enemyAttrOptions: { value: number; label: string }[] = [
	{ value: 0.9, label: '0.9' },
	{ value: 1.0, label: '1.0' },
	{ value: 1.1, label: '1.1' },
]

export const damageJudgementOptions: {
	value: DamageJudgement
	label: string
}[] = [
	{ value: 'default', label: 'default' },
	{ value: 'noDamage', label: '0(回数消費有)' },
	{ value: 'nothing', label: '0(回数消費無)' },
]

export const cardColorStyles = {
	buster: 'tomato',
	arts: 'cornflowerblue',
	quick: 'lightgreen',
	extra: '#F0F0F0',
} as const
