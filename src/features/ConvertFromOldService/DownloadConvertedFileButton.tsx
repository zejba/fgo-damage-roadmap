import { Button, message } from 'antd';
import { format } from 'date-fns';
import { useCallback } from 'react';
import { DamageCalcFormValue, Buff, TurnFormValue, CardFormValue, BuffType, DamageJudgement } from '../../data/types';
import {
  buffTypeSchema,
  cardColorSchema,
  cardTypeSchema,
  servantAttributeSchema,
  servantClassSchema,
  validateDamageCalcFormValue
} from '../../zod-schema/damageCalcFormSchema';
import { v4 } from 'uuid';

interface Props {
  file?: File | null;
}

function convertCardInitialToValue(initial: string): string {
  switch (initial.toLowerCase()) {
    case 'b':
      return 'buster';
    case 'a':
      return 'arts';
    case 'q':
      return 'quick';
    case 'ex':
      return 'extra';
    case '-1':
      return 'extra';
    case 'n':
      return 'noblePhantasm';
    default:
      return initial;
  }
}

function convertServantClass(servantClass: string) {
  switch (servantClass) {
    case 'mooncancer':
      return 'moonCancer';
    case 'altereego':
      return 'alterEgo';
    default:
      return servantClass;
  }
}

// 文字列の安全な取得
const getString = (value: string | undefined): string => {
  return value ? value.trim() : '';
};

// 数値の変換関数（null許可）
const parseNumberOrNull = (value: string | undefined, fieldName: string): number | null => {
  if (!value) return null;
  const trimmed = getString(value);
  if (trimmed === '') return null;
  const parsed = Number(trimmed);
  if (isNaN(parsed)) {
    throw new Error(`Invalid number format in field: ${fieldName}`);
  }
  return parsed;
};

// 旧形式のスキルタイプを新形式に変換
function convertBuffType(oldType: string): string {
  const typeConverter: Record<string, BuffType> = {
    atk_buff: 'atkBuff',
    b_buff: 'busterBuff',
    b_power_buff: 'busterPowerBuff',
    a_buff: 'artsBuff',
    a_power_buff: 'artsPowerBuff',
    q_buff: 'quickBuff',
    q_power_buff: 'quickPowerBuff',
    ex_buff: 'extraBuff',
    np_buff: 'noblePhantasmBuff',
    cr_buff: 'criticalBuff',
    b_cr_buff: 'busterCriticalBuff',
    a_cr_buff: 'artsCriticalBuff',
    q_cr_buff: 'quickCriticalBuff',
    sp_buff: 'spBuff',
    cr_card_buff: 'cardCriticalBuff',
    sp_np: 'npSuperEffectiveCorrection',
    np_mag_up: 'npValueUp',
    sp_def: 'spDef',
    damage_plus: 'damagePlus',
    npget_buff: 'npGetBuff',
    starget_buff: 'starGetBuff'
  };
  return typeConverter[oldType] || oldType;
}

// スキルデータを解析してBuffの配列に変換
function parseSkillData(skillArray: string[]): Buff[] {
  if (!skillArray || skillArray.length === 0) return [];

  const buffCount = parseInt(skillArray[0] || '0');
  const buffs: Buff[] = [];

  for (let i = 0; i < buffCount; i++) {
    const baseIndex = i * 5 + 1;
    if (baseIndex + 4 < skillArray.length) {
      const amountStr = skillArray[baseIndex + 2];
      const turnStr = skillArray[baseIndex + 3];
      const countStr = skillArray[baseIndex + 4];

      const turn = parseNumberOrNull(turnStr, `buff${i}-turn`);
      const count = parseNumberOrNull(countStr, `buff${i}-count`);

      if (turn === null || count === null) {
        throw new Error(`Invalid turn or count for buff index ${i}`);
      }

      console.log(skillArray[baseIndex + 1]);
      buffs.push({
        id: v4(),
        name: skillArray[baseIndex] || '',
        type: buffTypeSchema.parse(convertBuffType(skillArray[baseIndex + 1] || '')),
        amount: parseNumberOrNull(amountStr, `buff${i}-amount`),
        turn: turn === 0 ? -1 : turn,
        count: count === 0 ? -1 : count
      });
    }
  }

  return buffs;
}

const getDamageJudgement = (value: string): DamageJudgement => {
  switch (value) {
    case '0':
      return 'default';
    case '1':
      return 'noDamage';
    case '2':
      return 'nothing';
    default:
      throw new Error(`Invalid damage judgement value: ${value}`);
  }
};

