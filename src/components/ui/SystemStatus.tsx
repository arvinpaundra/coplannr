import { Icon } from '@iconify/react';

interface SystemStatusProps {
  status?: 'operational' | 'degraded' | 'down';
  message?: string;
}

export const SystemStatus = ({
  status = 'operational',
  message = 'All Systems Normal',
}: SystemStatusProps) => {
  const statusColors = {
    operational: 'bg-brand-neon',
    degraded: 'bg-yellow-400',
    down: 'bg-brand-red',
  };

  return (
    <div className="hidden md:flex items-center gap-2 px-3 py-1 border border-neutral-200 bg-neutral-50 rounded-sm">
      <div className={`w-2 h-2 ${statusColors[status]} border border-black`} />
      <span className="font-mono text-xs uppercase tracking-tight text-neutral-600">
        {message}
      </span>
    </div>
  );
};
