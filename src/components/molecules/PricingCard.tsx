import type { HTMLAttributes } from 'react';
import { Icon } from '@iconify/react';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useAuthContext } from '@/contexts/auth-utils';
import type { PricingPlan } from '@/types/api';
import { cn } from '@/lib/utils';

export interface PricingCardProps extends HTMLAttributes<HTMLDivElement> {
  plan: PricingPlan;
  isRecommended?: boolean;
  isCurrent?: boolean;
  onSelect?: () => void;
  formatCurrency?: (amount: number, currency: string) => string;
}

const defaultFormatCurrency = (amount: number, currency: string = 'IDR') => {
  if (currency === 'IDR') {
    return `Rp ${(amount / 1000).toFixed(0)}k`;
  }
  return `${currency} ${amount}`;
};

export const PricingCard = ({
  className,
  plan,
  isRecommended = false,
  isCurrent = false,
  onSelect,
  formatCurrency = defaultFormatCurrency,
  ...props
}: PricingCardProps) => {
  const { user, isAuthenticated } = useAuthContext();
  const hasClaimTrial = user?.has_claim_trial ?? false;
  const getPlanIcon = (type: string) => {
    if (type === 'paid') return 'solar:crown-linear';
    return 'solar:user-linear';
  };

  return (
    <Card
      className={cn(
        'w-full md:w-80 lg:w-96 p-6 md:p-8 flex flex-col relative',
        isRecommended
          ? 'bg-[#222] text-white border-hard border-black shadow-[4px_4px_0px_0px_#000] transform md:-translate-y-2'
          : '',
        className
      )}
      {...props}
    >
      {isRecommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-black bg-brand-neon border-2 border-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap z-10">
          Recommended
        </div>
      )}
      <div className="flex justify-between items-start mb-4">
        <h3
          className={cn(
            'font-mono text-xs md:text-xl font-bold uppercase tracking-widest',
            isRecommended ? 'text-neutral-400' : 'text-neutral-500'
          )}
        >
          {plan.name}
        </h3>
        <Icon
          icon={getPlanIcon(plan.type)}
          className={cn(
            'text-4xl md:text-5xl lg:text-6xl',
            isRecommended
              ? 'text-neutral-500 opacity-30'
              : 'text-neutral-400 opacity-30'
          )}
        />
      </div>
      <div className="mb-4">
        <span
          className={cn(
            'text-3xl md:text-4xl font-bold tracking-tighter',
            isRecommended && 'text-white'
          )}
        >
          {formatCurrency(plan.price, plan.currency)}
        </span>
        <span
          className={cn(
            'text-lg font-mono',
            isRecommended ? 'text-neutral-400' : 'text-neutral-400'
          )}
        >
          /{plan.days_valid >= 30 ? 'mo' : '∞'}
        </span>
      </div>
      <ul
        className={cn(
          'space-y-2 md:space-y-3 font-mono text-xs mb-8 flex-1',
          isRecommended ? 'text-neutral-300' : 'text-neutral-600'
        )}
      >
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <Icon
              icon="solar:check-read-linear"
              className={isRecommended ? 'text-brand-neon' : ''}
            />
            {feature}
          </li>
        ))}
      </ul>

      {isCurrent ? (
        <Button
          variant="soft"
          disabled
          className="w-full opacity-50 cursor-not-allowed border-neutral-300 hover:opacity-50 hover:bg-white hover:text-black hover:border-neutral-300 hover:translate-x-0 hover:translate-y-0 hover:shadow-none"
        >
          Current Plan
        </Button>
      ) : plan.trial_days > 0 ? (
        hasClaimTrial ? (
          <Link to={isAuthenticated ? '/dashboard' : '/register'}>
            <Button
              variant="soft"
              onClick={onSelect}
              className={cn(
                'w-full',
                isRecommended
                  ? 'bg-brand-neon text-black hover:bg-brand-neon/80'
                  : ''
              )}
            >
              Upgrade to {plan.name}
            </Button>
          </Link>
        ) : (
          <div className="space-y-2">
            {isAuthenticated ? (
              <Button
                variant="soft"
                onClick={onSelect}
                className={cn(
                  'w-full',
                  isRecommended
                    ? 'bg-brand-neon text-black hover:bg-brand-neon/80'
                    : 'bg-black text-white hover:bg-brand-red'
                )}
              >
                Claim {plan.trial_days}-Day Trial
              </Button>
            ) : (
              <Link to="/register">
                <Button
                  variant="soft"
                  className={cn(
                    'w-full',
                    isRecommended
                      ? 'bg-brand-neon text-black hover:bg-brand-neon/80'
                      : 'bg-black text-white hover:bg-brand-red'
                  )}
                >
                  Claim {plan.trial_days}-Day Trial
                </Button>
              </Link>
            )}
            <p
              className={cn(
                'text-[9px] font-mono text-center mt-2',
                isRecommended ? 'text-neutral-400' : 'text-neutral-400'
              )}
            >
              No credit card required for trial
            </p>
          </div>
        )
      ) : (
        <Link to={isAuthenticated ? '/dashboard' : '/register'}>
          <Button
            variant="soft"
            onClick={onSelect}
            className={cn(
              'w-full',
              isRecommended
                ? 'bg-brand-neon text-black hover:bg-brand-neon/80'
                : ''
            )}
          >
            Upgrade to {plan.name}
          </Button>
        </Link>
      )}
    </Card>
  );
};
