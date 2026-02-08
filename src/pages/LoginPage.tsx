import { useState, useEffect } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { BackgroundGrid } from '@/components/atoms/BackgroundGrid';
import { BrandLogo } from '@/components/atoms/BrandLogo';
import { Alert } from '@/components/molecules/Alert';
import { FormField } from '@/components/molecules/FormField';
import { Divider } from '@/components/atoms/Divider';
import { LoadingSpinner } from '@/components/atoms/LoadingSpinner';
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
      <BackgroundGrid opacity={0.2} size={20} />

      {/* Decorative Brand */}
      <div className="absolute top-0 left-0 p-8 hidden md:block">
        <BrandLogo size="sm" />
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
            {errorMessage && <Alert variant="error" message={errorMessage} />}

            <FormField label="Email" htmlFor="email" required>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@coplannr.xyz"
                icon={<Icon icon="solar:letter-linear" />}
                required
              />
            </FormField>

            <FormField
              label="Password"
              htmlFor="password"
              required
              className="space-y-1"
            >
              <div className="flex justify-between items-center mb-1">
                <a
                  href="#"
                  className="text-[10px] uppercase font-bold tracking-wide text-neutral-500 hover:text-black hover:underline decoration-2 decoration-brand-neon"
                >
                  Forgot?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                icon={<Icon icon="solar:lock-password-linear" />}
                required
              />
            </FormField>

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
                  <LoadingSpinner size="md" />
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

          <Divider text="Or continue with" className="my-6" />

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
                <LoadingSpinner size="md" />
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
