import React, { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { AuthContextType } from './auth-utils';
import { AuthContext } from './auth-utils';
import { getCurrentUser } from '@/lib/api/auth';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Initialize token from localStorage
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    return localStorage.getItem('access_token');
  });

  // Fetch user data with TanStack Query
  const {
    data: user,
    isLoading,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      try {
        const response = await getCurrentUser();
        if (response.meta.code === 200 && response.data) {
          return response.data;
        }
        // If unauthorized, clear token
        if (response.meta.code === 401) {
          localStorage.removeItem('access_token');
          // Use setTimeout to avoid setState during render
          setTimeout(() => setAccessToken(null), 0);
        }
        return null;
      } catch {
        // On error, clear token
        localStorage.removeItem('access_token');
        setTimeout(() => setAccessToken(null), 0);
        return null;
      }
    },
    enabled: !!accessToken, // Only fetch when we have a token
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });

  const logout = () => {
    // Clear token from localStorage
    localStorage.removeItem('access_token');
    setAccessToken(null);
    // User will be automatically cleared when token is removed
  };

  // Sync token to localStorage whenever it changes
  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('access_token', accessToken);
    } else {
      localStorage.removeItem('access_token');
    }
  }, [accessToken]);

  // Memoize value to prevent unnecessary re-renders
  const value: AuthContextType = useMemo(
    () => ({
      user: user || null,
      isAuthenticated: !!user && !!accessToken,
      isLoading,
      accessToken,
      setAccessToken,
      logout,
      refetchUser, // Expose refetch for manual updates
    }),
    [user, accessToken, isLoading, refetchUser]
  );

  // Update global reference for route guards
  useEffect(() => {
    (
      window as Window & { __AUTH_CONTEXT__?: AuthContextType }
    ).__AUTH_CONTEXT__ = value;
  }, [value]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
