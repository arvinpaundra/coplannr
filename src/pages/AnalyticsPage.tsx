import { Icon } from '@iconify/react';
import { Sidebar } from '@/components/organisms/Sidebar';
import { Header } from '@/components/organisms/Header';
import { PageFooter } from '@/components/organisms/PageFooter';
import { BackgroundGrid } from '@/components/atoms/BackgroundGrid';
import { StatsGrid } from '@/components/organisms/StatsGrid';

export const AnalyticsPage = () => {
  return (
    <div className="flex h-screen w-screen">
      <Sidebar />

      <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#f8f8f8] relative">
        <BackgroundGrid opacity={0.2} size={20} />

        <Header title="ANALYTICS" />

        <div className="flex-1 overflow-y-auto p-4 md:p-8 z-10">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* KPI Cards */}
            <StatsGrid
              stats={[
                {
                  label: 'Total Posts',
                  value: '1,204',
                  icon: 'solar:document-text-linear',
                  change: { value: '+12%', isPositive: true },
                  description: 'vs last period',
                },
                {
                  label: 'Impressions',
                  value: '84.2K',
                  icon: 'solar:eye-linear',
                  change: { value: '+5%', isPositive: true },
                  description: 'vs last period',
                },
                {
                  label: 'Engagement',
                  value: '4.8%',
                  icon: 'solar:graph-up-linear',
                  change: { value: '-1.2%', isPositive: false },
                  description: 'vs last period',
                },
                {
                  label: 'Streak',
                  value: '14 Days',
                  icon: 'solar:fire-linear',
                  variant: 'highlight',
                  description: 'Keep it up!',
                },
              ]}
            />

            {/* Bottom Section: Split Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Platform Performance */}
              <div className="lg:col-span-2 bg-white border-2 border-black p-6 shadow-[2px_2px_0px_0px_#000]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold uppercase text-sm">
                    Platform Breakdown
                  </h3>
                  <button className="text-xs font-mono underline hover:text-neutral-600">
                    View Details
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Twitter */}
                  <div className="group cursor-pointer">
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <div className="flex items-center gap-2">
                        <Icon icon="carbon:logo-x" />
                        Twitter
                      </div>
                      <span>1,420 (45%)</span>
                    </div>
                    <div className="w-full bg-neutral-100 h-4 border border-black relative overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-black transition-all"
                        style={{ width: '45%' }}
                      />
                    </div>
                  </div>

                  {/* LinkedIn */}
                  <div className="group cursor-pointer">
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <div className="flex items-center gap-2">
                        <Icon icon="carbon:logo-linkedin" />
                        LinkedIn
                      </div>
                      <span>980 (32%)</span>
                    </div>
                    <div className="w-full bg-neutral-100 h-4 border border-black relative overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-brand-neon transition-all"
                        style={{ width: '32%' }}
                      />
                    </div>
                  </div>

                  {/* Instagram */}
                  <div className="group cursor-pointer">
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <div className="flex items-center gap-2">
                        <Icon icon="carbon:logo-instagram" />
                        Instagram
                      </div>
                      <span>512 (18%)</span>
                    </div>
                    <div className="w-full bg-neutral-100 h-4 border border-black relative overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-neutral-400 transition-all"
                        style={{ width: '18%' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Posts */}
              <div className="bg-brand-neon border-2 border-black p-6 shadow-[4px_4px_0px_0px_#000] flex flex-col">
                <h3 className="font-bold uppercase text-sm mb-4">Top Posts</h3>
                <div className="flex-1 space-y-3 overflow-y-auto">
                  <div className="bg-white border-2 border-black p-3 hover:translate-x-1 transition-transform cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <Icon icon="carbon:logo-x" className="text-sm" />
                      <span className="text-[10px] font-mono bg-black text-white px-1">
                        4.2k Views
                      </span>
                    </div>
                    <p className="text-xs font-mono truncate">
                      Launching the new beta...
                    </p>
                  </div>

                  <div className="bg-white border-2 border-black p-3 hover:translate-x-1 transition-transform cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <Icon icon="carbon:logo-linkedin" className="text-sm" />
                      <span className="text-[10px] font-mono bg-black text-white px-1">
                        1.8k Views
                      </span>
                    </div>
                    <p className="text-xs font-mono truncate">
                      Design systems are hard...
                    </p>
                  </div>

                  <div className="bg-white border-2 border-black p-3 hover:translate-x-1 transition-transform cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <Icon icon="carbon:logo-x" className="text-sm" />
                      <span className="text-[10px] font-mono bg-black text-white px-1">
                        902 Views
                      </span>
                    </div>
                    <p className="text-xs font-mono truncate">
                      Just shipped v1.0.4!
                    </p>
                  </div>
                </div>
                <button className="mt-4 w-full bg-black text-white py-2 font-mono text-xs uppercase hover:bg-neutral-800 transition-colors">
                  View All
                </button>
              </div>
            </div>
          </div>

          <PageFooter />
        </div>
      </main>
    </div>
  );
};
