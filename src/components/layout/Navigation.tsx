import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/Button';
import { useAuthContext } from '@/contexts/auth-utils';

export const Navigation = () => {
  const { isAuthenticated } = useAuthContext();

  return (
    <nav className="sticky top-0 z-50 bg-white border-hard-b flex justify-between items-center p-4 lg:p-5">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-brand-red border-2 border-black" />
        <Link to="/" className="text-xl font-bold tracking-tight uppercase">
          COPLANNR.XYZ
        </Link>
      </div>
      <div className="flex gap-4 items-center">
        {isAuthenticated ? (
          <Link to="/dashboard">
            <Button variant="secondary" className="px-4 py-1 text-xs">
              Go to Dashboard
            </Button>
          </Link>
        ) : (
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
        )}
      </div>
    </nav>
  );
};
