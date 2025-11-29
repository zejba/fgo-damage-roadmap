import { CalculatorFilled } from '@ant-design/icons';
import { message, Space, Switch } from 'antd';
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
import { validateDamageCalcFormValue } from '../../zod-schema/damageCalcFormSchema';
import { PrimaryButton } from '../../components/Button.tsx/PrimaryButton';
import { styled } from 'styled-components';

const ToggleWrapper = styled(Space)`
  margin-left: 8px;
  @media (max-width: 600px) {
    font-size: 0.8em;
  }
`;

function CalcButtonSection() {
  const [isColored, setIsColored] = useAtom(isColoredAtom);
  const handleCalculate = useAtomCallback(
    useCallback((get, set) => {
      try {
        const input = validateDamageCalcFormValue(get(currentFormDataAtom));
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
      } catch (e) {
        console.error('Calculation failed:', e);
        message.error('計算に失敗しました。入力値を確認してください。');
      }
    }, [])
  );
  return (
    <Space style={{ marginBottom: 12 }}>
      <PrimaryButton onClick={handleCalculate} startIcon={<CalculatorFilled />}>
        計算
      </PrimaryButton>
      <ToggleWrapper>
        カード選択に色をつける
        <Switch value={isColored} onChange={setIsColored} />
      </ToggleWrapper>
    </Space>
  );
}

export default CalcButtonSection;
