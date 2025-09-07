import type {
	Buff,
	BuffType,
	CardColor,
	CardType,
	CommandCard,
	DamageCalculatorInputValue,
} from '../data/types'

const cardCorrectionValues = {
	noblePhantasm: 1,
	buster: 1.5,
	arts: 1,
	quick: 0.8,
	extra: 0.625,
} as const

function getCardCorrectionValue(type: CardType, color: CardColor, nth: number) {
	return (
		cardCorrectionValues[color] *
		(type === 'noblePhantasm' ? 1 : 1 + (nth - 1) * 0.2)
	)
}

function getFirstBonusValues(selectedCardColors: CardColor[]) {
	if (
		selectedCardColors[0] !== selectedCardColors[1] &&
		selectedCardColors[1] !== selectedCardColors[2] &&
		selectedCardColors[0] !== selectedCardColors[2]
	) {
		return {
			buster: 0.5,
			arts: 1,
			quick: 0.2,
		}
	}
	return {
		buster: selectedCardColors[0] === 'buster' ? 0.5 : 0,
		arts: selectedCardColors[0] === 'arts' ? 1 : 0,
		quick: selectedCardColors[0] === 'quick' ? 0.2 : 0,
	}
}

function getStarCorrectionValue(
	type: CardType,
	color: CommandCard,
	nth: number,
) {
	if (type === 'extra') {
		return 1
	}
	if (type === 'noblePhantasm') {
		if (color === 'buster') {
			return 0.1
		}
		if (color === 'quick') {
			return 0.8
		}
	}
	if (color === 'buster') {
		return 0.05 + nth * 0.05
	}
	if (color === 'quick') {
		return 0.3 + nth * 0.5
	}
	return 0
}

function getNpCorrectionValue(type: CardType, color: CardColor, nth: number) {
	if (type === 'extra') {
		return 1
	}
	if (type === 'noblePhantasm') {
		if (color === 'arts') {
			return 3
		}
		if (color === 'quick') {
			return 1
		}
	}
	if (color === 'arts') {
		return 1.5 + nth * 1.5
	}
	if (color === 'quick') {
		return 0.5 + nth * 0.5
	}
	return 0
}

export type TurnResult = {
	baseDamages: number[]
	constantDamages: number[]
	nps: number[]
	minStars: number[]
	maxStars: number[]
	minStarRates: number[]
	maxStarRates: number[]
	passRate: number
	atkBuffs: number[]
	cardBuffs: number[]
	npOrCrBuffs: number[]
	spBuffs: number[]
}

const cardNames = {
	buster: 'B',
	arts: 'A',
	quick: 'Q',
	noblePhantasm: 'N',
	extra: 'EX',
} as const

export type ProcessedTurnResult = TurnResult & {
	damage90: number[]
	damage100: number[]
	damage110: number[]
	selectedCards: ('B' | 'A' | 'Q' | 'N' | 'EX')[]
	targetDamage: number
}

