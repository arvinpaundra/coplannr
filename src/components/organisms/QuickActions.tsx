import type { HTMLAttributes } from 'react';
import { Icon } from '@iconify/react';
import { Link } from '@tanstack/react-router';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

export interface QuickAction {
  label: string;
  icon: string;
  path: string;
  shortcut?: string;
  stat?: string;
  description?: string;
}

export interface QuickActionsProps extends HTMLAttributes<HTMLDivElement> {
  actions: QuickAction[];
}

export const QuickActions = ({
  className,
  actions,
  ...props
}: QuickActionsProps) => {
  return (
    <Card className={cn('p-4', className)} {...props}>
      <div className="flex justify-between items-center mb-4 border-b-2 border-black pb-2">
        <h3 className="font-bold uppercase text-sm">Quick Actions</h3>
        <Icon icon="solar:bolt-linear" className="text-lg" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Link
            key={action.path}
            to={action.path}
            className="group relative"
          >
            <div className="p-3 border-2 border-black bg-white hover:bg-brand-neon hover:shadow-[4px_4px_0px_0px_#000] transition-all duration-200 hover:-translate-y-0.5 hover:-translate-x-0.5">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 border-2 border-black bg-black text-white flex items-center justify-center group-hover:bg-brand-red transition-colors">
                  <Icon icon={action.icon} className="text-xl" />
                </div>
                <div>
                  <p className="font-bold text-xs uppercase">{action.label}</p>
                  {action.stat && (
                    <p className="font-mono text-[10px] text-neutral-500 mt-0.5">
                      {action.stat}
                    </p>
                  )}
                </div>
                {action.shortcut && (
                  <kbd className="absolute top-1 right-1 px-1.5 py-0.5 bg-neutral-100 border border-black text-[8px] font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                    {action.shortcut}
                  </kbd>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  );
};
