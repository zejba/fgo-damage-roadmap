import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  padding-left: 4px;
  padding-right: 4px;
`;

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <StyledInput {...props} />;
}
