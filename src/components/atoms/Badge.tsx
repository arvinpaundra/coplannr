import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export type BadgeVariant = 'default' | 'neon' | 'red' | 'black' | 'neutral';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

const badgeVariants: Record<BadgeVariant, string> = {
  default: 'bg-white text-black border-black',
  neon: 'bg-brand-neon text-black border-black',
  red: 'bg-brand-red text-white border-black',
  black: 'bg-black text-white border-black',
  neutral: 'bg-neutral-100 text-neutral-600 border-neutral-300',
};

const badgeSizes: Record<BadgeSize, string> = {
  sm: 'text-[10px] px-1.5 py-0.5',
  md: 'text-xs px-2 py-1',
  lg: 'text-sm px-3 py-1.5',
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center font-mono font-bold uppercase tracking-widest border-2',
          badgeVariants[variant],
          badgeSizes[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
