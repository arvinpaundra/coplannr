import { apiClient, handleApiError } from './axios';
import type {
  ApiResponse,
  Subscription,
  Usage,
  SubscriptionHistory,
} from '@/types/api';

/**
 * Get current active subscription
 * GET /v1/subscriptions/current
 */
export const getCurrentSubscription = async (): Promise<
  ApiResponse<Subscription>
> => {
  try {
    const response = await apiClient.get<ApiResponse<Subscription>>(
      '/v1/subscriptions/current'
    );
    return response.data;
  } catch (error) {
    return handleApiError(error) as ApiResponse<Subscription>;
  }
};

/**
 * Get subscription usage data
 * GET /v1/subscriptions/:id/usage
 */
export const getSubscriptionUsage = async (
  subscriptionId: string
): Promise<ApiResponse<Usage>> => {
  try {
    const response = await apiClient.get<ApiResponse<Usage>>(
      `/v1/subscriptions/${subscriptionId}/usage`
    );
    return response.data;
  } catch (error) {
    return handleApiError(error) as ApiResponse<Usage>;
  }
};

/**
 * Get subscription histories
 * GET /v1/subscriptions/histories
 */
export const getSubscriptionHistories = async (): Promise<
  ApiResponse<SubscriptionHistory[]>
> => {
  try {
    const response = await apiClient.get<ApiResponse<SubscriptionHistory[]>>(
      '/v1/subscriptions/histories'
    );
    return response.data;
  } catch (error) {
    return handleApiError(error) as ApiResponse<SubscriptionHistory[]>;
  }
};

/**
 * Claim trial for a plan
 * POST /v1/subscriptions/trial
 */
export const claimTrial = async (
  planCode: string
): Promise<ApiResponse<Subscription>> => {
  try {
    const response = await apiClient.post<ApiResponse<Subscription>>(
      '/v1/subscriptions/trial',
      { plan_code: planCode }
    );
    return response.data;
  } catch (error) {
    return handleApiError(error) as ApiResponse<Subscription>;
  }
};
