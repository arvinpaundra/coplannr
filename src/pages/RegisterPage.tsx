import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { BackgroundGrid } from '@/components/atoms/BackgroundGrid';
import { BrandLogo } from '@/components/atoms/BrandLogo';
import { Alert } from '@/components/molecules/Alert';
import { FormField } from '@/components/molecules/FormField';
import { Divider } from '@/components/atoms/Divider';
import { LoadingSpinner } from '@/components/atoms/LoadingSpinner';
import { useRegister, useGoogleOAuth } from '@/hooks/useAuth';
import { getFormErrorsFromApiResponse } from '@/lib/utils/api-errors';

export const RegisterPage = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showAgreedError, setShowAgreedError] = useState(false);

  const registerMutation = useRegister();
  const googleOAuthMutation = useGoogleOAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setFieldErrors({});
    setShowAgreedError(false);

    if (!agreed) {
      setErrorMessage(
        'You must agree to the Terms of Service and Privacy Policy'
      );
      setShowAgreedError(true);
      return;
    }

    registerMutation.mutate(
      { email, fullname, password },
      {
        onSuccess: (response) => {
          if (response.meta.code === 201) {
            // Success - navigation handled by useRegister hook
            setFieldErrors({});
            setErrorMessage('');
          } else {
            // Handle validation errors (400) or other errors
            const { fieldErrors: errors, generalError } =
              getFormErrorsFromApiResponse(response);
            setFieldErrors(errors);
            setErrorMessage(
              generalError ||
                (Object.keys(errors).length > 0
                  ? 'Please fix the errors below'
                  : response.meta.message ||
                    'Registration failed. Please try again.')
            );
          }
        },
        onError: (error: unknown) => {
          const { fieldErrors: errors, generalError } =
            getFormErrorsFromApiResponse(error);
          setFieldErrors(errors);
          setErrorMessage(
            generalError ||
              (Object.keys(errors).length > 0
                ? 'Please fix the errors below'
                : 'Registration failed. Please try again.')
          );
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

      {/* Register Card */}
      <div className="w-full max-w-md p-4 z-10">
        <div className="bg-white border-hard shadow-hard p-6 md:p-8 relative">
          {/* Corner Accents */}
          <div className="absolute -top-2 -left-2 w-4 h-4 bg-brand-neon border-2 border-black" />
          <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-brand-red border-2 border-black" />

          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold uppercase tracking-tight mb-2">
              Create Account
            </h1>
            <p className="font-mono text-xs text-neutral-500">
              Join the system to start scheduling.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && <Alert variant="error" message={errorMessage} />}

            <FormField
              label="Full Name"
              htmlFor="fullname"
              required
              error={fieldErrors.fullname}
            >
              <Input
                id="fullname"
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                placeholder="e.g. John System"
                icon={<Icon icon="solar:user-circle-linear" />}
                required
              />
            </FormField>

            <FormField
              label="Email Address"
              htmlFor="email"
              required
              error={fieldErrors.email}
            >
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
              error={fieldErrors.password}
            >
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                icon={<Icon icon="solar:lock-password-linear" />}
                required
                minLength={8}
              />
            </FormField>

            <div className="pt-2 pb-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative w-5 h-5 shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => {
                      setAgreed(e.target.checked);
                      setShowAgreedError(false);
                    }}
                    className={`peer appearance-none w-5 h-5 border-2 ${
                      showAgreedError ? 'border-red-500' : 'border-black'
                    } bg-white checked:bg-brand-neon transition-colors cursor-pointer`}
                  />
                  <svg
                    className="absolute inset-0 m-auto w-3 h-3 opacity-0 peer-checked:opacity-100 pointer-events-none"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M2 6L5 9L10 3"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span
                  className={`text-xs leading-tight ${
                    showAgreedError ? 'text-red-600' : 'text-neutral-600'
                  }`}
                >
                  I agree to the{' '}
                  <a
                    href="#"
                    className="underline decoration-1 underline-offset-2 hover:bg-brand-neon text-black font-medium"
                  >
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a
                    href="#"
                    className="underline decoration-1 underline-offset-2 hover:bg-brand-neon text-black font-medium"
                  >
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>
              {showAgreedError && (
                <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                  <Icon icon="solar:danger-triangle-bold" className="text-sm" />
                  <span>You must agree to continue</span>
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full py-3 flex items-center justify-center gap-2"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? (
                <>
                  <LoadingSpinner size="md" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
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
              Already part of the system?{' '}
              <Link
                to="/login"
                className="font-bold text-black border-b-2 border-brand-neon hover:bg-brand-neon transition-colors ml-1"
              >
                Log in here
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="text-center mt-6 font-mono text-[10px] text-neutral-400">
          SECURE CONNECTION // ENCRYPTED
        </div>
      </div>
    </div>
  );
};
