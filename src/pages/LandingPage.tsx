import { Icon } from '@iconify/react';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Link } from '@tanstack/react-router';

export const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <header className="relative bg-white border-hard-b flex flex-col lg:flex-row min-h-[90vh]">
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
            <Button variant="secondary" className="px-8 py-4 text-base">
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
      <section className="bg-brand-red text-white border-hard-b p-8 md:p-16 lg:p-24 selection:bg-black selection:text-white">
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
      <section className="bg-white border-hard-b flex flex-col md:flex-row">
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

      {/* How It Works */}
      <section className="border-hard-b">
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
      <section className="bg-[#f0f0f0] p-8 md:p-20 border-hard-b">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-12 uppercase">
            Built for reliability,
            <br />
            not hype.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Multi-platform posting',
                desc: 'Publish to multiple social platforms from a single source of truth.',
              },
              {
                title: 'Scheduled publishing',
                desc: 'Posts go out when you want, not when you remember to click send.',
              },
              {
                title: 'Per-platform control',
                desc: 'Different character limits? Different rules? Fully supported.',
              },
              {
                title: 'Retry & failure handling',
                desc: 'If an API fails, the post is queued, retried, and logged for review.',
              },
              {
                title: 'Posting history',
                desc: 'Every action is recorded. Full audit trail of your content distribution.',
              },
            ].map((feature) => (
              <Card key={feature.title} className="p-6">
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="font-mono text-sm text-neutral-600">
                  {feature.desc}
                </p>
              </Card>
            ))}
            <Card className="p-6 bg-brand-neon flex items-center justify-center">
              <span className="font-mono text-black font-bold uppercase tracking-widest text-center">
                More Infra
                <br />
                Coming Soon
              </span>
            </Card>
          </div>
        </div>
      </section>

      {/* Who is this for */}
      <section className="border-hard-b flex flex-col md:flex-row">
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
      <section className="bg-black text-white py-24 px-6 border-hard-b text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-brand-red via-brand-neon to-brand-red" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 uppercase leading-none">
            Stop reposting.
            <br />
            <span className="text-brand-red">Start scheduling.</span>
          </h2>

          <Link to="/register">
            <Button
              variant="secondary"
              className="text-lg md:text-xl py-5 px-10 shadow-[8px_8px_0px_0px_#ff3333]! hover:bg-white active:shadow-none!"
            >
              Get Started
            </Button>
          </Link>

          <p className="font-mono text-xs text-neutral-400 mt-8 uppercase tracking-widest">
            Set up takes less than 5 minutes.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};
