import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Icon } from '@iconify/react';
import { useAuthContext } from '@/contexts/auth-utils';
import { useQueryClient } from '@tanstack/react-query';

export const GoogleOAuthSuccessPage = () => {
  const navigate = useNavigate();
  const { setAccessToken } = useAuthContext();
  const queryClient = useQueryClient();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');

    // Check if we have the required token
    if (!accessToken) {
      setTimeout(() => {
        setError('Missing access token. Authentication failed.');
        setIsProcessing(false);
        setTimeout(() => {
          navigate({ to: '/login' });
        }, 3000);
      }, 0);
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

    // Mark as processed and redirect after a short delay
    setTimeout(() => {
      setIsProcessing(false);
      setTimeout(() => {
        navigate({ to: '/dashboard' });
      }, 1500);
    }, 500);
  }, [navigate, setAccessToken, queryClient]);

  return (
    <div className="flex min-h-screen w-screen items-center justify-center relative overflow-hidden">
      {/* Background Grid */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(#aaa 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Floating Branding */}
      <div className="absolute top-0 left-0 p-8 hidden md:block">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-brand-red border-2 border-black" />
          <span className="font-bold tracking-tight uppercase text-lg">
            COPLANNR.XYZ
          </span>
        </div>
      </div>

      {/* Main Card */}
      <main className="w-full max-w-md bg-white border-hard shadow-hard-lg relative z-10">
        {/* Success Header Strip */}
        <div className="h-12 bg-brand-neon border-hard-b flex items-center justify-between px-4">
          <span className="font-mono text-black font-bold text-xs uppercase tracking-widest flex items-center gap-2">
            <Icon icon="solar:shield-check-bold" className="text-lg" />
            Auth_Protocol_Verified
          </span>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 bg-black rounded-full border border-black opacity-20" />
            <div className="w-3 h-3 bg-black rounded-full border border-black opacity-20" />
            <div className="w-3 h-3 bg-black rounded-full border border-black" />
          </div>
        </div>

        <div className="p-8">
          {/* Visual Graphic */}
          <div className="flex justify-center mb-8 relative">
            <div className="relative w-24 h-24 flex items-center justify-center">
              {/* Connection line solid */}
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-black" />

              {/* Icons */}
              <div className="absolute left-0 bg-white border-2 border-black w-10 h-10 flex items-center justify-center z-10 shadow-hard-sm">
                <Icon icon="logos:google-icon" className="text-xl" />
              </div>

              <div className="absolute right-0 bg-black text-white border-2 border-black w-10 h-10 flex items-center justify-center z-10 shadow-hard-sm">
                <Icon icon="solar:user-linear" className="text-xl" />
              </div>

              {/* Success Check */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-brand-neon border-2 border-black text-black w-8 h-8 flex items-center justify-center z-20 rounded-full shadow-hard-sm">
                <Icon icon="solar:check-circle-bold" className="text-xl" />
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2 uppercase">
              Access Granted
            </h1>
            <p className="text-neutral-500 text-sm leading-relaxed max-w-xs mx-auto">
              Identity verified successfully. We are establishing your secure
              session now.
            </p>
          </div>

          {/* Terminal Success Log */}
          <div className="bg-black text-white border-hard shadow-hard-sm mb-6 p-4 font-mono text-xs relative overflow-hidden">
            {error ? (
              <>
                <div className="mb-1 text-brand-red">
                  <span className="text-neutral-500">&gt;</span> ERROR:
                  AUTHENTICATION_FAILED
                </div>
                <div className="text-brand-red">
                  <span className="text-neutral-500">&gt;</span> MESSAGE:{' '}
                  {error}
                  <span className="cursor-blink" />
                </div>
              </>
            ) : (
              <>
                <div className="mb-1">
                  <span className="text-neutral-500">&gt;</span> TOKEN_EXCHANGE
                  [ 200_OK]
                </div>
                <div className="mb-1">
                  <span className="text-neutral-500">&gt;</span>{' '}
                  STORING_CREDENTIALS...{' '}
                  <span className="text-brand-neon">
                    {isProcessing ? 'PROCESSING' : 'COMPLETE'}
                  </span>
                </div>
                <div className="mb-1">
                  <span className="text-neutral-500">&gt;</span>{' '}
                  VALIDATING_SCOPES...{' '}
                  <span className="text-brand-neon">VERIFIED</span>
                </div>
                <div className="text-brand-neon">
                  <span className="text-neutral-500">&gt;</span>{' '}
                  REDIRECTING_TO_DASHBOARD
                  <span className="cursor-blink" />
                </div>
              </>
            )}
          </div>

          <div className="text-center">
            {error ? (
              <span className="text-[10px] font-mono text-red-500 uppercase">
                Redirecting to login...
              </span>
            ) : (
              <span className="text-[10px] font-mono text-neutral-400 uppercase">
                {isProcessing
                  ? 'Storing credentials...'
                  : 'Redirecting to dashboard...'}
              </span>
            )}
          </div>
        </div>

        {/* Decorative Footer Strip */}
        <div className="h-2 flex border-hard-t">
          <div className="flex-1 bg-black" />
          <div className="flex-1 bg-brand-neon" />
          <div className="flex-1 bg-black" />
          <div className="flex-1 bg-brand-neon" />
        </div>
      </main>
    </div>
  );
};
