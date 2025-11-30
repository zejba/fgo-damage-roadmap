import { type PrimitiveAtom, useAtom, useAtomValue } from 'jotai';
import { cardTypeOptions, damageJudgementOptions } from '../../../data/options';
import type { CardParams } from '../../../data/types';
import { isRequiredNpStarCalcAtom } from '../../../store/jotai';
import { Select } from '../../../components/Select';
import { Compact } from '../../../components/Compact';
import { CompactItemText } from '../../../components/CompactItemText';
import { InputNumber } from '../../../components/InputNumber';
import { styled } from 'styled-components';

interface CardParamsSectionProps {
  cardParamsAtom: PrimitiveAtom<CardParams>;
}

const OverKillInput = styled(InputNumber)`
  width: 60px;
  @media (max-width: 560px) {
    width: 28px;
  }
`;

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
          style={{ width: 48 }}
          value={cardParams.type}
          onValueChange={(value) => setCardParams((prev) => ({ ...prev, type: value }))}
        />
      )}
      {!isEx && (
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            paddingRight: 4,
            backgroundColor: 'white',
            cursor: 'pointer'
          }}
        >
          <input
            type="checkbox"
            checked={cardParams.isCritical}
            style={{ cursor: 'pointer' }}
            onChange={(e) =>
              setCardParams((prev) => ({
                ...prev,
                isCritical: e.target.checked
              }))
            }
          />
          クリティカル
        </label>
      )}
      <Select
        value={cardParams.damageJudgement}
        onValueChange={(value) => setCardParams((prev) => ({ ...prev, damageJudgement: value }))}
        options={damageJudgementOptions}
      />
      {isRequiredNpStarCalc && (
        <>
          <CompactItemText>OverKill</CompactItemText>
          <OverKillInput
            value={cardParams.overKillCount}
            onValueChange={(value) =>
              setCardParams((prev) => ({
                ...prev,
                overKillCount: value
              }))
            }
          />
        </>
      )}
    </Compact>
  );
}
