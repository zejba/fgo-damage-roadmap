const cardCorrectionValues = {
	n: 1,
	b: 1.5,
	a: 1,
	q: 0.8,
	ex: 0.625,
}

function getCardCorrectionValue(color, type, nth) {
	return (
		cardCorrectionValues[color] *
		(type === 'noblePhantasm' ? 1 : 1 + (nth - 1) * 0.2)
	)
}

function getFirstBonusValues(selectedCardColors) {
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
		buster: selectedCardColors[0] === 'b' ? 0.5 : 0,
		arts: selectedCardColors[0] === 'a' ? 1 : 0,
		quick: selectedCardColors[0] === 'q' ? 0.2 : 0,
	}
}

function getStarCorrectionValue(type, color, nth) {
	if (type === 'extra') {
		return 1
	}
	if (type === 'noblePhantasm') {
		if (color === 'b') {
			return 0.1
		}
		if (color === 'q') {
			return 0.8
		}
	}
	if (color == 'b') {
		return 0.05 + nth * 0.05
	}
	if (color == 'q') {
		return 0.3 + nth * 0.5
	}
	return 0
}

function getNpCorrectionValue(type, color, nth) {
	if (type === 'extra') {
		return 1
	}
	if (type === 'noblePhantasm') {
		if (color == 'a') {
			return 3
		}
		if (color == 'q') {
			return 1
		}
	}
	if (color == 'a') {
		return 1.5 + nth * 1.5
	}
	if (color == 'q') {
		return 0.5 + nth * 0.5
	}
	return 0
}

