import styled from 'styled-components';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

interface Props {
  children: React.ReactNode;
}

const MainContent = styled.main`
  padding: 12px;
  min-width: 360px;
  @media (max-width: 560px) {
    padding: 8px 2px;
  }
`;

function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <Sidebar />
      <MainContent>{children}</MainContent>
    </>
  );
}

export default Layout;
