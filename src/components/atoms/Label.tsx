import type { LabelHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          'block font-bold text-xs uppercase tracking-wide',
          className
        )}
        {...props}
      >
        {children}
        {required && <span className="text-brand-red ml-1">*</span>}
      </label>
    );
  }
);

Label.displayName = 'Label';