function calculate() {
	// 基本情報を取得
	const servantClass = document.getElementById('servant-class').value
	const servantAttr = document.getElementById('servant-attr').value
	const servantAtk = Number(document.getElementById('servant-atk').value)
	const craftEssenceAtk = Number(
		document.getElementById('craft-essence-atk').value,
	)
	const atk = servantAtk + craftEssenceAtk
	const npColor = document.getElementById('np-color').value
	const npMag = Number(document.getElementById('np-mag').value)
	const footprints = {
		b: Number(document.getElementById('b-footprint').value),
		a: Number(document.getElementById('a-footprint').value),
		q: Number(document.getElementById('q-footprint').value),
	}
	const npCalcRequired = document.getElementById('np-calc-check').checked
	const npRate = Number(document.getElementById('np-rate').value)
	const starRate = Number(document.getElementById('star-rate').value) / 100
	const hitCounts = {
		n: Number(document.getElementById('n-hit-count').value),
		b: Number(document.getElementById('b-hit-count').value),
		a: Number(document.getElementById('a-hit-count').value),
		q: Number(document.getElementById('q-hit-count').value),
		ex: Number(document.getElementById('ex-hit-count').value),
	}
	const classCorrectionValue = getClassCorrectionValue(servantClass)
	const turnLength = document.getElementsByClassName('turn-form').length
	const totalResult = []
	const npResult = []
	const starResult = []
	const buffCount = []
	const buffs = {
		atk_buff: [[0, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]],
		b_buff: [[0, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]],
		b_power_buff: [[0, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]],
		a_buff: [[0, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]],
		a_power_buff: [[0, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]],
		q_buff: [[0, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]],
		q_power_buff: [[0, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]],
		ex_buff: [[0, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]],
		ex_power_buff: [[0, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]],
		np_buff: [[0, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]],
		cr_buff: [[0, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]],
		b_cr_buff: [[0, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]],
		a_cr_buff: [[0, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]],
		q_cr_buff: [[0, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]],
		sp_buff: [[0, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]],
		npget_buff: [[0, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]],
		starget_buff: [[0, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]],
		sp_np: [[0, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]],
		sp_def: [[0, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]],
		damage_plus: [[0, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]],
		np_mag_up: [[0, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]],
		cr_card_buff: [[0, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]],
	}

	//パッシブスキル取得
	pushBuffs(buffs, 0, 0)

	//ターン数ループ
	for (let i = 1; i <= turnLength; i++) {
		const turnResult = []
		const turnForm = document.getElementById('turn' + i)
		//エネミー情報を取得
		const vsClassValue = Number(
			turnForm.getElementsByClassName('enemy-class')[0].value,
		)
		const vsAttrValue = Number(
			turnForm.getElementsByClassName('enemy-attr')[0].value,
		)
		const targetHp = Number(
			turnForm.getElementsByClassName('enemy-hp')[0].value,
		)
		const dtdr = Number(turnForm.getElementsByClassName('dtdr')[0].value) / 100
		const dsr = Number(turnForm.getElementsByClassName('dsr')[0].value) / 100

		// スキルのバフを計算
		pushBuffs(buffs, i, 0)

		// カード選択を取得
		const selectedCards = [
			turnForm.getElementsByClassName('card1-color')[0].value,
			turnForm.getElementsByClassName('card2-color')[0].value,
			turnForm.getElementsByClassName('card3-color')[0].value,
			'ex',
		]

		const selectedCardColors = selectedCards.map((v) =>
			v === 'n' ? npColor : v,
		)

		//1stボーナス
		const {
			buster: bFirstBonus,
			arts: aFirstBonus,
			quick: qFirstBonus,
		} = getFirstBonusValues(selectedCardColors)

		//Bチェインボーナス
		const isBusterChain = selectedCardColors
			.slice(0, 3)
			.every((v) => v == 'b' || (v == 'n' && npColor == 'b'))

		for (let j = 1; j <= 4; j++) {
			// カードのバフを追加
			pushBuffs(buffs, i, j)
			//判定
			const status =
				j == 4 && turnForm.getElementsByClassName('card4-color')[0].value == -1
					? 'notJudged'
					: ['default', 'noDamage', 'notJudged'][
							Number(
								turnForm.getElementsByClassName('card' + j + '-bool')[0].value,
							)
						]
			//オバキル
			const overKillCount = Number(
				turnForm.getElementsByClassName('card' + j + '-ovk')[0].value,
			)
			// クリティカル判定
			const isCritical =
				j != 4 &&
				Number(turnForm.getElementsByClassName('card' + j + '-cri')[0].value) ==
					2

			if (status == 'notJudged') {
				turnResult.push([0, 0])
				npResult.push(0)
				starResult.push([0, 0])
				buffCount.push([0, 0, 0, 0])
				continue
			}

			//カード色の取得
			const selectedCard = selectedCards[j - 1]
			const selectedCardColor = selectedCardColors[j - 1]

			const selectedCardType =
				selectedCard == 'n'
					? 'noblePhantasm'
					: selectedCard === 'ex'
						? 'extra'
						: 'normal'
			const hitCount = hitCounts[selectedCard]
			const cardNpCorrectionValue = getNpCorrectionValue(
				selectedCardType,
				selectedCardColor,
				j,
			)
			const cardStarCorrectionValue = getStarCorrectionValue(
				selectedCardType,
				selectedCardColor,
				j,
			)
			const footprint =
				selectedCardType === 'normal' ? footprints[selectedCard] : 0
			// atk計算
			const correctedAtk = (atk + footprint) * classCorrectionValue
			//固定ダメージ
			const constantDamage =
				consumeBuff(buffs, 'damage_plus') +
				(isBusterChain ? 0 : 0.2 * correctedAtk)

			let damageMultiplier = 1
			if (selectedCardType == 'noblePhantasm') {
				//宝具倍率
				damageMultiplier = (npMag + consumeBuff(buffs, 'np_mag_up')) / 100
				//特攻宝具処理
				const spnp = consumeBuff(buffs, 'sp_np')
				if (spnp != 0) {
					damageMultiplier = damageMultiplier * (spnp / 100)
				}
			} else if (isCritical) {
				damageMultiplier = 2
			} else if (selectedCard == 'ex') {
				damageMultiplier = 2
				//同色チェインの場合
				if (
					selectedCardColors[0] == selectedCardColors[1] &&
					selectedCardColors[1] == selectedCardColors
				) {
					damageMultiplier = 3.5
				}
			}

			//各種バフ計算
			const atkBuff = Math.max(consumeBuff(buffs, 'atk_buff') / 100, -1)
			const cardBuff = consumeBuff(buffs, selectedCardColor + '_buff') / 100
			const cardPowerBuff =
				consumeBuff(buffs, selectedCardColor + '_power_buff') / 100
			const totalCardBuff = Math.max(
				cardBuff +
					cardPowerBuff +
					(isCritical ? consumeBuff(buffs, 'cr_card_buff') / 100 : 0),
				-1,
			)
			const spBuff = Math.max(consumeBuff(buffs, 'sp_buff') / 100, -1)
			const spDefense = Math.min(consumeBuff(buffs, 'sp_def') / 100, 1)
			const npGetBuff = Math.max(consumeBuff(buffs, 'npget_buff') / 100, -1)
			const starGetBuff = consumeBuff(buffs, 'starget_buff') / 100
			const cardCorrectionValue = getCardCorrectionValue(
				selectedCardColor,
				selectedCardType,
				j,
			)
			const nporcrbuff =
				selectedCardType === 'noblePhantasm'
					? Math.max(consumeBuff(buffs, 'np_buff') / 100, -1)
					: isCritical
						? Math.max(
								(consumeBuff(buffs, 'cr_buff') +
									consumeBuff(buffs, selectedCardColor + '_cr_buff')) /
									100,
								-1,
							)
						: 0

			if (status == 'noDamage') {
				turnResult.push([0, 0])
			} else {
				turnResult.push([
					calcDamage(
						correctedAtk,
						damageMultiplier,
						cardCorrectionValue,
						totalCardBuff,
						selectedCardType === 'noblePhantasm' ? 0 : bFirstBonus,
						vsClassValue,
						vsAttrValue,
						atkBuff,
						nporcrbuff,
						spBuff,
						spDefense,
					),
					constantDamage,
				])
			}
			npResult.push(
				npGetCalc(
					npRate,
					cardNpCorrectionValue,
					Math.max(cardBuff, -1),
					selectedCardType === 'noblePhantasm' ? 0 : aFirstBonus,
					dtdr,
					npGetBuff,
					isCritical,
					hitCount,
					overKillCount,
				),
			)
			starResult.push(
				starGetCalc(
					starRate,
					cardStarCorrectionValue,
					cardBuff,
					selectedCardType === 'noblePhantasm' ? 0 : qFirstBonus,
					dsr,
					starGetBuff,
					isCritical,
					hitCount,
					overKillCount,
				),
			)
			buffCount.push([
				Math.round(10000 * atkBuff) / 100,
				Math.round(10000 * totalCardBuff) / 100,
				Math.round(10000 * nporcrbuff) / 100,
				Math.round(10000 * spBuff) / 100,
			])
		}

		//表出力用の配列を生成
		totalResult.push(selectedCards[0].toUpperCase())
		totalResult.push(selectedCards[1].toUpperCase())
		totalResult.push(selectedCards[2].toUpperCase())

		let sum = 0
		for (let l = 0; l < 4; l++) {
			const x = Math.floor(turnResult[l][0] * 0.9 + turnResult[l][1])
			totalResult.push(x)
			sum += x
		}
		totalResult.push(sum)
		totalResult.push(targetHp)
		totalResult.push(
			calcPassRate(
				turnResult[0][0],
				turnResult[1][0],
				turnResult[2][0],
				turnResult[3][0],
				targetHp -
					(turnResult[0][1] +
						turnResult[1][1] +
						turnResult[2][1] +
						turnResult[3][1]),
			),
		)

		sum = 0
		for (let l = 0; l < 4; l++) {
			const x = Math.floor(turnResult[l][0] * 1.0 + turnResult[l][1])
			totalResult.push(x)
			sum += x
		}
		totalResult.push(sum)
		sum = 0

		for (let l = 0; l < 4; l++) {
			const x = Math.floor(turnResult[l][0] * 1.099 + turnResult[l][1])
			totalResult.push(x)
			sum += x
		}
		totalResult.push(sum)

		//ターン経過処理
		Object.keys(buffs).forEach((element) => {
			for (let k = 0; k < buffs[element].length; k++) {
				if (buffs[element][k][1] != Number.POSITIVE_INFINITY) {
					buffs[element][k][1] -= 1
				}
			}
			buffs[element] = buffs[element].filter((elem) => elem[1] > 0)
		})
	}

	//出力
	if (turnLength != 0) {
		refResult(window)
		if (win1 && !win1.closed) {
			refResult(win1)
		}
	}

	//リザルトフォームを生成
	function refResult(target_window) {
		addResultForm(target_window, turnLength, npCalcRequired)
		const op = target_window.document.getElementsByName('result')
		const npr = target_window.document.getElementsByName('npresult')
		const starr = target_window.document.getElementsByName('starresult')
		const bufff = target_window.document.getElementById('hidden-result')
		bufff.innerHTML = ''
		//ターン数ループ
		for (let i = 0; i < turnLength; i++) {
			//カード色部分
			for (let j = 0; j < 3; j++) {
				const k = i * 20 + j
				op[k].textContent = totalResult[k].toLocaleString()
				if (document.getElementById('colorcheck').children[0].checked) {
					let cardcolor = totalResult[k]
					if (totalResult[k] == 'N') {
						cardcolor = npColor.toUpperCase()
					}
					if (cardcolor == 'B') {
						op[k].parentElement.style.backgroundColor = 'tomato'
					} else if (cardcolor == 'A') {
						op[k].parentElement.style.backgroundColor = 'cornflowerblue'
					} else if (cardcolor == 'Q') {
						op[k].parentElement.style.backgroundColor = 'lightgreen'
					}
				} else {
					op[k].parentElement.style.backgroundColor = 'white'
				}
			}
			//数値部分
			for (let j = 3; j < 20; j++) {
				const k = i * 20 + j
				op[k].textContent = totalResult[k].toLocaleString()
			}
			//NP部分
			if (npCalcRequired) {
				let npsum = 0
				const starsum = [0, 0]
				for (let j = 0; j <= 3; j++) {
					npr[i * 5 + j].textContent = npResult[i * 4 + j] / 100 + '%'
					npsum += npResult[i * 4 + j]
					starr[i * 5 + j].textContent =
						starResult[i * 4 + j][0] +
						'(+' +
						starResult[i * 4 + j][1] +
						')' +
						Math.floor(Math.max(starResult[i * 4 + j][2], 0) * 1000) / 10 +
						'～' +
						Math.floor(Math.max(starResult[i * 4 + j][3], 0) * 1000) / 10 +
						'%'
					starsum[0] += starResult[i * 4 + j][0]
					starsum[1] += starResult[i * 4 + j][1]
				}
				npr[i * 5 + 4].textContent = Math.floor(npsum) / 100 + '%'
				starr[i * 5 + 4].textContent = starsum[0] + '(+' + starsum[1] + ')'
			}

			//バフ情報
			for (let j = 0; j < 4; j++) {
				const new_element = document.createElement('li')
				new_element.textContent =
					i +
					1 +
					'T-' +
					(j + 1) +
					' 攻撃バフ:' +
					buffCount[4 * i + j][0] +
					'% 色バフ:' +
					buffCount[4 * i + j][1] +
					'% 宝具/クリバフ:' +
					buffCount[4 * i + j][2] +
					'% 特攻バフ:' +
					buffCount[4 * i + j][3] +
					'%'
				bufff.appendChild(new_element)
			}
			bufff.appendChild(document.createElement('br'))
		}
	}
}

