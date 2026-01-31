import { useState, useEffect } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { useLogin, useGoogleOAuth } from '@/hooks/useAuth';
import { useAuthContext } from '@/contexts/auth-utils';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const loginMutation = useLogin();
  const googleOAuthMutation = useGoogleOAuth();
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  // Redirect to dashboard when authenticated
  useEffect(() => {
    if (isAuthenticated && loginMutation.isSuccess) {
      navigate({ to: '/dashboard' });
    }
  }, [isAuthenticated, loginMutation.isSuccess, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (response) => {
          if (response.meta.code !== 200) {
            setErrorMessage(
              response.meta.message || 'Login failed. Please try again.'
            );
          }
          // Navigation will happen via useEffect when isAuthenticated becomes true
        },
        onError: (error: unknown) => {
          const response =
            (error as { response?: { data?: unknown } })?.response?.data ||
            error;
          if (response && typeof response === 'object' && 'meta' in response) {
            const meta = (response as { meta?: { message?: string } }).meta;
            if (meta?.message) {
              setErrorMessage(meta.message);
            } else {
              setErrorMessage('Login failed. Please try again.');
            }
          } else {
            setErrorMessage('Login failed. Please try again.');
          }
        },
      }
    );
  };

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

      {/* Decorative Brand */}
      <div className="absolute top-0 left-0 p-8 hidden md:block">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-brand-red border-2 border-black" />
          <span className="font-bold tracking-tight uppercase text-lg">
            COPLANNR.XYZ
          </span>
        </div>
      </div>

      {/* Login Card */}
      <main className="w-full max-w-md p-4 z-10">
        <div className="bg-white border-hard shadow-hard p-6 md:p-8 relative">
          {/* Corner Accents */}
          <div className="absolute -top-2 -left-2 w-4 h-4 bg-brand-neon border-2 border-black" />
          <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-brand-red border-2 border-black" />

          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold uppercase tracking-tight mb-2">
              Login
            </h1>
            <p className="font-mono text-xs text-neutral-500">
              Enter credentials to access dashboard.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMessage && (
              <div className="bg-red-50 border-2 border-red-500 p-3 text-xs text-red-700">
                <div className="flex items-center gap-2">
                  <Icon
                    icon="solar:danger-triangle-bold"
                    className="text-base"
                  />
                  <span className="font-bold">{errorMessage}</span>
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="block font-bold text-xs uppercase tracking-wide">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@coplannr.xyz"
                icon={<Icon icon="solar:letter-linear" />}
                required
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="block font-bold text-xs uppercase tracking-wide">
                  Password
                </label>
                <a
                  href="#"
                  className="text-[10px] uppercase font-bold tracking-wide text-neutral-500 hover:text-black hover:underline decoration-2 decoration-brand-neon"
                >
                  Forgot?
                </a>
              </div>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                icon={<Icon icon="solar:lock-password-linear" />}
                required
              />
            </div>

            <div className="pt-1 pb-1">
              <Checkbox
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                label="Remember this device"
              />
            </div>

            <Button
              type="submit"
              className="w-full py-3 flex items-center justify-center gap-2"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <>
                  <Icon icon="svg-spinners:ring-resize" className="text-lg" />
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <Icon icon="solar:arrow-right-linear" className="text-lg" />
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase font-mono">
              <span className="bg-white px-2 text-neutral-400">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Login */}
          <Button
            variant="secondary"
            className="w-full py-3 flex items-center justify-center gap-3"
            onClick={(e) => {
              e.preventDefault();
              googleOAuthMutation.mutate(undefined);
            }}
            disabled={googleOAuthMutation.isPending}
          >
            {googleOAuthMutation.isPending ? (
              <>
                <Icon icon="svg-spinners:ring-resize" className="text-lg" />
                <span>Redirecting...</span>
              </>
            ) : (
              <>
                <Icon icon="logos:google-icon" className="text-lg" />
                <span>Google</span>
              </>
            )}
          </Button>

          {/* Footer */}
          <div className="mt-8 text-center border-t border-neutral-100 pt-4">
            <p className="text-xs text-neutral-600">
              New to the platform?{' '}
              <Link
                to="/register"
                className="font-bold text-black border-b-2 border-brand-neon hover:bg-brand-neon transition-colors ml-1"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="text-center mt-6 font-mono text-[10px] text-neutral-400">
          SECURE ACCESS // V1.0.4
        </div>
      </main>
    </div>
  );
};
