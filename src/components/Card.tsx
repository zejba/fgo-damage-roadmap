import { Card as AntCard, CardProps } from 'antd';
import styled from 'styled-components';

const StyledCard = styled(AntCard)`
  border-color: #303030;
  border-width: 1px;
  .ant-card-head {
    background-color: #ececec;
    border-color: #303030;
  }
  .ant-card-body {
    padding: 12px;
  }
`;

export function Card(props: CardProps) {
  return <StyledCard {...props} />;
}
