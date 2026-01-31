import { createContext, useContext } from 'react';
import type { User } from '@/types/api';

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  logout: () => void;
  refetchUser: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

// Export for router checks
export const getAuthState = () => {
  if (typeof window !== 'undefined') {
    return (
      (window as Window & { __AUTH_CONTEXT__?: AuthContextType })
        .__AUTH_CONTEXT__ || null
    );
  }
  return null;
};
