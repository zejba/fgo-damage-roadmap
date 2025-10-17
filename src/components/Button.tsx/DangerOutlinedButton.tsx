import styled from 'styled-components';
import { BaseButton } from './BaseButton';

export const DangerOutlinedButton = styled(BaseButton)`
  background-color: white;
  color: #ef5350;
  border: 1px solid #ef5350;
  &:not(:disabled) {
    transition:
      border-color 0.2s ease,
      color 0.2s ease,
      outline 0.1s ease;
    &:hover {
      border-color: #ff8b8bff;
      color: #ff8b8bff;
    }
    &:active {
      outline: 1px solid #ff8b8bff;
      color: #ec4840ff;
    }
  }
  &:disabled {
    border-color: #b1b1b1ff;
    color: #b1b1b1ff;
    background-color: white;
  }
`;
