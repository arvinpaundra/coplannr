import type { HTMLAttributes, ReactNode } from 'react';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  icon?: string;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState = ({
  className,
  icon = 'solar:file-text-linear',
  title,
  description,
  action,
  ...props
}: EmptyStateProps) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center',
        className
      )}
      {...props}
    >
      <Icon className="text-6xl text-neutral-300 mb-2" icon={icon} />
      <p className="font-mono text-sm text-neutral-400 uppercase">{title}</p>
      {description && (
        <p className="font-mono text-xs text-neutral-500 mt-2 max-w-md">
          {description}
        </p>
      )}
      {action && (
        <div className="mt-4">
          <Button onClick={action.onClick} variant="secondary">
            {action.label}
          </Button>
        </div>
      )}
    </div>
  );
};
