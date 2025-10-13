import React from 'react';
import styled from 'styled-components';

const StyledSelect = styled.select`
  background-color: white;
  color: black;
`;

export interface SelectProps<T extends string | number | null>
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'children'> {
  onValueChange?: (value: T) => void;
  value: T;
  options: { value: NonNullable<T>; label: string }[];
  placeholder?: string;
}

export function Select<T extends string | number | null>(props: SelectProps<T>) {
  const { onValueChange, onChange, value, options, placeholder, ...rest } = props;
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = (e.target.value ?? null) as T;
    onValueChange?.(value);
    onChange?.(e);
  };
  return (
    <StyledSelect {...rest} onChange={handleChange} value={value ?? undefined}>
      <option value={undefined} hidden>
        {placeholder}
      </option>
      {options?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}
