import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import type { ApiResponse } from '@/types/api';
import { config } from '@/lib/config';

// Create axios instance with default config
export const apiClient = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Flag to prevent multiple refresh attempts
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: Error | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve();
    }
  });
  failedQueue = [];
};

// Request interceptor - Add Authorization header
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from localStorage
    const token = localStorage.getItem('access_token');

    // Add Authorization header if token exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling refresh token flow
apiClient.interceptors.response.use(
  (response) => {
    // Return successful responses as-is
    return response;
  },
  async (error: AxiosError<ApiResponse>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // TODO: Implement refresh token endpoint when available
        // Example: await apiClient.post('/v1/api/refresh', {}, { withCredentials: true });

        // For now, we'll just process the queue and reject
        // This architecture is ready for when refresh endpoint is available

        // Uncomment when refresh endpoint is ready:
        // const response = await apiClient.post('/v1/api/refresh');
        // if (response.status === 200) {
        //   processQueue(null);
        //   return apiClient(originalRequest);
        // }

        processQueue(new Error('Session expired'));
        return Promise.reject(error);
      } catch (refreshError) {
        processQueue(refreshError as Error);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Return error for other status codes
    return Promise.reject(error);
  }
);

// Helper function to handle API errors
export const handleApiError = (error: unknown): ApiResponse => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiResponse>;

    if (axiosError.response?.data) {
      return axiosError.response.data;
    }

    // Network error or no response
    return {
      meta: {
        code: axiosError.response?.status || 500,
        message: axiosError.message || 'Network error occurred',
      },
      data: null,
      errors: {},
    };
  }

  // Non-axios error
  return {
    meta: {
      code: 500,
      message: 'An unexpected error occurred',
    },
    data: null,
    errors: {},
  };
};
