import {
  BUSTER_CHAIN_CONSTANT_DAMAGE_COEFFICIENT,
  CARD_CORRECTION_VALUES,
  CRITICAL_DAMAGE_COEFFICIENT,
  EXTRA_DAMAGE_COEFFICIENT,
  SELECT_ORDER_COEFFICIENT
} from '../data/constants';
import type {
  Buff,
  BuffType,
  CardCategory,
  CardColor,
  CardType,
  DamageJudgement,
  ServantAttribute,
  ServantClass,
  TurnFormValue
} from '../data/types';
import { getClassAtkCorrectionValue } from './getClassAtkCorrectionValue';

interface BuffForCalc {
  type: BuffType;
  amount: number;
  turn: number;
  count: number;
}

interface CardForCalc {
  params: {
    type: CardType;
    isCritical: boolean;
    damageJudgement: DamageJudgement;
    overKillCount: number;
  };
  buffs: BuffForCalc[];
}

interface TurnForCalc {
  params: {
    classAffinity: number;
    attributeAffinity: number;
    targetDamage: number;
    dtdr: number;
    dsr: number;
  };
  buffs: BuffForCalc[];
  card1: CardForCalc;
  card2: CardForCalc;
  card3: CardForCalc;
  card4: CardForCalc;
}

export interface DamageCalculatorInputValue {
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
  startingBuffs: BuffForCalc[];
  turns: TurnForCalc[];
}

interface BuffValue {
  amount: number;
  turn: number | 'NO_LIMIT';
  count: number | 'NO_LIMIT';
}

export function convertBuffForCalc(buff: Buff): BuffForCalc {
  return {
    ...buff,
    amount: buff.amount ?? 0,
    turn: buff.turn ?? 0,
    count: buff.count ?? 0
  };
}

export function convertTurnForCalc(turn: TurnFormValue): TurnForCalc {
  return {
    params: {
      ...turn.params,
      targetDamage: turn.params.targetDamage ?? 0,
      dtdr: turn.params.dtdr ?? 0,
      dsr: turn.params.dsr ?? 0
    },
    buffs: turn.buffs.map(convertBuffForCalc),
    card1: {
      params: {
        ...turn.card1.params,
        overKillCount: turn.card1.params.overKillCount ?? 0
      },
      buffs: turn.card1.buffs.map(convertBuffForCalc)
    },
    card2: {
      params: {
        ...turn.card2.params,
        overKillCount: turn.card2.params.overKillCount ?? 0
      },
      buffs: turn.card2.buffs.map(convertBuffForCalc)
    },
    card3: {
      params: {
        ...turn.card3.params,
        overKillCount: turn.card3.params.overKillCount ?? 0
      },
      buffs: turn.card3.buffs.map(convertBuffForCalc)
    },
    card4: {
      params: {
        ...turn.card4.params,
        overKillCount: turn.card4.params.overKillCount ?? 0
      },
      buffs: turn.card4.buffs.map(convertBuffForCalc)
    }
  };
}

function getCardCorrectionValue(type: CardType, nth: number) {
  return CARD_CORRECTION_VALUES[type] * (type === 'noblePhantasm' ? 1 : 1 + (nth - 1) * SELECT_ORDER_COEFFICIENT);
}

function getFirstBonusValues(selectedCardColors: CardColor[]) {
  if (
    selectedCardColors[0] !== selectedCardColors[1] &&
    selectedCardColors[1] !== selectedCardColors[2] &&
    selectedCardColors[0] !== selectedCardColors[2]
  ) {
    // マイティチェイン
    return {
      buster: 0.5,
      arts: 1,
      quick: 0.2
    };
  }
  return {
    buster: selectedCardColors[0] === 'buster' ? 0.5 : 0,
    arts: selectedCardColors[0] === 'arts' ? 1 : 0,
    quick: selectedCardColors[0] === 'quick' ? 0.2 : 0
  };
}

