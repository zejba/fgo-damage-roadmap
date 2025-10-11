import { InputNumber, Select, Space } from 'antd';
import { type PrimitiveAtom, useAtom, useAtomValue } from 'jotai';
import CollapseWithOutHeader from '../../../components/CollapseWithOutHeader';
import SpaceCompactHeader from '../../../components/SpaceCompactHeader';
import { enemyClassOptions } from '../../../data/options';
import type { TurnParams } from '../../../data/types';
import { isRequiredNpStarCalcAtom } from '../../../store/jotai';

interface TurnParamsSectionProps {
  turnParamsAtom: PrimitiveAtom<TurnParams>;
}

export function TurnParamsSection(props: TurnParamsSectionProps) {
  const { turnParamsAtom } = props;
  const isRequiredNpStarCalc = useAtomValue(isRequiredNpStarCalcAtom);
  const [turnParams, setTurnParams] = useAtom(turnParamsAtom);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Space.Compact>
        <SpaceCompactHeader>クラス相性</SpaceCompactHeader>
        <Select
          value={turnParams.classAffinity}
          onSelect={(value) => setTurnParams((prev) => ({ ...prev, classAffinity: value }))}
          options={enemyClassOptions}
          style={{ width: 68 }}
        />
        <SpaceCompactHeader>属性相性</SpaceCompactHeader>
        <Select
          value={turnParams.attributeAffinity}
          onSelect={(value) => setTurnParams((prev) => ({ ...prev, attributeAffinity: value }))}
          options={enemyClassOptions}
          style={{ width: 68 }}
        />
        <InputNumber
          value={turnParams.targetDamage}
          onChange={(value) => setTurnParams((prev) => ({ ...prev, targetDamage: value }))}
          type="number"
          addonBefore="目標ダメージ"
          style={{ width: 240 }}
        />
      </Space.Compact>
      <CollapseWithOutHeader isActive={isRequiredNpStarCalc}>
        <Space.Compact>
          <InputNumber
            value={turnParams.dtdr}
            onChange={(value) => setTurnParams((prev) => ({ ...prev, enemyNpCharge: value }))}
            type="number"
            addonBefore="DTDR（敵NP補正）"
            addonAfter="%"
            style={{ width: 240 }}
          />
          <InputNumber
            value={turnParams.dsr}
            onChange={(value) => setTurnParams((prev) => ({ ...prev, dsr: value }))}
            type="number"
            addonBefore="DSR（敵スター補正）"
            addonAfter="%"
            style={{ width: 252 }}
          />
        </Space.Compact>
      </CollapseWithOutHeader>
    </div>
  );
}
