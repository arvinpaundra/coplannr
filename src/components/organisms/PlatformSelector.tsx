import type { HTMLAttributes } from 'react';
import { PlatformBadge } from '@/components/molecules/PlatformBadge';
import { Alert } from '@/components/molecules/Alert';
import { EmptyState } from '@/components/atoms/EmptyState';
import type { Platform } from '@/types/api';
import { cn } from '@/lib/utils';

export interface PlatformSelectorProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onToggle'> {
  platforms: Platform[];
  selected: string[];
  onToggle: (platformId: string) => void;
  isLoading?: boolean;
  error?: string | null;
}

export const PlatformSelector = ({
  className,
  platforms,
  selected,
  onToggle,
  isLoading = false,
  error = null,
  ...props
}: PlatformSelectorProps) => {
  if (error) {
    return <Alert variant="error" message={error} />;
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-full p-3 border-2 border-black bg-neutral-100 animate-pulse"
          >
            <div className="h-4 bg-neutral-300 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (platforms.length === 0) {
    return (
      <EmptyState
        icon="solar:link-circle-linear"
        title="No platforms available"
        description="Connect platforms in Settings to get started"
      />
    );
  }

  return (
    <div
      className={cn('grid grid-cols-2 md:grid-cols-3 gap-2 py-2', className)}
      {...props}
    >
      {platforms.map((platform) => (
        <label key={platform.id} className="cursor-pointer">
          <input
            type="checkbox"
            className="hidden"
            checked={selected.includes(platform.id)}
            onChange={() => onToggle(platform.id)}
          />
          <PlatformBadge
            platform={platform.name}
            icon={platform.icon}
            selected={selected.includes(platform.id)}
            onClick={() => onToggle(platform.id)}
            size="md"
            className="w-full"
          />
        </label>
      ))}
    </div>
  );
};