function getStarCorrectionValue(type: CardType, npColor: CardColor, nth: number) {
  if (type === 'extra') {
    return 1;
  }
  if (type === 'noblePhantasm') {
    if (npColor === 'buster') {
      return 0.1;
    }
    if (npColor === 'quick') {
      return 0.8;
    }
  }
  if (type === 'buster') {
    return 0.05 + nth * 0.05;
  }
  if (type === 'quick') {
    return 0.3 + nth * 0.5;
  }
  return 0;
}

function getNpCorrectionValue(type: CardType, npColor: CardColor, nth: number) {
  if (type === 'extra') {
    return 1;
  }
  if (type === 'noblePhantasm') {
    if (npColor === 'arts') {
      return 3;
    }
    if (npColor === 'quick') {
      return 1;
    }
  }
  if (type === 'arts') {
    return 1.5 + nth * 1.5;
  }
  if (type === 'quick') {
    return 0.5 + nth * 0.5;
  }
  return 0;
}

export type TurnResult = {
  baseDamages: [number, number, number, number];
  constantDamages: [number, number, number, number];
  nps: [number, number, number, number];
  minStars: [number, number, number, number];
  maxStars: [number, number, number, number];
  minStarRates: [number, number, number, number];
  maxStarRates: [number, number, number, number];
  passRate: number;
  atkBuffs: [number, number, number, number];
  cardBuffs: [number, number, number, number];
  npOrCrBuffs: [number, number, number, number];
  spBuffs: [number, number, number, number];
};

export type ProcessedTurnResult = TurnResult & {
  damage90: [number, number, number, number];
  damage100: [number, number, number, number];
  damage110: [number, number, number, number];
  selectedCards: [CardType, CardType, CardType, 'EX'];
  targetDamage: number;
};

