import type { HTMLAttributes } from 'react';
import { Icon } from '@iconify/react';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

export interface PostQueueItemData {
  id: string;
  title: string;
  subtitle: string;
  platforms: string[];
  time: string;
  status: 'ongoing' | 'failed' | 'upcoming' | 'queued' | 'scheduled' | 'error';
  error?: boolean;
  progress?: number;
  retryCount?: number;
}

export interface PostQueueItemProps extends HTMLAttributes<HTMLDivElement> {
  post: PostQueueItemData;
  onEdit?: () => void;
  onDelete?: () => void;
}

const statusColors: Record<string, string> = {
  ongoing: 'bg-blue-400',
  failed: 'bg-brand-red',
  upcoming: 'bg-brand-neon',
  queued: 'bg-brand-neon',
  scheduled: 'bg-neutral-300',
  error: 'bg-brand-red',
};

export const PostQueueItem = ({
  className,
  post,
  onEdit,
  onDelete,
  ...props
}: PostQueueItemProps) => {
  const isFailed = post.status === 'failed' || post.error;
  const isOngoing = post.status === 'ongoing';
  const isUpcoming = post.status === 'upcoming';

  // Special rendering for upcoming posts
  if (isUpcoming) {
    return (
      <Card
        shadow={false}
        className={cn(
          'p-5 group relative hover:shadow-hard-sm transition-all bg-white border-2 border-black',
          className
        )}
        {...props}
      >
        <div className="space-y-4">
          {/* Header: Title and Status Indicator */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-black border border-black flex-shrink-0"></div>
                <span className="font-mono text-[10px] uppercase text-neutral-500 tracking-wider">
                  Scheduled
                </span>
              </div>
              <h3 className="font-bold text-base leading-tight mb-1">
                {post.title}
              </h3>
              <p className="font-mono text-xs text-neutral-600">
                {post.subtitle}
              </p>
            </div>
            {(onEdit || onDelete) && (
              <div className="flex gap-1 flex-shrink-0">
                {onEdit && (
                  <button
                    className="p-1.5 border border-black bg-white hover:bg-black hover:text-white transition-colors"
                    onClick={onEdit}
                    title="Edit post"
                  >
                    <Icon icon="solar:pen-linear" className="text-sm" />
                  </button>
                )}
                {onDelete && (
                  <button
                    className="p-1.5 border border-black bg-white hover:bg-black hover:text-white transition-colors"
                    onClick={onDelete}
                    title="Delete post"
                  >
                    <Icon icon="solar:trash-bin-linear" className="text-sm" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Info Grid: Platforms, Time, and Details */}
          <div className="grid grid-cols-12 gap-4 pt-3 border-t-2 border-dashed border-neutral-200">
            {/* Platforms */}
            <div className="col-span-12 md:col-span-6">
              <div className="flex items-center gap-2 mb-2">
                <Icon icon="solar:link-circle-linear" className="text-sm text-neutral-500" />
                <span className="font-mono text-[10px] uppercase text-neutral-500">
                  Platforms
                </span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {post.platforms.map((icon, j) => (
                  <div
                    key={j}
                    className="w-8 h-8 border-2 border-black bg-white flex items-center justify-center"
                  >
                    <Icon icon={icon} className="text-base" />
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule Time */}
            <div className="col-span-12 md:col-span-6">
              <div className="flex items-center gap-2 mb-2">
                <Icon icon="solar:clock-circle-linear" className="text-sm text-neutral-500" />
                <span className="font-mono text-[10px] uppercase text-neutral-500">
                  Publish Time
                </span>
              </div>
              <div className="font-mono text-sm font-bold">
                {post.time}
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Original rendering for other statuses
  return (
    <Card
      shadow={false}
      className={cn(
        'p-4 group relative hover:shadow-hard-sm transition-all',
        isFailed && 'bg-[#fff5f5] border-brand-red',
        isOngoing && 'bg-blue-50 border-blue-400',
        className
      )}
      {...props}
    >
      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="col-span-1">
          <div
            className={cn(
              'w-3 h-3 border-2 border-black',
              statusColors[post.status]
            )}
          />
        </div>
        <div className="col-span-6">
          <p
            className={cn(
              'font-bold text-sm truncate pr-4',
              isFailed && 'text-brand-red',
              isOngoing && 'text-blue-700'
            )}
          >
            {post.title}
          </p>
          <p
            className={cn(
              'font-mono text-xs mt-1 truncate',
              isFailed ? 'text-brand-red' : 'text-neutral-500'
            )}
          >
            {post.subtitle}
          </p>
          {/* Progress bar for ongoing posts */}
          {isOngoing && post.progress !== undefined && (
            <div className="mt-2 w-full bg-neutral-200 h-1 border border-black">
              <div
                className="bg-blue-400 h-full"
                style={{ width: `${post.progress}%` }}
              />
            </div>
          )}
          {/* Retry count for failed posts */}
          {isFailed && post.retryCount !== undefined && (
            <div className="mt-1 font-mono text-[10px] text-brand-red">
              Retry: {post.retryCount}/3
            </div>
          )}
        </div>
        <div className="col-span-3 flex gap-1">
          {post.platforms.map((icon, j) => (
            <div
              key={j}
              className={cn(
                'w-6 h-6 border-2 border-black flex items-center justify-center text-xs',
                isFailed
                  ? 'bg-white text-brand-red'
                  : isOngoing
                    ? 'bg-blue-100'
                    : 'bg-neutral-100'
              )}
            >
              <Icon icon={icon} />
            </div>
          ))}
        </div>
        <div className="col-span-2 text-right">
          {isFailed ? (
            <button className="font-mono text-[10px] uppercase border-2 border-brand-red text-brand-red px-2 py-1 hover:bg-brand-red hover:text-white transition-colors">
              {post.time}
            </button>
          ) : isOngoing ? (
            <div className="flex flex-col items-end gap-1">
              <span className="font-mono text-xs font-bold text-blue-700">
                {post.time}
              </span>
              {post.progress !== undefined && (
                <span className="font-mono text-[10px] text-blue-600">
                  {post.progress}%
                </span>
              )}
            </div>
          ) : (
            <span
              className={cn(
                'font-mono text-xs',
                post.time.includes(':') || post.time.includes('AM') || post.time.includes('PM')
                  ? 'font-bold'
                  : 'text-neutral-400'
              )}
            >
              {post.time}
            </span>
          )}
        </div>
      </div>
      {!isFailed && (onEdit || onDelete) && (
        <div className="absolute right-2 top-2 hidden group-hover:flex gap-1">
          {onEdit && (
            <button
              className="p-1 border border-black bg-white hover:bg-brand-neon cursor-pointer"
              onClick={onEdit}
            >
              <Icon icon="solar:pen-linear" />
            </button>
          )}
          {onDelete && (
            <button
              className="p-1 border border-black bg-white hover:bg-brand-red hover:text-white"
              onClick={onDelete}
            >
              <Icon icon="solar:trash-bin-linear" />
            </button>
          )}
        </div>
      )}
    </Card>
  );
};
