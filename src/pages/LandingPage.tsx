import { Icon } from '@iconify/react';
import { Navigation } from '@/components/organisms/Navigation';
import { Footer } from '@/components/organisms/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FeatureCard } from '@/components/molecules/FeatureCard';
import { LandingPricingCard } from '@/components/molecules/LandingPricingCard';
import { Link } from '@tanstack/react-router';
import { useAuthContext } from '@/contexts/auth-utils';
import { useScrollToSection } from '@/hooks/useScrollToSection';
import { usePlans } from '@/hooks/usePlans';
import { mapPlansToPricingPlans } from '@/lib/utils/plan-mapper';

export const LandingPage = () => {
  const { isAuthenticated } = useAuthContext();
  const scrollToSection = useScrollToSection();
  const {
    data: plans,
    isLoading: isLoadingPlans,
    error: plansError,
  } = usePlans();

  // Map plans to PricingPlan format
  const pricingPlans = plans ? mapPlansToPricingPlans(plans) : [];

  // Determine navigation route based on authentication status
  const getNavigationRoute = () => {
    return isAuthenticated ? '/subscription' : '/register';
  };

  // Format currency function
  const formatCurrency = (amount: number, currency: string = 'IDR') => {
    if (currency === 'IDR') {
      return `Rp ${(amount / 1000).toFixed(0)}k`;
    }
    if (currency === 'USD') {
      return `$${amount}`;
    }
    return `${currency} ${amount}`;
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <header
        id="hero"
        className="relative bg-white border-hard-b flex flex-col lg:flex-row min-h-[90vh]"
      >
        <div className="w-full lg:w-2/3 p-6 md:p-12 lg:p-20 flex flex-col justify-center border-hard-b lg:border-b-0 lg:border-hard-r">
          <div className="inline-block bg-brand-neon border-2 border-black px-2 py-1 mb-6 w-max shadow-hard">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-black">
              v.1.0 Beta
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-8 uppercase">
            Post once.
            <br />
            <span className="text-neutral-400">Publish everywhere.</span>
          </h1>

          <p className="font-mono text-base md:text-lg text-neutral-800 max-w-xl mb-10 leading-relaxed border-l-4 border-brand-red pl-4">
            Schedule and publish content to multiple social platforms from one
            control panel. No spreadsheets. No manual reposting.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <Link to="/register">
              <Button className="px-8 py-4 text-base">
                Start scheduling posts
              </Button>
            </Link>
            <Button
              variant="secondary"
              className="px-8 py-4 text-base"
              onClick={() => scrollToSection('how-it-works')}
            >
              View how it works
            </Button>
          </div>
          <p className="font-mono text-xs text-neutral-500 uppercase tracking-wide mt-2">
            No credit card required.
          </p>
        </div>

        <div className="w-full lg:w-1/3 bg-[#f0f0f0] relative overflow-hidden flex items-center justify-center p-8">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
              backgroundSize: '16px 16px',
            }}
          />

          <div className="relative w-full max-w-xs bg-white border-hard shadow-hard p-4 rotate-3 hover:rotate-0 transition-transform duration-500">
            <div className="flex justify-between items-center border-b-2 border-black pb-2 mb-4">
              <span className="font-mono text-xs font-bold">STATUS: IDLE</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-full border-2 border-black bg-brand-neon" />
                <div className="w-3 h-3 rounded-full border-2 border-black bg-brand-neon" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-8 bg-neutral-100 border-2 border-black w-3/4" />
              <div className="h-8 bg-neutral-100 border-2 border-black w-full" />
              <div className="h-8 bg-brand-red border-2 border-black w-1/2" />
            </div>
            <div className="mt-4 pt-2 border-t-2 border-black flex justify-between font-mono text-[10px]">
              <span className="bg-black text-brand-neon px-1">CPU: 12%</span>
              <span>MEM: 40MB</span>
            </div>
          </div>
        </div>
      </header>

      {/* Problem Section */}
      <section
        id="problem"
        className="bg-brand-red text-white border-hard-b p-8 md:p-16 lg:p-24 selection:bg-black selection:text-white"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-12">
            POSTING EVERYWHERE IS STILL MANUAL.
          </h2>

          <div className="grid md:grid-cols-2 gap-12 font-mono text-lg md:text-xl border-l-4 border-black pl-8">
            <ul className="space-y-6">
              <li className="flex items-start gap-3">
                <Icon
                  icon="solar:close-square-linear"
                  className="text-2xl mt-1 text-black"
                />
                <span>You write the same post again and again.</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon
                  icon="solar:close-square-linear"
                  className="text-2xl mt-1 text-black"
                />
                <span>You upload the same video multiple times.</span>
              </li>
            </ul>
            <ul className="space-y-6">
              <li className="flex items-start gap-3">
                <Icon
                  icon="solar:close-square-linear"
                  className="text-2xl mt-1 text-black"
                />
                <span>You forget what was posted where.</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon
                  icon="solar:close-square-linear"
                  className="text-2xl mt-1 text-black"
                />
                <span>You miss optimal schedules.</span>
              </li>
            </ul>
          </div>

          <div className="mt-16 font-mono text-sm md:text-base border-t-2 border-black pt-4 inline-block text-black font-bold">
            — THIS SHOULD NOT BE NORMAL.
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section
        id="solution"
        className="bg-white border-hard-b flex flex-col md:flex-row"
      >
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center border-hard-b md:border-b-0 md:border-hard-r">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            ONE CONTROL PANEL FOR ALL YOUR POSTS.
          </h2>
          <div className="font-mono text-neutral-600 space-y-4 text-base md:text-lg">
            <p>Create content once.</p>
            <p>Choose platforms.</p>
            <p>Schedule it.</p>
            <p className="text-black font-bold decoration-brand-neon underline decoration-4 underline-offset-4">
              We handle the rest.
            </p>
          </div>
          <div className="mt-8 p-4 bg-neutral-100 border-2 border-black inline-block">
            <p className="font-mono text-xs uppercase tracking-tight">
              Every post is tracked. Every failure is visible.
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-white p-8 md:p-16 flex items-center justify-center">
          <div className="w-full max-w-md border-hard shadow-hard bg-white relative">
            <div className="border-b-2 border-black bg-neutral-100 p-2 flex justify-between items-center">
              <div className="text-[10px] font-mono font-bold">
                DASHBOARD.EXE
              </div>
              <div className="w-3 h-3 border-2 border-black bg-brand-red" />
            </div>
            <div className="p-4 space-y-4">
              <div className="flex gap-2">
                <div className="w-8 h-8 border-2 border-black flex items-center justify-center bg-brand-red text-white font-bold text-xs">
                  X
                </div>
                <div className="w-8 h-8 border-2 border-black flex items-center justify-center bg-brand-neon font-bold text-xs text-black">
                  In
                </div>
                <div className="w-8 h-8 border-2 border-black flex items-center justify-center font-bold text-xs">
                  Fb
                </div>
              </div>
              <div className="h-24 border-2 border-black p-2 font-mono text-xs text-neutral-400">
                Type your content here...
              </div>
              <div className="flex justify-between items-center pt-2">
                <div className="h-8 w-24 border-2 border-black bg-neutral-200" />
                <div className="h-8 w-24 border-2 border-black bg-black" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section
        id="platforms"
        className="border-hard-b bg-[#f8f8f8] p-12 md:p-16"
      >
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-2 h-2 bg-brand-red rounded-full" />
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-600">
              Supported Platforms
            </h3>
            <div className="w-2 h-2 bg-brand-red rounded-full" />
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {/* Facebook */}
            <div className="bg-white border-hard px-6 py-4 flex items-center gap-3 shadow-hard-sm hover:shadow-hard transition-all group cursor-default">
              <div className="w-8 h-8 bg-[#1877F2] border-2 border-black flex items-center justify-center text-white">
                <Icon icon="ri:facebook-fill" />
              </div>
              <span className="font-bold uppercase tracking-tight text-lg">
                Facebook
              </span>
            </div>

            {/* Instagram */}
            <div className="bg-white border-hard px-6 py-4 flex items-center gap-3 shadow-hard-sm hover:shadow-hard transition-all group cursor-default">
              <div className="w-8 h-8 bg-linear-to-tr from-yellow-400 to-purple-600 border-2 border-black flex items-center justify-center text-white">
                <Icon icon="ri:instagram-line" />
              </div>
              <span className="font-bold uppercase tracking-tight text-lg">
                Instagram
              </span>
            </div>

            {/* Threads */}
            <div className="bg-white border-hard px-6 py-4 flex items-center gap-3 shadow-hard-sm hover:shadow-hard transition-all group cursor-default">
              <div className="w-8 h-8 bg-black border-2 border-black flex items-center justify-center text-white">
                <Icon icon="ri:threads-fill" />
              </div>
              <span className="font-bold uppercase tracking-tight text-lg">
                Threads
              </span>
            </div>

            {/* Coming Soon */}
            <div className="bg-brand-neon border-2 border-black border-dashed px-6 py-4 flex items-center gap-3 opacity-60">
              <Icon icon="solar:add-square-linear" className="text-xl" />
              <span className="font-mono text-xs font-bold uppercase">
                More Socials Soon
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="border-hard-b">
        <div className="bg-black text-white p-4 border-b-2 border-white flex justify-between items-center">
          <h2 className="text-xl font-mono uppercase tracking-widest">
            How it works
          </h2>
          <div className="w-3 h-3 bg-brand-neon" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-white">
          {[
            {
              num: '01',
              title: 'Create a post',
              desc: 'Write text. Upload media. Pick your target platforms from the list.',
            },
            {
              num: '02',
              title: 'Schedule it',
              desc: 'Choose a time. Set frequency rules per platform to maximize reach.',
            },
            {
              num: '03',
              title: 'We publish',
              desc: 'Posts are dispatched at the right time. Retries happen automatically.',
            },
            {
              num: '04',
              title: 'Track status',
              desc: 'See what was posted, where, and why something failed immediately.',
            },
          ].map((step, i, arr) => (
            <div
              key={step.num}
              className={`p-8 hover:bg-[#fff9f9] transition-colors group ${
                i < arr.length - 1
                  ? 'border-b-2 md:border-b-0 md:border-r-2 border-black'
                  : ''
              }`}
            >
              <span className="block text-6xl font-bold text-brand-red mb-4 group-hover:translate-x-2 transition-transform">
                {step.num}
              </span>
              <h3 className="text-xl font-bold uppercase mb-2">{step.title}</h3>
              <p className="font-mono text-sm text-neutral-600 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="bg-[#f0f0f0] p-8 md:p-20 border-hard-b relative overflow-hidden"
      >
        {/* Decorative background elements */}
        <div className="absolute top-20 left-0 w-32 h-32 bg-brand-neon opacity-5 rotate-45 -translate-x-16"></div>
        <div className="absolute bottom-20 right-0 w-40 h-40 bg-brand-red opacity-5 -rotate-45 translate-x-20"></div>
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Enhanced Header */}
          <div className="mb-16 text-center">
            <div className="inline-block mb-4">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-3 h-3 bg-brand-red border-2 border-black"></div>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight uppercase">
                  Features
                </h2>
                <div className="w-3 h-3 bg-brand-red border-2 border-black"></div>
              </div>
              <div className="h-1 bg-black w-32 mx-auto"></div>
            </div>
            <p className="font-mono text-sm md:text-base text-neutral-600 uppercase tracking-widest mt-4">
              Built for reliability, not hype
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="group">
              <FeatureCard
                icon="solar:users-group-two-rounded-bold"
                title="Multi-Account"
                description="Manage unlimited handles across different platforms without switching tabs."
                className="h-full hover:shadow-[6px_6px_0px_0px_#000] hover:-translate-y-1 transition-all duration-300"
              />
            </div>
            <div className="group">
              <FeatureCard
                icon="solar:calendar-grid-bold"
                title="Unified Calendar"
                description="Drag-and-drop your posts across a visual grid to reorganize your strategy instantly."
                className="h-full hover:shadow-[6px_6px_0px_0px_#000] hover:-translate-y-1 transition-all duration-300"
              />
            </div>
            <div className="group">
              <FeatureCard
                icon="solar:chart-bold"
                title="Analytics Hub"
                description="Deep-dive into performance metrics with filterable data exports for engineers."
                className="h-full hover:shadow-[6px_6px_0px_0px_#000] hover:-translate-y-1 transition-all duration-300"
              />
            </div>
            <div className="group">
              <FeatureCard
                icon="solar:star-bold"
                title="Collaboration"
                description="Invite your team to review, edit, and approve drafts before they go live."
                className="h-full hover:shadow-[6px_6px_0px_0px_#000] hover:-translate-y-1 transition-all duration-300"
              />
            </div>
            <div className="group">
              <FeatureCard
                icon="solar:gallery-download-bold"
                title="Media Library"
                description="Cloud-synced storage for all your assets, tagged and ready for deployment."
                className="h-full hover:shadow-[6px_6px_0px_0px_#000] hover:-translate-y-1 transition-all duration-300"
              />
            </div>
            <div className="group">
              <FeatureCard
                icon="solar:magic-stick-3-bold"
                title="AI Captions"
                description="Coming Soon: Generate platform-optimized copy based on your media assets."
                isHighlighted={true}
                badge="ALPHA"
                className="h-full hover:shadow-[6px_6px_0px_0px_#000] hover:-translate-y-1 transition-all duration-300"
              />
            </div>
          </div>

          {/* Bottom accent */}
          <div className="mt-16 flex items-center justify-center gap-4">
            <div className="h-px bg-black flex-1 max-w-24"></div>
            <div className="w-2 h-2 bg-brand-red border border-black"></div>
            <div className="h-px bg-black flex-1 max-w-24"></div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="bg-[#f0f0f0] p-8 md:p-20 border-hard-b relative overflow-hidden"
      >
        <div className="max-w-5xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-2 h-2 bg-brand-red"></div>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight uppercase">
                  Pricing
                </h2>
                <div className="w-2 h-2 bg-brand-red"></div>
              </div>
              <div className="h-1 bg-black w-24 mx-auto"></div>
            </div>
            <p className="font-mono text-sm md:text-base text-neutral-600 uppercase tracking-widest">
              Choose Your Power Level
            </p>
          </div>

          {/* 2 Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start justify-center">
            {isLoadingPlans ? (
              // Loading state - show skeleton or placeholder
              <>
                <Card className="p-8 animate-pulse">
                  <div className="h-8 bg-neutral-200 rounded mb-4"></div>
                  <div className="h-12 bg-neutral-200 rounded mb-6"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-neutral-200 rounded"></div>
                    <div className="h-4 bg-neutral-200 rounded"></div>
                    <div className="h-4 bg-neutral-200 rounded"></div>
                  </div>
                </Card>
                <Card className="p-8 animate-pulse">
                  <div className="h-8 bg-neutral-200 rounded mb-4"></div>
                  <div className="h-12 bg-neutral-200 rounded mb-6"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-neutral-200 rounded"></div>
                    <div className="h-4 bg-neutral-200 rounded"></div>
                    <div className="h-4 bg-neutral-200 rounded"></div>
                  </div>
                </Card>
              </>
            ) : plansError || pricingPlans.length === 0 ? (
              // Error state or no plans - show fallback message
              <div className="col-span-2 text-center py-12">
                <p className="font-mono text-sm text-neutral-600">
                  Unable to load pricing plans. Please try again later.
                </p>
              </div>
            ) : (
              // Render pricing cards from API with original landing page design
              pricingPlans.map((plan) => (
                <LandingPricingCard
                  key={plan.id}
                  plan={plan}
                  isRecommended={plan.is_recommended}
                  formatCurrency={formatCurrency}
                  navigateTo={getNavigationRoute()}
                />
              ))
            )}
          </div>

          {/* Bottom note */}
          <div className="mt-12 text-center">
            <p className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
              No hidden fees • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Who is this for */}
      <section
        id="audience"
        className="border-hard-b flex flex-col md:flex-row"
      >
        <div className="w-full md:w-1/2 border-hard-b md:border-b-0 md:border-hard-r p-12 bg-white">
          <h3 className="font-mono text-xs font-bold uppercase text-neutral-400 mb-6 tracking-widest">
            TARGET AUDIENCE
          </h3>
          <h2 className="text-3xl font-bold mb-8 text-brand-red">GOOD FIT</h2>
          <ul className="space-y-4 font-mono text-sm md:text-base">
            {[
              'Creators managing multiple platforms',
              'Marketing teams',
              'Operators who care about control',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <div className="w-4 h-4 bg-black" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full md:w-1/2 p-12 bg-neutral-100">
          <h3 className="font-mono text-xs font-bold uppercase text-neutral-400 mb-6 tracking-widest">
            EXCLUSIONS
          </h3>
          <h2 className="text-3xl font-bold mb-8 text-neutral-500">NOT FOR</h2>
          <ul className="space-y-4 font-mono text-sm md:text-base text-neutral-500">
            {[
              'People chasing viral hacks',
              'One-off posting',
              'Analytics-only users',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <div className="w-4 h-4 border-2 border-neutral-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative border-hard-b overflow-hidden">
        {/* Top border */}
        <div className="h-0.5 bg-black"></div>

        {/* Main content area with gray dotted sides */}
        <div className="relative">
          {/* Gray dotted background on sides */}
          <div
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#666 1px, transparent 1px)',
              backgroundSize: '16px 16px',
              backgroundPosition: '0 0',
            }}
          />

          {/* Blue vertical lines */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-400 z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-blue-400 z-10"></div>

          {/* Yellow content block */}
          <div className="relative z-20 bg-brand-neon py-16 md:py-20 px-6 md:px-12">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col items-start gap-8">
                {/* Text content */}
                <div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 uppercase italic">
                    Ready to Stop Repeating Yourself?
                  </h2>
                  <div className="flex items-start gap-3 mb-6">
                    <div className="w-1 h-6 bg-black mt-1"></div>
                    <p className="font-mono text-base md:text-lg text-black">
                      Secure your access to the unified social engine.
                    </p>
                  </div>
                </div>

                {/* CTA Button */}
                <div>
                  <Link to="/register">
                    <Button className="bg-black text-white border-2 border-black px-12 py-4 font-mono text-sm md:text-base uppercase whitespace-nowrap shadow-[2px_2px_0px_0px_#000] hover:bg-brand-red hover:text-white hover:shadow-[4px_4px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all">
                      Get Access
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom border */}
        <div className="h-0.5 bg-black"></div>
      </section>

      <Footer />
    </div>
  );
};
