import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { LoadingSpinner } from '@/components/atoms/LoadingSpinner';
import { useAuthContext } from '@/contexts/auth-utils';
import { useQueryClient } from '@tanstack/react-query';

export const GoogleOAuthSuccessPage = () => {
  const navigate = useNavigate();
  const { setAccessToken } = useAuthContext();
  const queryClient = useQueryClient();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');

    // Check if we have the required token
    if (!accessToken) {
      setTimeout(() => {
        navigate({ to: '/login' });
      }, 1000);
      return;
    }

    // Store access token (this will trigger user data fetch via AuthContext)
    localStorage.setItem('access_token', accessToken);
    setAccessToken(accessToken);

    // Store refresh token if provided (for future use)
    if (refreshToken) {
      localStorage.setItem('refresh_token', refreshToken);
    }

    // Invalidate queries to fetch fresh user data
    queryClient.invalidateQueries({ queryKey: ['currentUser'] });

    // Redirect after a short delay
    setTimeout(() => {
      navigate({ to: '/dashboard' });
    }, 1000);
  }, [navigate, setAccessToken, queryClient]);

  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-white">
      <div className="text-center">
        <LoadingSpinner className="mx-auto mb-6" />
        <p className="font-mono text-sm text-neutral-600">Redirecting...</p>
      </div>
    </div>
  );
};
