import { Link } from '@tanstack/react-router';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/Button';
import { useGoogleOAuth } from '@/hooks/useAuth';

export const GoogleOAuthErrorPage = () => {
  const googleOAuthMutation = useGoogleOAuth();

  const handleRetry = () => {
    googleOAuthMutation.mutate(undefined);
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
        {/* Error Header Strip */}
        <div className="h-12 bg-brand-red border-hard-b flex items-center justify-between px-4">
          <span className="font-mono text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2">
            <Icon icon="solar:shield-warning-bold" className="text-lg" />
            Auth_Protocol_Failure
          </span>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 bg-black rounded-full border border-white opacity-20" />
            <div className="w-3 h-3 bg-black rounded-full border border-white opacity-20" />
            <div className="w-3 h-3 bg-black rounded-full border border-white" />
          </div>
        </div>

        <div className="p-8">
          {/* Visual Graphic */}
          <div className="flex justify-center mb-8 relative">
            <div className="relative w-24 h-24 flex items-center justify-center">
              {/* Dashed connection line broken */}
              <div className="absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-neutral-300" />

              {/* Icons */}
              <div className="absolute left-0 bg-white border-2 border-black w-10 h-10 flex items-center justify-center z-10">
                <Icon icon="logos:google-icon" className="text-xl" />
              </div>

              <div className="absolute right-0 bg-black text-white border-2 border-black w-10 h-10 flex items-center justify-center z-10">
                <Icon icon="solar:user-linear" className="text-xl" />
              </div>

              {/* Error X */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-brand-red border-2 border-black text-white w-8 h-8 flex items-center justify-center z-20 rounded-full">
                <Icon icon="solar:close-circle-bold" className="text-xl" />
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2 uppercase glitch-text cursor-default">
              Access Denied
            </h1>
            <p className="text-neutral-500 text-sm leading-relaxed max-w-xs mx-auto">
              We couldn't verify your identity with Google. The authentication
              token was rejected or expired.
            </p>
          </div>

          {/* Terminal Error Log */}
          <div className="bg-black text-white border-hard shadow-hard-sm mb-8 p-4 font-mono text-xs relative overflow-hidden">
            <div className="absolute top-2 right-2 opacity-50 hover:opacity-100 cursor-pointer">
              <Icon icon="solar:copy-linear" className="text-white" />
            </div>
            <div className="mb-1">
              <span className="text-neutral-500">&gt;</span> INITIATE_HANDSHAKE
              [GOOGLE_OAUTH2]
            </div>
            <div className="mb-1">
              <span className="text-neutral-500">&gt;</span>{' '}
              <span className="text-brand-neon">VERIFYING_CLIENT_ID...</span> OK
            </div>
            <div className="mb-1">
              <span className="text-neutral-500">&gt;</span> REQUESTING_SCOPE [
              EMAIL, PROFILE]
            </div>
            <div className="mb-1 text-brand-red">
              <span className="text-neutral-500">&gt;</span> ERROR:
              401_UNAUTHORIZED
            </div>
            <div className="text-brand-red">
              <span className="text-neutral-500">&gt;</span> MESSAGE:
              Invalid_Grant / Token_Mismatch
              <span className="cursor-blink" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Button
              variant="primary"
              className="w-full py-3 px-4 font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-3 hover:bg-brand-neon group"
              onClick={handleRetry}
              disabled={googleOAuthMutation.isPending}
            >
              <Icon
                icon="solar:refresh-circle-linear"
                className={`text-xl transition-transform duration-500 ${
                  googleOAuthMutation.isPending
                    ? 'animate-spin'
                    : 'group-hover:rotate-180'
                }`}
              />
              {googleOAuthMutation.isPending
                ? 'Redirecting...'
                : 'Retry Authentication'}
            </Button>

            <Link
              to="/"
              className="btn-action w-full py-3 px-4 font-semibold text-xs uppercase flex items-center justify-center gap-2 bg-white border-hard shadow-hard-sm hover:shadow-hard active:shadow-[0_0_0_0_transparent] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all duration-100"
            >
              <Icon icon="solar:arrow-left-linear" className="text-lg" />
              Back Home
            </Link>
          </div>
        </div>

        {/* Decorative Footer Strip */}
        <div className="h-2 flex border-hard-t">
          <div className="flex-1 bg-black" />
          <div className="flex-1 bg-brand-neon" />
          <div className="flex-1 bg-brand-red" />
          <div className="flex-1 bg-white" />
        </div>
      </main>
    </div>
  );
};
