import { Drawer, List, ListItem, ListItemButton, ListItemText, Divider, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAtom } from 'jotai';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { sidebarOpenAtom } from '../store/sidebar';

const StyledListItemButton = styled(ListItemButton)`
  color: white !important;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1) !important;
  }
` as typeof ListItemButton;

function Sidebar() {
  const [open, setOpen] = useAtom(sidebarOpenAtom);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Drawer anchor="right" open={open} onClose={handleClose}>
      <Box
        sx={{
          width: 250,
          height: '100%',
          background: 'linear-gradient(180deg, #0e78e1, #003c79)'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '8px' }}>
          <IconButton onClick={handleClose} aria-label="close" sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
          <ListItem disablePadding>
            <StyledListItemButton component={Link} to="/" onClick={handleClose}>
              <ListItemText primary="ダメージ計算" />
            </StyledListItemButton>
          </ListItem>
          <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
          <ListItem disablePadding>
            <StyledListItemButton component={Link} to="/news" onClick={handleClose}>
              <ListItemText primary="お知らせ・更新履歴" />
            </StyledListItemButton>
          </ListItem>
          <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
          <ListItem disablePadding>
            <StyledListItemButton component={Link} to="/related-sites" onClick={handleClose}>
              <ListItemText primary="関連サイト" />
            </StyledListItemButton>
          </ListItem>
          <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
          <ListItem disablePadding>
            <StyledListItemButton component={Link} to="/convert-from-old-service" onClick={handleClose}>
              <ListItemText primary="旧サイトデータ移行" />
            </StyledListItemButton>
          </ListItem>
          <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidebar;
