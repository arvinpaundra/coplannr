import type { HTMLAttributes } from 'react';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';
import type { CalendarEvent, CalendarDay } from '@/pages/CalendarPage';

export interface CalendarDayCellProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    'onDragOver' | 'onDrop' | 'onDragStart' | 'onDragEnd'
  > {
  day: CalendarDay;
  draggedEvent?: CalendarEvent | null;
  dragOverDate?: string | null;
  onDragStart?: (event: CalendarEvent) => void;
  onDragOver?: (e: React.DragEvent, dateString: string) => void;
  onDragLeave?: () => void;
  onDrop?: (e: React.DragEvent, dateString: string) => void;
  onDragEnd?: () => void;
  isDateInPast?: (dateString: string) => boolean;
  isLastColumn?: boolean;
  isLastRow?: boolean;
}

export const CalendarDayCell = ({
  className,
  day,
  draggedEvent,
  dragOverDate,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  onDragEnd,
  isDateInPast,
  isLastColumn = false,
  isLastRow = false,
  ...props
}: CalendarDayCellProps) => {
  const isDragOver = dragOverDate === day.fullDate;
  const isPast = day.isPast || (day.fullDate && isDateInPast?.(day.fullDate));
  const canDrop = !isPast && draggedEvent?.status === 'scheduled';

  return (
    <div
      className={cn(
        'bg-white min-h-[140px] p-2 relative transition-all',
        !isLastColumn && 'border-r-2 border-black',
        !isLastRow && 'border-b-2 border-black',
        isPast && 'bg-neutral-50 opacity-60',
        day.isToday && 'bg-brand-neon/10',
        isDragOver && canDrop && 'bg-brand-neon/30',
        isDragOver && !canDrop && 'bg-red-50',
        className
      )}
      onDragOver={(e) => day.fullDate && onDragOver?.(e, day.fullDate)}
      onDragLeave={onDragLeave}
      onDrop={(e) => day.fullDate && onDrop?.(e, day.fullDate)}
      {...props}
    >
      {/* Date Header */}
      <div className="flex items-center justify-between mb-2 pb-1 border-b border-dashed border-neutral-200">
        <span
          className={cn(
            'font-mono text-sm font-bold',
            day.isPreviousMonth
              ? 'text-neutral-400'
              : day.isToday
              ? 'text-black'
              : 'text-black'
          )}
        >
          {day.date}
        </span>
        {day.isToday && (
          <span className="font-mono text-[10px] uppercase text-neutral-600">
            Today
          </span>
        )}
        {day.month && day.date === 1 && (
          <span className="font-mono text-[10px] uppercase text-neutral-500">
            {day.month}
          </span>
        )}
      </div>

      {/* Events List */}
      <div className="space-y-1.5">
        {day.events.map((event) => {
          const isDragging = draggedEvent?.id === event.id;
          const isDraggable = event.status === 'scheduled' && !isPast;

          return (
            <div
              key={event.id}
              draggable={isDraggable}
              onDragStart={() => onDragStart?.(event)}
              onDragEnd={onDragEnd}
              className={cn(
                'border-2 border-black p-2 text-[11px] transition-all cursor-pointer',
                isDragging && 'opacity-50',
                isDraggable && 'hover:shadow-hard-sm hover:-translate-y-0.5',
                event.status === 'posted'
                  ? 'bg-black text-white'
                  : event.status === 'scheduled'
                  ? 'bg-brand-neon text-black'
                  : 'bg-white border-dashed text-neutral-600',
                !isDraggable && 'cursor-default'
              )}
            >
              {/* Event Header: Time and Platforms */}
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1">
                  {event.platforms.map((icon, idx) => (
                    <Icon
                      key={idx}
                      icon={icon}
                      className={cn(
                        'text-sm',
                        event.status === 'posted' ? 'opacity-80' : ''
                      )}
                    />
                  ))}
                </div>
                {event.time ? (
                  <span className="font-mono text-[10px] font-bold">
                    {event.time}
                  </span>
                ) : event.status === 'draft' ? (
                  <span className="font-mono text-[10px] uppercase">Draft</span>
                ) : (
                  <Icon icon="solar:check-read-linear" className="text-xs" />
                )}
              </div>

              {/* Event Title */}
              <p
                className={cn(
                  'truncate leading-tight font-medium',
                  event.status === 'posted' ? 'opacity-90' : ''
                )}
              >
                {event.title}
              </p>

              {/* Drag indicator for scheduled posts */}
              {isDraggable && (
                <div className="mt-1 flex items-center gap-1">
                  <Icon
                    icon="solar:hand-stars-linear"
                    className="text-[10px] text-neutral-500"
                  />
                  <span className="font-mono text-[9px] text-neutral-500">
                    Drag to reschedule
                  </span>
                </div>
              )}
            </div>
          );
        })}

        {/* Drop Zone Indicator */}
        {isDragOver && canDrop && day.events.length === 0 && (
          <div className="border-2 border-dashed border-brand-neon bg-brand-neon/20 p-3 text-center">
            <Icon
              icon="solar:calendar-add-linear"
              className="text-2xl text-brand-neon mx-auto mb-1"
            />
            <p className="font-mono text-[10px] text-neutral-600">Drop here</p>
          </div>
        )}

        {/* Invalid Drop Indicator */}
        {isDragOver && !canDrop && (
          <div className="border-2 border-dashed border-brand-red bg-red-50 p-2 text-center">
            <Icon
              icon="solar:close-circle-bold"
              className="text-lg text-brand-red mx-auto mb-1"
            />
            <p className="font-mono text-[10px] text-brand-red">
              Cannot move to past date
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
