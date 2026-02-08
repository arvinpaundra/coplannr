import type { HTMLAttributes } from 'react';
import { Icon } from '@iconify/react';
import { Link } from '@tanstack/react-router';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

export interface UpcomingEvent {
  id: string;
  time: string;
  title: string;
  platforms: string[];
}

export interface UpcomingEventsProps extends HTMLAttributes<HTMLDivElement> {
  events: UpcomingEvent[];
  maxItems?: number;
}

export const UpcomingEvents = ({
  className,
  events,
  maxItems = 5,
  ...props
}: UpcomingEventsProps) => {
  const displayEvents = events.slice(0, maxItems);

  return (
    <Card className={cn('p-4', className)} {...props}>
      <div className="flex justify-between items-center mb-4 border-b-2 border-black pb-2">
        <h3 className="font-bold uppercase text-sm">Upcoming</h3>
        <Icon icon="solar:calendar-mark-bold" className="text-lg" />
      </div>

      {displayEvents.length === 0 ? (
        <div className="text-center py-8">
          <Icon
            icon="solar:calendar-mark-linear"
            className="text-4xl text-neutral-300 mx-auto mb-2"
          />
          <p className="font-mono text-xs text-neutral-500">
            No upcoming posts
          </p>
          <Link
            to="/compose"
            className="font-mono text-xs text-brand-red hover:underline mt-2 inline-block"
          >
            Create one →
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-2 mb-4">
            {displayEvents.map((event, index) => (
              <div
                key={event.id}
                className="flex items-start gap-3 p-2 border border-transparent hover:border-black hover:bg-brand-neon/20 transition-all group"
              >
                {/* Timeline indicator */}
                <div className="flex flex-col items-center pt-1">
                  <div className="w-2 h-2 border-2 border-black bg-brand-neon" />
                  {index < displayEvents.length - 1 && (
                    <div className="w-0.5 h-6 bg-neutral-300 mt-1" />
                  )}
                </div>

                {/* Event content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-black">
                      {event.time}
                    </span>
                    <div className="flex gap-1">
                      {event.platforms.map((platform, i) => (
                        <div
                          key={i}
                          className="w-4 h-4 border border-black bg-white flex items-center justify-center"
                        >
                          <Icon icon={platform} className="text-[10px]" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="font-mono text-xs text-neutral-600 truncate group-hover:text-black transition-colors">
                    {event.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/calendar"
            className="block text-center font-mono text-xs text-neutral-500 hover:text-black border-t border-neutral-200 pt-3 hover:underline"
          >
            View All →
          </Link>
        </>
      )}
    </Card>
  );
};
