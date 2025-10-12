import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { Button, message } from 'antd';
import { isColoredAtom, isRequiredNpStarCalcAtom } from '../../store/jotai';
import {
  servantClassAtom,
  servantAttributeAtom,
  servantAtkAtom,
  craftEssenceAtkAtom,
  npColorAtom,
  npValueAtom,
  footprintBAtom,
  footprintAAtom,
  footprintQAtom,
  npGainAtom,
  starRateAtom,
  hitCountNAtom,
  hitCountBAtom,
  hitCountAAtom,
  hitCountQAtom,
  hitCountEXAtom
} from '../../store/servantParams';
import { startingBuffsAtom } from '../../store/startingBuffs';
import { turnsAtom } from '../../store/turns';
import { DamageCalcFormValue } from '../../data/types';
import { FileAddOutlined } from '@ant-design/icons';

interface ImportFormValuesButtonProps {
  file: File | null;
  disabled?: boolean;
}

export function ImportFormValuesButton({ file, disabled }: ImportFormValuesButtonProps) {
  const handleImport = useAtomCallback(
    useCallback(
      (_get, set) => {
        if (!file) {
          message.error('ファイルを選択してください');
          return;
        }

        try {
          const importData = JSON.parse('') as DamageCalcFormValue;
          // TODO typiaでバリデーション

          set(servantClassAtom, importData.servantClass);
          set(servantAttributeAtom, importData.servantAttribute);
          set(servantAtkAtom, importData.servantAtk);
          set(craftEssenceAtkAtom, importData.craftEssenceAtk);
          set(npColorAtom, importData.npColor);
          set(npValueAtom, importData.npValue);
          set(footprintBAtom, importData.footprintB);
          set(footprintAAtom, importData.footprintA);
          set(footprintQAtom, importData.footprintQ);
          set(npGainAtom, importData.npGain);
          set(starRateAtom, importData.starRate);
          set(hitCountNAtom, importData.hitCountN);
          set(hitCountBAtom, importData.hitCountB);
          set(hitCountAAtom, importData.hitCountA);
          set(hitCountQAtom, importData.hitCountQ);
          set(hitCountEXAtom, importData.hitCountEX);
          set(startingBuffsAtom, importData.startingBuffs);
          set(turnsAtom, importData.turns);
          set(isColoredAtom, importData.isColored);
          set(isRequiredNpStarCalcAtom, importData.isNpStarCalculated);
          message.success('データを読み込みました');
        } catch {
          message.error('データの読み込みに失敗しました');
        }
      },
      [file]
    )
  );

  return (
    <Button type="default" onClick={handleImport} disabled={disabled || !file} icon={<FileAddOutlined />}>
      適用
    </Button>
  );
}
