import type { HTMLAttributes } from 'react';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';

export type SpinnerSize = 'sm' | 'md' | 'lg';
export type SpinnerVariant = 'default' | 'neon' | 'red';

export interface LoadingSpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
}

const spinnerSizes: Record<SpinnerSize, string> = {
  sm: 'text-base',
  md: 'text-lg',
  lg: 'text-xl',
};

const spinnerVariants: Record<SpinnerVariant, string> = {
  default: 'text-black',
  neon: 'text-brand-neon',
  red: 'text-brand-red',
};

export const LoadingSpinner = ({
  className,
  size = 'md',
  variant = 'default',
  ...props
}: LoadingSpinnerProps) => {
  return (
    <div
      className={cn('inline-flex items-center justify-center', className)}
      {...props}
    >
      <Icon
        icon="svg-spinners:ring-resize"
        className={cn(spinnerSizes[size], spinnerVariants[variant])}
      />
    </div>
  );
};
