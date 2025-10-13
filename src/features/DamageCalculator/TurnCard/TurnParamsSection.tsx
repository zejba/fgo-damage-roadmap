import { type PrimitiveAtom, useAtom, useAtomValue } from 'jotai';
import CollapseWithOutHeader from '../../../components/CollapseWithOutHeader';
import { enemyClassOptions } from '../../../data/options';
import type { TurnParams } from '../../../data/types';
import { isRequiredNpStarCalcAtom } from '../../../store/jotai';
import { Select } from '../../../components/Select';
import { Compact } from '../../../components/Compact';
import { InputNumber } from '../../../components/InputNumber';
import { CompactItemText } from '../../../components/CompactItemText';

interface TurnParamsSectionProps {
  turnParamsAtom: PrimitiveAtom<TurnParams>;
}

export function TurnParamsSection(props: TurnParamsSectionProps) {
  const { turnParamsAtom } = props;
  const isRequiredNpStarCalc = useAtomValue(isRequiredNpStarCalcAtom);
  const [turnParams, setTurnParams] = useAtom(turnParamsAtom);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Compact>
        <CompactItemText>クラス相性</CompactItemText>
        <Select
          value={turnParams.classAffinity}
          onValueChange={(value) => setTurnParams((prev) => ({ ...prev, classAffinity: value }))}
          options={enemyClassOptions}
        />
        <CompactItemText>属性相性</CompactItemText>
        <Select
          value={turnParams.attributeAffinity}
          onValueChange={(value) => setTurnParams((prev) => ({ ...prev, attributeAffinity: value }))}
          options={enemyClassOptions}
        />
        <CompactItemText>目標ダメージ</CompactItemText>
        <InputNumber
          value={turnParams.targetDamage}
          onValueChange={(value) => setTurnParams((prev) => ({ ...prev, targetDamage: value }))}
        />
      </Compact>
      <CollapseWithOutHeader isActive={isRequiredNpStarCalc}>
        <Compact style={{ width: 500 }}>
          <CompactItemText>DTDR（敵NP補正）</CompactItemText>
          <InputNumber
            value={turnParams.dtdr}
            onValueChange={(value) => setTurnParams((prev) => ({ ...prev, enemyNpCharge: value }))}
          />
          <CompactItemText>%</CompactItemText>
          <CompactItemText>DSR（敵スター補正）</CompactItemText>
          <InputNumber
            value={turnParams.dsr}
            onValueChange={(value) => setTurnParams((prev) => ({ ...prev, dsr: value }))}
          />
          <CompactItemText>%</CompactItemText>
        </Compact>
      </CollapseWithOutHeader>
    </div>
  );
}
