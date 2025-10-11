import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import {
  damageCalcResultAtom,
  damageCalcResultNpColorAtom,
  isNpStarCalculatedAtom
} from '../../store/damageCalcResult';
import type { ProcessedTurnResult } from '../../utils/calcDamage';
import { cardColorStyles, cardInitial } from '../../data/options';
import { CardColor } from '../../data/types';
import { isColoredAtom } from '../../store/jotai';

type RecordType = {
  key: string;
  turn: string | null;
  first: string;
  second: string;
  third: string;
  ex: string;
  total: string;
  targetDamage: string | null;
  passRate: string | null;
};

function defineColumns(
  isColored: boolean,
  npColor: CardColor | undefined,
  turnRowSpan: number
): ColumnsType<RecordType> {
  const npColorStyle = npColor ? cardColorStyles[npColor] : undefined;
  const columns: ColumnsType<RecordType> = [
    {
      title: 'ターン',
      dataIndex: 'turn',
      key: 'turn',
      onCell: (record) => ({
        rowSpan: record.turn ? turnRowSpan : 0
      })
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
    },
    {
      title: 'total',
      dataIndex: 'total',
      key: 'total'
    },
    {
      title: '目標ダメ',
      dataIndex: 'targetDamage',
      key: 'targetDamage',
      onCell: (record) => ({
        rowSpan: record.targetDamage === '-' ? 1 : record.targetDamage ? 3 : 0
      })
    },
    {
      title: '撃破率',
      dataIndex: 'passRate',
      key: 'passRate',
      onCell: (record) => {
        return {
          rowSpan: record.passRate === '-' ? 1 : record.passRate ? 3 : 0
        };
      }
    }
  ];
  return columns;
}
function buildDataSource(result: ProcessedTurnResult[], isNpStarCalculated: boolean): RecordType[] {
  return result.flatMap((turnResult, turnIndex) => {
    const { selectedCards, damage90, damage100, damage110, passRate, targetDamage, nps, minStars, maxStars } =
      turnResult;
    const damage90Sum = damage90.reduce((a, b) => a + b, 0);
    const damage100Sum = damage100.reduce((a, b) => a + b, 0);
    const damage110Sum = damage110.reduce((a, b) => a + b, 0);
    const totalNp = nps.reduce((a, b) => a + b, 0);
    const totalMinStar = minStars.reduce((a, b) => a + b, 0);
    const totalMaxStar = maxStars.reduce((a, b) => a + b, 0);
    return [
      {
        key: `turn-${turnIndex + 1}-header`,
        turn: `${turnIndex + 1}T`,
        first: cardInitial[selectedCards[0]],
        second: cardInitial[selectedCards[1]],
        third: cardInitial[selectedCards[2]],
        ex: '-',
        total: '-',
        targetDamage: '-',
        passRate: '-'
      },
      {
        key: `turn-${turnIndex + 1}-90`,
        turn: null,
        first: damage90[0].toLocaleString(),
        second: damage90[1].toLocaleString(),
        third: damage90[2].toLocaleString(),
        ex: damage90[3].toLocaleString(),
        total: damage90Sum.toLocaleString(),
        targetDamage: targetDamage.toLocaleString(),
        passRate: `${passRate}%`
      },
      {
        key: `turn-${turnIndex + 1}-100`,
        turn: null,
        first: damage100[0].toLocaleString(),
        second: damage100[1].toLocaleString(),
        third: damage100[2].toLocaleString(),
        ex: damage100[3].toLocaleString(),
        total: damage100Sum.toLocaleString(),
        targetDamage: null,
        passRate: null
      },
      {
        key: `turn-${turnIndex + 1}-110`,
        turn: null,
        first: damage110[0].toLocaleString(),
        second: damage110[1].toLocaleString(),
        third: damage110[2].toLocaleString(),
        ex: damage110[3].toLocaleString(),
        total: damage110Sum.toLocaleString(),
        targetDamage: null,
        passRate: null
      },
      ...(!isNpStarCalculated
        ? []
        : [
            {
              key: `turn-${turnIndex + 1}-np`,
              turn: null,
              first: `${nps[0]}%`,
              second: `${nps[1]}%`,
              third: `${nps[2]}%`,
              ex: `${nps[3]}%`,
              total: `${totalNp}%`,
              targetDamage: '-',
              passRate: '-'
            },
            {
              key: `turn-${turnIndex + 1}-star`,
              turn: null,
              first: `${minStars[0]}～${maxStars[0]}`,
              second: `${minStars[1]}～${maxStars[1]}`,
              third: `${minStars[2]}～${maxStars[2]}`,
              ex: `${minStars[3]}～${maxStars[3]}`,
              total: `${totalMinStar}～${totalMaxStar}`,
              targetDamage: '-',
              passRate: '-'
            }
          ])
    ];
  });
}

function ResultTable() {
  const result = useAtomValue(damageCalcResultAtom);
  const isColored = useAtomValue(isColoredAtom);
  const npColor = useAtomValue(damageCalcResultNpColorAtom);
  const isNpStarCalculated = useAtomValue(isNpStarCalculatedAtom);
  const dataSource = useMemo(() => buildDataSource(result, isNpStarCalculated), [result, isNpStarCalculated]);
  const columns = useMemo(
    () => defineColumns(isColored, npColor, isNpStarCalculated ? 6 : 4),
    [isColored, npColor, isNpStarCalculated]
  );
  return <Table columns={columns} dataSource={dataSource} pagination={false} rowHoverable={false} bordered />;
}

export default ResultTable;
