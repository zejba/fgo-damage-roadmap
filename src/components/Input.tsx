import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  padding-left: 4px;
  padding-right: 4px;
  border-radius: 6px;
  border: 1px solid black;
`;

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <StyledInput {...props} />;
}
