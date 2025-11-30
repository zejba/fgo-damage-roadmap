import { useAtomValue } from 'jotai';
import { useCallback } from 'react';
import { SelectMenu } from '../../components/SelectMenu';
import { presetBuffSetOptionsAtom, savedPresetBuffSetsAtom } from '../../store/myPresetBuffs';
import type { Buff } from '../../data/types';
import { styled } from 'styled-components';

const StyledSelectMenu = styled(SelectMenu)`
  width: 100px;
`;

interface AddPresetBuffsButtonProps {
  addEffect: (buffs: Omit<Buff, 'id'>[]) => void;
}

function AddPresetBuffsButton({ addEffect }: AddPresetBuffsButtonProps) {
  const options = useAtomValue(presetBuffSetOptionsAtom);
  const savedBuffSets = useAtomValue(savedPresetBuffSetsAtom);

  const handleSelect = useCallback(
    (value: string) => {
      const buffSet = savedBuffSets.find((set) => set.id === value);
      if (buffSet) {
        // セット内の全バフをidを除いて追加 (addEffectが新しいidを生成する)
        const buffsWithoutId = buffSet.buffs.map((buff) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { id: _, ...buffWithoutId } = buff;
          return buffWithoutId;
        });
        addEffect(buffsWithoutId);
      }
    },
    [addEffect, savedBuffSets]
  );
  console.log('hoge');

  return (
    <StyledSelectMenu
      options={options}
      placeholder="バフセット"
      onSelect={handleSelect}
      emptyOptionLabel="設定からバフセットを追加できます"
    />
  );
}

export default AddPresetBuffsButton;
