import { Link } from '@tanstack/react-router';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';

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
  { label: 'Settings', icon: 'solar:settings-linear', path: '/settings' },
];

export const Sidebar = () => {
  return (
    <aside className="hidden lg:flex w-64 flex-col bg-[#fafafa] border-hard-r z-20">
      {/* Brand */}
      <div className="h-16 flex items-center px-6 border-hard-b bg-white">
        <div className="w-4 h-4 bg-brand-red border-2 border-black mr-3" />
        <span className="font-bold tracking-tight uppercase text-lg">
          COPLANNR.XYZ
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        <NavSection title="Platform" items={platformItems} />
        <NavSection title="System" items={systemItems} className="mt-8" />
      </nav>

      {/* User Profile */}
      <div className="p-4 border-hard-t bg-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-mono font-bold text-xs border-2 border-transparent">
            JS
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold truncate">John System</p>
            <p className="text-xs text-neutral-500 font-mono truncate">
              Pro Plan
            </p>
          </div>
          <Icon
            icon="solar:logout-2-linear"
            className="text-lg hover:text-brand-red cursor-pointer"
          />
        </div>
      </div>
    </aside>
  );
};

interface NavSectionProps {
  title: string;
  items: NavItem[];
  className?: string;
}

const NavSection = ({ title, items, className }: NavSectionProps) => {
  return (
    <div className={className}>
      <div className="px-2 mb-2">
        <span className="font-mono text-[10px] uppercase text-neutral-400 tracking-widest">
          {title}
        </span>
      </div>
      {items.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={cn(
            'flex items-center gap-3 px-3 py-2 mb-2 rounded-none',
            'text-neutral-600 border hover:bg-brand-neon hover:shadow-hard-sm',
            'active:shadow-[0_0_0_0_transparent]! active:translate-x-0.5! active:translate-y-0.5!',
            'transition-all duration-100'
          )}
          activeProps={{
            className: 'text-black border-black shadow-hard-sm bg-brand-neon',
          }}
          inactiveProps={{
            className: 'border-transparent hover:border-black',
          }}
        >
          <Icon icon={item.icon} className="text-xl" />
          <span className="font-medium text-sm">{item.label}</span>
        </Link>
      ))}
    </div>
  );
};
