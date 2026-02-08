import { Link } from '@tanstack/react-router';

export const GoogleOAuthErrorPage = () => {
  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-8xl md:text-9xl font-bold text-neutral-300 mb-4">
          401
        </h1>
        <p className="font-mono text-base text-neutral-600 mb-8">
          Authentication failed
        </p>
        <Link
          to="/login"
          className="font-mono text-sm text-neutral-500 hover:text-black underline"
        >
          Back to login
        </Link>
      </div>
    </div>
  );
};