export function calculateDamages(args: DamageCalculatorInputValue): ProcessedTurnResult[] {
  const {
    servantClass,
    atk,
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
    startingBuffs: passiveEffects,
    turns
  } = args;

  const footprints = {
    noblePhantasm: 0,
    buster: footprintB,
    arts: footprintA,
    quick: footprintQ,
    extra: 0
  };
  const hitCounts = {
    noblePhantasm: hitCountN,
    buster: hitCountB,
    arts: hitCountA,
    quick: hitCountQ,
    extra: hitCountEX
  };
  const classCorrectionValue = getClassAtkCorrectionValue(servantClass);
  const initialBuff = {
    amount: 0,
    turn: 'NO_LIMIT',
    count: 'NO_LIMIT'
  } as const;
  const simulatedBuffs: Record<BuffType, BuffValue[]> = {
    atkBuff: [{ ...initialBuff }],
    busterBuff: [{ ...initialBuff }],
    busterPowerBuff: [{ ...initialBuff }],
    artsBuff: [{ ...initialBuff }],
    artsPowerBuff: [{ ...initialBuff }],
    quickBuff: [{ ...initialBuff }],
    quickPowerBuff: [{ ...initialBuff }],
    extraBuff: [{ ...initialBuff }],
    extraPowerBuff: [{ ...initialBuff }],
    noblePhantasmBuff: [{ ...initialBuff }],
    criticalBuff: [{ ...initialBuff }],
    busterCriticalBuff: [{ ...initialBuff }],
    artsCriticalBuff: [{ ...initialBuff }],
    quickCriticalBuff: [{ ...initialBuff }],
    spBuff: [{ ...initialBuff }],
    npGetBuff: [{ ...initialBuff }],
    starGetBuff: [{ ...initialBuff }],
    npSuperEffectiveCorrection: [{ ...initialBuff }],
    spDef: [{ ...initialBuff }],
    damagePlus: [{ ...initialBuff }],
    npValueUp: [{ ...initialBuff }],
    cardCriticalBuff: [{ ...initialBuff }]
  };
  pushBuffs(simulatedBuffs, passiveEffects);

  const result: TurnResult[] = [];

  for (const turnInput of turns) {
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
      spBuffs: [0, 0, 0, 0]
    };

    pushBuffs(simulatedBuffs, turnInput.buffs);

    function getCardColor(card: CardType) {
      if (card === 'extra') {
        throw new Error('invalid card type');
      }
      return card === 'noblePhantasm' ? npColor : card;
    }
    const selectedCardColors: CardColor[] = [
      getCardColor(turnInput.card1.params.type),
      getCardColor(turnInput.card2.params.type),
      getCardColor(turnInput.card3.params.type)
    ];

    const { buster: firstBonusB, arts: firstBonusA, quick: firstBonusQ } = getFirstBonusValues(selectedCardColors);

    const isBusterChain = selectedCardColors.every((v) => v === 'buster');
    const isArtsChain = selectedCardColors.every((v) => v === 'arts');
    const isQuickChain = selectedCardColors.every((v) => v === 'quick');
    const isChain = isBusterChain || isArtsChain || isQuickChain;

    for (const [cardIndex, cardInput] of [
      turnInput.card1,
      turnInput.card2,
      turnInput.card3,
      turnInput.card4
    ].entries()) {
      pushBuffs(simulatedBuffs, cardInput.buffs);
      const { damageJudgement, isCritical, overKillCount, type: cardType } = cardInput.params;
      if (damageJudgement === 'nothing') {
        continue;
      }
      const cardCategory: CardCategory =
        cardType === 'noblePhantasm' ? 'noblePhantasm' : cardType === 'extra' ? 'extra' : 'normal';
      const cardColor = cardType === 'noblePhantasm' ? npColor : cardType;
      const hitCount = hitCounts[cardType];
      const cardNpCorrectionValue = getNpCorrectionValue(cardType, npColor, cardIndex + 1);
      const cardStarCorrectionValue = getStarCorrectionValue(cardType, npColor, cardIndex + 1);
      const footprint = footprints[cardType];
      const correctedAtk = (atk + footprint) * classCorrectionValue;

      const constantDamage =
        consumeBuff(simulatedBuffs, 'damagePlus') +
        (isBusterChain ? BUSTER_CHAIN_CONSTANT_DAMAGE_COEFFICIENT * correctedAtk : 0);

      // ダメージ係数
      let damageCoefficient = 1;
      if (cardCategory === 'noblePhantasm') {
        damageCoefficient = (npValue + consumeBuff(simulatedBuffs, 'npValueUp')) / 100;
        const spnp = consumeBuff(simulatedBuffs, 'npSuperEffectiveCorrection');
        if (spnp !== 0) {
          damageCoefficient *= spnp / 100;
        }
      } else if (cardCategory === 'extra') {
        damageCoefficient = isChain ? EXTRA_DAMAGE_COEFFICIENT.chain : EXTRA_DAMAGE_COEFFICIENT.default;
      } else if (isCritical) {
        damageCoefficient = CRITICAL_DAMAGE_COEFFICIENT;
      }

      //各種バフ計算
      const atkBuff = Math.max(consumeBuff(simulatedBuffs, 'atkBuff') / 100, -1);
      const cardBuff = consumeBuff(simulatedBuffs, `${cardColor}Buff`) / 100;
      const cardPowerBuff = consumeBuff(simulatedBuffs, `${cardColor}PowerBuff`) / 100;
      const totalCardBuff = Math.max(
        cardBuff + cardPowerBuff + (isCritical ? consumeBuff(simulatedBuffs, 'cardCriticalBuff') / 100 : 0),
        -1
      );
      const spBuff = Math.max(consumeBuff(simulatedBuffs, 'spBuff') / 100, -1);
      const spDef = Math.min(consumeBuff(simulatedBuffs, 'spDef') / 100, 1);
      const npGetBuff = Math.max(consumeBuff(simulatedBuffs, 'npGetBuff') / 100, -1);
      const starGetBuff = consumeBuff(simulatedBuffs, 'starGetBuff') / 100;
      const cardCorrectionValue = getCardCorrectionValue(cardType, cardIndex + 1);
      const npOrCrBuff =
        cardType === 'noblePhantasm'
          ? Math.max(consumeBuff(simulatedBuffs, 'noblePhantasmBuff') / 100, -1)
          : isCritical && cardColor !== 'extra'
            ? Math.max(
                (consumeBuff(simulatedBuffs, 'criticalBuff') +
                  consumeBuff(simulatedBuffs, `${cardColor}CriticalBuff`)) /
                  100,
                -1
              )
            : 0;

      if (damageJudgement !== 'noDamage') {
        turnResult.baseDamages[cardIndex] = calcBase(
          correctedAtk,
          damageCoefficient,
          cardCorrectionValue,
          totalCardBuff,
          cardType === 'noblePhantasm' ? 0 : firstBonusB,
          turnInput.params.classAffinity,
          turnInput.params.attributeAffinity,
          atkBuff,
          npOrCrBuff,
          spBuff,
          spDef
        );
        turnResult.constantDamages[cardIndex] = constantDamage;
      }
      turnResult.nps[cardIndex] = npGetCalc(
        npGain,
        cardNpCorrectionValue,
        Math.max(cardBuff, -1),
        cardType === 'noblePhantasm' ? 0 : firstBonusA,
        turnInput.params.dtdr,
        npGetBuff,
        isCritical,
        hitCount,
        overKillCount
      );
      const [minStar, maxStar, minStarRate, maxStarRate] = starGetCalc(
        starRate,
        cardStarCorrectionValue,
        cardBuff,
        cardType === 'noblePhantasm' ? 0 : firstBonusQ,
        turnInput.params.dsr,
        starGetBuff,
        isCritical,
        hitCount,
        overKillCount
      );
      turnResult.minStars[cardIndex] = minStar;
      turnResult.maxStars[cardIndex] = maxStar;
      turnResult.minStarRates[cardIndex] = minStarRate;
      turnResult.maxStarRates[cardIndex] = maxStarRate;

      turnResult.atkBuffs[cardIndex] = Math.round(10000 * atkBuff) / 100;
      turnResult.cardBuffs[cardIndex] = Math.round(10000 * totalCardBuff) / 100;
      turnResult.npOrCrBuffs[cardIndex] = Math.round(10000 * npOrCrBuff) / 100;
      turnResult.spBuffs[cardIndex] = Math.round(10000 * spBuff) / 100;
    }

    turnResult.passRate = calcPassRate(
      turnResult.baseDamages[0],
      turnResult.baseDamages[1],
      turnResult.baseDamages[2],
      turnResult.baseDamages[3],
      turnInput.params.targetDamage -
        (turnResult.constantDamages[0] +
          turnResult.constantDamages[1] +
          turnResult.constantDamages[2] +
          turnResult.constantDamages[3])
    );

    result.push(turnResult);

    // ターン経過処理
    for (const [key, simulatedBuffArray] of Object.entries(simulatedBuffs)) {
      for (const simulatedBuff of simulatedBuffArray) {
        if (simulatedBuff.turn !== 'NO_LIMIT') {
          simulatedBuff.turn -= 1;
        }
      }
      simulatedBuffs[key as BuffType] = simulatedBuffArray.filter(
        (simulatedBuff) => simulatedBuff.turn === 'NO_LIMIT' || simulatedBuff.turn > 0
      );
    }
  }

  // 表用のデータに加工
  const processedResult = result.map((turnResult, turnIndex) => {
    const damage90 = turnResult.baseDamages.map((baseDamage, index) =>
      Math.floor(baseDamage * 0.9 + turnResult.constantDamages[index]!)
    ) as [number, number, number, number];
    const damage100 = turnResult.baseDamages.map((baseDamage, index) =>
      Math.floor(baseDamage * 1 + turnResult.constantDamages[index]!)
    ) as [number, number, number, number];
    const damage110 = turnResult.baseDamages.map((baseDamage, index) =>
      Math.floor(baseDamage * 1.1 + turnResult.constantDamages[index]!)
    ) as [number, number, number, number];
    return {
      ...turnResult,
      damage90,
      damage100,
      damage110,
      baseDamages: turnResult.baseDamages,
      constantDamages: turnResult.constantDamages,
      nps: turnResult.nps,
      minStars: turnResult.minStars,
      maxStars: turnResult.maxStars,
      selectedCards: [
        turns[turnIndex]!.card1.params.type,
        turns[turnIndex]!.card2.params.type,
        turns[turnIndex]!.card3.params.type,
        'EX'
      ] as [CardType, CardType, CardType, 'EX'],
      targetDamage: turns[turnIndex]!.params.targetDamage
    };
  });
  return processedResult;
}