// magは宝具なら倍率(特攻込み)、通常攻撃なら1、クリティカルなら2、EXなら2or3.5
function calcDamage(
	atk,
	mag,
	cardCorr,
	cardbuff,
	fb,
	vsclass,
	vsattr,
	atkbuff,
	nporcrbuff,
	spbuff,
	spdef,
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
function getClassCorrectionValue(servantClass) {
	if (['berserker', 'ruler', 'avenger'].includes(servantClass)) {
		return 1.1
	} else if (servantClass == 'lancer') {
		return 1.05
	} else if (servantClass == 'archer') {
		return 0.95
	} else if (['caster', 'assassin'].includes(servantClass)) {
		return 0.9
	} else {
		return 1
	}
}

//バフ取得
function pushBuffs(buffs, turn, card) {
	const ele = document
		.getElementById('turn' + turn)
		.getElementsByClassName('card' + card + '-skill')[0]
	const buffForms = ele.getElementsByClassName('buff-form') ?? []
	for (let i = 0; i < buffForms.length; i++) {
		const skillType = buffForms[i].getElementsByClassName('skill-type')[0].value
		const amount = Number(
			buffForms[i].getElementsByClassName('amount')[0].value,
		)
		const turn = Number(buffForms[i].getElementsByClassName('turn')[0].value)
		const time = Number(buffForms[i].getElementsByClassName('time')[0].value)
		if (amount === 0) {
			continue
		}
		// 永続スキル
		if (turn == 0 && time == 0) {
			buffs[skillType][0][0] += amount
			// ターン制スキル
		} else if (time == 0) {
			buffs[skillType].push([amount, turn, Number.POSITIVE_INFINITY])
			// 回数制スキル
		} else {
			buffs[skillType].push([amount, turn, time])
		}
	}
}

//バフ処理
function consumeBuff(buffs, buffName) {
	let buff = 0
	for (let i = 0; i < buffs[buffName].length; i++) {
		buff += Number(buffs[buffName][i][0])
		//回数制バフの回数を減らす
		if (buffs[buffName][i][2] != Number.POSITIVE_INFINITY) {
			buffs[buffName][i][2] -= 1
		}
	}

	//回数が切れたバフを消す
	buffs[buffName] = buffs[buffName].filter((element) => element[2] > 0)
	return buff
}

//撃破率計算
function calcPassRate(d1, d2, d3, d4, target) {
	if ((d1 + d2 + d3 + d4) * 1.099 < target) {
		return 0
	} else if ((d1 + d2 + d3 + d4) * 0.9 >= target) {
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

//二分探索
function binarySearch(target, arr) {
	let left = 0
	let right = 39999
	if (target <= arr[left]) {
		return 0
	} else if (target > arr[right]) {
		return 40000
	}

	while (right - left > 1) {
		const mid = Math.floor((left + right) / 2)
		if (target > arr[mid]) {
			left = mid
		} else {
			right = mid
		}
	}
	return left + 1
}

//表を増やす
function addResultForm(target_window, i, np) {
	const parent = target_window.document.getElementById('result-form')
	//初期化
	const t = target_window.document.getElementsByClassName('result-content')
	for (let k = 0; k < t.length; ) {
		t[0].remove()
	}
	//ターンの数ループ
	for (let j = 1; j <= i; j++) {
		//1行ごとに処理
		let template = document.getElementById('result-template1').content
		let newresult = template.cloneNode(true)
		newresult.children[0].children[0].textContent = j + 'T'
		parent.appendChild(newresult)
		if (np) {
			template = document.getElementById('result-template2').content
			newresult = template.cloneNode(true)
			parent.appendChild(newresult)
		}
	}
}

//NP計算
function npGetCalc(
	npRate,
	cardNpCorr,
	cardbuff,
	fb,
	dtdr,
	npgetbuff,
	cr,
	hit,
	ovk,
) {
	if (ovk > hit) {
		ovk = hit
	}
	let result
	result =
		npRate *
		(cardNpCorr * (1 + cardbuff) + fb) *
		dtdr *
		(1 + npgetbuff) *
		cr *
		100
	//hit数をかける前に小数点第3位切り捨て
	result = Math.floor(result)
	result = Math.floor(result * 1.5) * ovk + result * (hit - ovk)
	return result
}

//スター計算
function starGetCalc(
	starRate,
	cardStarCorr,
	cardbuff,
	fb,
	dsr,
	stargetbuff,
	cr,
	hit,
	ovk,
) {
	if (cr == 2) {
		cr = 0.2
	} else {
		cr = 0
	}
	if (ovk > hit) {
		ovk = hit
	}
	let sr
	sr = starRate + cardStarCorr * (1 + cardbuff) + fb + dsr + stargetbuff + cr
	const result = [0, 0, 0, 0]
	//発生率格納
	// オバキル0
	result[2] = Math.min(sr, 3)
	// オバキル全部
	result[3] = Math.min(sr + 0.3, 3)
	// if (ovk==0) {
	//オバキル0なら下限に統一
	//result[3] = result[2];
	//} else if (ovk==hit) {
	//オバキル全部なら上限に統一
	//result[2] = result[3];
	//}

	sr = result[3]
	for (let i = 1; i <= hit; i++) {
		if (i == ovk + 1) {
			sr = result[2]
		}
		sr = Math.max(sr, 0)
		if (sr >= 3) {
			result[0] += 3
		} else {
			result[0] += Math.floor(sr)
			if (sr % 1 != 0) {
				result[1] += 1
			}
		}
	}
	return result
}
