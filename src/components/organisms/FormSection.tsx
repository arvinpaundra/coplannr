import type { HTMLAttributes, ReactNode } from 'react';
import { Icon } from '@iconify/react';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

export interface FormSectionProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  icon?: string;
  children: ReactNode;
}

export const FormSection = ({
  className,
  title,
  icon,
  children,
  ...props
}: FormSectionProps) => {
  return (
    <Card className={cn('p-6', className)} {...props}>
      <h2 className="font-bold uppercase text-lg mb-4 flex items-center gap-2">
        {icon && <Icon icon={icon} className="text-lg" />}
        {title}
      </h2>
      {children}
    </Card>
  );
};
