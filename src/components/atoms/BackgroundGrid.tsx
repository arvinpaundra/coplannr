import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface BackgroundGridProps extends HTMLAttributes<HTMLDivElement> {
  opacity?: number;
  size?: number;
}

export const BackgroundGrid = ({
  className,
  opacity = 0.2,
  size = 20,
  ...props
}: BackgroundGridProps) => {
  return (
    <div
      className={cn(
        'absolute inset-0 z-0 pointer-events-none',
        className
      )}
      style={{
        backgroundImage: 'radial-gradient(#aaa 1px, transparent 1px)',
        backgroundSize: `${size}px ${size}px`,
        opacity,
      }}
      {...props}
    />
  );
};
