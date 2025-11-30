import { type PrimitiveAtom, useAtom, useAtomValue } from 'jotai';
import { enemyAttrOptions, enemyClassOptions } from '../../../data/options';
import type { TurnParams } from '../../../data/types';
import { isRequiredNpStarCalcAtom } from '../../../store/jotai';
import { Select } from '../../../components/Select';
import { Compact } from '../../../components/Compact';
import { InputNumber } from '../../../components/InputNumber';
import { CompactItemText } from '../../../components/CompactItemText';
import { Collapse } from '@mui/material';

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
          value={turnParams.classAffinity.toString()}
          onValueChange={(value) => setTurnParams((prev) => ({ ...prev, classAffinity: parseFloat(value) }))}
          options={enemyClassOptions}
          style={{ width: 60 }}
        />
        <CompactItemText>属性相性</CompactItemText>
        <Select
          value={turnParams.attributeAffinity.toString()}
          onValueChange={(value) => setTurnParams((prev) => ({ ...prev, attributeAffinity: parseFloat(value) }))}
          options={enemyAttrOptions}
          style={{ width: 60 }}
        />
        <InputNumber
          placeholder="目標ダメージ"
          value={turnParams.targetDamage}
          onValueChange={(value) => setTurnParams((prev) => ({ ...prev, targetDamage: value }))}
          style={{ width: 100 }}
        />
      </Compact>
      <Collapse in={isRequiredNpStarCalc}>
        <Compact>
          <CompactItemText>DTDR</CompactItemText>
          <InputNumber
            value={turnParams.dtdr}
            onValueChange={(value) => setTurnParams((prev) => ({ ...prev, enemyNpCharge: value }))}
            style={{ width: 56 }}
          />
          <CompactItemText>%</CompactItemText>
          <CompactItemText>DSR</CompactItemText>
          <InputNumber
            value={turnParams.dsr}
            onValueChange={(value) => setTurnParams((prev) => ({ ...prev, dsr: value }))}
            style={{ width: 56 }}
          />
          <CompactItemText>%</CompactItemText>
        </Compact>
      </Collapse>
    </div>
  );
}
