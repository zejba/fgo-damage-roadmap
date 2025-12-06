import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { damageCalcResultAtom } from '../../store/damageCalcResult';
import type { ProcessedTurnResult } from '../../utils/calcDamage';
import styled from 'styled-components';
import { BUFF_AMOUNT_LIMITS } from '../../data/constants';

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid black;

  th,
  td {
    border: 1px solid black;
    text-align: center;
    padding: 16px 12px;
  }

  th {
    background-color: #fafafa;
    font-weight: bold;
  }

  .buff-type-cell {
    width: 160px;
  }

  @media (max-width: 780px) {
    .buff-type-cell {
      width: 84px;
    }

    th,
    td {
      font-size: 0.55rem !important;
      padding: 8px 4px !important;
    }
  }
`;

type TableRow = {
  turn: string | null;
  turnRowSpan: number;
  buffType: 'atkBuff' | 'cardBuff' | 'npOrCrBuff' | 'spBuff';
  first: number;
  second: number;
  third: number;
  ex: number;
};

const localizedBuffType = {
  atkBuff: '攻撃力バフ',
  cardBuff: 'カードバフ',
  npOrCrBuff: '宝具/クリバフ',
  spBuff: '特攻バフ'
} as const;

function buildTableData(result: ProcessedTurnResult[]): TableRow[] {
  return result.flatMap((turnResult, turnIndex) => {
    const { atkBuffs, cardBuffs, npOrCrBuffs, spBuffs } = turnResult;
    return [
      {
        turn: `${turnIndex + 1}`,
        turnRowSpan: 4,
        buffType: 'atkBuff' as const,
        first: atkBuffs[0] ?? 0,
        second: atkBuffs[1] ?? 0,
        third: atkBuffs[2] ?? 0,
        ex: atkBuffs[3] ?? 0
      },
      {
        turn: null,
        turnRowSpan: 0,
        buffType: 'cardBuff' as const,
        first: cardBuffs[0] ?? 0,
        second: cardBuffs[1] ?? 0,
        third: cardBuffs[2] ?? 0,
        ex: cardBuffs[3] ?? 0
      },
      {
        turn: null,
        turnRowSpan: 0,
        buffType: 'npOrCrBuff' as const,
        first: npOrCrBuffs[0] ?? 0,
        second: npOrCrBuffs[1] ?? 0,
        third: npOrCrBuffs[2] ?? 0,
        ex: 0
      },
      {
        turn: null,
        turnRowSpan: 0,
        buffType: 'spBuff' as const,
        first: spBuffs[0] ?? 0,
        second: spBuffs[1] ?? 0,
        third: spBuffs[2] ?? 0,
        ex: spBuffs[3] ?? 0
      }
    ];
  });
}

function AppliedBuffsTable() {
  const result = useAtomValue(damageCalcResultAtom);
  const tableData = useMemo(() => buildTableData(result), [result]);

  return (
    <StyledTable>
      <thead>
        <tr>
          <th>T</th>
          <th className="buff-type-cell"></th>
          <th>1st</th>
          <th>2nd</th>
          <th>3rd</th>
          <th>EX</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, index) => (
          <tr key={index}>
            {row.turnRowSpan > 0 && (
              <td rowSpan={row.turnRowSpan} style={{ width: 0 }}>
                {row.turn}
              </td>
            )}
            <td className="buff-type-cell">{localizedBuffType[row.buffType]}</td>
            <td style={row.first > BUFF_AMOUNT_LIMITS[row.buffType] ? { backgroundColor: '#FFFF7F' } : {}}>
              {row.first}%
            </td>
            <td style={row.second > BUFF_AMOUNT_LIMITS[row.buffType] ? { backgroundColor: '#FFFF7F' } : {}}>
              {row.second}%
            </td>
            <td style={row.third > BUFF_AMOUNT_LIMITS[row.buffType] ? { backgroundColor: '#FFFF7F' } : {}}>
              {row.third}%
            </td>
            <td style={row.ex > BUFF_AMOUNT_LIMITS[row.buffType] ? { backgroundColor: '#FFFF7F' } : {}}>{row.ex}%</td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
}

export default AppliedBuffsTable;
