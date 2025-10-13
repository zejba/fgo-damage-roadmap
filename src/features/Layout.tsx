import { Layout as AntdLayout, Typography } from 'antd';
import { Link } from 'react-router-dom';
const { Header, Content } = AntdLayout;

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <AntdLayout style={{ minWidth: 'fit-content' }}>
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
        <Content
          style={{
            backgroundColor: 'white',
            padding: 12,
            margin: 0,
            minHeight: 280
          }}
        >
          {children}
        </Content>
      </AntdLayout>
    </AntdLayout>
  );
}

export default Layout;
