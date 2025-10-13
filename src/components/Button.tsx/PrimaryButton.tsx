import styled from 'styled-components';
import { BaseButton } from './BaseButton';

export const PrimaryButton = styled(BaseButton)`
  color: white;
  &:not(:disabled) {
    background-color: #0f63ca;
    &:hover {
      background-color: #0d57b2;
    }
    &:focus {
      outline-color: #084a9e;
    }
    &:active {
      background-color: #084a9e;
    }
  }
`;
