import type { Plan, PricingPlan } from '@/types/api';

/**
 * Maps a Plan from the backend API to PricingPlan format
 * for compatibility with existing PricingCard component
 */
export const mapPlanToPricingPlan = (plan: Plan): PricingPlan => {
  // Determine type - convert string to 'free' | 'paid'
  const planType: 'free' | 'paid' =
    plan.type.toLowerCase() === 'free' || plan.price === 0 ? 'free' : 'paid';

  return {
    id: plan.id,
    name: plan.name,
    code: plan.code,
    type: planType,
    currency: plan.currency,
    price: plan.price,
    days_valid: plan.days_valid,
    trial_days: plan.trial_days,
    is_recommended: plan.is_recommended,
    features: plan.features,
    description: plan.description,
    // Default values for fields not in Plan type
    monthly_posts_limit: -1, // Unlimited by default, can be inferred from features if needed
    is_eligible_schedule_post: true, // Default to true, can be inferred from plan type
    connected_accounts_limit: -1, // Unlimited by default, can be inferred from features if needed
  };
};

/**
 * Maps an array of Plans to PricingPlans
 */
export const mapPlansToPricingPlans = (plans: Plan[]): PricingPlan[] => {
  return plans.map(mapPlanToPricingPlan);
};