function processArgs(args: DamageCalculatorInputValue) {
	function processSkillData(skillData: Buff): Required<Buff> {
		const { skillType, skillName, amount, turns, times } = skillData
		return {
			skillType: skillType ?? 'atkBuff',
			skillName: skillName ?? '',
			amount: amount ?? 0,
			turns: turns ?? -1,
			times: times ?? -1,
		}
	}
	const {
		servantClass,
		servantAtk,
		craftEssenceAtk,
		npColor,
		npValue,
		footprintB,
		footprintA,
		footprintQ,
		npGain,
		starRate,
		hitCountN,
		hitCountB,
		hitCountA,
		hitCountQ,
		hitCountEX,
		passiveEffects,
		turns,
	} = args
	const nonNullTurns = turns?.map((turn) => {
		const {
			classAffinity,
			attributeAffinity,
			targetDamage,
			dtdr,
			dsr,
			buffs: turnEffects,
			card1Effects,
			card2Effects,
			card3Effects,
			card4Effects,
			card1Type,
			card2Type,
			card3Type,
			card1IsCritical,
			card2IsCritical,
			card3IsCritical,
			card1DamageJudgement,
			card2DamageJudgement,
			card3DamageJudgement,
			card4DamageJudgement,
			card1OverKillCount,
			card2OverKillCount,
			card3OverKillCount,
			card4OverKillCount,
		} = turn
		return {
			classAffinity: classAffinity ?? 1,
			attributeAffinity: attributeAffinity ?? 1,
			targetDamage: targetDamage ?? 0,
			dtdr: dtdr ?? 1,
			dsr: dsr ?? 0,
			turnEffects: turnEffects ? turnEffects.map(processSkillData) : [],
			card1Effects: card1Effects ? card1Effects.map(processSkillData) : [],
			card2Effects: card2Effects ? card2Effects.map(processSkillData) : [],
			card3Effects: card3Effects ? card3Effects.map(processSkillData) : [],
			card4Effects: card4Effects ? card4Effects.map(processSkillData) : [],
			card1Type: card1Type ?? 'buster',
			card2Type: card2Type ?? 'arts',
			card3Type: card3Type ?? 'quick',
			card1IsCritical: card1IsCritical ?? false,
			card2IsCritical: card2IsCritical ?? false,
			card3IsCritical: card3IsCritical ?? false,
			card1DamageJudgement: card1DamageJudgement ?? 'normal',
			card2DamageJudgement: card2DamageJudgement ?? 'normal',
			card3DamageJudgement: card3DamageJudgement ?? 'normal',
			card4DamageJudgement: card4DamageJudgement ?? 'normal',
			card1OverKillCount: card1OverKillCount ?? 0,
			card2OverKillCount: card2OverKillCount ?? 0,
			card3OverKillCount: card3OverKillCount ?? 0,
			card4OverKillCount: card4OverKillCount ?? 0,
		}
	})
	return {
		servantClass: servantClass ?? 'saber',
		servantAtk: servantAtk ?? 0,
		craftEssenceAtk: craftEssenceAtk ?? 0,
		npColor: npColor ?? 'buster',
		npValue: npValue ?? 0,
		footprintB: footprintB ?? 0,
		footprintA: footprintA ?? 0,
		footprintQ: footprintQ ?? 0,
		npGain: npGain ?? 0,
		starRate: starRate ?? 0,
		hitCountN: hitCountN ?? 0,
		hitCountB: hitCountB ?? 0,
		hitCountA: hitCountA ?? 0,
		hitCountQ: hitCountQ ?? 0,
		hitCountEX: hitCountEX ?? 0,
		passiveEffects: passiveEffects ? passiveEffects.map(processSkillData) : [],
		turns: nonNullTurns ?? [],
	}
}

