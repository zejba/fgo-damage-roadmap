import { type PrimitiveAtom, useAtom } from 'jotai';
import { memo } from 'react';
import { CompactItemText } from '../../components/CompactItemText';
import { skillTypes, turnOptions } from '../../data/options';
import type { Buff } from '../../data/types';
import { Select } from '../../components/Select';
import { Input } from '../../components/Input';
import { InputNumber } from '../../components/InputNumber';
import { Compact } from '../../components/Compact';
import { PrimaryOutlinedButton } from '../../components/Button.tsx/PrimaryOutlinedButton';
import styled from 'styled-components';
import { ArrowUpward, Close } from '@mui/icons-material';

const StyledButton = styled(PrimaryOutlinedButton)`
  padding: 0 4px;
  display: flex;
  align-items: center;
  @media (max-width: 560px) {
    padding: 0 2px;
    .MuiSvgIcon-root {
      height: 0.8em;
    }
  }
`;

const TitleInput = styled(Input)`
  min-width: 0;
  max-width: 164px;
`;

const AmountInput = styled(InputNumber)`
  width: 60px;
  @media (max-width: 560px) {
    min-width: 0;
  }
`;

const StyledSelect = styled(Select)`
  width: 100px;
  @media (max-width: 560px) {
    width: 76px;
  }
` as typeof Select;

interface BuffFormProps {
  buffAtom: PrimitiveAtom<Buff>;
  beforeAtom?: PrimitiveAtom<Buff>;
  remove: (atom: PrimitiveAtom<Buff>) => void;
  move: (atom: PrimitiveAtom<Buff>, before: PrimitiveAtom<Buff>) => void;
}

export function BuffForm(props: BuffFormProps) {
  const { buffAtom, beforeAtom, remove, move } = props;
  const [buff, setBuff] = useAtom(buffAtom);
  return (
    <Compact style={{ width: '100%' }}>
      <TitleInput
        value={buff.name}
        onChange={(e) => setBuff({ ...buff, name: e.target.value })}
        placeholder="スキル/バフ名"
      />
      <StyledSelect
        value={buff.type}
        onValueChange={(value) => setBuff({ ...buff, type: value })}
        options={skillTypes}
      />
      <AmountInput
        value={buff.amount}
        onValueChange={(value) => setBuff({ ...buff, amount: value })}
        placeholder="量"
      />
      <CompactItemText>%</CompactItemText>
      <Select
        value={buff.turn.toString()}
        onValueChange={(value) => setBuff({ ...buff, turn: parseFloat(value) })}
        options={turnOptions}
      />
      <CompactItemText>T</CompactItemText>
      <Select
        value={buff.count.toString()}
        onValueChange={(value) => setBuff({ ...buff, count: parseFloat(value) })}
        options={turnOptions}
      />
      <CompactItemText>回</CompactItemText>
      {/* <StyledButton onClick={() => remove(buffAtom)}> */}
      {/* <MoreOutlined /> */}
      {/* </StyledButton> */}

      <StyledButton onClick={() => remove(buffAtom)}>
        <Close fontSize="small" />
      </StyledButton>
      <StyledButton onClick={() => beforeAtom && move(buffAtom, beforeAtom)}>
        <ArrowUpward fontSize="small" />
      </StyledButton>
    </Compact>
  );
}

export const MemoizedBuffForm = memo(BuffForm);
