import { Icon } from '@iconify/react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { PageFooter } from '@/components/layout/PageFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export const ConnectionsPage = () => {
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

        <Header title="CONNECTIONS" />

        <div className="flex-1 overflow-y-auto p-4 md:p-8 z-10">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="border-b-2 border-black pb-4">
              <h1 className="text-3xl font-bold uppercase tracking-tight">
                Platform Connections
              </h1>
              <p className="font-mono text-sm text-neutral-600 mt-2">
                Manage your connected social media accounts.
              </p>
            </div>

            {/* Connected Platforms */}
            <div className="space-y-4">
              {[
                {
                  name: 'Twitter / X',
                  icon: 'carbon:logo-x',
                  handle: '@coplannr',
                  status: 'connected',
                  lastSync: '5 minutes ago',
                },
                {
                  name: 'LinkedIn',
                  icon: 'carbon:logo-linkedin',
                  handle: 'Coplannr Company',
                  status: 'connected',
                  lastSync: '12 minutes ago',
                },
                {
                  name: 'Instagram',
                  icon: 'carbon:logo-instagram',
                  handle: '@coplannr.xyz',
                  status: 'connected',
                  lastSync: '1 hour ago',
                },
                {
                  name: 'Facebook',
                  icon: 'carbon:logo-facebook',
                  handle: 'Not connected',
                  status: 'disconnected',
                  lastSync: null,
                },
              ].map((platform) => (
                <Card
                  key={platform.name}
                  className={`p-6 ${
                    platform.status === 'disconnected' ? 'bg-neutral-100' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 border-2 border-black flex items-center justify-center bg-white">
                        <Icon icon={platform.icon} className="text-2xl" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{platform.name}</h3>
                        <p
                          className={`font-mono text-sm mt-1 ${
                            platform.status === 'connected'
                              ? 'text-neutral-600'
                              : 'text-neutral-400'
                          }`}
                        >
                          {platform.handle}
                        </p>
                        {platform.lastSync && (
                          <p className="font-mono text-xs text-neutral-400 mt-2">
                            Last synced: {platform.lastSync}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {platform.status === 'connected' ? (
                        <>
                          <Button
                            variant="secondary"
                            className="px-4 py-2 bg-brand-neon"
                          >
                            Sync
                          </Button>
                          <Button
                            variant="secondary"
                            className="px-4 py-2 bg-brand-red! text-white!"
                          >
                            Disconnect
                          </Button>
                        </>
                      ) : (
                        <Button className="px-4 py-2 bg-brand-blue text-white hover:bg-blue hover:text-white">
                          Connect
                        </Button>
                      )}
                    </div>
                  </div>

                  {platform.status === 'connected' && (
                    <div className="mt-4 pt-4 border-t-2 border-neutral-200 grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-neutral-500 font-mono text-[10px] uppercase">
                          Posts This Week
                        </div>
                        <div className="text-xl font-bold mt-1">12</div>
                      </div>
                      <div>
                        <div className="text-neutral-500 font-mono text-[10px] uppercase">
                          Success Rate
                        </div>
                        <div className="text-xl font-bold mt-1">100%</div>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
          <PageFooter />{' '}
        </div>
      </main>
    </div>
  );
};
