import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  redirect,
} from '@tanstack/react-router';
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { ComposePage } from '@/pages/ComposePage';
import { CalendarPage } from '@/pages/CalendarPage';
import { AnalyticsPage } from '@/pages/AnalyticsPage';
import { ConnectionsPage } from '@/pages/ConnectionsPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

import { GoogleOAuthErrorPage } from '@/pages/GoogleOAuthErrorPage';
import { GoogleOAuthSuccessPage } from '@/pages/GoogleOAuthSuccessPage';
import { getAuthState } from '@/contexts/auth-utils';

const hasToken = () => {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('access_token');
};

const checkAuth = () => {
  const token = localStorage.getItem('access_token');

  if (!token) {
    return false;
  }

  const authContext = getAuthState();

  if (!authContext) {
    return true;
  }

  if (authContext.isAuthenticated) {
    return true;
  }

  if (authContext.accessToken && authContext.isLoading) {
    return true;
  }

  if (token && !authContext.isLoading && !authContext.user) {
    return false;
  }

  return false;
};

const rootRoute = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: NotFoundPage,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
  beforeLoad: () => {
    if (hasToken()) {
      throw redirect({ to: '/dashboard' });
    }
  },
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: RegisterPage,
  beforeLoad: () => {
    if (hasToken()) {
      throw redirect({ to: '/dashboard' });
    }
  },
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: DashboardPage,
  beforeLoad: () => {
    if (!checkAuth()) {
      throw redirect({ to: '/login' });
    }
  },
});

const composeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/compose',
  component: ComposePage,
  beforeLoad: () => {
    if (!checkAuth()) {
      throw redirect({ to: '/login' });
    }
  },
});

const scheduleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/calendar',
  component: CalendarPage,
  beforeLoad: () => {
    if (!checkAuth()) {
      throw redirect({ to: '/login' });
    }
  },
});

const analyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/analytics',
  component: AnalyticsPage,
  beforeLoad: () => {
    if (!checkAuth()) {
      throw redirect({ to: '/login' });
    }
  },
});

const connectionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/connections',
  component: ConnectionsPage,
  beforeLoad: () => {
    if (!checkAuth()) {
      throw redirect({ to: '/login' });
    }
  },
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: SettingsPage,
  beforeLoad: () => {
    if (!checkAuth()) {
      throw redirect({ to: '/login' });
    }
  },
});

const googleOAuthErrorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/auth/google/error',
  component: GoogleOAuthErrorPage,
});

const googleOAuthSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/auth/google/success',
  component: GoogleOAuthSuccessPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  dashboardRoute,
  composeRoute,
  scheduleRoute,
  analyticsRoute,
  connectionsRoute,
  settingsRoute,
  googleOAuthErrorRoute,
  googleOAuthSuccessRoute,
]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
