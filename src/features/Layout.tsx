import { Layout as AntdLayout, Typography } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const { Header, Content } = AntdLayout;

interface Props {
  children: React.ReactNode;
}

const StyledContent = styled(Content)`
  background-color: white;
  padding: 12px;
  margin: 0;
  min-height: 280px;
  @media (max-width: 560px) {
    padding: 8px 0.5px;
  }
`;

function Layout({ children }: Props) {
  return (
    <AntdLayout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 24,
          height: 48,
          background: 'linear-gradient(90deg, #003c79, #0e78e1, #003c79)'
        }}
      >
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Typography.Title
            level={3}
            style={{
              color: 'white',
              margin: 0,
              fontFamily: '游明朝, Yu Mincho, serif'
            }}
          >
            FGO Damage Roadmap
          </Typography.Title>
        </Link>
      </Header>
      <AntdLayout>
        <StyledContent>{children}</StyledContent>
      </AntdLayout>
    </AntdLayout>
  );
}

export default Layout;
