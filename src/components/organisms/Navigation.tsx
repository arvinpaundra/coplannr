import { Link, useLocation } from '@tanstack/react-router';
import { Button } from '@/components/ui/Button';
import { BrandLogo } from '@/components/atoms/BrandLogo';
import { useAuthContext } from '@/contexts/auth-utils';
import { useScrollToSection } from '@/hooks/useScrollToSection';

export const Navigation = () => {
  const { isAuthenticated } = useAuthContext();
  const location = useLocation();
  const scrollToSection = useScrollToSection();

  const isLandingPage = location.pathname === '/';

  const navSections = [
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'features', label: 'Features' },
    { id: 'pricing', label: 'Pricing' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-hard-b flex items-center p-4 lg:p-5">
      <BrandLogo size="md" to="/" />
      <div className="absolute left-1/2 -translate-x-1/2 flex gap-4 items-center">
        {isLandingPage && (
          <div className="hidden lg:flex gap-4 items-center">
            {navSections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="font-mono text-xs uppercase hover:text-brand-red transition-colors cursor-pointer"
              >
                {section.label}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="ml-auto flex gap-4 items-center">
        {!isAuthenticated ? (
          <>
            <Link
              to="/login"
              className="hidden md:block font-mono text-sm hover:underline hover:text-brand-red"
            >
              LOGIN
            </Link>
            <Link to="/register">
              <Button variant="secondary" className="px-4 py-1 text-xs">
                Get Access
              </Button>
            </Link>
          </>
        ) : (
          <Link to="/dashboard">
            <Button variant="secondary" className="px-4 py-1 text-xs">
              Go to Dashboard
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};
