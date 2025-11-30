import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useSetAtom } from 'jotai';
import { sidebarOpenAtom } from '../store/sidebar';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background: linear-gradient(90deg, #003c79, #0e78e1, #003c79);
`;

const HeaderTitle = styled.div`
  color: white;
  font-size: 1.5em;
  font-weight: bold;
  font-family: '游明朝', 'Yu Mincho', serif;
`;

function Header() {
  const setSidebarOpen = useSetAtom(sidebarOpenAtom);

  return (
    <HeaderContainer>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <HeaderTitle>FGO Damage Roadmap</HeaderTitle>
      </Link>
      <IconButton color="inherit" aria-label="menu" onClick={() => setSidebarOpen(true)} sx={{ color: 'white' }}>
        <MenuIcon />
      </IconButton>
    </HeaderContainer>
  );
}

export default Header;
