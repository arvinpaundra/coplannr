import { Sidebar } from '@/components/organisms/Sidebar';
import { Header } from '@/components/organisms/Header';
import { PageFooter } from '@/components/organisms/PageFooter';
import { BackgroundGrid } from '@/components/atoms/BackgroundGrid';
import { ConnectionCard } from '@/components/molecules/ConnectionCard';

export const ConnectionsPage = () => {
  return (
    <div className="flex h-screen w-screen">
      <Sidebar />

      <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#f8f8f8] relative">
        <BackgroundGrid opacity={0.2} size={20} />

        <Header title="CONNECTIONS" />

        <div className="flex-1 overflow-y-auto p-4 md:p-8 z-10">
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Header Section */}
            <div className="relative">
              <div className="border-b-2 border-black pb-6">
                <h1 className="text-4xl font-bold uppercase tracking-tight mb-3">
                  Platform Connections
                </h1>
                <p className="font-mono text-sm text-neutral-600 max-w-2xl">
                  Manage connected social media accounts and connect new
                  platforms for scheduling.
                </p>
              </div>
            </div>

            {/* Connected Platforms Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  name: 'Twitter / X',
                  icon: 'carbon:logo-x',
                  handle: '@coplannr',
                  status: 'connected' as const,
                  lastSync: '5 minutes ago',
                  stats: {
                    postsThisWeek: 12,
                    successRate: 100,
                  },
                },
                {
                  name: 'LinkedIn',
                  icon: 'carbon:logo-linkedin',
                  handle: 'Coplannr Company',
                  status: 'connected' as const,
                  lastSync: '12 minutes ago',
                  stats: {
                    postsThisWeek: 12,
                    successRate: 100,
                  },
                },
                {
                  name: 'Instagram',
                  icon: 'carbon:logo-instagram',
                  handle: '@coplannr.xyz',
                  status: 'connected' as const,
                  lastSync: '1 hour ago',
                },
                {
                  name: 'Facebook',
                  icon: 'carbon:logo-facebook',
                  handle: 'Not connected',
                  status: 'disconnected' as const,
                  lastSync: null,
                },
              ].map((platform) => (
                <ConnectionCard
                  key={platform.name}
                  platform={platform}
                  onConnect={() => {}}
                  onDisconnect={() => {}}
                  onSync={() => {}}
                />
              ))}
            </div>
          </div>
          <PageFooter />{' '}
        </div>
      </main>
    </div>
  );
};
