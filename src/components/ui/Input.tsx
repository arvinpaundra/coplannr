import type { InputHTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          ref={ref}
          className={cn(
            'w-full px-4 py-3 text-sm font-mono',
            'border-hard bg-white outline-none',
            'transition-shadow duration-200',
            'focus:shadow-[4px_4px_0px_0px_#ccff00]',
            'placeholder:text-neutral-400',
            icon && 'pr-12',
            className
          )}
          {...props}
        />
        {icon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-neutral-400">
            {icon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
