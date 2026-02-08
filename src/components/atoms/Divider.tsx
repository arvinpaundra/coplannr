import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  text?: string;
  orientation?: 'horizontal' | 'vertical';
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  ({ className, text, orientation = 'horizontal', ...props }, ref) => {
    if (orientation === 'vertical') {
      return (
        <div
          ref={ref}
          className={cn('w-px bg-neutral-300', className)}
          {...props}
        />
      );
    }

    return (
      <div ref={ref} className={cn('relative', className)} {...props}>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-neutral-300" />
        </div>
        {text && (
          <div className="relative flex justify-center text-xs uppercase font-mono">
            <span className="bg-white px-2 text-neutral-400">{text}</span>
          </div>
        )}
      </div>
    );
  }
);

Divider.displayName = 'Divider';
