import { useSetAtom } from 'jotai';
import { useCallback } from 'react';
import { appendSkills, craftEssences } from '../../data/templateBuffs';
import { addBuffsAtom } from '../../store/startingBuffs';
import { SelectMenu } from '../../components/SelectMenu';

const templateBuffs = [...appendSkills, ...craftEssences];

const items = [
  ...Object.values(templateBuffs).map((skill) => ({
    label: skill.name,
    value: skill.name
  }))
];

function AddTemplateBuffsButton() {
  const addEffect = useSetAtom(addBuffsAtom);

  const handleSelect = useCallback(
    (value: string) => {
      const buff = templateBuffs.find((buff) => buff.name === value);
      if (buff) addEffect([buff]);
    },
    [addEffect]
  );

  return <SelectMenu options={items} placeholder="テンプレ" onSelect={handleSelect} />;
}

export default AddTemplateBuffsButton;
