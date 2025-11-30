import { useCallback } from 'react';
import { Select, SelectProps } from './Select';
import { styled } from 'styled-components';

const StyledSelect = styled(Select)`
  height: 32px;
  border-radius: 6px;
  padding-left: 6px;
  padding-right: 6px;
  @media (max-width: 560px) {
    font-size: 0.75em;
    height: 28px;
  }
` as typeof Select;

interface SelectMenuProps extends Omit<SelectProps<string>, 'value' | 'onValueChange' | 'onSelect'> {
  onSelect: (value: string) => void;
}

export function SelectMenu({ onSelect, style, ...rest }: SelectMenuProps) {
  const handleChange = useCallback(
    (value: string | null) => {
      if (value && value !== '__empty__') {
        onSelect(value);
      }
    },
    [onSelect]
  );

  return (
    <StyledSelect<string | null>
      value={null}
      onValueChange={handleChange}
      style={{ color: 'black', ...style }}
      {...rest}
    />
  );
}
