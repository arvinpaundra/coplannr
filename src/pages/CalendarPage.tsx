import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { PageFooter } from '@/components/layout/PageFooter';

interface Event {
  id: string;
  time: string;
  platforms: string[];
  title: string;
  status: 'posted' | 'scheduled' | 'draft';
}

interface CalendarDay {
  date: number;
  month: string;
  isPreviousMonth?: boolean;
  isToday?: boolean;
  events: Event[];
}

export const CalendarPage = () => {
  const [currentRange] = useState('JAN 23 - FEB 19, 2026');

  const calendarDays: CalendarDay[] = [
    {
      date: 23,
      month: 'JAN',
      isPreviousMonth: true,
      events: [
        {
          id: '1',
          time: '09:00',
          platforms: ['carbon:logo-x'],
          title: 'Week kickoff announcement...',
          status: 'posted',
        },
      ],
    },
    {
      date: 24,
      month: 'JAN',
      isPreviousMonth: true,
      events: [
        {
          id: '2',
          time: '15:00',
          platforms: ['carbon:logo-linkedin'],
          title: 'Industry insights article...',
          status: 'posted',
        },
      ],
    },
    {
      date: 25,
      month: 'JAN',
      isPreviousMonth: true,
      events: [
        {
          id: '3',
          time: '10:00',
          platforms: ['carbon:logo-facebook', 'carbon:logo-instagram'],
          title: 'Weekend engagement post',
          status: 'posted',
        },
      ],
    },

    {
      date: 26,
      month: 'JAN',
      isToday: true,
      events: [
        {
          id: '4',
          time: '09:00',
          platforms: ['carbon:logo-linkedin'],
          title: 'Q1 Strategy Update...',
          status: 'posted',
        },
        {
          id: '5',
          time: '14:30',
          platforms: ['carbon:logo-instagram'],
          title: 'Reel: Behind the scenes',
          status: 'scheduled',
        },
      ],
    },
    {
      date: 27,
      month: 'JAN',
      events: [
        {
          id: '6',
          time: '10:00',
          platforms: ['carbon:logo-x', 'carbon:logo-facebook'],
          title: 'Product feature spotlight...',
          status: 'scheduled',
        },
      ],
    },
    {
      date: 28,
      month: 'JAN',
      events: [
        {
          id: '7',
          time: '11:00',
          platforms: ['carbon:logo-linkedin'],
          title: 'Hiring announcement...',
          status: 'scheduled',
        },
      ],
    },
    {
      date: 29,
      month: 'JAN',
      events: [
        {
          id: '8',
          time: '',
          platforms: ['solar:pen-new-square-linear'],
          title: 'Draft: Community spotlight',
          status: 'draft',
        },
      ],
    },
    {
      date: 30,
      month: 'JAN',
      events: [
        {
          id: '9',
          time: '18:00',
          platforms: ['carbon:logo-x'],
          title: 'End of month recap thread',
          status: 'scheduled',
        },
      ],
    },
    { date: 31, month: 'JAN', events: [] },
    {
      date: 1,
      month: 'FEB',
      events: [
        {
          id: '10',
          time: '09:00',
          platforms: ['carbon:logo-facebook', 'carbon:logo-instagram'],
          title: 'February newsletter preview',
          status: 'scheduled',
        },
      ],
    },

    {
      date: 2,
      month: 'FEB',
      events: [
        {
          id: '11',
          time: '14:00',
          platforms: ['carbon:logo-linkedin'],
          title: 'Team milestone celebration',
          status: 'scheduled',
        },
      ],
    },
    { date: 3, month: 'FEB', events: [] },
    {
      date: 4,
      month: 'FEB',
      events: [
        {
          id: '12',
          time: '10:30',
          platforms: ['carbon:logo-x'],
          title: 'Product update announcement',
          status: 'scheduled',
        },
      ],
    },
    { date: 5, month: 'FEB', events: [] },
    {
      date: 6,
      month: 'FEB',
      events: [
        {
          id: '13',
          time: '16:00',
          platforms: ['carbon:logo-instagram'],
          title: 'Behind the scenes video',
          status: 'scheduled',
        },
      ],
    },
    { date: 7, month: 'FEB', events: [] },
    {
      date: 8,
      month: 'FEB',
      events: [
        {
          id: '14',
          time: '',
          platforms: ['solar:pen-new-square-linear'],
          title: 'Weekly roundup draft',
          status: 'draft',
        },
      ],
    },

    {
      date: 9,
      month: 'FEB',
      events: [
        {
          id: '15',
          time: '12:00',
          platforms: ['carbon:logo-facebook'],
          title: 'Customer success story',
          status: 'scheduled',
        },
      ],
    },
    { date: 10, month: 'FEB', events: [] },
    {
      date: 11,
      month: 'FEB',
      events: [
        {
          id: '16',
          time: '09:30',
          platforms: ['carbon:logo-linkedin'],
          title: 'Industry report release',
          status: 'scheduled',
        },
      ],
    },
    {
      date: 12,
      month: 'FEB',
      events: [
        {
          id: '17',
          time: '15:00',
          platforms: ['carbon:logo-x', 'carbon:logo-linkedin'],
          title: 'Webinar announcement',
          status: 'scheduled',
        },
      ],
    },
    { date: 13, month: 'FEB', events: [] },
    {
      date: 14,
      month: 'FEB',
      events: [
        {
          id: '18',
          time: '10:00',
          platforms: ['carbon:logo-instagram'],
          title: "Valentine's Day special",
          status: 'scheduled',
        },
      ],
    },
    {
      date: 15,
      month: 'FEB',
      events: [
        {
          id: '19',
          time: '',
          platforms: ['solar:pen-new-square-linear'],
          title: 'Weekend content ideas',
          status: 'draft',
        },
      ],
    },
    { date: 16, month: 'FEB', events: [] },
    { date: 17, month: 'FEB', events: [] },
    { date: 18, month: 'FEB', events: [] },
    { date: 19, month: 'FEB', events: [] },
  ];

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
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'radial-gradient(#aaa 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        <Header title="SCHEDULE" badge="Live" />

        <div className="flex-1 overflow-y-auto z-10 flex flex-col p-4 md:p-8">
          {/* Calendar Controls */}
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 mb-4">
              <div className="flex items-center gap-0 bg-white border-hard shadow-hard-sm">
                <button className="hover:bg-neutral-100 p-2 border-r-2 border-black transition-colors">
                  <Icon
                    icon="solar:alt-arrow-left-linear"
                    className="text-xl"
                  />
                </button>
                <div className="px-4 text-center">
                  <span className="block font-bold text-lg leading-none">
                    {currentRange}
                  </span>
                </div>
                <button className="hover:bg-neutral-100 p-2 border-l-2 border-black transition-colors">
                  <Icon
                    icon="solar:alt-arrow-right-linear"
                    className="text-xl"
                  />
                </button>
              </div>

              <div className="flex gap-2">
                <div className="flex items-center gap-2 px-3 py-1 bg-white border-hard shadow-hard-sm">
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                  <span className="text-xs font-mono uppercase">Posted</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-white border-hard shadow-hard-sm">
                  <div className="w-2 h-2 bg-brand-neon border-2 border-black rounded-full"></div>
                  <span className="text-xs font-mono uppercase">Scheduled</span>
                </div>
                <button className="btn-action px-3 py-2 text-xs font-bold uppercase flex items-center gap-2 bg-white border-hard shadow-hard-sm hover:shadow-hard transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none">
                  <Icon icon="solar:filter-linear" /> Filter
                </button>
              </div>
            </div>

            {/* 2-Week Calendar Grid */}
            <div className="overflow-x-auto pb-4">
              <div className="min-w-200">
                {/* Week Header */}
                <div className="grid grid-cols-7 gap-px mb-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(
                    (day) => (
                      <div
                        key={day}
                        className="text-center font-mono text-[10px] text-neutral-500 uppercase"
                      >
                        {day}
                      </div>
                    )
                  )}
                </div>

                {/* Grid Container */}
                <div className="grid grid-cols-7 gap-0.5 bg-black border-2 border-black shadow-hard">
                  {calendarDays.map((day, i) => (
                    <div
                      key={i}
                      className={`bg-white p-2 min-h-35 relative transition-colors hover:bg-neutral-50 ${
                        day.isToday ? 'bg-[#fdfdfd]' : ''
                      }`}
                    >
                      {day.isToday && (
                        <div className="absolute top-0 right-0 w-0 h-0 border-20 border-r-brand-neon border-t-brand-neon border-l-transparent border-b-transparent"></div>
                      )}
                      <span
                        className={`font-mono text-xs ${
                          day.isPreviousMonth
                            ? 'text-neutral-400'
                            : day.isToday
                            ? 'font-bold text-black'
                            : 'text-black'
                        }`}
                      >
                        {day.isToday ? `${day.date} ${day.month}` : day.date}
                      </span>

                      {/* Events */}
                      <div className="mt-2 space-y-1">
                        {day.events.map((event) => (
                          <div
                            key={event.id}
                            className={`border border-black text-[11px] p-2 transition-all cursor-pointer hover:-translate-y-0.5 hover:shadow-[1px_1px_0px_0px_#000] ${
                              event.status === 'posted'
                                ? 'bg-black text-white'
                                : event.status === 'scheduled'
                                ? 'bg-brand-neon text-black'
                                : 'bg-white border-dashed text-neutral-600'
                            }`}
                          >
                            <div className="flex justify-between items-center mb-1">
                              <div className="flex gap-1">
                                {event.platforms.map((icon, idx) => (
                                  <Icon
                                    key={idx}
                                    icon={icon}
                                    className={
                                      event.status === 'posted'
                                        ? 'opacity-80'
                                        : ''
                                    }
                                  />
                                ))}
                              </div>
                              {event.time ? (
                                <span className="text-[9px] font-mono">
                                  {event.time}
                                </span>
                              ) : event.status === 'draft' ? (
                                <span className="text-[9px] font-mono">
                                  DRAFT
                                </span>
                              ) : (
                                <Icon icon="solar:check-read-linear" />
                              )}
                            </div>
                            <p
                              className={`truncate leading-tight ${
                                event.status === 'posted' ? 'opacity-80' : ''
                              }`}
                            >
                              {event.title}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Real-Time Activity Log */}
          <div className="flex-1 bg-white border-t-2 border-black">
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
                <div
                  key={i}
                  className="py-3 flex items-start gap-4 hover:bg-neutral-50 border-b border-neutral-100 last:border-b-0"
                >
                  <div className="w-16 font-mono text-[10px] text-neutral-400 pt-1">
                    {log.time}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Icon
                        icon={log.icon}
                        className={`text-lg ${
                          log.isAnimated ? 'animate-spin' : ''
                        } ${log.iconColor || ''}`}
                      />
                      <span
                        className={`text-xs font-bold ${
                          log.titleColor || 'text-black'
                        }`}
                      >
                        {log.title}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600 mt-1 pl-7">
                      {log.description}
                    </p>
                    {log.progress && (
                      <div className="w-48 h-1 bg-neutral-200 mt-2 ml-7 overflow-hidden">
                        <div
                          className="h-full bg-black transition-all duration-300"
                          style={{ width: `${log.progress}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                  <div
                    className={`text-[10px] font-mono border px-2 py-0.5 ${log.statusColor}`}
                  >
                    {log.status}
                  </div>
                </div>
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
                <div
                  key={i + 2}
                  className="py-3 flex items-start gap-4 hover:bg-neutral-50 border-b border-neutral-100 last:border-b-0"
                >
                  <div className="w-16 font-mono text-[10px] text-neutral-400 pt-1">
                    {log.time}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Icon
                        icon={log.icon}
                        className={`text-lg ${
                          log.isAnimated ? 'animate-spin' : ''
                        } ${log.iconColor || ''}`}
                      />
                      <span
                        className={`text-xs font-bold ${
                          log.titleColor || 'text-black'
                        }`}
                      >
                        {log.title}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600 mt-1 pl-7">
                      {log.description}
                    </p>
                    {log.progress && (
                      <div className="w-48 h-1 bg-neutral-200 mt-2 ml-7 overflow-hidden">
                        <div
                          className="h-full bg-black transition-all duration-300"
                          style={{ width: `${log.progress}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                  <div
                    className={`text-[10px] font-mono border px-2 py-0.5 ${log.statusColor}`}
                  >
                    {log.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <PageFooter />
        </div>
      </main>
    </div>
  );
};