// バフ追加
function pushBuffs(simulatedBuffs: Record<BuffType, BuffValue[]>, newBuffs: BuffForCalc[]) {
  for (const buff of newBuffs) {
    const { type, amount, turn, count } = buff;
    if (turn === -1 && count === -1) {
      simulatedBuffs[type][0]!.amount += amount;
    } else {
      simulatedBuffs[type].push({
        amount,
        turn: turn === -1 ? 'NO_LIMIT' : turn,
        count: count === -1 ? 'NO_LIMIT' : count
      });
    }
  }
}

//バフ処理
function consumeBuff(simulatedBuffs: Record<BuffType, BuffValue[]>, skillType: BuffType) {
  let ret = 0;
  for (const simulatedBuff of simulatedBuffs[skillType]) {
    ret += simulatedBuff.amount;
    //回数制バフの回数を減らす
    if (simulatedBuff.count !== 'NO_LIMIT') {
      simulatedBuff.count -= 1;
    }
  }
  //回数が切れたバフを消す
  simulatedBuffs[skillType] = simulatedBuffs[skillType].filter(
    (simulatedBuff) => simulatedBuff.count === 'NO_LIMIT' || simulatedBuff.count > 0
  );
  return ret;
}

// TODO: 以降リファクタリング

// 撃破率計算
function calcPassRate(d1: number, d2: number, d3: number, d4: number, target: number) {
  if ((d1 + d2 + d3 + d4) * 1.099 < target) {
    return 0;
  }
  if ((d1 + d2 + d3 + d4) * 0.9 >= target) {
    return 100;
  }
  const first = [];
  const second = [];
  for (let i = 0.9; i <= 1.099; i += 0.001) {
    for (let j = 0.9; j <= 1.099; j += 0.001) {
      first.push(Math.floor(d1 * i + d2 * j));
      second.push(Math.floor(d3 * i + d4 * j));
    }
  }
  first.sort((a, b) => a - b);
  second.sort((a, b) => a - b);
  let cnt = 0;
  let right = 39999;
  for (let i = 0; i < 40000; i += 1) {
    if (first[i]! >= target) {
      break;
    }
    while (right > 0 && first[i]! + second[right]! >= target) {
      right -= 1;
    }
    cnt += right + 1;
  }
  return Math.round((1600000000 - cnt) / 160000) / 100;
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
  spdef: number
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
    (1 - spdef);
  return result;
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
  ovk: number
) {
  const fixedOvk = ovk > hit ? hit : ovk;
  let result = npRate * (cardNpCorr * (1 + cardBuff) + fb) * dtdr * (1 + npGetBuff) * (isCr ? 2 : 1) * 100;
  //hit数をかける前に小数点第3位切り捨て
  result = Math.floor(result);
  result = Math.floor(result * 1.5) * fixedOvk + result * (hit - fixedOvk);
  return result;
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
  ovk: number
): [number, number, number, number] {
  const fixedOvk = ovk > hit ? hit : ovk;
  let sr = starRate + cardStarCorr * (1 + cardbuff) + fb + dsr + stargetbuff + (isCr ? 0.2 : 0);
  const result: [number, number, number, number] = [0, 0, 0, 0];
  //発生率
  // オバキル0
  result[2] = Math.min(sr, 3);
  // オバキル全部
  result[3] = Math.min(sr + 0.3, 3);

  sr = result[3];
  for (let i = 1; i <= hit; i++) {
    if (i === fixedOvk + 1) {
      sr = result[2];
    }
    sr = Math.max(sr, 0);
    if (sr >= 3) {
      result[0] += 3;
    } else {
      result[0] += Math.floor(sr);
      if (sr % 1 !== 0) {
        result[1] += 1;
      }
    }
  }
  result[1] += result[0];
  return result;
}
