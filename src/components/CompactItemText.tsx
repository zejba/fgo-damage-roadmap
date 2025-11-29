import styled from 'styled-components';

export const CompactItemText = styled.div`
  white-space: nowrap;
  width: fit-content;
  background-color: #f3f3f3;
  padding: 0 8px;
  display: flex;
  align-items: center;
  @media (max-width: 600px) {
    padding: 0 4px;
  }
`;
