import { useSetAtom } from 'jotai';
import { useCallback, useState } from 'react';
import { appendSkills, craftEssences } from '../../data/templateBuffs';
import { addBuffsAtom } from '../../store/startingBuffs';
import { Select } from '../../components/Select';

const templateBuffs = [...appendSkills, ...craftEssences];

const items = [
  ...Object.values(templateBuffs).map((skill) => ({
    label: skill.name,
    value: skill.name
  }))
];

function AddTemplateBuffsButton() {
  const addEffect = useSetAtom(addBuffsAtom);
  const [selectedBuff, setSelectedBuff] = useState<string | null>('');
  const handleChange = useCallback(
    (value: string | null) => {
      const buff = templateBuffs.find((buff) => buff.name === value);
      if (buff) addEffect([buff]);
      setSelectedBuff('aaa');
    },
    [addEffect]
  );
  return (
    <Select<string | null>
      options={items}
      value={selectedBuff}
      onValueChange={handleChange}
      style={{ height: 32, borderRadius: 6, paddingLeft: 6, paddingRight: 6, color: 'black' }}
      placeholder="テンプレ追加"
    />
  );
}

export default AddTemplateBuffsButton;
