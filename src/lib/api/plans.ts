import { apiClient, handleApiError } from './axios';
import type { ApiResponse, Plan } from '@/types/api';

/**
 * Get all plans
 * GET /v1/plans
 */
export const getPlans = async (): Promise<ApiResponse<Plan[]>> => {
  try {
    const response = await apiClient.get<ApiResponse<Plan[]>>('/v1/plans');
    return response.data;
  } catch (error) {
    return handleApiError(error) as ApiResponse<Plan[]>;
  }
};
