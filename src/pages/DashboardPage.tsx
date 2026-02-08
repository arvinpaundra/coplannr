import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Sidebar } from '@/components/organisms/Sidebar';
import { Header } from '@/components/organisms/Header';
import { PageFooter } from '@/components/organisms/PageFooter';
import { BackgroundGrid } from '@/components/atoms/BackgroundGrid';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { StatsGrid } from '@/components/organisms/StatsGrid';
import { PostQueueItem } from '@/components/molecules/PostQueueItem';
import { ShortcutsOverlay } from '@/components/molecules/ShortcutsOverlay';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { Link, useNavigate } from '@tanstack/react-router';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const [queueFilter, setQueueFilter] = useState<
    'all' | 'ongoing' | 'failed' | 'upcoming'
  >('all');

  // Queue items data with different states
  const allQueueItems = [
    {
      id: '1',
      status: 'ongoing' as const,
      title: 'Launching the new v2.0 feature set today...',
      subtitle: '#8823-A • Publishing now',
      platforms: ['carbon:logo-x', 'carbon:logo-linkedin'],
      time: 'Now',
      error: false,
      progress: 65,
    },
    {
      id: '2',
      status: 'upcoming' as const,
      title: 'Thoughts on brutalist web design trends...',
      subtitle: '#8824-B • Thread (3 parts)',
      platforms: ['carbon:logo-x'],
      time: 'Tomorrow, 9:00 AM',
      error: false,
    },
    {
      id: '3',
      status: 'failed' as const,
      title: 'Video upload: Weekly update',
      subtitle: 'Error: API Timeout (Instagram)',
      platforms: ['carbon:logo-instagram'],
      time: 'Failed 2h ago',
      error: true,
      retryCount: 2,
    },
    {
      id: '4',
      status: 'upcoming' as const,
      title: 'Design system tutorial link',
      subtitle: '#8829-X • Link Preview',
      platforms: ['carbon:logo-linkedin', 'carbon:logo-facebook'],
      time: 'Fri, 9:00 AM',
      error: false,
    },
    {
      id: '5',
      status: 'ongoing' as const,
      title: 'Product launch announcement',
      subtitle: '#8825-C • Image + Video',
      platforms: ['carbon:logo-x', 'carbon:logo-facebook'],
      time: 'Now',
      error: false,
      progress: 30,
    },
    {
      id: '6',
      status: 'failed' as const,
      title: 'Weekly newsletter link',
      subtitle: 'Error: Rate limit exceeded (Twitter)',
      platforms: ['carbon:logo-x'],
      time: 'Failed 5m ago',
      error: true,
      retryCount: 1,
    },
  ];

  // Filter queue items based on selected filter
  const queueItems =
    queueFilter === 'all'
      ? allQueueItems
      : allQueueItems.filter((item) => {
          if (queueFilter === 'ongoing') return item.status === 'ongoing';
          if (queueFilter === 'failed') return item.status === 'failed';
          if (queueFilter === 'upcoming') return item.status === 'upcoming';
          return true;
        });

  // Keyboard shortcuts
  const shortcuts = [
    {
      key: 'c',
      action: () => navigate({ to: '/compose' }),
      description: 'Navigate to Compose',
    },
    {
      key: 'a',
      action: () => navigate({ to: '/analytics' }),
      description: 'Navigate to Analytics',
    },
    {
      key: 'k',
      action: () => navigate({ to: '/calendar' }),
      description: 'Navigate to Calendar',
    },
    {
      key: 's',
      action: () => navigate({ to: '/settings' }),
      description: 'Navigate to Settings',
    },
  ];

  const { showOverlay, setShowOverlay } = useKeyboardShortcuts(shortcuts);

  const shortcutsForOverlay = [
    { key: 'C', description: 'Navigate to Compose' },
    { key: 'A', description: 'Navigate to Analytics' },
    { key: 'K', description: 'Navigate to Calendar' },
    { key: 'S', description: 'Navigate to Settings' },
    { key: '?', description: 'Show keyboard shortcuts' },
  ];

  return (
    <div className="flex h-screen w-screen">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#f8f8f8] relative">
        <BackgroundGrid opacity={0.2} size={20} />

        {/* Top Header */}
        <Header title="DASHBOARD" badge="Overview" />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 z-10">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b-2 border-black pb-6 relative">
              <div>
                <h1 className="text-3xl font-bold uppercase tracking-tight mb-2">
                  Command Center
                </h1>
                <p className="font-mono text-sm text-neutral-600">
                  Manage your content pipeline across all frequencies.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="secondary"
                  onClick={() => setShowOverlay(true)}
                  className="px-6 py-3 flex items-center gap-2"
                  title="Show keyboard shortcuts (Press ?)"
                >
                  <Icon icon="solar:keyboard-linear" className="text-lg" />
                  Shortcuts
                </Button>
                <Link to="/compose">
                  <Button
                    variant="primary"
                    className="px-6 py-3 flex items-center gap-2"
                  >
                    <Icon icon="solar:add-square-linear" className="text-lg" />
                    Create New Post
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats Grid */}
            <StatsGrid
              stats={[
                {
                  label: 'Queued',
                  value: 12,
                  icon: 'solar:hourglass-line-linear',
                  description: 'Next: 2h 15m',
                },
                {
                  label: 'Published (7d)',
                  value: 48,
                  icon: 'solar:check-circle-linear',
                  change: { value: '+12% vs last wk', isPositive: true },
                },
                {
                  label: 'Total Reach',
                  value: '8.2k',
                  icon: 'solar:users-group-rounded-linear',
                  description: 'Across 3 platforms',
                },
                {
                  label: 'Failed Jobs',
                  value: 1,
                  icon: 'solar:danger-triangle-linear',
                  variant: 'danger',
                  description: 'View Error Log',
                },
              ]}
            />

            {/* Main Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Post Queue */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex flex-col gap-3 mb-2">
                  <div className="flex justify-between items-center">
                    <h2 className="font-bold text-lg uppercase flex items-center gap-2">
                      <Icon icon="solar:list-check-linear" />
                      Publishing Queue
                    </h2>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setQueueFilter('all')}
                        className={`px-3 py-1.5 text-xs font-mono border-2 border-black transition-all ${
                          queueFilter === 'all'
                            ? 'bg-black text-white shadow-[2px_2px_0px_0px_#000]'
                            : 'bg-white hover:bg-brand-neon hover:shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5 hover:-translate-x-0.5'
                        }`}
                      >
                        ALL
                      </button>
                      <button
                        onClick={() => setQueueFilter('ongoing')}
                        className={`px-3 py-1.5 text-xs font-mono border-2 border-black transition-all ${
                          queueFilter === 'ongoing'
                            ? 'bg-black text-white shadow-[2px_2px_0px_0px_#000]'
                            : 'bg-white hover:bg-brand-neon hover:shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5 hover:-translate-x-0.5'
                        }`}
                      >
                        ONGOING
                      </button>
                      <button
                        onClick={() => setQueueFilter('failed')}
                        className={`px-3 py-1.5 text-xs font-mono border-2 border-black transition-all ${
                          queueFilter === 'failed'
                            ? 'bg-black text-white shadow-[2px_2px_0px_0px_#000]'
                            : 'bg-white hover:bg-brand-neon hover:shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5 hover:-translate-x-0.5'
                        }`}
                      >
                        FAILED
                      </button>
                      <button
                        onClick={() => setQueueFilter('upcoming')}
                        className={`px-3 py-1.5 text-xs font-mono border-2 border-black transition-all ${
                          queueFilter === 'upcoming'
                            ? 'bg-black text-white shadow-[2px_2px_0px_0px_#000]'
                            : 'bg-white hover:bg-brand-neon hover:shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5 hover:-translate-x-0.5'
                        }`}
                      >
                        UPCOMING
                      </button>
                    </div>
                  </div>

                  {/* Status Summary */}
                  <div className="flex gap-3 font-mono text-xs">
                    <div className="flex items-center gap-2 px-2 py-1 bg-brand-neon border border-black">
                      <div className="w-2 h-2 bg-black"></div>
                      <span className="font-bold">
                        Ongoing:{' '}
                        {
                          allQueueItems.filter((i) => i.status === 'ongoing')
                            .length
                        }
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1 bg-brand-red border border-black text-white">
                      <div className="w-2 h-2 bg-white"></div>
                      <span className="font-bold">
                        Failed:{' '}
                        {
                          allQueueItems.filter((i) => i.status === 'failed')
                            .length
                        }
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1 bg-blue-400 border border-black text-white">
                      <div className="w-2 h-2 bg-white"></div>
                      <span className="font-bold">
                        Upcoming:{' '}
                        {
                          allQueueItems.filter((i) => i.status === 'upcoming')
                            .length
                        }
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-4 px-4 py-2 font-mono text-[10px] uppercase text-neutral-500 border-b-2 border-neutral-300">
                  <div className="col-span-1">Status</div>
                  <div className="col-span-6">Content</div>
                  <div className="col-span-3">Platforms</div>
                  <div className="col-span-2 text-right">Time</div>
                </div>

                {/* Queue Items */}
                {queueItems.length === 0 ? (
                  <Card className="p-12 text-center border-2 border-dashed border-neutral-300">
                    <Icon
                      icon="solar:document-linear"
                      className="text-5xl text-neutral-300 mx-auto mb-4"
                    />
                    <p className="font-mono text-sm text-neutral-500 mb-4">
                      No posts in queue
                    </p>
                    <Link to="/compose">
                      <Button
                        variant="secondary"
                        className="px-6 py-2 hover:bg-brand-neon hover:shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all duration-200"
                      >
                        Create Your First Post
                      </Button>
                    </Link>
                  </Card>
                ) : (
                  <div className="space-y-2">
                    {queueItems.map((item) => (
                      <PostQueueItem
                        key={item.id}
                        post={item}
                        onEdit={() => {}}
                        onDelete={() => {}}
                        className="hover:shadow-[3px_3px_0px_0px_#000] transition-all duration-200"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* User Usage */}
                <div className="bg-[#222] text-white border-hard border-black p-4">
                  <h3 className="font-mono text-xs uppercase text-neutral-400 mb-4 tracking-widest">
                    Usage
                  </h3>
                  <div className="space-y-3 font-mono text-xs">
                    {/* Posts Usage */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span>Posts (This Month)</span>
                        <span className="text-brand-neon">8 / 10</span>
                      </div>
                      <div className="w-full bg-neutral-800 h-1 mt-2">
                        <div
                          className="bg-brand-neon h-1"
                          style={{ width: '80%' }}
                        />
                      </div>
                      <div className="text-[10px] text-neutral-500 pt-1">
                        2 POSTS REMAINING
                      </div>
                    </div>

                    {/* Accounts Usage */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span>Social Accounts</span>
                        <span className="text-brand-neon">2 / 3</span>
                      </div>
                      <div className="w-full bg-neutral-800 h-1 mt-2">
                        <div
                          className="bg-brand-neon h-1"
                          style={{ width: '66.67%' }}
                        />
                      </div>
                      <div className="text-[10px] text-neutral-500 pt-1">
                        1 ACCOUNT REMAINING
                      </div>
                    </div>

                    {/* Plan Info */}
                    <div className="pt-3 border-t border-neutral-700">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-neutral-400">PLAN:</span>
                        <span className="text-brand-red font-bold">FREE</span>
                      </div>
                      <Link
                        to="/subscription"
                        className="block text-center font-mono text-xs text-brand-neon border border-brand-neon px-3 py-2 hover:bg-brand-neon hover:text-black transition-colors"
                      >
                        UPGRADE PLAN →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <PageFooter />
        </div>
      </main>

      {/* Keyboard Shortcuts Overlay */}
      <ShortcutsOverlay
        shortcuts={shortcutsForOverlay}
        isOpen={showOverlay}
        onClose={() => setShowOverlay(false)}
      />
    </div>
  );
};