function convertData(lines: string[][]): DamageCalcFormValue {
  if (!lines[0] || lines[0].length < 17) {
    throw new Error('Invalid CSV format: insufficient data');
  }

  const arr = lines[0];

  const servantClass = servantClassSchema.parse(convertServantClass(getString(arr[1])));
  const servantAttribute = servantAttributeSchema.parse(getString(arr[2]));
  const npColor = cardColorSchema.parse(convertCardInitialToValue(getString(arr[5])));

  const startingBuffs = lines[1] ? parseSkillData(lines[1]) : [];

  // ターン数の取得
  const turnCount = parseInt(getString(arr[17])) || 0;
  if (turnCount > 1000) {
    throw new Error('ターン数が多すぎます');
  }
  const turns: TurnFormValue[] = [];

  // 各ターンの変換
  for (let i = 1; i <= turnCount; i++) {
    const turnDataIndex = 10 * i - 8; // 計算式: 10 * i - 8
    const turnSkillIndex = 10 * i - 7; // 計算式: 10 * i - 7

    if (turnDataIndex >= lines.length) break;

    const turnData = lines[turnDataIndex] || [];
    const turnSkillData = lines[turnSkillIndex] || [];

    // カードデータの変換
    const cards: CardFormValue[] = [];
    for (let j = 1; j <= 4; j++) {
      const cardDataIndex = 10 * i + 2 * j - 8;
      const cardSkillIndex = 10 * i + 2 * j - 7;

      const cardData = lines[cardDataIndex] || [];
      const cardSkillData = lines[cardSkillIndex] || [];

      const cardType = cardTypeSchema.parse(convertCardInitialToValue(getString(cardData[0])));
      const isCritical = j !== 4 && getString(cardData[3]) === '2';

      cards.push({
        params: {
          type: cardType,
          isCritical,
          damageJudgement: getString(cardData[0]) === '-1' ? 'nothing' : getDamageJudgement(getString(cardData[1])),
          overKillCount: parseNumberOrNull(cardData[2], `card${j}-ovk`)
        },
        buffs: parseSkillData(cardSkillData)
      });
    }
    if (cards.length !== 4) {
      throw new Error(`Invalid card data for turn ${i}`);
    }

    turns.push({
      id: v4(),
      params: {
        classAffinity: parseNumberOrNull(turnData[0], `turn${i}-classAffinity`) || 1,
        attributeAffinity: parseNumberOrNull(turnData[1], `turn${i}-attributeAffinity`) || 1,
        targetDamage: parseNumberOrNull(turnData[2], `turn${i}-targetDamage`),
        dtdr: parseNumberOrNull(turnData[3], `turn${i}-dtdr`),
        dsr: parseNumberOrNull(turnData[4], `turn${i}-dsr`)
      },
      buffs: parseSkillData(turnSkillData),
      card1: cards[0]!,
      card2: cards[1]!,
      card3: cards[2]!,
      card4: cards[3]!
    });
  }

  return {
    title: getString(arr[0]),
    servantClass,
    servantAttribute,
    servantAtk: parseNumberOrNull(arr[3], 'servant-atk'),
    craftEssenceAtk: parseNumberOrNull(arr[4], 'craft-essence-atk'),
    npColor,
    npValue: parseNumberOrNull(arr[6], 'np-mag'),
    footprintB: parseNumberOrNull(arr[7], 'b-footprint'),
    footprintA: parseNumberOrNull(arr[8], 'a-footprint'),
    footprintQ: parseNumberOrNull(arr[9], 'q-footprint'),
    npGain: parseNumberOrNull(arr[10], 'np-rate'),
    starRate: parseNumberOrNull(arr[11], 'star-rate'),
    hitCountN: parseNumberOrNull(arr[12], 'n-hit-count'),
    hitCountB: parseNumberOrNull(arr[13], 'b-hit-count'),
    hitCountA: parseNumberOrNull(arr[14], 'a-hit-count'),
    hitCountQ: parseNumberOrNull(arr[15], 'q-hit-count'),
    hitCountEX: parseNumberOrNull(arr[16], 'ex-hit-count'),
    startingBuffs,
    turns,
    isColored: false,
    isNpStarCalculated: false
  };
}

export function DownloadConvertedFileButton(props: Props) {
  const { file } = props;

  const handleDownload = useCallback(() => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        if (typeof e.target?.result !== 'string') {
          throw new Error('Invalid file content');
        }
        const lines = e.target.result.split('\n').map((line) => line.split(','));
        const convertedData = validateDamageCalcFormValue(convertData(lines));
        const title = convertedData.title.trim();
        const fileNameSafeTitle = title.replace(/[/\\?%*:|"<>]/g, '_');
        const json = JSON.stringify(convertedData, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileNameSafeTitle
          ? `${fileNameSafeTitle}.json`
          : `fgo_damage_roadmap_input_${format(new Date(), 'yyyyMMddHHmmss')}.json`;
        a.click();
        URL.revokeObjectURL(url);
        a.remove();
      } catch (error) {
        console.error(error);
        message.error('ファイルの読み込みに失敗しました');
      }
    };
    reader.onerror = (error) => {
      console.error(error);
      message.error('ファイルの読み込みに失敗しました');
    };
    reader.readAsText(file);
  }, [file]);

  return (
    <Button onClick={handleDownload} disabled={!file}>
      変換してダウンロード
    </Button>
  );
}
