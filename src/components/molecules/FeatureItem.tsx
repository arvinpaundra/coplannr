import type { HTMLAttributes } from 'react';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';

export interface FeatureItemProps extends HTMLAttributes<HTMLLIElement> {
  icon: string;
  title: string;
  description?: string;
  variant?: 'default' | 'negative';
}

export const FeatureItem = ({
  className,
  icon,
  title,
  description,
  variant = 'default',
  ...props
}: FeatureItemProps) => {
  return (
    <li
      className={cn('flex items-start gap-3', className)}
      {...props}
    >
      <Icon
        icon={icon}
        className={cn(
          'text-2xl mt-1',
          variant === 'negative' ? 'text-black' : 'text-black'
        )}
      />
      <span>{title}</span>
      {description && (
        <span className="text-neutral-600 text-sm ml-2">{description}</span>
      )}
    </li>
  );
};
