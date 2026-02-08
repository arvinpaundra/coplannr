import { Icon } from '@iconify/react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Link } from '@tanstack/react-router';
import type { PricingPlan } from '@/types/api';

export interface LandingPricingCardProps {
  plan: PricingPlan;
  isRecommended?: boolean;
  formatCurrency?: (amount: number, currency: string) => string;
  navigateTo: string;
}

const defaultFormatCurrency = (amount: number, currency: string = 'IDR') => {
  if (currency === 'IDR') {
    return `Rp ${(amount / 1000).toFixed(0)}k`;
  }
  return `${currency} ${amount}`;
};

export const LandingPricingCard = ({
  plan,
  isRecommended = false,
  formatCurrency = defaultFormatCurrency,
  navigateTo,
}: LandingPricingCardProps) => {
  const isFree = plan.price === 0 || plan.type === 'free';
  const priceDisplay = formatCurrency(plan.price, plan.currency);
  const periodDisplay = plan.days_valid >= 30 ? '/MO' : '∞';

  if (isRecommended) {
    // Recommended plan - Red background with special styling
    return (
      <Card className="p-8 bg-brand-red text-white relative shadow-[8px_8px_0px_0px_#000] transform md:-translate-y-2 hover:shadow-[12px_12px_0px_0px_#000] hover:-translate-y-3 transition-all duration-300 group">
        {/* Best Value Badge */}
        <div className="absolute -top-4 -right-4 bg-brand-neon text-black text-[10px] font-bold px-4 py-2 uppercase font-mono border-2 border-black z-10 rotate-12 shadow-hard">
          Best Value
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 left-4 w-3 h-3 bg-brand-neon border border-black"></div>
        <div className="absolute bottom-4 right-4 w-3 h-3 bg-brand-neon border border-black"></div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-bold text-2xl uppercase text-white">
              {plan.name}
            </h3>
            <span className="text-xs font-mono bg-brand-neon text-black px-2 py-0.5 border border-black">
              RECOMMENDED
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold tracking-tighter text-white">
              {priceDisplay}
            </span>
            <span className="text-sm font-mono text-white/80">
              {periodDisplay}
            </span>
          </div>
        </div>

        {plan.description && (
          <div className="mb-6 p-4 bg-white/10 border-2 border-white/30 backdrop-blur-sm">
            <p className="font-mono text-xs text-white/90">
              {plan.description}
            </p>
          </div>
        )}

        <ul className="space-y-4 font-mono text-sm text-white mb-8">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-3 group/item">
              <div className="w-6 h-6 bg-white border-2 border-white flex items-center justify-center group-hover/item:bg-brand-neon group-hover/item:border-black transition-colors">
                <Icon
                  icon="solar:check-circle-bold"
                  className="text-sm text-brand-red group-hover/item:text-black transition-colors"
                />
              </div>
              <span className="font-bold">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="space-y-2">
          <Link to={navigateTo}>
            <Button
              variant="soft"
              className="w-full bg-white text-black border-white py-4 px-4 text-sm font-bold uppercase tracking-wider hover:bg-brand-neon hover:border-black transition-colors"
            >
              {plan.trial_days > 0 ? `Get Unlimited` : `Get ${plan.name}`}
            </Button>
          </Link>
          {plan.trial_days > 0 && (
            <p className="text-[9px] mt-2 font-mono text-center text-white/70 uppercase">
              Claim {plan.trial_days}-day trial • No credit card required
            </p>
          )}
        </div>
      </Card>
    );
  }

  // Regular plan - White background
  return (
    <Card className="p-8 relative hover:shadow-[6px_6px_0px_0px_#000] transition-all duration-300 hover:-translate-y-1 group">
      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-8 h-8 border-l-2 border-b-2 border-black opacity-20 group-hover:opacity-40 transition-opacity"></div>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-bold text-2xl uppercase">{plan.name}</h3>
          {isFree && (
            <span className="text-xs font-mono bg-brand-neon px-2 py-0.5 border border-black">
              FREE
            </span>
          )}
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-bold tracking-tighter">
            {priceDisplay}
          </span>
          <span className="text-sm font-mono text-neutral-400">
            {periodDisplay}
          </span>
        </div>
      </div>

      {plan.description && (
        <div className="mb-6 p-4 bg-neutral-50 border-2 border-dashed border-neutral-300">
          <p className="font-mono text-xs text-neutral-600">
            {plan.description}
          </p>
        </div>
      )}

      <ul className="space-y-4 font-mono text-sm text-neutral-700 mb-8">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-3 group/item">
            <div className="w-6 h-6 bg-green-100 border-2 border-green-600 flex items-center justify-center">
              <Icon
                icon="solar:check-circle-bold"
                className="text-sm text-green-600"
              />
            </div>
            <span className="font-bold">{feature}</span>
          </li>
        ))}
      </ul>

      <Link to={navigateTo}>
        <Button
          variant="soft"
          className="w-full py-4 px-4 text-sm font-bold uppercase tracking-wider hover:bg-brand-neon transition-colors"
        >
          {isFree ? 'Sign Up Free' : `Upgrade to ${plan.name}`}
        </Button>
      </Link>
    </Card>
  );
};
