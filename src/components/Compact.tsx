import styled from 'styled-components';

export const Compact = styled.div`
  display: flex;
  height: 32px;
  align-items: stretch;
  > * {
    min-width: 0;
    border: 1px solid black;
    &:first-child:not(:last-child) {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    &:not(:first-child):not(:last-child) {
      border-radius: 0;
      border-left: none;
    }
    &:last-child:not(:first-child) {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-left: none;
    }
    &:focus {
      z-index: 1;
    }
  }
`;
