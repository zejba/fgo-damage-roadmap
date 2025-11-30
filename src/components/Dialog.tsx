import { Dialog as MuiDialog, styled } from '@mui/material';

export const Dialog = styled(MuiDialog)(() => ({
  '& .MuiDialog-paper': {
    '@media (max-width: 560px)': {
      margin: '8px',
      width: 'calc(100% - 16px)'
    }
  }
}));
