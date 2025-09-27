import { Checkbox, Flex, InputNumber, Select, Space } from 'antd';
import { type PrimitiveAtom, useAtom, useAtomValue } from 'jotai';
import SpaceCompactHeader from '../../../components/SpaceCompactHeader';
import { cardTypeOptions, damageJudgementOptions } from '../../../data/options';
import type { CardParams } from '../../../data/types';
import { isRequiredNpStarCalcAtom } from '../../../store/jotai';

interface CardParamsSectionProps {
  cardParamsAtom: PrimitiveAtom<CardParams>;
}

export function CardParamsSection(props: CardParamsSectionProps) {
  const { cardParamsAtom } = props;
  const [cardParams, setCardParams] = useAtom(cardParamsAtom);
  const isEx = cardParams.type === 'extra';
  const isRequiredNpStarCalc = useAtomValue(isRequiredNpStarCalcAtom);
  return (
    <Space.Compact>
      {isEx ? (
        <SpaceCompactHeader>EX</SpaceCompactHeader>
      ) : (
        <Select
          options={cardTypeOptions}
          style={{ width: 60 }}
          value={cardParams.type}
          onChange={(value) => setCardParams((prev) => ({ ...prev, type: value }))}
        />
      )}
      <Flex
        style={{
          outline: '1px solid #BFBFBF',
          outlineOffset: '-1px',
          paddingLeft: 8,
          paddingRight: 8,
          alignItems: 'center'
        }}
      >
        {!isEx && (
          <Checkbox
            checked={cardParams.isCritical}
            onChange={(e) =>
              setCardParams((prev) => ({
                ...prev,
                isCritical: e.target.checked
              }))
            }
          >
            クリティカル
          </Checkbox>
        )}
      </Flex>
      <Select
        value={cardParams.damageJudgement}
        onChange={(value) => setCardParams((prev) => ({ ...prev, damageJudgement: value }))}
        options={damageJudgementOptions}
        style={{ width: 132 }}
      />
      {isRequiredNpStarCalc && (
        <InputNumber
          value={cardParams.overKillCount}
          onChange={(value) =>
            setCardParams((prev) => ({
              ...prev,
              overKillCount: value
            }))
          }
          type="number"
          addonBefore="OverKill"
          style={{ width: 140 }}
        />
      )}
    </Space.Compact>
  );
}
