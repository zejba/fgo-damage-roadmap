import { createContext } from 'react';

export interface SnackbarContextType {
  success: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
  info: (message: string) => void;
  loading: (message: string, duration?: number) => () => void;
}

export const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);
