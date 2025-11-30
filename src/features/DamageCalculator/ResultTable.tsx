import { useAtomValue } from 'jotai';
import { useMemo, useRef } from 'react';
import styled from 'styled-components';
import { Tooltip, TooltipProps } from '@mui/material';
import {
  damageCalcResultAtom,
  damageCalcResultNpColorAtom,
  isNpStarCalculatedAtom
} from '../../store/damageCalcResult';
import type { ProcessedTurnResult } from '../../utils/calcDamage';
import { cardColorStyles, cardInitial } from '../../data/options';
import { CardColor } from '../../data/types';
import { isColoredAtom } from '../../store/jotai';
import SaveResultAsImageButton from './SaveResultAsImageButton';

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

  @media (max-width: 560px) {
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
  first: string;
  firstBgColor?: string;
  firstBuffs?: { atkBuff: number; cardBuff: number; npOrCrBuff: number; spBuff: number };
  second: string;
  secondBgColor?: string;
  secondBuffs?: { atkBuff: number; cardBuff: number; npOrCrBuff: number; spBuff: number };
  third: string;
  thirdBgColor?: string;
  thirdBuffs?: { atkBuff: number; cardBuff: number; npOrCrBuff: number; spBuff: number };
  ex: string;
  exBuffs?: { atkBuff: number; cardBuff: number; spBuff: number };
  total: string;
  targetDamage: string | null;
  targetDamageRowSpan: number;
  passRate: string | null;
  passRateRowSpan: number;
  showTooltip?: boolean;
};

