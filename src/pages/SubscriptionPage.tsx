import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Sidebar } from '@/components/organisms/Sidebar';
import { Header } from '@/components/organisms/Header';
import { PageFooter } from '@/components/organisms/PageFooter';
import { BackgroundGrid } from '@/components/atoms/BackgroundGrid';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { PricingCard } from '@/components/molecules/PricingCard';
import { usePlans } from '@/hooks/usePlans';
import {
  useCurrentSubscription,
  useSubscriptionUsage,
  useSubscriptionHistories,
  useClaimTrial,
} from '@/hooks/useSubscriptions';
import type { PricingPlan } from '@/types/api';
import { cn } from '@/lib/utils';

export const SubscriptionPage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const claimTrialMutation = useClaimTrial();

  // Fetch subscription data
  const {
    data: subscription,
    isLoading: isLoadingSubscription,
    isError: isSubscriptionError,
  } = useCurrentSubscription();

  // Fetch usage data (only when subscription exists)
  const { data: usage, isLoading: isLoadingUsage } = useSubscriptionUsage(
    subscription?.id || null
  );

  // Fetch subscription histories
  const { data: subscriptionHistories, isLoading: isLoadingHistories } =
    useSubscriptionHistories();

  // Fetch plans
  const { data: plansData, isLoading: isLoadingPlans } = usePlans();

  // Transform plans data to PricingPlan format
  const plans: PricingPlan[] =
    plansData?.map((plan) => ({
      id: plan.id,
      name: plan.name,
      code: plan.code,
      type: plan.type === 'free' ? 'free' : 'paid',
      currency: plan.currency,
      price: plan.price,
      days_valid: plan.days_valid,
      trial_days: plan.trial_days,
      is_recommended: plan.is_recommended,
      features: plan.features,
      description: plan.description || null,
      monthly_posts_limit: -1, // Will be mapped from plan if available
      is_eligible_schedule_post: false, // Will be mapped from plan if available
      connected_accounts_limit: -1, // Will be mapped from plan if available
    })) || [];

  const handleClaimTrial = (planCode: string) => {
    if (claimTrialMutation.isPending) return;

    setErrorMessage('');

    claimTrialMutation.mutate(planCode, {
      onSuccess: (response) => {
        if (response.meta.code === 200 || response.meta.code === 201) {
          // Success - queries will be invalidated automatically
          setErrorMessage('');
        } else {
          setErrorMessage(
            response.meta.message || 'Failed to claim trial. Please try again.'
          );
        }
      },
      onError: (error: unknown) => {
        const apiError = error as {
          response?: { data?: { meta?: { message?: string } } };
        };
        setErrorMessage(
          apiError?.response?.data?.meta?.message ||
            'Failed to claim trial. Please try again.'
        );
      },
    });
  };

  const handleCancel = () => {
    if (claimTrialMutation.isPending) return;
    if (
      !confirm(
        'Are you sure you want to cancel your subscription? You will lose access to premium features.'
      )
    )
      return;

    // TODO: Implement cancel subscription API call
    alert(
      'Subscription would be cancelled here. (Mock mode - API integration removed)'
    );
  };

  const handleDowngrade = () => {
    if (claimTrialMutation.isPending) return;
    if (
      !confirm(
        'Are you sure you want to downgrade to Free? Your premium features will be disabled.'
      )
    )
      return;

    // TODO: Implement downgrade subscription API call
    alert(
      'Would downgrade to Free plan here. (Mock mode - API integration removed)'
    );
  };

  const formatCurrency = (amount: number, currency: string = 'IDR') => {
    if (currency === 'IDR') {
      return `Rp ${(amount / 1000).toFixed(0)}k`;
    }
    return `${currency} ${amount}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getUsagePercentage = () => {
    if (!usage) return 0;
    if (usage.max_posts_created === -1 || usage.max_posts_created === 0) {
      return 0; // Unlimited
    }
    return (usage.posts_created / usage.max_posts_created) * 100;
  };

  const isLoading =
    isLoadingSubscription ||
    isLoadingUsage ||
    isLoadingHistories ||
    isLoadingPlans;

  return (
    <div className="flex h-screen w-screen">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#f8f8f8] relative">
        <BackgroundGrid opacity={0.2} size={20} />

        {/* Top Header */}
        <Header title="SUBSCRIPTION" badge="Billing & Plans" />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 z-10">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header Section */}
            <div className="relative">
              <div className="border-b-2 border-black pb-6">
                <h1 className="text-4xl font-bold uppercase tracking-tight mb-3">
                  Subscription & Billing
                </h1>
                <p className="font-mono text-sm text-neutral-600 max-w-2xl">
                  Manage your subscription plan, view billing history, and
                  upgrade features.
                </p>
              </div>
            </div>

            {/* Current Plan Summary */}
            {isLoading ? (
              <Card className="p-6 md:p-8 relative overflow-hidden border-2 border-black">
                <div className="animate-pulse">
                  <div className="h-4 bg-neutral-200 rounded w-1/4 mb-4"></div>
                  <div className="h-8 bg-neutral-200 rounded w-1/3 mb-4"></div>
                  <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
                </div>
              </Card>
            ) : isSubscriptionError ? (
              <Card className="p-6 md:p-8 relative overflow-hidden border-2 border-black">
                <div className="text-center">
                  <Icon
                    icon="solar:danger-triangle-linear"
                    className="text-4xl text-brand-red mx-auto mb-4"
                  />
                  <p className="font-mono text-sm text-neutral-600">
                    Error loading subscription. Please try again.
                  </p>
                </div>
              </Card>
            ) : subscription ? (
              <Card className="p-6 md:p-8 relative overflow-hidden border-2 border-black">
                {/* Decorative accent line at top */}
                <div className="absolute top-0 left-0 w-full h-2 bg-brand-neon -translate-y-px"></div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                  <div>
                    <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">
                      Current Plan
                    </h3>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl font-bold">
                        {subscription.plan_name}
                      </span>
                      <span
                        className={cn(
                          'border-2 border-black text-[10px] font-bold px-3 py-1 uppercase font-mono',
                          subscription.status === 'active' &&
                            subscription.plan_type === 'paid'
                            ? 'bg-brand-neon text-black'
                            : subscription.status === 'active'
                            ? 'bg-black text-white'
                            : 'bg-neutral-200 text-neutral-600 border-dashed'
                        )}
                      >
                        {subscription.status}
                      </span>
                    </div>
                    <p className="font-mono text-sm text-neutral-600 mt-2 max-w-lg">
                      {subscription.plan_type === 'free'
                        ? 'You are currently on the free tier. Upgrade to unlock unlimited posts and multi-platform scheduling.'
                        : 'Thank you for being a premium member!'}
                    </p>
                  </div>
                  <div className="text-right hidden md:block border-2 border-black p-4 bg-neutral-50">
                    <div className="font-mono text-xs text-neutral-500 uppercase mb-1">
                      End of Subscription
                    </div>
                    <div className="font-bold text-lg">
                      {subscription.current_period_end
                        ? formatDate(subscription.current_period_end)
                        : 'N/A'}
                    </div>
                  </div>
                </div>

                {/* Usage Bar */}
                {usage &&
                  usage.max_posts_created !== -1 &&
                  usage.max_posts_created !== 0 && (
                    <div className="mt-8 pt-6 border-t-2 border-dashed border-neutral-200">
                      <div className="flex justify-between text-xs font-mono font-bold mb-2 uppercase">
                        <span className="text-neutral-600">
                          Monthly Posts Usage
                        </span>
                        <span className="text-black">
                          {usage.posts_created} / {usage.max_posts_created}
                        </span>
                      </div>
                      <div className="w-full h-5 border-2 border-black p-0.5 bg-white">
                        <div
                          className="h-full bg-brand-red transition-all border-r border-black"
                          style={{
                            width: `${Math.min(getUsagePercentage(), 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
              </Card>
            ) : (
              <Card className="p-6 md:p-8 relative overflow-hidden border-2 border-black">
                <div className="text-center">
                  <Icon
                    icon="solar:card-linear"
                    className="text-6xl text-neutral-300 mx-auto mb-4"
                  />
                  <p className="font-mono text-sm text-neutral-400 uppercase mb-4">
                    No active subscription
                  </p>
                  <p className="font-mono text-xs text-neutral-500">
                    Choose a plan below to get started.
                  </p>
                </div>
              </Card>
            )}

            {/* Error Message */}
            {errorMessage && (
              <Card className="p-4 border-2 border-brand-red bg-red-50/30">
                <div className="flex items-start gap-3">
                  <Icon
                    icon="solar:danger-triangle-linear"
                    className="text-xl text-brand-red shrink-0 mt-0.5"
                  />
                  <div className="flex-1">
                    <p className="font-mono text-sm text-neutral-600">
                      {errorMessage}
                    </p>
                  </div>
                  <button
                    onClick={() => setErrorMessage('')}
                    className="text-neutral-400 hover:text-neutral-600"
                  >
                    <Icon
                      icon="solar:close-circle-linear"
                      className="text-xl"
                    />
                  </button>
                </div>
              </Card>
            )}

            {/* Plans Grid */}
            <div>
              <h2 className="text-2xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                <Icon
                  icon="solar:shop-linear"
                  className="text-2xl text-black"
                />
                Available Plans
              </h2>

              {isLoadingPlans ? (
                <div className="flex justify-center items-center gap-6">
                  <div className="animate-pulse">
                    <div className="h-64 w-64 bg-neutral-200 rounded border-2 border-black"></div>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center items-center md:flex-row flex-col gap-6">
                  {plans.map((plan: PricingPlan) => (
                    <PricingCard
                      key={plan.id}
                      plan={plan}
                      isRecommended={plan.is_recommended}
                      isCurrent={subscription?.plan_code === plan.code}
                      onSelect={() => handleClaimTrial(plan.code)}
                      formatCurrency={formatCurrency}
                    />
                  ))}
                </div>
              )}
              {claimTrialMutation.isPending && (
                <div className="mt-4 text-center">
                  <p className="font-mono text-sm text-neutral-500">
                    Processing your trial request...
                  </p>
                </div>
              )}
            </div>

            {/* Danger Zone */}
            {subscription?.plan_type === 'paid' && (
              <div className="border-2 border-dashed border-brand-red p-6 flex flex-col md:flex-row justify-between items-center gap-4 bg-red-50/30">
                <div className="flex items-start gap-3">
                  <Icon
                    icon="solar:danger-triangle-linear"
                    className="text-2xl text-brand-red shrink-0 mt-0.5"
                  />
                  <div>
                    <h4 className="font-bold text-sm uppercase mb-1">
                      Downgrade or Cancel
                    </h4>
                    <p className="font-mono text-xs text-neutral-600">
                      Need to take a break? You can downgrade to Free or cancel
                      your subscription.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="secondary"
                    onClick={handleDowngrade}
                    disabled={claimTrialMutation.isPending}
                    className="font-mono text-xs uppercase border-2 border-black hover:bg-black hover:text-white transition-colors disabled:opacity-50"
                  >
                    Downgrade to Free
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleCancel}
                    disabled={claimTrialMutation.isPending}
                    className="font-mono text-xs font-bold text-white uppercase border-2 border-brand-red bg-brand-red hover:bg-black hover:border-black transition-colors disabled:opacity-50"
                  >
                    Cancel Subscription
                  </Button>
                </div>
              </div>
            )}

            {/* Billing History */}
            <div>
              <h2 className="text-2xl mb-6 font-bold uppercase tracking-tight flex items-center gap-3">
                <Icon
                  icon="solar:history-linear"
                  className="text-2xl text-black"
                />
                Subscription History
              </h2>

              <Card className="overflow-hidden border-2 border-black p-0">
                {/* Table Header */}
                <div className="hidden md:grid grid-cols-4 border-b-2 border-black bg-brand-neon/20 p-4 font-mono text-xs font-bold uppercase tracking-widest text-neutral-700">
                  <div className="col-span-2">Date</div>
                  <div className="col-span-1">Type</div>
                  <div className="col-span-1">Plan Change</div>
                </div>

                {/* Table Rows */}
                {isLoadingHistories ? (
                  <div className="p-8 text-center">
                    <div className="animate-pulse">
                      <div className="h-4 bg-neutral-200 rounded w-1/2 mx-auto mb-2"></div>
                      <div className="h-4 bg-neutral-200 rounded w-1/3 mx-auto"></div>
                    </div>
                  </div>
                ) : !subscriptionHistories ||
                  subscriptionHistories.length === 0 ? (
                  <div className="p-8 text-center">
                    <Icon
                      icon="solar:file-text-linear"
                      className="text-6xl text-neutral-300 mx-auto mb-2"
                    />
                    <p className="font-mono text-sm text-neutral-400 uppercase">
                      No subscription history yet
                    </p>
                  </div>
                ) : (
                  subscriptionHistories.map((record) => {
                    const getPlanChangeText = () => {
                      if (record.type === 'created' && record.new_plan_name) {
                        return `Started ${record.new_plan_name}`;
                      }
                      if (
                        record.type === 'upgrade' ||
                        record.type === 'downgrade'
                      ) {
                        if (record.previous_plan_name && record.new_plan_name) {
                          return `${record.previous_plan_name} → ${record.new_plan_name}`;
                        }
                        if (record.new_plan_name) {
                          return `Changed to ${record.new_plan_name}`;
                        }
                      }
                      if (record.type === 'canceled') {
                        return 'Cancelled';
                      }
                      return record.type;
                    };

                    return (
                      <div
                        key={record.id}
                        className="grid grid-cols-1 md:grid-cols-4 p-4 border-b-2 border-dashed border-neutral-200 hover:bg-brand-neon/10 transition-colors gap-2 md:gap-0 items-center last:border-b-0"
                      >
                        <div className="col-span-2 font-mono text-sm font-bold flex flex-col">
                          <span>{formatDate(record.created_at)}</span>
                          <span className="text-[10px] text-neutral-400 font-normal uppercase md:hidden">
                            Date
                          </span>
                        </div>
                        <div className="col-span-1 flex flex-col">
                          <span className="font-mono text-sm capitalize">
                            {record.type}
                          </span>
                          <span className="text-[10px] text-neutral-400 font-normal uppercase md:hidden">
                            Type
                          </span>
                        </div>
                        <div className="col-span-1 flex flex-col">
                          <span className="font-mono text-sm">
                            {getPlanChangeText()}
                          </span>
                          <span className="text-[10px] text-neutral-400 font-normal uppercase md:hidden">
                            Plan Change
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </Card>

              <div className="mt-8 text-center">
                <p className="font-mono text-[10px] text-neutral-400 uppercase">
                  Secure payments processed by Stripe. All prices in IDR.
                </p>
              </div>
            </div>

            <PageFooter />
          </div>
        </div>
      </main>
    </div>
  );
};
