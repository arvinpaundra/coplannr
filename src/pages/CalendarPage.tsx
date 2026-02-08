import { Icon } from '@iconify/react';
import { useState, useCallback } from 'react';
import { Sidebar } from '@/components/organisms/Sidebar';
import { Header } from '@/components/organisms/Header';
import { PageFooter } from '@/components/organisms/PageFooter';
import { BackgroundGrid } from '@/components/atoms/BackgroundGrid';
import { CalendarDayCell } from '@/components/molecules/CalendarDayCell';
import { ActivityLogItem } from '@/components/molecules/ActivityLogItem';
import { cn } from '@/lib/utils';

export interface CalendarEvent {
  id: string;
  time: string;
  platforms: string[];
  title: string;
  status: 'posted' | 'scheduled' | 'draft';
  scheduledDate?: string; // Format: "YYYY-MM-DD" for date comparison
}

export interface CalendarDay {
  date: number;
  month: string;
  year?: number;
  isPreviousMonth?: boolean;
  isToday?: boolean;
  isPast?: boolean;
  fullDate?: string; // Format: "YYYY-MM-DD" for date comparison
  events: CalendarEvent[];
}

export const CalendarPage = () => {
  const [currentRange] = useState('JAN 23 - FEB 19, 2026');
  const [draggedEvent, setDraggedEvent] = useState<CalendarEvent | null>(null);
  const [dragOverDate, setDragOverDate] = useState<string | null>(null);

  // Initialize calendar days with full date strings for comparison
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([
    {
      date: 23,
      month: 'JAN',
      year: 2026,
      isPreviousMonth: true,
      isPast: true,
      fullDate: '2026-01-23',
      events: [
        {
          id: '1',
          time: '09:00',
          platforms: ['carbon:logo-x'],
          title: 'Week kickoff announcement...',
          status: 'posted',
          scheduledDate: '2026-01-23',
        },
      ],
    },
    {
      date: 24,
      month: 'JAN',
      year: 2026,
      isPreviousMonth: true,
      isPast: true,
      fullDate: '2026-01-24',
      events: [
        {
          id: '2',
          time: '15:00',
          platforms: ['carbon:logo-linkedin'],
          title: 'Industry insights article...',
          status: 'posted',
          scheduledDate: '2026-01-24',
        },
      ],
    },
    {
      date: 25,
      month: 'JAN',
      year: 2026,
      isPreviousMonth: true,
      isPast: true,
      fullDate: '2026-01-25',
      events: [
        {
          id: '3',
          time: '10:00',
          platforms: ['carbon:logo-facebook', 'carbon:logo-instagram'],
          title: 'Weekend engagement post',
          status: 'posted',
          scheduledDate: '2026-01-25',
        },
      ],
    },
    {
      date: 26,
      month: 'JAN',
      year: 2026,
      isToday: true,
      isPast: false,
      fullDate: '2026-01-26',
      events: [
        {
          id: '4',
          time: '09:00',
          platforms: ['carbon:logo-linkedin'],
          title: 'Q1 Strategy Update...',
          status: 'posted',
          scheduledDate: '2026-01-26',
        },
        {
          id: '5',
          time: '14:30',
          platforms: ['carbon:logo-instagram'],
          title: 'Reel: Behind the scenes',
          status: 'scheduled',
          scheduledDate: '2026-01-26',
        },
      ],
    },
    {
      date: 27,
      month: 'JAN',
      year: 2026,
      isPast: false,
      fullDate: '2026-01-27',
      events: [
        {
          id: '6',
          time: '10:00',
          platforms: ['carbon:logo-x', 'carbon:logo-facebook'],
          title: 'Product feature spotlight...',
          status: 'scheduled',
          scheduledDate: '2026-01-27',
        },
      ],
    },
    {
      date: 28,
      month: 'JAN',
      year: 2026,
      isPast: false,
      fullDate: '2026-01-28',
      events: [
        {
          id: '7',
          time: '11:00',
          platforms: ['carbon:logo-linkedin'],
          title: 'Hiring announcement...',
          status: 'scheduled',
          scheduledDate: '2026-01-28',
        },
      ],
    },
    {
      date: 29,
      month: 'JAN',
      year: 2026,
      isPast: false,
      fullDate: '2026-01-29',
      events: [
        {
          id: '8',
          time: '',
          platforms: ['solar:pen-new-square-linear'],
          title: 'Draft: Community spotlight',
          status: 'draft',
          scheduledDate: '2026-01-29',
        },
      ],
    },
    {
      date: 30,
      month: 'JAN',
      year: 2026,
      isPast: false,
      fullDate: '2026-01-30',
      events: [
        {
          id: '9',
          time: '18:00',
          platforms: ['carbon:logo-x'],
          title: 'End of month recap thread',
          status: 'scheduled',
          scheduledDate: '2026-01-30',
        },
      ],
    },
    {
      date: 31,
      month: 'JAN',
      year: 2026,
      isPast: false,
      fullDate: '2026-01-31',
      events: [],
    },
    {
      date: 1,
      month: 'FEB',
      year: 2026,
      isPast: false,
      fullDate: '2026-02-01',
      events: [
        {
          id: '10',
          time: '09:00',
          platforms: ['carbon:logo-facebook', 'carbon:logo-instagram'],
          title: 'February newsletter preview',
          status: 'scheduled',
          scheduledDate: '2026-02-01',
        },
      ],
    },
    {
      date: 2,
      month: 'FEB',
      year: 2026,
      isPast: false,
      fullDate: '2026-02-02',
      events: [
        {
          id: '11',
          time: '14:00',
          platforms: ['carbon:logo-linkedin'],
          title: 'Team milestone celebration',
          status: 'scheduled',
          scheduledDate: '2026-02-02',
        },
      ],
    },
    {
      date: 3,
      month: 'FEB',
      year: 2026,
      isPast: false,
      fullDate: '2026-02-03',
      events: [],
    },
    {
      date: 4,
      month: 'FEB',
      year: 2026,
      isPast: false,
      fullDate: '2026-02-04',
      events: [
        {
          id: '12',
          time: '10:30',
          platforms: ['carbon:logo-x'],
          title: 'Product update announcement',
          status: 'scheduled',
          scheduledDate: '2026-02-04',
        },
      ],
    },
    {
      date: 5,
      month: 'FEB',
      year: 2026,
      isPast: false,
      fullDate: '2026-02-05',
      events: [],
    },
    {
      date: 6,
      month: 'FEB',
      year: 2026,
      isPast: false,
      fullDate: '2026-02-06',
      events: [
        {
          id: '13',
          time: '16:00',
          platforms: ['carbon:logo-instagram'],
          title: 'Behind the scenes video',
          status: 'scheduled',
          scheduledDate: '2026-02-06',
        },
      ],
    },
    {
      date: 7,
      month: 'FEB',
      year: 2026,
      isPast: false,
      fullDate: '2026-02-07',
      events: [],
    },
    {
      date: 8,
      month: 'FEB',
      year: 2026,
      isPast: false,
      fullDate: '2026-02-08',
      events: [
        {
          id: '14',
          time: '',
          platforms: ['solar:pen-new-square-linear'],
          title: 'Weekly roundup draft',
          status: 'draft',
          scheduledDate: '2026-02-08',
        },
      ],
    },
    {
      date: 9,
      month: 'FEB',
      year: 2026,
      isPast: false,
      fullDate: '2026-02-09',
      events: [
        {
          id: '15',
          time: '12:00',
          platforms: ['carbon:logo-facebook'],
          title: 'Customer success story',
          status: 'scheduled',
          scheduledDate: '2026-02-09',
        },
      ],
    },
    {
      date: 10,
      month: 'FEB',
      year: 2026,
      isPast: false,
      fullDate: '2026-02-10',
      events: [],
    },
    {
      date: 11,
      month: 'FEB',
      year: 2026,
      isPast: false,
      fullDate: '2026-02-11',
      events: [
        {
          id: '16',
          time: '09:30',
          platforms: ['carbon:logo-linkedin'],
          title: 'Industry report release',
          status: 'scheduled',
          scheduledDate: '2026-02-11',
        },
      ],
    },
    {
      date: 12,
      month: 'FEB',
      year: 2026,
      isPast: false,
      fullDate: '2026-02-12',
      events: [
        {
          id: '17',
          time: '15:00',
          platforms: ['carbon:logo-x', 'carbon:logo-linkedin'],
          title: 'Webinar announcement',
          status: 'scheduled',
          scheduledDate: '2026-02-12',
        },
      ],
    },
    {
      date: 13,
      month: 'FEB',
      year: 2026,
      isPast: false,
      fullDate: '2026-02-13',
      events: [],
    },
    {
      date: 14,
      month: 'FEB',
      year: 2026,
      isPast: false,
      fullDate: '2026-02-14',
      events: [
        {
          id: '18',
          time: '10:00',
          platforms: ['carbon:logo-instagram'],
          title: "Valentine's Day special",
          status: 'scheduled',
          scheduledDate: '2026-02-14',
        },
      ],
    },
    {
      date: 15,
      month: 'FEB',
      year: 2026,
      isPast: false,
      fullDate: '2026-02-15',
      events: [
        {
          id: '19',
          time: '',
          platforms: ['solar:pen-new-square-linear'],
          title: 'Weekend content ideas',
          status: 'draft',
          scheduledDate: '2026-02-15',
        },
      ],
    },
    {
      date: 16,
      month: 'FEB',
      year: 2026,
      isPast: false,
      fullDate: '2026-02-16',
      events: [],
    },
    {
      date: 17,
      month: 'FEB',
      year: 2026,
      isPast: false,
      fullDate: '2026-02-17',
      events: [],
    },
    {
      date: 18,
      month: 'FEB',
      year: 2026,
      isPast: false,
      fullDate: '2026-02-18',
      events: [],
    },
    {
      date: 19,
      month: 'FEB',
      year: 2026,
      isPast: false,
      fullDate: '2026-02-19',
      events: [],
    },
  ]);

  // Get today's date for validation
  const getTodayDate = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
      2,
      '0'
    )}-${String(today.getDate()).padStart(2, '0')}`;
  };

  // Check if a date is in the past
  const isDateInPast = useCallback((dateString: string) => {
    const today = getTodayDate();
    return dateString < today;
  }, []);

  // Handle drag start
  const handleDragStart = useCallback((event: CalendarEvent) => {
    // Only allow dragging scheduled posts (not posted or drafts)
    if (event.status === 'scheduled') {
      setDraggedEvent(event);
    }
  }, []);

  // Handle drag over
  const handleDragOver = useCallback(
    (e: React.DragEvent, dateString: string) => {
      e.preventDefault();
      if (!draggedEvent) return;

      // Validate: don't allow dropping on past dates
      if (!isDateInPast(dateString)) {
        setDragOverDate(dateString);
      }
    },
    [draggedEvent, isDateInPast]
  );

  // Handle drag leave
  const handleDragLeave = useCallback(() => {
    setDragOverDate(null);
  }, []);

  // Handle drop
  const handleDrop = useCallback(
    (e: React.DragEvent, targetDate: string) => {
      e.preventDefault();
      if (!draggedEvent) return;

      // Validate: don't allow dropping on past dates
      if (isDateInPast(targetDate)) {
        setDraggedEvent(null);
        setDragOverDate(null);
        return;
      }

      // Move event to new date
      setCalendarDays((prevDays) => {
        const newDays = [...prevDays];

        // Remove event from old date
        newDays.forEach((day) => {
          day.events = day.events.filter((e) => e.id !== draggedEvent.id);
        });

        // Add event to new date
        const targetDay = newDays.find((day) => day.fullDate === targetDate);
        if (targetDay) {
          targetDay.events.push({
            ...draggedEvent,
            scheduledDate: targetDate,
          });
          // Sort events by time
          targetDay.events.sort((a, b) => {
            if (!a.time) return 1;
            if (!b.time) return -1;
            return a.time.localeCompare(b.time);
          });
        }

        return newDays;
      });

      setDraggedEvent(null);
      setDragOverDate(null);
    },
    [draggedEvent, isDateInPast]
  );

  // Handle drag end
  const handleDragEnd = useCallback(() => {
    setDraggedEvent(null);
    setDragOverDate(null);
  }, []);

  const activityLogs = [
    {
      time: '14:30:05',
      icon: 'solar:refresh-circle-linear',
      title: 'Processing Queue #8821',
      description: 'Uploading media assets to Instagram Graph API...',
      status: 'RUNNING',
      statusColor: 'bg-brand-neon',
      progress: 66,
      isAnimated: true,
    },
    {
      time: '09:00:22',
      icon: 'solar:check-circle-linear',
      iconColor: 'text-green-600',
      title: 'Published Successfully',
      description: 'Post ID: 992381 deployed to LinkedIn.',
      status: 'DONE',
      statusColor: 'border-neutral-200 text-neutral-400',
    },
    {
      time: '08:45:10',
      icon: 'solar:bell-linear',
      iconColor: 'text-brand-red',
      title: 'Rate Limit Warning',
      titleColor: 'text-brand-red',
      description: 'Twitter API usage at 85% capacity for current window.',
      status: 'LOG',
      statusColor: 'border-neutral-200 text-neutral-400',
    },
  ];

  return (
    <div className="flex h-screen w-screen">
      <Sidebar />

      <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#f8f8f8] relative">
        <BackgroundGrid opacity={0.2} size={20} />

        <Header title="SCHEDULE" badge="Live" />

        <div className="flex-1 overflow-y-auto z-10 flex flex-col p-4 md:p-8">
          {/* Calendar Controls */}
          <div className="max-w-7xl mx-auto space-y-8 w-full">
            {/* Header Section */}
            <div className="relative">
              <div className="border-b-2 border-black pb-6">
                <h1 className="text-4xl font-bold uppercase tracking-tight mb-3">
                  Schedule Calendar
                </h1>
                <p className="font-mono text-sm text-neutral-600 max-w-2xl">
                  Visualize and manage scheduled posts with drag-and-drop
                  rescheduling.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
              {/* Date Navigation */}
              <div className="flex items-center gap-2">
                <button className="w-12 h-12 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors flex items-center justify-center group">
                  <Icon
                    icon="solar:alt-arrow-left-linear"
                    className="text-xl group-hover:scale-110 transition-transform"
                  />
                </button>

                <div className="bg-brand-neon border-2 border-black px-6 py-4 shadow-hard-sm relative overflow-hidden min-w-[280px]">
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-8 h-8 border-l-2 border-b-2 border-black opacity-20"></div>

                  <div className="relative z-10">
                    <div className="font-mono text-lg font-bold uppercase tracking-tight leading-tight">
                      {currentRange}
                    </div>
                  </div>
                </div>

                <button className="w-12 h-12 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors flex items-center justify-center group">
                  <Icon
                    icon="solar:alt-arrow-right-linear"
                    className="text-xl group-hover:scale-110 transition-transform"
                  />
                </button>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-3 bg-white border-2 border-black p-2 shadow-hard-sm">
                <div className="flex items-center gap-2 px-3 py-1.5">
                  <div className="w-2.5 h-2.5 bg-black border border-black"></div>
                  <span className="text-xs font-mono uppercase font-bold">
                    Posted
                  </span>
                </div>
                <div className="w-px h-6 bg-black"></div>
                <div className="flex items-center gap-2 px-3 py-1.5">
                  <div className="w-2.5 h-2.5 bg-brand-neon border-2 border-black"></div>
                  <span className="text-xs font-mono uppercase font-bold">
                    Scheduled
                  </span>
                </div>
                <div className="w-px h-6 bg-black"></div>
                <div className="flex items-center gap-2 px-3 py-1.5">
                  <div className="w-2.5 h-2.5 bg-white border-2 border-dashed border-black"></div>
                  <span className="text-xs font-mono uppercase font-bold">
                    Draft
                  </span>
                </div>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="overflow-x-auto pb-4">
              <div className="min-w-full">
                {/* Week Header */}
                <div className="grid grid-cols-7 border-2 border-black bg-neutral-100">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(
                    (day, index) => (
                      <div
                        key={day}
                        className={cn(
                          'text-center font-mono text-xs font-bold text-neutral-700 uppercase py-2',
                          index < 6 && 'border-r-2 border-black'
                        )}
                      >
                        {day}
                      </div>
                    )
                  )}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 border-2 border-black border-t-0">
                  {calendarDays.map((day, i) => {
                    const row = Math.floor(i / 7);
                    const col = i % 7;
                    const isLastRow =
                      row === Math.floor((calendarDays.length - 1) / 7);
                    const isLastColumn = col === 6;

                    return (
                      <CalendarDayCell
                        key={i}
                        day={day}
                        draggedEvent={draggedEvent}
                        dragOverDate={dragOverDate}
                        onDragStart={handleDragStart}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onDragEnd={handleDragEnd}
                        isDateInPast={isDateInPast}
                        isLastColumn={isLastColumn}
                        isLastRow={isLastRow}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Real-Time Activity Log */}
          <div className="flex-1 bg-white border-t-2 border-black mt-8">
            <div className="px-4 md:px-8 py-3 bg-neutral-100 border-b border-neutral-300 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-brand-red rounded-full animate-pulse"></div>
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider">
                  Job Event // Histories
                </h3>
              </div>
            </div>

            <div className="px-4 md:px-8 py-2">
              {activityLogs.slice(0, 2).map((log, i) => (
                <ActivityLogItem key={i} log={log} />
              ))}

              {/* Load More Button */}
              <div className="py-4 flex justify-center border-b border-neutral-100">
                <button className="px-4 py-2 text-xs font-bold uppercase font-mono border-2 border-black bg-white shadow-hard-sm hover:shadow-hard hover:-translate-px active:translate-0.5 active:shadow-none transition-all flex items-center gap-2">
                  <Icon
                    icon="solar:alt-arrow-down-linear"
                    className="text-sm"
                  />
                  Load More Items
                </button>
              </div>

              {activityLogs.slice(2).map((log, i) => (
                <ActivityLogItem key={i + 2} log={log} />
              ))}
            </div>
          </div>

          <PageFooter />
        </div>
      </main>
    </div>
  );
};
