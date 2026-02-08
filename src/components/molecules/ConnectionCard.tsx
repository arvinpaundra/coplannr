import type { HTMLAttributes } from 'react';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

export interface ConnectionPlatform {
  name: string;
  icon: string;
  handle: string;
  status: 'connected' | 'disconnected';
  lastSync?: string | null;
  stats?: {
    postsThisWeek?: number;
    successRate?: number;
  };
}

export interface ConnectionCardProps extends HTMLAttributes<HTMLDivElement> {
  platform: ConnectionPlatform;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onSync?: () => void;
}

export const ConnectionCard = ({
  className,
  platform,
  onConnect,
  onDisconnect,
  onSync,
  ...props
}: ConnectionCardProps) => {
  const isConnected = platform.status === 'connected';

  return (
    <Card
      className={cn(
        'p-6 relative overflow-hidden group',
        isConnected
          ? 'bg-white border-2 border-black'
          : 'bg-neutral-50 border-2 border-dashed border-neutral-300',
        className
      )}
      {...props}
    >
      {/* Decorative corner element */}
      {isConnected && (
        <div className="absolute top-0 right-0 w-16 h-16 border-l-2 border-b-2 border-black bg-blue-50 opacity-40 group-hover:opacity-60 transition-opacity z-0"></div>
      )}

      {/* Status indicator */}
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'w-14 h-14 border-2 border-black flex items-center justify-center transition-all group-hover:scale-105 bg-white'
            )}
          >
            <Icon icon={platform.icon} className="text-2xl text-black" />
          </div>
          <div>
            <h3 className="font-bold text-lg uppercase tracking-tight">
              {platform.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              {isConnected ? (
                <>
                  <div className="w-2 h-2 bg-black border border-black"></div>
                  <p className="font-mono text-xs text-neutral-600">
                    {platform.handle}
                  </p>
                </>
              ) : (
                <p className="font-mono text-xs text-neutral-400">
                  {platform.handle}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Status badge */}
        <div
          className={cn(
            'px-3 py-1 border-2 border-black font-mono text-[10px] uppercase font-bold',
            isConnected
              ? 'bg-brand-neon text-black'
              : 'bg-white text-neutral-400 border-dashed'
          )}
        >
          {isConnected ? 'Active' : 'Inactive'}
        </div>
      </div>

      {/* Connection details */}
      {isConnected ? (
        <>
          {platform.lastSync && (
            <div className="mb-4 pb-4 border-b-2 border-dashed border-neutral-200">
              <div className="flex items-center gap-2">
                <Icon icon="solar:refresh-circle-linear" className="text-sm" />
                <span className="font-mono text-xs text-neutral-600">
                  Last synced: {platform.lastSync}
                </span>
              </div>
            </div>
          )}

          {/* Stats */}
          {platform.stats && (
            <div className="grid grid-cols-2 gap-4 mb-4">
              {platform.stats.postsThisWeek !== undefined && (
                <div className="border-2 border-black p-3 bg-brand-neon/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-8 h-8 bg-brand-neon opacity-40"></div>
                  <div className="font-mono text-[10px] uppercase text-neutral-600 mb-1 relative z-10">
                    Posts This Week
                  </div>
                  <div className="text-2xl font-bold relative z-10">
                    {platform.stats.postsThisWeek}
                  </div>
                </div>
              )}
              {platform.stats.successRate !== undefined && (
                <div className="border-2 border-black p-3 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-8 h-8 bg-black opacity-5"></div>
                  <div className="font-mono text-[10px] uppercase text-neutral-600 mb-1 relative z-10">
                    Success Rate
                  </div>
                  <div className="text-2xl font-bold relative z-10">
                    {platform.stats.successRate}%
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 items-stretch">
            {onSync && (
              <Button
                variant="secondary"
                className="flex-1 px-4 py-2.5 text-xs flex items-center justify-center gap-1.5 border-2 border-black bg-brand-neon text-black hover:bg-brand-neon/80 transition-colors"
                onClick={onSync}
              >
                <Icon icon="solar:refresh-linear" className="text-sm" />
                <span>Sync Now</span>
              </Button>
            )}
            {onDisconnect && (
              <Button
                variant="secondary"
                className="px-4 py-2.5 text-xs border-2 border-black hover:bg-brand-red hover:text-white hover:border-brand-red transition-colors flex items-center justify-center"
                onClick={onDisconnect}
              >
                Disconnect
              </Button>
            )}
          </div>
        </>
      ) : (
        <div className="space-y-4">
          <p className="font-mono text-xs text-neutral-500 leading-relaxed">
            Connect this platform to start scheduling and publishing content
            automatically.
          </p>
          {onConnect && (
            <Button
              variant="primary"
              className="w-full py-3 text-sm flex items-center justify-center gap-2"
              onClick={onConnect}
            >
              <Icon icon="solar:link-circle-linear" className="text-base" />
              <span>Connect Platform</span>
            </Button>
          )}
        </div>
      )}
    </Card>
  );
};
