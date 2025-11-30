import { useSetAtom } from 'jotai';
import { useCallback, useState } from 'react';
import { appendSkills, craftEssences } from '../../data/templateBuffs';
import { addBuffsAtom } from '../../store/startingBuffs';
import { Select } from '../../components/Select';
import { styled } from 'styled-components';

const templateBuffs = [...appendSkills, ...craftEssences];

const items = [
  ...Object.values(templateBuffs).map((skill) => ({
    label: skill.name,
    value: skill.name
  }))
];

const StyledSelect = styled(Select)`
  height: 32px;
  border-radius: 6px;
  padding-left: 6px;
  padding-right: 6px;
  @media (max-width: 560px) {
    font-size: 0.8em;
    height: 28px;
  }
` as typeof Select;

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
    <StyledSelect<string | null>
      options={items}
      value={selectedBuff}
      onValueChange={handleChange}
      style={{ color: 'black' }}
      placeholder="テンプレ追加"
    />
  );
}

export default AddTemplateBuffsButton;
