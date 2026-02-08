import type { HTMLAttributes } from 'react';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';

export type AlertVariant = 'error' | 'success' | 'info' | 'warning';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  message: string;
  icon?: string;
}

const alertVariants: Record<AlertVariant, string> = {
  error: 'bg-red-50 border-red-500 text-red-700',
  success: 'bg-green-50 border-green-500 text-green-700',
  info: 'bg-blue-50 border-blue-500 text-blue-700',
  warning: 'bg-yellow-50 border-yellow-500 text-yellow-700',
};

const defaultIcons: Record<AlertVariant, string> = {
  error: 'solar:danger-triangle-bold',
  success: 'solar:check-circle-bold',
  info: 'solar:info-circle-bold',
  warning: 'solar:danger-triangle-bold',
};

export const Alert = ({
  className,
  variant = 'error',
  message,
  icon,
  ...props
}: AlertProps) => {
  return (
    <div
      className={cn(
        'border-2 p-3 text-xs',
        alertVariants[variant],
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <Icon icon={icon || defaultIcons[variant]} className="text-base" />
        <span className="font-bold">{message}</span>
      </div>
    </div>
  );
};
