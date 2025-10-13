import { Checkbox } from 'antd';
import { type PrimitiveAtom, useAtom, useAtomValue } from 'jotai';
import { cardTypeOptions, damageJudgementOptions } from '../../../data/options';
import type { CardParams } from '../../../data/types';
import { isRequiredNpStarCalcAtom } from '../../../store/jotai';
import { Select } from '../../../components/Select';
import { Compact } from '../../../components/Compact';
import { CompactItemText } from '../../../components/CompactItemText';
import { InputNumber } from '../../../components/InputNumber';

interface CardParamsSectionProps {
  cardParamsAtom: PrimitiveAtom<CardParams>;
}

export function CardParamsSection(props: CardParamsSectionProps) {
  const { cardParamsAtom } = props;
  const [cardParams, setCardParams] = useAtom(cardParamsAtom);
  const isEx = cardParams.type === 'extra';
  const isRequiredNpStarCalc = useAtomValue(isRequiredNpStarCalcAtom);
  return (
    <Compact>
      {isEx ? (
        <CompactItemText>EX</CompactItemText>
      ) : (
        <Select
          options={cardTypeOptions}
          style={{ width: 60 }}
          value={cardParams.type}
          onValueChange={(value) => setCardParams((prev) => ({ ...prev, type: value }))}
        />
      )}
      {!isEx && (
        <Checkbox
          checked={cardParams.isCritical}
          onChange={(e) =>
            setCardParams((prev) => ({
              ...prev,
              isCritical: e.target.checked
            }))
          }
          style={{
            padding: '4px 8px',
            backgroundColor: 'white'
          }}
        >
          クリティカル
        </Checkbox>
      )}
      <Select
        value={cardParams.damageJudgement}
        onValueChange={(value) => setCardParams((prev) => ({ ...prev, damageJudgement: value }))}
        options={damageJudgementOptions}
      />
      {isRequiredNpStarCalc && (
        <>
          <CompactItemText>OverKill</CompactItemText>
          <InputNumber
            value={cardParams.overKillCount}
            onValueChange={(value) =>
              setCardParams((prev) => ({
                ...prev,
                overKillCount: value
              }))
            }
            style={{ width: 140 }}
          />
        </>
      )}
    </Compact>
  );
}
