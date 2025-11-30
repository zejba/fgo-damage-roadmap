import { useState, useCallback, ReactNode } from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';
import { SnackbarContext } from './SnackbarContext';

interface SnackbarState {
  open: boolean;
  message: string;
  severity: AlertColor;
  duration: number;
}

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'info',
    duration: 3000
  });

  const showSnackbar = useCallback((message: string, severity: AlertColor, duration = 3000) => {
    setSnackbar({
      open: true,
      message,
      severity,
      duration
    });
  }, []);

  const success = useCallback(
    (message: string) => {
      showSnackbar(message, 'success');
    },
    [showSnackbar]
  );

  const error = useCallback(
    (message: string) => {
      showSnackbar(message, 'error');
    },
    [showSnackbar]
  );

  const warning = useCallback(
    (message: string) => {
      showSnackbar(message, 'warning');
    },
    [showSnackbar]
  );

  const info = useCallback(
    (message: string) => {
      showSnackbar(message, 'info');
    },
    [showSnackbar]
  );

  const loading = useCallback(
    (message: string, duration = 0) => {
      showSnackbar(message, 'info', duration);
      return () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
      };
    },
    [showSnackbar]
  );

  const handleClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <SnackbarContext.Provider value={{ success, error, warning, info, loading }}>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={snackbar.duration === 0 ? null : snackbar.duration}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
