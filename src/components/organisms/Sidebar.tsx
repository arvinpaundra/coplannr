import { Link } from '@tanstack/react-router';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { BrandLogo } from '@/components/atoms/BrandLogo';
import { useAuthContext } from '@/contexts/auth-utils';
import { useLogout } from '@/hooks/useAuth';
import { useSidebar } from '@/hooks/useSidebar';

interface NavItem {
  label: string;
  icon: string;
  path: string;
}

const platformItems: NavItem[] = [
  { label: 'Dashboard', icon: 'solar:widget-2-linear', path: '/dashboard' },
  { label: 'Compose', icon: 'solar:pen-new-square-linear', path: '/compose' },
  { label: 'Calendar', icon: 'solar:calendar-date-linear', path: '/calendar' },
  { label: 'Analytics', icon: 'solar:chart-square-linear', path: '/analytics' },
];

const systemItems: NavItem[] = [
  {
    label: 'Connections',
    icon: 'solar:link-circle-linear',
    path: '/connections',
  },
  {
    label: 'Subscription',
    icon: 'solar:card-linear',
    path: '/subscription',
  },
  { label: 'Settings', icon: 'solar:settings-linear', path: '/settings' },
];

export const Sidebar = () => {
  const { user } = useAuthContext();
  const logoutMutation = useLogout();
  const { isOpen, close } = useSidebar();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={close}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:static top-0 left-0 h-full w-64 flex-col bg-white border-r-2 border-black z-40 transition-transform duration-300',
          'lg:flex',
          isOpen ? 'flex translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, transparent, transparent 10px, black 10px, black 20px)',
            }}
          />
        </div>

        {/* Brand */}
        <div className="h-16 flex items-center justify-between px-6 border-b-2 border-black bg-brand-neon/10 relative z-10">
          <BrandLogo size="md" to="/" />
          <button
            className="lg:hidden p-2 hover:bg-neutral-100 transition-colors"
            onClick={close}
            aria-label="Close sidebar"
          >
            <Icon icon="solar:close-circle-bold" className="text-2xl" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1 relative z-10">
          <NavSection title="Platform" items={platformItems} />
          <NavSection title="System" items={systemItems} className="mt-6" />
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t-2 border-black bg-brand-neon/5 relative z-10">
          <div className="flex items-center gap-3 p-3 bg-white border-2 border-black shadow-hard-sm hover:shadow-hard hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all duration-200 group">
            {user?.avatar_url ? (
              <img
                src={user.avatar_url}
                alt={user.fullname}
                className="w-10 h-10 border-2 border-black object-cover group-hover:scale-105 transition-transform"
              />
            ) : (
              <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-mono font-bold text-sm border-2 border-black group-hover:bg-brand-red transition-colors">
                {user?.fullname
                  ?.split(' ')
                  .slice(0, 2)
                  .map((name) => name.charAt(0).toUpperCase())
                  .join('') || 'U'}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">
                {user?.fullname || 'User'}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 bg-brand-neon border border-black"></div>
                <p className="text-[10px] text-neutral-600 font-mono truncate uppercase">
                  Pro Plan
                </p>
              </div>
            </div>
            <Button
              variant="secondary"
              onClick={handleLogout}
              className="p-2 hover:bg-brand-red hover:text-white"
              title="Logout"
            >
              <Icon icon="solar:logout-2-linear" className="text-lg" />
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};

interface NavSectionProps {
  title: string;
  items: NavItem[];
  className?: string;
}

const NavSection = ({ title, items, className }: NavSectionProps) => {
  const { close } = useSidebar();

  return (
    <div className={className}>
      <div className="px-3 mb-3 flex items-center gap-2">
        <div className="h-px flex-1 bg-black"></div>
        <span className="font-mono text-[9px] uppercase text-neutral-500 tracking-widest font-bold">
          {title}
        </span>
        <div className="h-px flex-1 bg-black"></div>
      </div>
      <div className="space-y-1.5">
        {items.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={close}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 relative group',
              'border-2 border-black bg-white',
              'hover:bg-brand-neon hover:shadow-hard-sm hover:-translate-y-0.5 hover:-translate-x-0.5',
              'active:shadow-[0_0_0_0_transparent]! active:translate-x-0.5! active:translate-y-0.5!',
              'transition-all duration-200 text-neutral-700 hover:text-black'
            )}
            activeProps={{
              className:
                'text-black border-black shadow-hard-sm bg-brand-neon font-bold [&>div:first-child]:bg-brand-red [&>svg:first-of-type]:scale-110 [&>svg:last-child]:opacity-100',
            }}
            inactiveProps={{
              className: '',
            }}
          >
            {/* Active indicator line */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent transition-colors"></div>
            <Icon icon={item.icon} className="text-xl transition-transform" />
            <span className="font-medium text-sm flex-1">{item.label}</span>
            <Icon
              icon="solar:alt-arrow-right-linear"
              className="text-sm opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
