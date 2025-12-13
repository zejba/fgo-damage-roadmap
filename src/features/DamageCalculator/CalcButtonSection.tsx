import { CalculatorFilled } from '@ant-design/icons';
import { useAtom } from 'jotai';
import { useSnackbar } from '../../hooks/useSnackbarContext';
import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import {
  damageCalcResultAtom,
  damageCalcResultNpColorAtom,
  isNpStarCalculatedAtom
} from '../../store/damageCalcResult';
import { isColoredAtom, isDrawerModeAtom, isRequiredNpStarCalcAtom } from '../../store/jotai';
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
import { Switch, useMediaQuery } from '@mui/material';

const ToggleWrapper = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  @media (max-width: 560px) {
    font-size: 0.75em;
  }
`;

function CalcButtonSection() {
  const [isColored, setIsColored] = useAtom(isColoredAtom);
  const [isDrawerMode, setIsDrawerMode] = useAtom(isDrawerModeAtom);
  const isWide = useMediaQuery('(min-width:1480px)');
  const snackbar = useSnackbar();
  const handleCalculate = useAtomCallback(
    useCallback(
      (get, set) => {
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
          snackbar.error('計算に失敗しました。入力値を確認してください。');
        }
      },
      [snackbar]
    )
  );
  return (
    <div style={{ paddingLeft: 4, display: 'flex', alignItems: 'center', gap: 12 }}>
      <PrimaryButton onClick={handleCalculate} startIcon={<CalculatorFilled />}>
        計算
      </PrimaryButton>
      <ToggleWrapper>
        カード色
        <Switch checked={isColored} onChange={(e) => setIsColored(e.target.checked)} />
      </ToggleWrapper>
      {!isWide && (
        <ToggleWrapper>
          結果を固定表示
          <Switch checked={isDrawerMode} onChange={(e) => setIsDrawerMode(e.target.checked)} />
        </ToggleWrapper>
      )}
    </div>
  );
}

export default CalcButtonSection;
