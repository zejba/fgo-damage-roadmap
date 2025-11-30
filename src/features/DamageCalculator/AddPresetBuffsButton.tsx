import { useAtomValue } from 'jotai';
import { useCallback } from 'react';
import { SelectMenu } from '../../components/SelectMenu';
import { presetBuffOptionsAtom, savedPresetBuffsAtom } from '../../store/myPresetBuffs';
import type { Buff } from '../../data/types';
import { styled } from 'styled-components';

const StyledSelectMenu = styled(SelectMenu)`
  width: 100px;
`;

interface AddPresetBuffsButtonProps {
  addEffect: (buffs: Omit<Buff, 'id'>[]) => void;
}

function AddPresetBuffsButton({ addEffect }: AddPresetBuffsButtonProps) {
  const options = useAtomValue(presetBuffOptionsAtom);
  const savedBuffs = useAtomValue(savedPresetBuffsAtom);

  const handleSelect = useCallback(
    (value: string) => {
      const buff = savedBuffs.find((buff) => buff.id === value);
      if (buff) {
        // idを除いて追加 (addEffectが新しいidを生成する)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id: _, ...buffWithoutId } = buff;
        addEffect([buffWithoutId]);
      }
    },
    [addEffect, savedBuffs]
  );

  return (
    <StyledSelectMenu
      options={options}
      placeholder="プリセット"
      onSelect={handleSelect}
      emptyOptionLabel="設定からプリセットバフを追加できます"
    />
  );
}

export default AddPresetBuffsButton;
