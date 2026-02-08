import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '@/contexts/auth-utils';
import {
  getCurrentSubscription,
  getSubscriptionUsage,
  getSubscriptionHistories,
  claimTrial,
} from '@/lib/api/subscriptions';
import type { ApiResponse, Subscription } from '@/types/api';

/**
 * Hook to fetch current subscription
 * Checks AuthContext first for subscription from user response, then fetches full details if needed
 */
export const useCurrentSubscription = () => {
  const { user } = useAuthContext();

  return useQuery({
    queryKey: ['currentSubscription'],
    queryFn: async () => {
      const response = await getCurrentSubscription();
      if (response.meta.code === 200 && response.data) {
        return response.data;
      }
      // If no subscription found, return null
      if (response.meta.code === 404) {
        return null;
      }
      return null;
    },
    // Use subscription from user context as placeholder data if available
    placeholderData: user?.subscription
      ? {
          id: user.subscription.id,
          user_id: user.id,
          plan_id: user.subscription.plan_id,
          plan_name: user.subscription.plan_name,
          plan_code: user.subscription.plan_code,
          plan_type: user.subscription.plan_type,
          status: user.subscription.status,
          is_active: user.subscription.is_active,
          current_period_start: user.subscription.current_period_start,
          current_period_end: user.subscription.current_period_end,
          started_at: '', // Not available in UserSubscription
          ended_at: null,
          canceled_at: null,
        }
      : undefined,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};

/**
 * Hook to fetch subscription usage
 * Enabled only when subscriptionId is provided
 */
export const useSubscriptionUsage = (subscriptionId: string | null) => {
  return useQuery({
    queryKey: ['subscriptionUsage', subscriptionId],
    queryFn: async () => {
      if (!subscriptionId) return null;
      const response = await getSubscriptionUsage(subscriptionId);
      if (response.meta.code === 200 && response.data) {
        return response.data;
      }
      return null;
    },
    enabled: !!subscriptionId,
    staleTime: 2 * 60 * 1000, // 2 minutes (usage changes more frequently)
    retry: 1,
  });
};

/**
 * Hook to fetch subscription histories
 */
export const useSubscriptionHistories = () => {
  return useQuery({
    queryKey: ['subscriptionHistories'],
    queryFn: async () => {
      const response = await getSubscriptionHistories();
      if (response.meta.code === 200 && response.data) {
        return response.data;
      }
      return [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};

/**
 * Hook to claim trial for a plan
 */
export const useClaimTrial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (planCode: string) => claimTrial(planCode),
    onSuccess: (response: ApiResponse<Subscription>) => {
      if (response.meta.code === 200 || response.meta.code === 201) {
        // Invalidate subscription-related queries to refetch updated data
        queryClient.invalidateQueries({ queryKey: ['currentSubscription'] });
        queryClient.invalidateQueries({ queryKey: ['subscriptionHistories'] });
        queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      }
    },
  });
};
