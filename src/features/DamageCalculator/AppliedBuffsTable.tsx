import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { damageCalcResultAtom } from '../../store/damageCalcResult';
import type { ProcessedTurnResult } from '../../utils/calcDamage';
import styled from 'styled-components';

const StyledTable = styled(Table)`
  .buff-type-cell {
    width: 160px;
  }
  @media (max-width: 780px) {
    .buff-type-cell {
      width: 84px;
    }
  }
` as typeof Table;

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

const columns: ColumnsType<RecordType> = [
  {
    title: 'T',
    dataIndex: 'turn',
    key: 'turn',
    onCell: (record) => ({
      rowSpan: record.turn ? 4 : 0,
      style: {
        width: 0
      }
    })
  },
  {
    title: '',
    dataIndex: 'buffType',
    key: 'buffType',
    render: (_, record) => (record.buffType ? localizedBuffType[record.buffType] : ''),
    onCell: () => ({
      className: 'buff-type-cell'
    })
  },
  {
    title: '1st',
    dataIndex: 'first',
    key: 'first'
  },
  {
    title: '2nd',
    dataIndex: 'second',
    key: 'second'
  },
  {
    title: '3rd',
    dataIndex: 'third',
    key: 'third'
  },
  {
    title: 'EX',
    dataIndex: 'ex',
    key: 'ex'
  }
];

function buildDataSource(result: ProcessedTurnResult[]): RecordType[] {
  return result.flatMap((turnResult, turnIndex) => {
    const { atkBuffs, cardBuffs, npOrCrBuffs, spBuffs } = turnResult;
    return [
      {
        key: `turn-${turnIndex + 1}-atkBuff`,
        turn: `${turnIndex + 1}`,
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
  const dataSource = useMemo(() => buildDataSource(result), [result]);
  return (
    <StyledTable
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      rowHoverable={false}
      bordered
      footer={() => null}
    />
  );
}

export default AppliedBuffsTable;