function buildTableData(
  result: ProcessedTurnResult[],
  isNpStarCalculated: boolean,
  isColored: boolean,
  npColor: CardColor | undefined
): TableRow[] {
  const npColorStyle = npColor ? cardColorStyles[npColor] : undefined;

  return result.flatMap((turnResult, turnIndex) => {
    const {
      selectedCards,
      damage90,
      damage100,
      damage110,
      passRate,
      targetDamage,
      nps,
      minStars,
      maxStars,
      minStarRates,
      maxStarRates
    } = turnResult;
    const damage90Sum = damage90.reduce((a, b) => a + b, 0);
    const damage100Sum = damage100.reduce((a, b) => a + b, 0);
    const damage110Sum = damage110.reduce((a, b) => a + b, 0);
    const totalNp = Math.round(nps.reduce((a, b) => a + b * 100, 0)) / 100;
    const totalMinStar = minStars.reduce((a, b) => a + b, 0);
    const totalMaxStar = maxStars.reduce((a, b) => a + b, 0);

    const getCardBgColor = (cardInitialValue: string) => {
      if (!isColored) return undefined;
      return cardInitialValue === 'N' ? npColorStyle : cardColorStyles[cardInitialValue as CardColor];
    };

    const firstCardInitial = cardInitial[selectedCards[0]];
    const secondCardInitial = cardInitial[selectedCards[1]];
    const thirdCardInitial = cardInitial[selectedCards[2]];

    const { atkBuffs, cardBuffs, npOrCrBuffs, spBuffs } = turnResult;

    const rows: TableRow[] = [
      {
        turn: `${turnIndex + 1}`,
        turnRowSpan: 4,
        first: firstCardInitial,
        firstBgColor: getCardBgColor(firstCardInitial),
        second: secondCardInitial,
        secondBgColor: getCardBgColor(secondCardInitial),
        third: thirdCardInitial,
        thirdBgColor: getCardBgColor(thirdCardInitial),
        ex: '-',
        total: '-',
        targetDamage: '-',
        targetDamageRowSpan: 1,
        passRate: '-',
        passRateRowSpan: 1,
        showTooltip: false
      },
      {
        turn: null,
        turnRowSpan: 0,
        first: damage90[0].toLocaleString(),
        firstBuffs: {
          atkBuff: atkBuffs[0] ?? 0,
          cardBuff: cardBuffs[0] ?? 0,
          npOrCrBuff: npOrCrBuffs[0] ?? 0,
          spBuff: spBuffs[0] ?? 0
        },
        second: damage90[1].toLocaleString(),
        secondBuffs: {
          atkBuff: atkBuffs[1] ?? 0,
          cardBuff: cardBuffs[1] ?? 0,
          npOrCrBuff: npOrCrBuffs[1] ?? 0,
          spBuff: spBuffs[1] ?? 0
        },
        third: damage90[2].toLocaleString(),
        thirdBuffs: {
          atkBuff: atkBuffs[2] ?? 0,
          cardBuff: cardBuffs[2] ?? 0,
          npOrCrBuff: npOrCrBuffs[2] ?? 0,
          spBuff: spBuffs[2] ?? 0
        },
        ex: damage90[3].toLocaleString(),
        exBuffs: { atkBuff: atkBuffs[3] ?? 0, cardBuff: cardBuffs[3] ?? 0, spBuff: spBuffs[3] ?? 0 },
        total: damage90Sum.toLocaleString(),
        targetDamage: targetDamage.toLocaleString(),
        targetDamageRowSpan: 3,
        passRate: `${passRate}%`,
        passRateRowSpan: 3,
        showTooltip: true
      },
      {
        turn: null,
        turnRowSpan: 0,
        first: damage100[0].toLocaleString(),
        firstBuffs: {
          atkBuff: atkBuffs[0] ?? 0,
          cardBuff: cardBuffs[0] ?? 0,
          npOrCrBuff: npOrCrBuffs[0] ?? 0,
          spBuff: spBuffs[0] ?? 0
        },
        second: damage100[1].toLocaleString(),
        secondBuffs: {
          atkBuff: atkBuffs[1] ?? 0,
          cardBuff: cardBuffs[1] ?? 0,
          npOrCrBuff: npOrCrBuffs[1] ?? 0,
          spBuff: spBuffs[1] ?? 0
        },
        third: damage100[2].toLocaleString(),
        thirdBuffs: {
          atkBuff: atkBuffs[2] ?? 0,
          cardBuff: cardBuffs[2] ?? 0,
          npOrCrBuff: npOrCrBuffs[2] ?? 0,
          spBuff: spBuffs[2] ?? 0
        },
        ex: damage100[3].toLocaleString(),
        exBuffs: { atkBuff: atkBuffs[3] ?? 0, cardBuff: cardBuffs[3] ?? 0, spBuff: spBuffs[3] ?? 0 },
        total: damage100Sum.toLocaleString(),
        targetDamage: null,
        targetDamageRowSpan: 0,
        passRate: null,
        passRateRowSpan: 0,
        showTooltip: true
      },
      {
        turn: null,
        turnRowSpan: 0,
        first: damage110[0].toLocaleString(),
        firstBuffs: {
          atkBuff: atkBuffs[0] ?? 0,
          cardBuff: cardBuffs[0] ?? 0,
          npOrCrBuff: npOrCrBuffs[0] ?? 0,
          spBuff: spBuffs[0] ?? 0
        },
        second: damage110[1].toLocaleString(),
        secondBuffs: {
          atkBuff: atkBuffs[1] ?? 0,
          cardBuff: cardBuffs[1] ?? 0,
          npOrCrBuff: npOrCrBuffs[1] ?? 0,
          spBuff: spBuffs[1] ?? 0
        },
        third: damage110[2].toLocaleString(),
        thirdBuffs: {
          atkBuff: atkBuffs[2] ?? 0,
          cardBuff: cardBuffs[2] ?? 0,
          npOrCrBuff: npOrCrBuffs[2] ?? 0,
          spBuff: spBuffs[2] ?? 0
        },
        ex: damage110[3].toLocaleString(),
        exBuffs: { atkBuff: atkBuffs[3] ?? 0, cardBuff: cardBuffs[3] ?? 0, spBuff: spBuffs[3] ?? 0 },
        total: damage110Sum.toLocaleString(),
        targetDamage: null,
        targetDamageRowSpan: 0,
        passRate: null,
        passRateRowSpan: 0,
        showTooltip: true
      }
    ];

    if (isNpStarCalculated) {
      rows.push(
        {
          turn: 'NP',
          turnRowSpan: 1,
          first: `${nps[0]}%`,
          second: `${nps[1]}%`,
          third: `${nps[2]}%`,
          ex: `${nps[3]}%`,
          total: `${totalNp}%`,
          targetDamage: '-',
          targetDamageRowSpan: 1,
          passRate: '-',
          passRateRowSpan: 1
        },
        {
          turn: '星',
          turnRowSpan: 2,
          first: `${minStars[0]} - ${maxStars[0]}`,
          second: `${minStars[1]} - ${maxStars[1]}`,
          third: `${minStars[2]} - ${maxStars[2]}`,
          ex: `${minStars[3]} - ${maxStars[3]}`,
          total: `${totalMinStar} - ${totalMaxStar}`,
          targetDamage: '-',
          targetDamageRowSpan: 1,
          passRate: '-',
          passRateRowSpan: 1
        },
        {
          turn: null,
          turnRowSpan: 0,
          first: `${minStarRates[0]}% - ${maxStarRates[0]}%`,
          second: `${minStarRates[1]}% - ${maxStarRates[1]}%`,
          third: `${minStarRates[2]}% - ${maxStarRates[2]}%`,
          ex: `${minStarRates[3]}% - ${maxStarRates[3]}%`,
          total: '-',
          targetDamage: '-',
          targetDamageRowSpan: 1,
          passRate: '-',
          passRateRowSpan: 1
        }
      );
    }

    return rows;
  });
}

const TooltipContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 0.875rem;
`;

function createTooltipContent(buffs: { atkBuff: number; cardBuff: number; npOrCrBuff: number; spBuff: number }) {
  return (
    <TooltipContent>
      <div>攻撃力バフ: {buffs.atkBuff}%</div>
      <div>カードバフ: {buffs.cardBuff}%</div>
      <div>宝具/クリバフ: {buffs.npOrCrBuff}%</div>
      <div>特攻バフ: {buffs.spBuff}%</div>
    </TooltipContent>
  );
}

function createExTooltipContent(buffs: { atkBuff: number; cardBuff: number; spBuff: number }) {
  return (
    <TooltipContent>
      <div>攻撃力バフ: {buffs.atkBuff}%</div>
      <div>カードバフ: {buffs.cardBuff}%</div>
      <div>特攻バフ: {buffs.spBuff}%</div>
    </TooltipContent>
  );
}

function BuffTooltip(props: TooltipProps) {
  return <Tooltip arrow placement="top-start" enterTouchDelay={0} {...props} />;
}

function ResultTable() {
  const result = useAtomValue(damageCalcResultAtom);
  const isColored = useAtomValue(isColoredAtom);
  const npColor = useAtomValue(damageCalcResultNpColorAtom);
  const isNpStarCalculated = useAtomValue(isNpStarCalculatedAtom);
  const tableData = useMemo(
    () => buildTableData(result, isNpStarCalculated, isColored, npColor),
    [result, isNpStarCalculated, isColored, npColor]
  );
  const tableRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div ref={tableRef}>
        <StyledTable>
          <thead>
            <tr>
              <th>T</th>
              <th>1st</th>
              <th>2nd</th>
              <th>3rd</th>
              <th>EX</th>
              <th>total</th>
              <th>目標ダメ</th>
              <th>撃破率</th>
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
                {row.showTooltip && row.firstBuffs ? (
                  <BuffTooltip title={createTooltipContent(row.firstBuffs)}>
                    <td style={{ backgroundColor: row.firstBgColor }}>{row.first}</td>
                  </BuffTooltip>
                ) : (
                  <td style={{ backgroundColor: row.firstBgColor }}>{row.first}</td>
                )}
                {row.showTooltip && row.secondBuffs ? (
                  <BuffTooltip title={createTooltipContent(row.secondBuffs)}>
                    <td style={{ backgroundColor: row.secondBgColor }}>{row.second}</td>
                  </BuffTooltip>
                ) : (
                  <td style={{ backgroundColor: row.secondBgColor }}>{row.second}</td>
                )}
                {row.showTooltip && row.thirdBuffs ? (
                  <BuffTooltip title={createTooltipContent(row.thirdBuffs)}>
                    <td style={{ backgroundColor: row.thirdBgColor }}>{row.third}</td>
                  </BuffTooltip>
                ) : (
                  <td style={{ backgroundColor: row.thirdBgColor }}>{row.third}</td>
                )}
                {row.showTooltip && row.exBuffs ? (
                  <BuffTooltip title={createExTooltipContent(row.exBuffs)}>
                    <td>{row.ex}</td>
                  </BuffTooltip>
                ) : (
                  <td>{row.ex}</td>
                )}
                <td>{row.total}</td>
                {row.targetDamageRowSpan > 0 && <td rowSpan={row.targetDamageRowSpan}>{row.targetDamage}</td>}
                {row.passRateRowSpan > 0 && <td rowSpan={row.passRateRowSpan}>{row.passRate}</td>}
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </div>
      <div style={{ textAlign: 'right', marginRight: 4, marginTop: 4 }}>
        <SaveResultAsImageButton targetRef={tableRef} />
      </div>
    </div>
  );
}

export default ResultTable;
