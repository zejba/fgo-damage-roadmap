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
    &:active {
      border-color: #ef5350;
      color: #ef5350;
    }
    @media (hover: hover) {
      &:hover {
        border-color: #ef5350;
        color: #ef5350;
      }
    }
  }
  &:disabled {
    border-color: #b1b1b1ff;
    color: #b1b1b1ff;
    background-color: white;
  }
`;
