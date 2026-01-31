import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useAuthContext } from '@/contexts/auth-utils';
import {
  registerUser,
  loginUser,
  logoutUser,
  initiateGoogleOAuth,
  handleGoogleOAuthCallback,
} from '@/lib/api/auth';
import type {
  RegisterRequest,
  LoginRequest,
  ApiResponse,
  RegisterResponse,
  LoginResponse,
  GoogleOAuthCallbackResponse,
} from '@/types/api';

/**
 * Hook for user registration
 */
export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: RegisterRequest) => registerUser(data),
    onSuccess: (response: ApiResponse<RegisterResponse>) => {
      if (response.meta.code === 201) {
        // Registration successful, redirect to login page
        navigate({ to: '/login' });
      }
    },
  });
};

/**
 * Hook for user login
 */
export const useLogin = () => {
  const { setAccessToken } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => loginUser(data),
    onSuccess: async (response: ApiResponse<LoginResponse>) => {
      if (response.meta.code === 200 && response.data) {
        // Set token - this will automatically trigger user fetch via useQuery
        setAccessToken(response.data.access_token);

        // Invalidate to ensure fresh data
        queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      }
    },
  });
};

/**
 * Hook for user logout
 */
export const useLogout = () => {
  const { logout: contextLogout, accessToken } = useAuthContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      if (!accessToken) {
        return Promise.reject(new Error('No access token available'));
      }
      return logoutUser({ access_token: accessToken });
    },
    onSuccess: () => {
      contextLogout();
      queryClient.clear();
      navigate({ to: '/' });
    },
    onError: () => {
      // Even if logout fails on backend, clear local state
      contextLogout();
      queryClient.clear();
      navigate({ to: '/' });
    },
  });
};

/**
 * Hook to manually refetch current user
 * Useful for profile updates or when you need to refresh user data
 */
export const useRefetchUser = () => {
  const { refetchUser } = useAuthContext();
  return refetchUser;
};

/**
 * Hook to check if user is authenticated
 */
export const useIsAuthenticated = () => {
  const { isAuthenticated } = useAuthContext();
  return isAuthenticated;
};

/**
 * Hook for initiating Google OAuth flow
 */
export const useGoogleOAuth = () => {
  return useMutation({
    mutationFn: () => {
      return initiateGoogleOAuth();
    },
    onSuccess: (response: ApiResponse<{ auth_url: string }>) => {
      if (response.meta.code === 200 && response.data?.auth_url) {
        window.location.href = response.data.auth_url;
      }
    },
  });
};

/**
 * Hook for handling Google OAuth callback
 */
export const useGoogleOAuthCallback = () => {
  const { setAccessToken } = useAuthContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ code, state }: { code: string; state: string }) =>
      handleGoogleOAuthCallback(code, state),
    onSuccess: (response: ApiResponse<GoogleOAuthCallbackResponse>) => {
      if (response.meta.code === 200 && response.data) {
        setAccessToken(response.data.access_token);
        queryClient.invalidateQueries({ queryKey: ['currentUser'] });
        navigate({ to: '/auth/google/success' });
      }
    },
  });
};
