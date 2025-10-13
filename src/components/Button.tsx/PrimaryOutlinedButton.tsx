import styled from 'styled-components';
import { BaseButton } from './BaseButton';

export const PrimaryOutlinedButton = styled(BaseButton)`
  background-color: white;
  border: 1px solid #757575;
  &:not(:disabled) {
    transition:
      border-color 0.2s ease,
      color 0.2s ease,
      outline 0.1s ease;
    &:hover {
      border-color: #2c8bff;
      color: #2c8bff;
    }
    &:focus {
      outline-color: #084a9e;
    }
    &:active {
      outline: 1px solid #93c2ff;
      color: #084a9e;
    }
  }
  &:disabled {
    border-color: #b1b1b1ff;
    color: #b1b1b1ff;
    background-color: white;
  }
`;
