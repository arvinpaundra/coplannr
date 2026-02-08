import type { HTMLAttributes, ReactNode } from 'react';
import { Icon } from '@iconify/react';
import { Badge } from '@/components/atoms/Badge';
import { cn } from '@/lib/utils';

export interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  badge?: string;
  icon?: string;
  action?: ReactNode;
}

export const SectionHeader = ({
  className,
  title,
  badge,
  icon,
  action,
  ...props
}: SectionHeaderProps) => {
  return (
    <div
      className={cn('flex justify-between items-center mb-2', className)}
      {...props}
    >
      <h2 className="font-bold uppercase text-sm flex items-center gap-2">
        {icon && <Icon icon={icon} className="text-lg" />}
        {title}
        {badge && (
          <Badge variant="neutral" size="sm" className="ml-2">
            {badge}
          </Badge>
        )}
      </h2>
      {action && <div>{action}</div>}
    </div>
  );
};
