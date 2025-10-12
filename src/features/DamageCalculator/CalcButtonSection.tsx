import { CalculatorFilled } from '@ant-design/icons';
import { Button, Space, Switch, Typography } from 'antd';
import { useAtom } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import {
  damageCalcResultAtom,
  damageCalcResultNpColorAtom,
  isNpStarCalculatedAtom
} from '../../store/damageCalcResult';
import { isColoredAtom, isRequiredNpStarCalcAtom } from '../../store/jotai';
import {
  type DamageCalculatorInputValue,
  calculateDamages,
  convertBuffForCalc,
  convertTurnForCalc
} from '../../utils/calcDamage';
import { currentFormDataAtom } from '../../store/formData';

function CalcButtonSection() {
  const [isColored, setIsColored] = useAtom(isColoredAtom);
  const handleCalculate = useAtomCallback(
    useCallback((get, set) => {
      const input = get(currentFormDataAtom);
      const value: DamageCalculatorInputValue = {
        servantClass: input.servantClass,
        servantAttribute: input.servantAttribute,
        atk: (input.servantAtk || 0) + (input.craftEssenceAtk || 0),
        npColor: input.npColor,
        npValue: input.npValue || 0,
        footprintB: input.footprintB || 0,
        footprintA: input.footprintA || 0,
        footprintQ: input.footprintQ || 0,
        npGain: input.npGain || 0,
        starRate: input.starRate || 0,
        hitCountN: input.hitCountN || 0,
        hitCountB: input.hitCountB || 0,
        hitCountA: input.hitCountA || 0,
        hitCountQ: input.hitCountQ || 0,
        hitCountEX: input.hitCountEX || 0,
        startingBuffs: input.startingBuffs.map(convertBuffForCalc),
        turns: input.turns.map(convertTurnForCalc)
      };
      const result = calculateDamages(value);
      set(damageCalcResultAtom, result);
      set(damageCalcResultNpColorAtom, value.npColor);
      set(isNpStarCalculatedAtom, get(isRequiredNpStarCalcAtom));
    }, [])
  );
  return (
    <Space style={{ marginTop: 12, marginBottom: 12 }}>
      <Button type="primary" onClick={handleCalculate} icon={<CalculatorFilled />} iconPosition="end">
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
