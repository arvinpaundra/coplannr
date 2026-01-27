import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, password, agreed });
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
            <div className="space-y-1">
              <label className="block font-bold text-xs uppercase tracking-wide">
                Full Name
              </label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. John System"
                icon={<Icon icon="solar:user-circle-linear" />}
              />
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-xs uppercase tracking-wide">
                Email Address
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@coplannr.xyz"
                icon={<Icon icon="solar:letter-linear" />}
              />
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-xs uppercase tracking-wide">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                icon={<Icon icon="solar:lock-password-linear" />}
              />
            </div>

            <div className="pt-2 pb-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative w-5 h-5 shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="peer appearance-none w-5 h-5 border-2 border-black bg-white checked:bg-brand-neon transition-colors cursor-pointer"
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
                <span className="text-xs text-neutral-600 leading-tight">
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
            </div>

            <Button
              type="submit"
              className="w-full py-3 flex items-center justify-center gap-2"
            >
              Create Account
              <Icon icon="solar:arrow-right-linear" className="text-lg" />
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
          >
            <Icon icon="logos:google-icon" className="text-lg" />
            <span>Google</span>
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
