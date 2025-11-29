import { Card as AntCard, CardProps } from 'antd';
import styled from 'styled-components';

const StyledCard = styled(AntCard)`
  border-color: #303030;
  .ant-card-head {
    background-color: #ececec;
    border-color: #303030;
  }
  .ant-card-body {
    padding: 12px;
  }
  @media (max-width: 600px) {
    .ant-card-head,
    .ant-card-head-wrapper {
      font-size: 1em;
      min-height: unset;
      height: 44px;
      padding: 8px;
    }
    .ant-card-body {
      padding: 8px 4px;
    }
  }
`;

export function Card(props: CardProps) {
  return <StyledCard {...props} />;
}