export function calculateDamages(
	args: DamageCalculatorInputValue,
): ProcessedTurnResult[] {
	const {
		servantClass,
		servantAtk,
		craftEssenceAtk,
		npColor,
		npValue,
		footprintB,
		footprintA,
		footprintQ,
		npGain,
		starRate,
		hitCountN,
		hitCountB,
		hitCountA,
		hitCountQ,
		hitCountEX,
		passiveEffects,
		turns,
	} = processArgs(args)

	const atk = servantAtk + craftEssenceAtk
	const footprints = {
		noblePhantasm: 0,
		buster: footprintB,
		arts: footprintA,
		quick: footprintQ,
		extra: 0,
	}
	const hitCounts = {
		noblePhantasm: hitCountN,
		buster: hitCountB,
		arts: hitCountA,
		quick: hitCountQ,
		extra: hitCountEX,
	}
	const classCorrectionValue = getClassCorrectionValue(servantClass)
	const initialBuff = [0, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
	const simulatedBuffs: Record<BuffType, number[][]> = {
		atkBuff: [[...initialBuff]],
		busterBuff: [[...initialBuff]],
		busterPowerBuff: [[...initialBuff]],
		artsBuff: [[...initialBuff]],
		artsPowerBuff: [[...initialBuff]],
		quickBuff: [[...initialBuff]],
		quickPowerBuff: [[...initialBuff]],
		extraBuff: [[...initialBuff]],
		extraPowerBuff: [[...initialBuff]],
		noblePhantasmBuff: [[...initialBuff]],
		criticalBuff: [[...initialBuff]],
		busterCriticalBuff: [[...initialBuff]],
		artsCriticalBuff: [[...initialBuff]],
		quickCriticalBuff: [[...initialBuff]],
		spBuff: [[...initialBuff]],
		npGetBuff: [[...initialBuff]],
		starGetBuff: [[...initialBuff]],
		npSuperEffectiveCorrection: [[...initialBuff]],
		spDef: [[...initialBuff]],
		damagePlus: [[...initialBuff]],
		npValueUp: [[...initialBuff]],
		cardCriticalBuff: [[...initialBuff]],
	}

	pushBuffs(simulatedBuffs, passiveEffects)

	const result: TurnResult[] = []

	for (const turnData of turns) {
		const turnResult: TurnResult = {
			baseDamages: [0, 0, 0, 0],
			constantDamages: [0, 0, 0, 0],
			nps: [0, 0, 0, 0],
			minStars: [0, 0, 0, 0],
			maxStars: [0, 0, 0, 0],
			minStarRates: [0, 0, 0, 0],
			maxStarRates: [0, 0, 0, 0],
			passRate: 0,
			atkBuffs: [0, 0, 0, 0],
			cardBuffs: [0, 0, 0, 0],
			npOrCrBuffs: [0, 0, 0, 0],
			spBuffs: [0, 0, 0, 0],
		}
		const {
			classAffinity,
			attributeAffinity,
			targetDamage,
			dtdr,
			dsr,
			turnEffects,
			card1Effects,
			card2Effects,
			card3Effects,
			card4Effects,
			card1Type,
			card2Type,
			card3Type,
			card1IsCritical,
			card2IsCritical,
			card3IsCritical,
			card1DamageJudgement,
			card2DamageJudgement,
			card3DamageJudgement,
			card4DamageJudgement,
			card1OverKillCount,
			card2OverKillCount,
			card3OverKillCount,
			card4OverKillCount,
		} = turnData

		pushBuffs(simulatedBuffs, turnEffects)

		const selectedCards: CommandCard[] = [
			card1Type,
			card2Type,
			card3Type,
			'extra',
		]

		const selectedCardColors: CardColor[] = selectedCards.map((v) =>
			v === 'noblePhantasm' ? npColor : v,
		)

		const cardEffects = [card1Effects, card2Effects, card3Effects, card4Effects]

		const cardIsCriticals = [
			card1IsCritical,
			card2IsCritical,
			card3IsCritical,
			false,
		]

		const cardDamageJudgements = [
			card1DamageJudgement,
			card2DamageJudgement,
			card3DamageJudgement,
			card4DamageJudgement,
		]

		const cardOverKillCounts = [
			card1OverKillCount,
			card2OverKillCount,
			card3OverKillCount,
			card4OverKillCount,
		]

		const {
			buster: firstBonusB,
			arts: firstBonusA,
			quick: firstBonusQ,
		} = getFirstBonusValues(selectedCardColors)

		//Bチェインボーナス
		const isBusterChain = selectedCardColors
			.slice(0, 3)
			.every((v) => v === 'buster')

		for (let cardIndex = 0; cardIndex <= 3; cardIndex++) {
			pushBuffs(simulatedBuffs, cardEffects[cardIndex])
			const damageJudgement = cardDamageJudgements[cardIndex]
			const isCritical = cardIsCriticals[cardIndex]
			const overKillCount = cardOverKillCounts[cardIndex]

			if (damageJudgement === 'nothing') {
				continue
			}

			//カード色の取得
			const selectedCard = selectedCards[cardIndex]
			const selectedCardColor = selectedCardColors[cardIndex]

			const selectedCardType: CardType =
				selectedCard === 'noblePhantasm'
					? 'noblePhantasm'
					: selectedCard === 'extra'
						? 'extra'
						: 'normal'
			const hitCount = hitCounts[selectedCard]
			const cardNpCorrectionValue = getNpCorrectionValue(
				selectedCardType,
				selectedCardColor,
				cardIndex + 1,
			)
			const cardStarCorrectionValue = getStarCorrectionValue(
				selectedCardType,
				selectedCardColor,
				cardIndex + 1,
			)
			const footprint = footprints[selectedCard]
			const correctedAtk = (atk + footprint) * classCorrectionValue

			const constantDamage =
				consumeBuff(simulatedBuffs, 'damagePlus') +
				(isBusterChain ? 0 : 0.2 * correctedAtk)

			let damageMultiplier = 1
			if (selectedCardType === 'noblePhantasm') {
				damageMultiplier =
					(npValue + consumeBuff(simulatedBuffs, 'npValueUp')) / 100
				const spnp = consumeBuff(simulatedBuffs, 'npSuperEffectiveCorrection')
				if (spnp !== 0) {
					damageMultiplier *= spnp / 100
				}
			} else if (isCritical) {
				damageMultiplier = 2
			} else if (selectedCard === 'extra') {
				damageMultiplier = 2
				//同色チェインの場合
				if (
					selectedCardColors[0] === selectedCardColors[1] &&
					selectedCardColors[1] === selectedCardColors[2]
				) {
					damageMultiplier = 3.5
				}
			}

			//各種バフ計算
			const atkBuff = Math.max(consumeBuff(simulatedBuffs, 'atkBuff') / 100, -1)
			const cardBuff =
				consumeBuff(simulatedBuffs, `${selectedCardColor}Buff`) / 100
			const cardPowerBuff =
				consumeBuff(
					simulatedBuffs,
					`${selectedCardColor}PowerBuff` as
						| 'busterPowerBuff'
						| 'artsPowerBuff'
						| 'quickPowerBuff',
				) / 100
			const totalCardBuff = Math.max(
				cardBuff +
					cardPowerBuff +
					(isCritical
						? consumeBuff(simulatedBuffs, 'cardCriticalBuff') / 100
						: 0),
				-1,
			)
			const spBuff = Math.max(consumeBuff(simulatedBuffs, 'spBuff') / 100, -1)
			const spDef = Math.min(consumeBuff(simulatedBuffs, 'spDef') / 100, 1)
			const npGetBuff = Math.max(
				consumeBuff(simulatedBuffs, 'npGetBuff') / 100,
				-1,
			)
			const starGetBuff = consumeBuff(simulatedBuffs, 'starGetBuff') / 100
			const cardCorrectionValue = getCardCorrectionValue(
				selectedCardType,
				selectedCardColor,
				cardIndex + 1,
			)
			const npOrCrBuff =
				selectedCardType === 'noblePhantasm'
					? Math.max(consumeBuff(simulatedBuffs, 'noblePhantasmBuff') / 100, -1)
					: isCritical
						? Math.max(
								(consumeBuff(simulatedBuffs, 'criticalBuff') +
									consumeBuff(
										simulatedBuffs,
										`${selectedCardColor}CriticalBuff` as
											| 'busterCriticalBuff'
											| 'artsCriticalBuff'
											| 'quickCriticalBuff',
									)) /
									100,
								-1,
							)
						: 0

			if (damageJudgement !== 'noDamage') {
				turnResult.baseDamages[cardIndex] = calcBase(
					correctedAtk,
					damageMultiplier,
					cardCorrectionValue,
					totalCardBuff,
					selectedCardType === 'noblePhantasm' ? 0 : firstBonusB,
					classAffinity,
					attributeAffinity,
					atkBuff,
					npOrCrBuff,
					spBuff,
					spDef,
				)
				turnResult.constantDamages[cardIndex] = constantDamage
			}
			turnResult.nps[cardIndex] = npGetCalc(
				npGain,
				cardNpCorrectionValue,
				Math.max(cardBuff, -1),
				selectedCardType === 'noblePhantasm' ? 0 : firstBonusA,
				dtdr,
				npGetBuff,
				isCritical,
				hitCount,
				overKillCount,
			)
			const [minStar, maxStar, minStarRate, maxStarRate] = starGetCalc(
				starRate,
				cardStarCorrectionValue,
				cardBuff,
				selectedCardType === 'noblePhantasm' ? 0 : firstBonusQ,
				dsr,
				starGetBuff,
				isCritical,
				hitCount,
				overKillCount,
			)
			turnResult.minStars[cardIndex] = minStar
			turnResult.maxStars[cardIndex] = maxStar
			turnResult.minStarRates[cardIndex] = minStarRate
			turnResult.maxStarRates[cardIndex] = maxStarRate

			turnResult.atkBuffs[cardIndex] = Math.round(10000 * atkBuff) / 100
			turnResult.cardBuffs[cardIndex] = Math.round(10000 * totalCardBuff) / 100
			turnResult.npOrCrBuffs[cardIndex] = Math.round(10000 * npOrCrBuff) / 100
			turnResult.spBuffs[cardIndex] = Math.round(10000 * spBuff) / 100
		}

		turnResult.passRate = calcPassRate(
			turnResult.baseDamages[0],
			turnResult.baseDamages[1],
			turnResult.baseDamages[2],
			turnResult.baseDamages[3],
			targetDamage -
				(turnResult.constantDamages[0] +
					turnResult.constantDamages[1] +
					turnResult.constantDamages[2] +
					turnResult.constantDamages[3]),
		)

		result.push(turnResult)

		//ターン経過処理
		for (const key in simulatedBuffs) {
			for (let k = 0; k < simulatedBuffs[key as BuffType].length; k++) {
				if (
					simulatedBuffs[key as BuffType][k][1] !== Number.POSITIVE_INFINITY
				) {
					simulatedBuffs[key as BuffType][k][1] -= 1
				}
			}
			simulatedBuffs[key as BuffType] = simulatedBuffs[key as BuffType].filter(
				(ele) => ele[1] > 0,
			)
		}
	}

	// 表用のデータに加工
	const processedResult = result.map((turnResult, turnIndex) => {
		const damage90 = turnResult.baseDamages.map((baseDamage, index) =>
			Math.floor(baseDamage * 0.9 + turnResult.constantDamages[index]),
		)
		const damage100 = turnResult.baseDamages.map((baseDamage, index) =>
			Math.floor(baseDamage * 1 + turnResult.constantDamages[index]),
		)
		const damage110 = turnResult.baseDamages.map((baseDamage, index) =>
			Math.floor(baseDamage * 1.1 + turnResult.constantDamages[index]),
		)
		return {
			...turnResult,
			damage90: [...damage90, damage90.reduce((a, b) => a + b, 0)],
			damage100: [...damage100, damage100.reduce((a, b) => a + b, 0)],
			damage110: [...damage110, damage110.reduce((a, b) => a + b, 0)],
			baseDamages: [
				...turnResult.baseDamages,
				turnResult.baseDamages.reduce((a, b) => a + b, 0),
			],
			constantDamages: [
				...turnResult.constantDamages,
				turnResult.constantDamages.reduce((a, b) => a + b, 0),
			],
			nps: [...turnResult.nps, turnResult.nps.reduce((a, b) => a + b, 0)],
			minStars: [
				...turnResult.minStars,
				turnResult.minStars.reduce((a, b) => a + b, 0),
			],
			maxStars: [
				...turnResult.maxStars,
				turnResult.maxStars.reduce((a, b) => a + b, 0),
			],
			selectedCards: [
				cardNames[turns[turnIndex].card1Type],
				cardNames[turns[turnIndex].card2Type],
				cardNames[turns[turnIndex].card3Type],
			],
			targetDamage: turns[turnIndex].targetDamage,
		}
	})
	return processedResult
}

// magは宝具なら倍率(特攻込み)、通常攻撃なら1、クリティカルなら2、EXなら2or3.5
function calcBase(
	atk: number,
	mag: number,
	cardCorr: number,
	cardbuff: number,
	fb: number,
	vsclass: number,
	vsattr: number,
	atkbuff: number,
	nporcrbuff: number,
	spbuff: number,
	spdef: number,
) {
	const result =
		atk *
		0.23 *
		mag *
		(cardCorr * (1 + cardbuff) + fb) *
		vsclass *
		vsattr *
		(1 + atkbuff) *
		(1 + nporcrbuff + spbuff) *
		(1 - spdef)
	return result
}

//クラス補正
function getClassCorrectionValue(servantClass: string) {
	switch (servantClass) {
		case 'berserker':
		case 'ruler':
		case 'avenger':
			return 1.1
		case 'lancer':
			return 1.05
		case 'archer':
			return 0.95
		case 'caster':
		case 'assassin':
			return 0.9
		default:
			return 1
	}
}

//バフ取得
function pushBuffs(
	simulatedBuffs: Record<BuffType, number[][]>,
	newBuffs: Required<Buff>[],
) {
	for (const buff of newBuffs) {
		const { skillType, amount, turns, times } = buff
		if (turns === -1 && times === -1) {
			simulatedBuffs[skillType][0][0] += amount
		} else if (times === -1) {
			simulatedBuffs[skillType].push([amount, turns, Number.POSITIVE_INFINITY])
		} else {
			simulatedBuffs[skillType].push([amount, turns, times])
		}
	}
}

//バフ処理
function consumeBuff(
	simulatedBuffs: Record<BuffType, number[][]>,
	skillType: BuffType,
) {
	let res = 0
	for (let i = 0; i < simulatedBuffs[skillType].length; i++) {
		res += simulatedBuffs[skillType][i][0]
		//回数制バフの回数を減らす
		if (simulatedBuffs[skillType][i][2] !== Number.POSITIVE_INFINITY) {
			simulatedBuffs[skillType][i][2] -= 1
		}
	}
	//回数が切れたバフを消す
	simulatedBuffs[skillType] = simulatedBuffs[skillType].filter(
		(ele) => ele[2] > 0,
	)
	return res
}

//撃破率計算
function calcPassRate(
	d1: number,
	d2: number,
	d3: number,
	d4: number,
	target: number,
) {
	if ((d1 + d2 + d3 + d4) * 1.099 < target) {
		return 0
	}
	if ((d1 + d2 + d3 + d4) * 0.9 >= target) {
		return 100
	}
	const first = []
	const second = []
	for (let i = 0.9; i <= 1.099; i += 0.001) {
		for (let j = 0.9; j <= 1.099; j += 0.001) {
			first.push(Math.floor(d1 * i + d2 * j))
			second.push(Math.floor(d3 * i + d4 * j))
		}
	}
	first.sort((a, b) => a - b)
	second.sort((a, b) => a - b)
	let cnt = 0
	let right = 39999
	for (let i = 0; i < 40000; i += 1) {
		if (first[i] >= target) {
			break
		}
		while (right > 0 && first[i] + second[right] >= target) {
			right -= 1
		}
		cnt += right + 1
	}
	return Math.round((1600000000 - cnt) / 160000) / 100
}

//NP計算
function npGetCalc(
	npRate: number,
	cardNpCorr: number,
	cardBuff: number,
	fb: number,
	dtdr: number,
	npGetBuff: number,
	isCr: boolean,
	hit: number,
	ovk: number,
) {
	const fixedOvk = ovk > hit ? hit : ovk
	let result =
		npRate *
		(cardNpCorr * (1 + cardBuff) + fb) *
		dtdr *
		(1 + npGetBuff) *
		(isCr ? 2 : 1) *
		100
	//hit数をかける前に小数点第3位切り捨て
	result = Math.floor(result)
	result = Math.floor(result * 1.5) * fixedOvk + result * (hit - fixedOvk)
	return result
}

//スター計算
function starGetCalc(
	starRate: number,
	cardStarCorr: number,
	cardbuff: number,
	fb: number,
	dsr: number,
	stargetbuff: number,
	isCr: boolean,
	hit: number,
	ovk: number,
) {
	const fixedOvk = ovk > hit ? hit : ovk
	let sr =
		starRate +
		cardStarCorr * (1 + cardbuff) +
		fb +
		dsr +
		stargetbuff +
		(isCr ? 0.2 : 0)
	const result = [0, 0, 0, 0]
	//発生率
	// オバキル0
	result[2] = Math.min(sr, 3)
	// オバキル全部
	result[3] = Math.min(sr + 0.3, 3)

	sr = result[3]
	for (let i = 1; i <= hit; i++) {
		if (i === fixedOvk + 1) {
			sr = result[2]
		}
		sr = Math.max(sr, 0)
		if (sr >= 3) {
			result[0] += 3
		} else {
			result[0] += Math.floor(sr)
			if (sr % 1 !== 0) {
				result[1] += 1
			}
		}
	}
	result[1] += result[0]
	return result
}
