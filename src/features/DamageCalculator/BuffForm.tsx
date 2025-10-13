import { ArrowUpOutlined, CloseOutlined } from '@ant-design/icons';
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
    <Compact style={{ width: '520px' }}>
      <Input
        value={buff.name}
        onChange={(e) => setBuff({ ...buff, name: e.target.value })}
        placeholder="スキル・バフ名"
      />
      <Select
        value={buff.type}
        onValueChange={(value) => setBuff({ ...buff, type: value })}
        options={skillTypes}
        style={{ width: 140 }}
      />
      <InputNumber
        value={buff.amount}
        onValueChange={(value) => setBuff({ ...buff, amount: value })}
        placeholder="効果量"
        style={{ width: 80 }}
      />
      <CompactItemText>%</CompactItemText>
      <Select
        value={buff.turn}
        onValueChange={(value) => setBuff({ ...buff, turn: value })}
        options={turnOptions}
        style={{ width: 52 }}
      />
      <CompactItemText>T</CompactItemText>
      <Select
        value={buff.count}
        onValueChange={(value) => setBuff({ ...buff, count: value })}
        options={turnOptions}
        style={{ width: 52 }}
      />
      <CompactItemText>回</CompactItemText>
      <PrimaryOutlinedButton
        style={{ borderRadius: '0', borderLeft: 'none', paddingLeft: 8, paddingRight: 8 }}
        onClick={() => remove(buffAtom)}
        startIcon={<CloseOutlined />}
      />
      {/* TODO implement */}
      <PrimaryOutlinedButton
        style={{
          borderRadius: 0,
          borderLeft: 'none',
          borderTopRightRadius: 4,
          borderBottomRightRadius: 4,
          paddingLeft: 8,
          paddingRight: 8,
          paddingTop: 2
        }}
        startIcon={<ArrowUpOutlined />}
        onClick={() => beforeAtom && move(buffAtom, beforeAtom)}
      />
    </Compact>
  );
}

export const MemoizedBuffForm = memo(BuffForm);
