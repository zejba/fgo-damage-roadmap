import { Collapse } from 'antd';
import styled from 'styled-components';

const StyledCollapse = styled(Collapse)`
  .ant-collapse-header {
    display: none !important;
  }
  .ant-collapse-content-box {
    padding: 0 !important;
  }
`;

interface Props {
  isActive: boolean;
  children: React.ReactNode;
}

function CollapseWithOutHeader(props: Props) {
  const { isActive, children } = props;
  return (
    <StyledCollapse
      ghost
      activeKey={isActive ? ['collapse'] : []}
      items={[
        {
          key: 'collapse',
          children: children
        }
      ]}
    />
  );
}

export default CollapseWithOutHeader;
