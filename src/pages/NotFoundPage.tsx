import { Link } from '@tanstack/react-router';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/Button';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#f8f8f8] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Grid */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(#aaa 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl">
        {/* 404 Visual */}
        <div className="mb-8 relative">
          <div className="inline-block bg-white border-hard shadow-hard p-8 rotate-2 hover:rotate-0 transition-transform duration-500">
            <div className="text-[120px] md:text-[180px] font-bold leading-none tracking-tighter">
              404
            </div>
            <div className="absolute -top-3 -right-3 w-6 h-6 bg-brand-red border-2 border-black" />
            <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-brand-neon border-2 border-black" />
          </div>
        </div>

        {/* Text */}
        <div className="mb-8 bg-white border-hard shadow-hard p-8">
          <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-4">
            Page Not Found
          </h1>
          <p className="font-mono text-base md:text-lg text-neutral-600 mb-2">
            The requested page does not exist in this system.
          </p>
          <p className="font-mono text-sm text-neutral-500">
            Error Code: HTTP 404 • Resource unavailable
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link to="/">
            <Button className="px-8 py-4 text-base flex items-center gap-2">
              <Icon icon="solar:home-2-linear" />
              Go to Homepage
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button
              variant="secondary"
              className="px-8 py-4 text-base flex items-center gap-2"
            >
              <Icon icon="solar:widget-2-linear" />
              Open Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
