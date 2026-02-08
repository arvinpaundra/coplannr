import type { HTMLAttributes } from 'react';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';

export interface PlatformBadgeProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  platform: string;
  icon: string;
  selected?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
  sm: 'w-6 h-6 text-xs',
  md: 'w-8 h-8 text-sm',
  lg: 'w-12 h-12 text-lg',
};

export const PlatformBadge = ({
  className,
  platform,
  icon,
  selected = false,
  onClick,
  size = 'md',
  ...props
}: PlatformBadgeProps) => {
  const baseClassName = cn(
    'flex items-center justify-center gap-2 border-2 py-4 border-black transition-all duration-200 relative group',
    selected
      ? 'bg-black text-white shadow-hard-sm -translate-px font-bold hover:bg-brand-red hover:shadow-hard'
      : 'bg-white hover:bg-brand-red hover:text-white hover:shadow-hard-sm hover:-translate-y-0.5 hover:-translate-x-0.5',
    onClick && 'cursor-pointer',
    sizeStyles[size],
    className
  );

  if (onClick) {
    return (
      <button className={baseClassName} onClick={onClick} type="button">
        {selected && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-brand-neon border-2 border-black flex items-center justify-center">
            <Icon
              icon="solar:check-circle-bold"
              className="text-[10px] text-black"
            />
          </div>
        )}
        <Icon
          icon={icon}
          className={cn(
            'transition-transform duration-200',
            selected ? 'group-hover:scale-110' : 'group-hover:scale-105'
          )}
        />
        {size !== 'sm' && <span className="font-mono text-xs">{platform}</span>}
      </button>
    );
  }

  return (
    <div className={baseClassName} {...props}>
      {selected && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-brand-neon border-2 border-black flex items-center justify-center">
          <Icon
            icon="solar:check-circle-bold"
            className="text-[10px] text-black"
          />
        </div>
      )}
      <Icon
        icon={icon}
        className={cn(
          'transition-transform duration-200',
          selected ? 'group-hover:scale-110' : 'group-hover:scale-105'
        )}
      />
      {size !== 'sm' && <span className="font-mono text-xs">{platform}</span>}
    </div>
  );
};
