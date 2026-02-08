import type { HTMLAttributes } from 'react';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';

export interface ActivityLogData {
  time: string;
  icon: string;
  title: string;
  description: string;
  status: string;
  statusColor?: string;
  iconColor?: string;
  titleColor?: string;
  progress?: number;
  isAnimated?: boolean;
}

export interface ActivityLogItemProps extends HTMLAttributes<HTMLDivElement> {
  log: ActivityLogData;
}

export const ActivityLogItem = ({
  className,
  log,
  ...props
}: ActivityLogItemProps) => {
  return (
    <div
      className={cn(
        'py-3 flex items-start gap-4 hover:bg-neutral-50 border-b border-neutral-100 last:border-b-0',
        className
      )}
      {...props}
    >
      <div className="w-16 font-mono text-[10px] text-neutral-400 pt-1">
        {log.time}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <Icon
            icon={log.icon}
            className={cn(
              'text-lg',
              log.isAnimated && 'animate-spin',
              log.iconColor
            )}
          />
          <span
            className={cn('text-xs font-bold', log.titleColor || 'text-black')}
          >
            {log.title}
          </span>
        </div>
        <p className="text-xs text-neutral-600 mt-1 pl-7">{log.description}</p>
        {log.progress !== undefined && (
          <div className="w-48 h-1 bg-neutral-200 mt-2 ml-7 overflow-hidden">
            <div
              className="h-full bg-black transition-all duration-300"
              style={{ width: `${log.progress}%` }}
            />
          </div>
        )}
      </div>
      {log.status && (
        <div
          className={cn(
            'text-[10px] font-mono border px-2 py-0.5',
            log.statusColor || 'border-neutral-200 text-neutral-400'
          )}
        >
          {log.status}
        </div>
      )}
    </div>
  );
};
