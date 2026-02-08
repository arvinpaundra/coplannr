import type { HTMLAttributes } from 'react';
import { StatCard } from '@/components/molecules/StatCard';
import { cn } from '@/lib/utils';

export interface StatData {
  label: string;
  value: string | number;
  change?: {
    value: string;
    isPositive?: boolean;
  };
  icon?: string;
  variant?: 'default' | 'highlight' | 'danger';
  description?: string;
}

export interface StatsGridProps extends HTMLAttributes<HTMLDivElement> {
  stats: StatData[];
  columns?: 1 | 2 | 3 | 4;
}

export const StatsGrid = ({
  className,
  stats,
  columns = 4,
  ...props
}: StatsGridProps) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div
      className={cn('grid gap-4', gridCols[columns], className)}
      {...props}
    >
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};
