import { Icon } from '@iconify/react';
import { SystemStatus } from '../ui/SystemStatus';
import { NotificationBell } from '../ui/NotificationBell';
import { useSidebar } from '@/hooks/useSidebar';

interface HeaderProps {
  title: string;
  badge?: string;
}

export const Header = ({ title, badge }: HeaderProps) => {
  const { toggle } = useSidebar();

  return (
    <header className="h-16 border-hard-b bg-white flex justify-between items-center px-4 lg:px-8 z-10 shrink-0">
      <button
        className="lg:hidden mr-4 p-2 hover:bg-neutral-100 transition-colors"
        onClick={toggle}
        aria-label="Toggle sidebar"
      >
        <Icon icon="solar:hamburger-menu-linear" className="text-2xl" />
      </button>

      <div className="flex items-center gap-2 font-mono text-xs md:text-sm">
        <span className="text-neutral-400">HOME</span>
        <span className="text-neutral-300">/</span>
        <span className="font-bold">{title}</span>
        {badge && (
          <span className="px-2 py-0.5 bg-brand-neon border border-black text-[10px] font-bold uppercase ml-2 hidden sm:inline-block">
            {badge}
          </span>
        )}
      </div>

      <div className="flex items-center gap-4">
        <SystemStatus />
        <NotificationBell count={1} />
      </div>
    </header>
  );
};
