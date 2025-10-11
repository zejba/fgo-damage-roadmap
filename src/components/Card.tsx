import { Card as AntCard, CardProps } from 'antd';
import styled from 'styled-components';

const StyledCard = styled(AntCard)`
  border-color: #d9d9d9;
  .ant-card-head {
    background-color: rgba(0, 0, 0, 0.02);
    border-color: #d9d9d9;
  }
  .ant-card-body {
    padding: 12px;
  }
`;

export function Card(props: CardProps) {
  return <StyledCard {...props} />;
}
