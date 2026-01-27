import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <label className="flex items-center gap-3 cursor-pointer group">
        <div className="relative w-5 h-5 shrink-0">
          <input
            ref={ref}
            type="checkbox"
            className={cn(
              'peer appearance-none w-5 h-5 border-2 border-black bg-white',
              'checked:bg-brand-neon transition-colors cursor-pointer',
              className
            )}
            {...props}
          />
          <svg
            className="absolute inset-0 m-auto w-3 h-3 opacity-0 peer-checked:opacity-100 pointer-events-none"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M2 6L5 9L10 3"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {label && <span className="text-sm">{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
