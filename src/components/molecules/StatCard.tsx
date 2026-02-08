import type { HTMLAttributes, ReactNode } from 'react';
import { Icon } from '@iconify/react';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

export interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  change?: {
    value: string;
    isPositive?: boolean;
  };
  icon?: string;
  variant?: 'default' | 'highlight' | 'danger';
  description?: string;
}

export const StatCard = ({
  className,
  label,
  value,
  change,
  icon,
  variant = 'default',
  description,
  ...props
}: StatCardProps) => {
  const variantStyles = {
    default: '',
    highlight: 'bg-[#fff0f0] border-brand-red! shadow-[2px_2px_0px_0px_#ff3333]!',
    danger: 'bg-[#fff5f5] border-brand-red',
  };

  return (
    <Card
      className={cn(
        'p-4 relative overflow-hidden group hover:shadow-[4px_4px_0px_0px_#000] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all duration-200 cursor-default',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black opacity-0 group-hover:opacity-20 transition-opacity"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black opacity-0 group-hover:opacity-20 transition-opacity"></div>

      {icon && (
        <div
          className={cn(
            'absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-25 transition-opacity duration-300',
            variant === 'danger' && 'text-brand-red'
          )}
        >
          <Icon icon={icon} className="text-6xl group-hover:scale-110 transition-transform duration-300" />
        </div>
      )}
      <div
        className={cn(
          'text-neutral-500 font-mono text-xs uppercase mb-1 group-hover:text-neutral-700 transition-colors',
          variant === 'danger' && 'text-brand-red'
        )}
      >
        {label}
      </div>
      <div
        className={cn(
          'text-4xl font-bold group-hover:scale-105 transition-transform duration-200 origin-left',
          variant === 'danger' && 'text-brand-red'
        )}
      >
        {value}
      </div>
      {change && (
        <div className="mt-2 text-xs font-mono">
          <span
            className={cn(
              'inline-block px-1',
              change.isPositive
                ? 'bg-brand-neon border border-black text-black'
                : 'bg-brand-red px-1 border border-black text-white'
            )}
          >
            {change.value}
          </span>
          {description && (
            <span className="text-neutral-400 ml-2">{description}</span>
          )}
        </div>
      )}
      {!change && description && (
        <div className="mt-2 text-xs font-mono text-neutral-400">
          {description}
        </div>
      )}
    </Card>
  );
};
