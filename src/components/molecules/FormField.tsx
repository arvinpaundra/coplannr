import type { HTMLAttributes, ReactNode } from 'react';
import { Label } from '@/components/atoms/Label';
import { cn } from '@/lib/utils';

export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  error?: string;
  required?: boolean;
  htmlFor?: string;
  children: ReactNode;
}

export const FormField = ({
  className,
  label,
  error,
  required,
  htmlFor,
  children,
  ...props
}: FormFieldProps) => {
  return (
    <div className={cn('space-y-1', className)} {...props}>
      {label && (
        <Label htmlFor={htmlFor} required={required}>
          {label}
        </Label>
      )}
      {children}
      {error && (
        <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};
