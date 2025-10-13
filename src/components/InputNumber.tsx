import React from 'react';
import { Input } from './Input';

interface InputNumberProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value'> {
  onValueChange?: (value: number | null) => void;
  value: number | null;
}

export function InputNumber(props: InputNumberProps) {
  const { onValueChange, onChange, value, ...rest } = props;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? null : parseFloat(e.target.value);
    onValueChange?.(value);
    onChange?.(e);
  };
  return <Input type="number" {...rest} onChange={handleChange} value={value ?? ''} />;
}
