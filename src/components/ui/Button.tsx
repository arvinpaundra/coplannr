import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'action';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  shadow?: boolean;
}

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    'bg-black text-white hover:bg-brand-neon hover:text-black border-hard',
  secondary: 'bg-white text-black hover:bg-brand-neon border-hard',
  action: 'bg-white text-black hover:bg-brand-neon border-hard',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = 'primary', shadow = true, children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          'px-4 py-2 font-bold uppercase text-sm tracking-wide transition-all duration-100 cursor-pointer',
          shadow &&
            'shadow-hard-sm hover:shadow-hard active:shadow-[0_0_0_0_transparent]!',
          shadow && 'hover:-translate-x-0.5 hover:-translate-y-0.5',
          shadow && 'active:translate-x-0.5! active:translate-y-0.5!',
          buttonVariants[variant],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
