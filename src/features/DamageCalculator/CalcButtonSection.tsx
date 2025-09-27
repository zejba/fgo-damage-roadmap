import { CalculatorFilled } from '@ant-design/icons';
import { Button, Space, Switch, Typography } from 'antd';
import { useAtom } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { damageCalcResultAtom } from '../../store/damageCalcResult';
import { isColoredAtom } from '../../store/jotai';
import {
  craftEssenceAtkAtom,
  footprintAAtom,
  footprintBAtom,
  footprintQAtom,
  hitCountAAtom,
  hitCountBAtom,
  hitCountEXAtom,
  hitCountNAtom,
  hitCountQAtom,
  npColorAtom,
  npGainAtom,
  npValueAtom,
  servantAtkAtom,
  servantAttributeAtom,
  servantClassAtom,
  starRateAtom
} from '../../store/servantParams';
import { startingBuffsAtom } from '../../store/startingBuffs';
import { turnsAtom } from '../../store/turns';
import {
  type DamageCalculatorInputValue,
  calculateDamages,
  convertBuffForCalc,
  convertTurnForCalc
} from '../../utils/calcDamage';

function CalcButtonSection() {
  const [isColored, setIsColored] = useAtom(isColoredAtom);
  const handleCalculate = useAtomCallback(
    useCallback((get, set) => {
      const input: DamageCalculatorInputValue = {
        servantClass: get(servantClassAtom),
        servantAttribute: get(servantAttributeAtom),
        atk: (get(servantAtkAtom) || 0) + (get(craftEssenceAtkAtom) || 0),
        npColor: get(npColorAtom),
        npValue: get(npValueAtom) || 0,
        footprintB: get(footprintBAtom) || 0,
        footprintA: get(footprintAAtom) || 0,
        footprintQ: get(footprintQAtom) || 0,
        npGain: get(npGainAtom) || 0,
        starRate: get(starRateAtom) || 0,
        hitCountN: get(hitCountNAtom) || 0,
        hitCountB: get(hitCountBAtom) || 0,
        hitCountA: get(hitCountAAtom) || 0,
        hitCountQ: get(hitCountQAtom) || 0,
        hitCountEX: get(hitCountEXAtom) || 0,
        startingBuffs: get(startingBuffsAtom).map(convertBuffForCalc),
        turns: get(turnsAtom).map(convertTurnForCalc)
      };
      const result = calculateDamages(input);
      set(damageCalcResultAtom, result);
    }, [])
  );
  return (
    <Space style={{ marginBottom: 12 }}>
      <Button
        style={{ width: 'fit-content' }}
        type="primary"
        onClick={handleCalculate}
        icon={<CalculatorFilled />}
        iconPosition="end"
      >
        計算
      </Button>
      <Space>
        <Typography.Text>カード選択に色をつける</Typography.Text>
        <Switch value={isColored} onChange={setIsColored} />
      </Space>
    </Space>
  );
}

export default CalcButtonSection;
