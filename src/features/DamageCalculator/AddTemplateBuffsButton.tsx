import { Dropdown } from 'antd';
import { useSetAtom } from 'jotai';
import { useCallback } from 'react';
import { appendSkills, craftEssences } from '../../data/templateBuffs';
import { addBuffsAtom } from '../../store/startingBuffs';
import { PrimaryOutlinedButton } from '../../components/Button.tsx/PrimaryOutlinedButton';

const templateBuffs = [...appendSkills, ...craftEssences];

const items = [
  ...Object.values(templateBuffs).map((skill) => ({
    label: skill.name,
    key: skill.name
  }))
];

function AddTemplateBuffsButton() {
  const addEffect = useSetAtom(addBuffsAtom);
  const addClassScores = useCallback(
    (e: { key: string }) => {
      const buff = templateBuffs.find((buff) => buff.name === e.key);
      if (buff) addEffect([buff]);
    },
    [addEffect]
  );
  return (
    <Dropdown menu={{ items, onClick: addClassScores }}>
      <PrimaryOutlinedButton>テンプレ追加</PrimaryOutlinedButton>
    </Dropdown>
  );
}

export default AddTemplateBuffsButton;
