import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  IconButton,
  Box,
  Collapse
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useAtom } from 'jotai';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';
import { sidebarOpenAtom } from '../store/sidebar';

const StyledListItemButton = styled(ListItemButton)`
  color: white !important;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1) !important;
  }
` as typeof ListItemButton;

function Sidebar() {
  const [open, setOpen] = useAtom(sidebarOpenAtom);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSettingsToggle = () => {
    setSettingsOpen(!settingsOpen);
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
          <ListItem disablePadding>
            <StyledListItemButton onClick={handleSettingsToggle}>
              <ListItemText primary="設定" />
              {settingsOpen ? <ExpandLess /> : <ExpandMore />}
            </StyledListItemButton>
          </ListItem>
          <Collapse in={settingsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem disablePadding>
                <StyledListItemButton
                  component={Link}
                  to="/settings/my-preset-buff"
                  onClick={handleClose}
                  sx={{ pl: 4 }}
                >
                  <ListItemText primary="プリセットバフ設定" />
                </StyledListItemButton>
              </ListItem>
            </List>
          </Collapse>
          <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidebar;
