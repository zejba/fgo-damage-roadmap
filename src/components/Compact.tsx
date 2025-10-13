import styled from 'styled-components';

export const Compact = styled.div`
  display: flex;
  height: 32px;
  align-items: stretch;
  & > * {
    min-width: 0;
    border: 1px solid;
    border-left: none;
    border-radius: 0;
    &:first-child {
      border-left: 1px solid;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    &:last-child {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }
`;
