import { Icon } from '@iconify/react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { PageFooter } from '@/components/layout/PageFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Link } from '@tanstack/react-router';

export const DashboardPage = () => {
  return (
    <div className="flex h-screen w-screen">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#f8f8f8] relative">
        {/* Background Grid */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'radial-gradient(#aaa 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        {/* Top Header */}
        <Header title="DASHBOARD" badge="Overview" />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 z-10">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Welcome */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b-2 border-black pb-6">
              <div>
                <h1 className="text-3xl font-bold uppercase tracking-tight mb-2">
                  Command Center
                </h1>
                <p className="font-mono text-sm text-neutral-600">
                  Manage your content pipeline across all frequencies.
                </p>
              </div>
              <Link to="/compose">
                <Button
                  variant="action"
                  className="px-6 py-3 flex items-center gap-2 bg-black text-white hover:text-black"
                >
                  <Icon icon="solar:add-square-linear" className="text-lg" />
                  Create New Post
                </Button>
              </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Icon
                    icon="solar:hourglass-line-linear"
                    className="text-6xl"
                  />
                </div>
                <div className="text-neutral-500 font-mono text-xs uppercase mb-1">
                  Queued
                </div>
                <div className="text-4xl font-bold">12</div>
                <div className="mt-2 text-xs font-mono text-neutral-400">
                  Next: 2h 15m
                </div>
              </Card>

              <Card className="p-4 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Icon icon="solar:check-circle-linear" className="text-6xl" />
                </div>
                <div className="text-neutral-500 font-mono text-xs uppercase mb-1">
                  Published (7d)
                </div>
                <div className="text-4xl font-bold">48</div>
                <div className="mt-2 text-xs font-mono text-brand-neon bg-black inline-block px-1">
                  +12% vs last wk
                </div>
              </Card>

              <Card className="p-4 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Icon
                    icon="solar:users-group-rounded-linear"
                    className="text-6xl"
                  />
                </div>
                <div className="text-neutral-500 font-mono text-xs uppercase mb-1">
                  Total Reach
                </div>
                <div className="text-4xl font-bold">8.2k</div>
                <div className="mt-2 text-xs font-mono text-neutral-400">
                  Across 3 platforms
                </div>
              </Card>

              <Card className="p-4 relative overflow-hidden group bg-[#fff0f0] border-brand-red! shadow-[2px_2px_0px_0px_#ff3333]!">
                <div className="absolute top-0 right-0 p-2 text-brand-red opacity-10 group-hover:opacity-20 transition-opacity">
                  <Icon
                    icon="solar:danger-triangle-linear"
                    className="text-6xl"
                  />
                </div>
                <div className="text-brand-red font-mono text-xs uppercase mb-1">
                  Failed Jobs
                </div>
                <div className="text-4xl font-bold text-brand-red">1</div>
                <div className="mt-2 text-xs font-mono text-brand-red font-bold underline cursor-pointer">
                  View Error Log
                </div>
              </Card>
            </div>

            {/* Main Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Queue List */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="font-bold text-lg uppercase flex items-center gap-2">
                    <Icon icon="solar:list-check-linear" />
                    Upcoming Posts
                  </h2>
                  <div className="flex gap-2">
                    <button className="px-2 py-1 text-xs font-mono border border-black bg-white hover:bg-neutral-100">
                      FILTER
                    </button>
                    <button className="px-2 py-1 text-xs font-mono border border-black bg-white hover:bg-neutral-100">
                      SORT
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-4 px-4 py-2 font-mono text-[10px] uppercase text-neutral-500 border-b-2 border-neutral-300">
                  <div className="col-span-1">Status</div>
                  <div className="col-span-6">Content</div>
                  <div className="col-span-3">Platforms</div>
                  <div className="col-span-2 text-right">Time</div>
                </div>

                {/* Queue Items */}
                {[
                  {
                    status: 'bg-brand-neon',
                    title: 'Launching the new v2.0 feature set today...',
                    id: '#8823-A • Image attached',
                    platforms: ['carbon:logo-x', 'carbon:logo-linkedin'],
                    time: '14:00',
                    error: false,
                  },
                  {
                    status: 'bg-neutral-300',
                    title: 'Thoughts on brutalist web design trends...',
                    id: '#8824-B • Thread (3 parts)',
                    platforms: ['carbon:logo-x'],
                    time: 'Tomrw',
                    error: false,
                  },
                  {
                    status: 'bg-brand-red',
                    title: 'Video upload: Weekly update',
                    id: 'Error: API Timeout (Instagram)',
                    platforms: ['carbon:logo-instagram'],
                    time: 'Retry',
                    error: true,
                  },
                  {
                    status: 'bg-brand-neon',
                    title: 'Design system tutorial link',
                    id: '#8829-X • Link Preview',
                    platforms: ['carbon:logo-linkedin', 'carbon:logo-facebook'],
                    time: 'Fri, 9am',
                    error: false,
                  },
                ].map((item, i) => (
                  <Card
                    key={i}
                    shadow={false}
                    className={`p-4 group relative hover:shadow-hard-sm ${
                      item.error ? 'bg-[#fff5f5] border-brand-red' : ''
                    }`}
                  >
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-1">
                        <div
                          className={`w-3 h-3 ${item.status} border border-black`}
                        />
                      </div>
                      <div className="col-span-6">
                        <p
                          className={`font-bold text-sm truncate pr-4 ${
                            item.error ? 'text-brand-red' : ''
                          }`}
                        >
                          {item.title}
                        </p>
                        <p
                          className={`font-mono text-xs mt-1 truncate ${
                            item.error ? 'text-brand-red' : 'text-neutral-500'
                          }`}
                        >
                          {item.id}
                        </p>
                      </div>
                      <div className="col-span-3 flex gap-1">
                        {item.platforms.map((icon, j) => (
                          <div
                            key={j}
                            className={`w-6 h-6 border border-black flex items-center justify-center text-xs ${
                              item.error
                                ? 'bg-white text-brand-red'
                                : 'bg-neutral-100'
                            }`}
                          >
                            <Icon icon={icon} />
                          </div>
                        ))}
                      </div>
                      <div className="col-span-2 text-right">
                        {item.error ? (
                          <button className="font-mono text-[10px] uppercase border border-brand-red text-brand-red px-2 py-1 hover:bg-brand-red hover:text-white transition-colors">
                            {item.time}
                          </button>
                        ) : (
                          <span
                            className={`font-mono text-xs ${
                              item.time.includes(':')
                                ? 'font-bold'
                                : 'text-neutral-400'
                            }`}
                          >
                            {item.time}
                          </span>
                        )}
                      </div>
                    </div>
                    {!item.error && (
                      <div className="absolute right-2 top-2 hidden group-hover:flex gap-1">
                        <button className="p-1 border border-black bg-white hover:bg-brand-neon cursor-pointer">
                          <Icon icon="solar:pen-linear" />
                        </button>
                        <button className="p-1 border border-black bg-white hover:bg-brand-red hover:text-white">
                          <Icon icon="solar:trash-bin-linear" />
                        </button>
                      </div>
                    )}
                  </Card>
                ))}
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Quick Draft */}
                <Card className="p-4 shadow-hard">
                  <div className="flex justify-between items-center mb-4 border-b border-neutral-200 pb-2">
                    <h3 className="font-bold uppercase text-sm">Quick Draft</h3>
                    <Icon icon="solar:pen-2-linear" />
                  </div>
                  <textarea
                    className="w-full h-24 border-hard p-2 text-sm font-mono resize-none mb-3 outline-none focus:shadow-[2px_2px_0px_0px_var(--brand-neon)]"
                    placeholder="Type here..."
                  />
                  <div className="space-y-2 mb-4">
                    <label className="flex items-center gap-2 cursor-pointer text-sm">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 border-2 border-black appearance-none checked:bg-brand-neon"
                      />
                      Twitter / X
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-sm">
                      <input
                        type="checkbox"
                        className="w-4 h-4 border-2 border-black appearance-none checked:bg-brand-neon"
                      />
                      LinkedIn
                    </label>
                  </div>
                  <Button variant="action" className="w-full py-2 text-sm">
                    Save Draft
                  </Button>
                </Card>

                {/* Platform Health */}
                <div className="bg-[#222] text-white border-hard border-black p-4">
                  <h3 className="font-mono text-xs uppercase text-neutral-400 mb-4 tracking-widest">
                    Platform Health
                  </h3>
                  <div className="space-y-3 font-mono text-xs">
                    {[
                      { name: 'Twitter API', ms: '98ms' },
                      { name: 'LinkedIn API', ms: '124ms' },
                      { name: 'Image Server', ms: '45ms' },
                    ].map((api) => (
                      <div
                        key={api.name}
                        className="flex justify-between items-center"
                      >
                        <span>{api.name}</span>
                        <span className="text-brand-neon">{api.ms}</span>
                      </div>
                    ))}
                    <div className="w-full bg-neutral-800 h-1 mt-2">
                      <div
                        className="bg-brand-neon h-1"
                        style={{ width: '80%' }}
                      />
                    </div>
                    <div className="text-[10px] text-neutral-500 pt-1">
                      USAGE: 80% LIMIT
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <PageFooter />
        </div>
      </main>
    </div>
  );
};
