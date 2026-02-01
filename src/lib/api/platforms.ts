import { apiClient, handleApiError } from './axios';
import type { ApiResponse, Platform } from '@/types/api';

/**
 * Get all platforms
 * GET /platforms
 */
export const getPlatforms = async (): Promise<ApiResponse<Platform[]>> => {
  try {
    const response = await apiClient.get<ApiResponse<Platform[]>>(
      '/v1/platforms'
    );
    return response.data;
  } catch (error) {
    return handleApiError(error) as ApiResponse<Platform[]>;
  }
};

/**
 * Get platform by ID
 * GET /platforms/:id
 */
export const getPlatformById = async (
  id: string
): Promise<ApiResponse<Platform>> => {
  try {
    const response = await apiClient.get<ApiResponse<Platform>>(
      `/v1/platforms/${id}`
    );
    return response.data;
  } catch (error) {
    return handleApiError(error) as ApiResponse<Platform>;
  }
};
