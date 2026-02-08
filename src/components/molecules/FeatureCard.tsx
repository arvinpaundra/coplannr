import type { HTMLAttributes } from 'react';
import { Icon } from '@iconify/react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/atoms/Badge';
import { cn } from '@/lib/utils';

export interface FeatureCardProps extends HTMLAttributes<HTMLDivElement> {
  icon: string;
  title: string;
  description: string;
  isHighlighted?: boolean;
  badge?: string;
}

export const FeatureCard = ({
  className,
  icon,
  title,
  description,
  isHighlighted = false,
  badge,
  ...props
}: FeatureCardProps) => {
  return (
    <Card
      className={cn(
        'p-6 md:p-8 relative group',
        isHighlighted && 'bg-brand-neon border-dashed',
        className
      )}
      {...props}
    >
      {badge && (
        <div className="absolute -top-2 -right-2 rotate-12 z-10">
          <Badge variant="red" size="sm" className="uppercase shadow-hard">
            {badge}
          </Badge>
        </div>
      )}

      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black opacity-0 group-hover:opacity-20 transition-opacity"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black opacity-0 group-hover:opacity-20 transition-opacity"></div>

      {/* Icon with background */}
      <div className="mb-6 relative">
        <div className="w-16 h-16 bg-brand-red/10 border-2 border-brand-red/20 flex items-center justify-center group-hover:bg-brand-red/20 group-hover:border-brand-red/40 transition-all duration-300">
          <Icon
            icon={icon}
            className="text-3xl text-brand-red group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      </div>

      <h3 className="font-bold text-xl mb-3 uppercase tracking-tight group-hover:text-brand-red transition-colors">
        {title}
      </h3>
      <p className="font-mono text-sm text-neutral-600 leading-relaxed group-hover:text-neutral-800 transition-colors">
        {description}
      </p>

      {/* Bottom accent line on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </Card>
  );
};
