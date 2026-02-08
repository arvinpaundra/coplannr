import type { HTMLAttributes } from 'react';
import { Icon } from '@iconify/react';
import { Toggle } from '@/components/ui/Toggle';
import { cn } from '@/lib/utils';

export interface ScheduleDate {
  day: string;
  month: string;
  year: string;
  hour: string;
  minute: string;
  period: 'AM' | 'PM';
}

export interface SchedulePickerProps extends HTMLAttributes<HTMLDivElement> {
  isScheduled: boolean;
  onScheduledChange: (scheduled: boolean) => void;
  scheduleDate: ScheduleDate;
  onDateChange: (date: ScheduleDate) => void;
}

export const SchedulePicker = ({
  className,
  isScheduled,
  onScheduledChange,
  scheduleDate,
  onDateChange,
  ...props
}: SchedulePickerProps) => {
  const updateDate = (updates: Partial<ScheduleDate>) => {
    onDateChange({ ...scheduleDate, ...updates });
  };

  return (
    <div
      className={cn(
        'bg-brand-neon border-2 border-black p-6 shadow-hard relative',
        className
      )}
      {...props}
    >
      <div className="absolute top-2 right-2">
        <Icon
          icon="solar:clock-circle-linear"
          className="text-2xl opacity-50"
        />
      </div>
      <h2 className="font-bold uppercase text-lg mb-6">When to Publish</h2>

      <div className="flex items-center justify-between mb-6 bg-white/50 p-2 border border-black">
        <span className="font-mono text-xs font-bold uppercase">
          Schedule Post?
        </span>
        <Toggle checked={isScheduled} onChange={onScheduledChange} label="" />
      </div>

      {isScheduled && (
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="font-mono text-[10px] uppercase">Date</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={scheduleDate.day}
                onChange={(e) => updateDate({ day: e.target.value })}
                className="w-12 bg-white text-center border-2 border-black p-2 font-mono text-sm outline-none"
                placeholder="DD"
              />
              <input
                type="text"
                value={scheduleDate.month}
                onChange={(e) => updateDate({ month: e.target.value })}
                className="w-14 bg-white text-center border-2 border-black p-2 font-mono text-sm outline-none"
                placeholder="MM"
              />
              <input
                type="text"
                value={scheduleDate.year}
                onChange={(e) => updateDate({ year: e.target.value })}
                className="flex-1 bg-white text-center border-2 border-black p-2 font-mono text-sm outline-none"
                placeholder="YYYY"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-mono text-[10px] uppercase">
              Time (UTC)
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={scheduleDate.hour}
                onChange={(e) => updateDate({ hour: e.target.value })}
                className="w-12 bg-white text-center border-2 border-black p-2 font-mono text-sm outline-none"
                placeholder="HH"
              />
              <span className="font-bold">:</span>
              <input
                type="text"
                value={scheduleDate.minute}
                onChange={(e) => updateDate({ minute: e.target.value })}
                className="w-12 bg-white text-center border-2 border-black p-2 font-mono text-sm outline-none"
                placeholder="MM"
              />
              <div className="flex flex-1 border-2 border-black bg-white">
                <button
                  onClick={() => updateDate({ period: 'AM' })}
                  className={cn(
                    'flex-1 font-mono text-xs p-2 transition-colors',
                    scheduleDate.period === 'AM'
                      ? 'bg-black text-white'
                      : 'hover:bg-black hover:text-white'
                  )}
                >
                  AM
                </button>
                <button
                  onClick={() => updateDate({ period: 'PM' })}
                  className={cn(
                    'flex-1 font-mono text-xs p-2 transition-colors',
                    scheduleDate.period === 'PM'
                      ? 'bg-black text-white'
                      : 'hover:bg-black hover:text-white'
                  )}
                >
                  PM
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
