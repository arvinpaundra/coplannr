import type { HTMLAttributes } from 'react';
import { Link } from '@tanstack/react-router';
import { cn } from '@/lib/utils';

export type BrandLogoSize = 'sm' | 'md' | 'lg';
export type BrandLogoVariant = 'default' | 'minimal';

export interface BrandLogoProps extends HTMLAttributes<HTMLDivElement> {
  size?: BrandLogoSize;
  variant?: BrandLogoVariant;
  showText?: boolean;
  to?: string;
}

const sizeStyles: Record<BrandLogoSize, { box: string; text: string }> = {
  sm: { box: 'w-4 h-4', text: 'text-base' },
  md: { box: 'w-6 h-6', text: 'text-lg' },
  lg: { box: 'w-8 h-8', text: 'text-xl' },
};

export const BrandLogo = ({
  className,
  size = 'md',
  showText = true,
  to = '/',
  ...props
}: BrandLogoProps) => {
  const content = (
    <div className="flex items-center gap-3">
      <div className="relative">
        <div
          className={cn(
            'bg-brand-red border-2 border-black shadow-hard-sm flex items-center justify-center text-white font-bold',
            sizeStyles[size].box
          )}
        >
          {size !== 'sm' && 'C'}
        </div>
        {size !== 'sm' && (
          <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-brand-neon border border-black"></div>
        )}
      </div>
      {showText && (
        <div className="flex flex-col">
          <span
            className={cn(
              'font-bold tracking-tight uppercase leading-tight',
              sizeStyles[size].text
            )}
          >
            COPLANNR
          </span>
          <span className="font-mono text-[8px] text-neutral-500 uppercase tracking-widest">
            .XYZ
          </span>
        </div>
      )}
    </div>
  );

  if (to) {
    return (
      <Link to={to} className={cn('flex items-center', className)}>
        {content}
      </Link>
    );
  }

  return (
    <div className={cn('flex items-center', className)} {...props}>
      {content}
    </div>
  );
};
