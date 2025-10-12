import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { damageCalcResultAtom, damageCalcResultNpColorAtom } from '../../store/damageCalcResult';
import type { ProcessedTurnResult } from '../../utils/calcDamage';
import { cardColorStyles } from '../../data/options';
import { CardColor } from '../../data/types';
import { isColoredAtom } from '../../store/jotai';

type RecordType = {
  key: string;
  turn: string | null;
  buffType: 'atkBuff' | 'cardBuff' | 'npOrCrBuff' | 'spBuff' | null;
  first: string;
  second: string;
  third: string;
  ex: string;
};

const localizedBuffType = {
  atkBuff: '攻撃力バフ',
  cardBuff: 'カードバフ',
  npOrCrBuff: '宝具/クリバフ',
  spBuff: '特攻バフ'
} as const;

function defineColumns(isColored: boolean, npColor: CardColor | undefined): ColumnsType<RecordType> {
  const npColorStyle = npColor ? cardColorStyles[npColor] : undefined;
  const columns: ColumnsType<RecordType> = [
    {
      title: '',
      dataIndex: 'turn',
      key: 'turn',
      onCell: (record) => ({
        rowSpan: record.turn ? 4 : 0,
        style: { textAlign: 'center' }
      })
    },
    {
      title: '',
      dataIndex: 'buffType',
      key: 'buffType',
      render: (_, record) => (record.buffType ? localizedBuffType[record.buffType] : '')
    },
    {
      title: '1st',
      dataIndex: 'first',
      key: 'first',
      onCell: (record) => {
        const backgroundColor = record.first === 'N' ? npColorStyle : cardColorStyles[record.first as CardColor];
        return record.turn && isColored
          ? {
              style: {
                backgroundColor
              }
            }
          : {};
      }
    },
    {
      title: '2nd',
      dataIndex: 'second',
      key: 'second',
      onCell: (record) => {
        const backgroundColor = record.second === 'N' ? npColorStyle : cardColorStyles[record.second as CardColor];
        return record.turn && isColored
          ? {
              style: {
                backgroundColor
              }
            }
          : {};
      }
    },
    {
      title: '3rd',
      dataIndex: 'third',
      key: 'third',
      onCell: (record) => {
        const backgroundColor = record.third === 'N' ? npColorStyle : cardColorStyles[record.third as CardColor];
        return record.turn && isColored
          ? {
              style: {
                backgroundColor
              }
            }
          : {};
      }
    },
    {
      title: 'EX',
      dataIndex: 'ex',
      key: 'ex'
    }
  ];
  return columns;
}
function buildDataSource(result: ProcessedTurnResult[]): RecordType[] {
  return result.flatMap((turnResult, turnIndex) => {
    const { atkBuffs, cardBuffs, npOrCrBuffs, spBuffs } = turnResult;
    return [
      {
        key: `turn-${turnIndex + 1}-atkBuff`,
        turn: `${turnIndex + 1}T`,
        headerRowSpan: 4,
        buffType: 'atkBuff',
        first: `${atkBuffs[0] ?? 0}%`,
        second: `${atkBuffs[1] ?? 0}%`,
        third: `${atkBuffs[2] ?? 0}%`,
        ex: `${atkBuffs[3] ?? 0}%`
      },
      {
        key: `turn-${turnIndex + 1}-cardBuff`,
        turn: null,
        buffType: 'cardBuff',
        first: `${cardBuffs[0] ?? 0}%`,
        second: `${cardBuffs[1] ?? 0}%`,
        third: `${cardBuffs[2] ?? 0}%`,
        ex: `${cardBuffs[3] ?? 0}%`
      },
      {
        key: `turn-${turnIndex + 1}-npOrCrBuff`,
        turn: null,
        buffType: 'npOrCrBuff',
        first: `${npOrCrBuffs[0] ?? 0}%`,
        second: `${npOrCrBuffs[1] ?? 0}%`,
        third: `${npOrCrBuffs[2] ?? 0}%`,
        ex: `${npOrCrBuffs[3] ?? 0}%`
      },
      {
        key: `turn-${turnIndex + 1}-spBuff`,
        turn: null,
        buffType: 'spBuff',
        first: `${spBuffs[0] ?? 0}%`,
        second: `${spBuffs[1] ?? 0}%`,
        third: `${spBuffs[2] ?? 0}%`,
        ex: `${spBuffs[3] ?? 0}%`
      }
    ];
  });
}

function AppliedBuffsTable() {
  const result = useAtomValue(damageCalcResultAtom);
  const isColored = useAtomValue(isColoredAtom);
  const npColor = useAtomValue(damageCalcResultNpColorAtom);
  const dataSource = useMemo(() => buildDataSource(result), [result]);
  const columns = useMemo(() => defineColumns(isColored, npColor), [isColored, npColor]);
  return <Table columns={columns} dataSource={dataSource} pagination={false} rowHoverable={false} bordered />;
}

export default AppliedBuffsTable;
