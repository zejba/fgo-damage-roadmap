import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 12px;
  background: linear-gradient(90deg, #003c79, #0e78e1, #003c79);
`;

const HeaderTitle = styled.div`
  color: white;
  font-size: 1.5em;
  font-weight: bold;
  font-family: '游明朝', 'Yu Mincho', serif;
`;

const MainContent = styled.main`
  padding: 12px;
  @media (max-width: 560px) {
    padding: 8px 2px;
  }
`;

function Layout({ children }: Props) {
  return (
    <>
      <Header>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <HeaderTitle>FGO Damage Roadmap</HeaderTitle>
        </Link>
      </Header>
      <MainContent>{children}</MainContent>
    </>
  );
}

export default Layout;
