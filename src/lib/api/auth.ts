import { apiClient, handleApiError } from './axios';
import type {
  ApiResponse,
  RegisterRequest,
  LoginRequest,
  LogoutRequest,
  RegisterResponse,
  LoginResponse,
  User,
  GoogleOAuthInitResponse,
  GoogleOAuthCallbackResponse,
} from '@/types/api';

/**
 * Register a new user
 * POST /v1/api/register
 */
export const registerUser = async (
  data: RegisterRequest
): Promise<ApiResponse<RegisterResponse>> => {
  try {
    const response = await apiClient.post<ApiResponse<RegisterResponse>>(
      '/v1/auth/register',
      data
    );
    return response.data;
  } catch (error) {
    return handleApiError(error) as ApiResponse<RegisterResponse>;
  }
};

/**
 * Login user
 * POST /v1/api/login
 */
export const loginUser = async (
  data: LoginRequest
): Promise<ApiResponse<LoginResponse>> => {
  try {
    const response = await apiClient.post<ApiResponse<LoginResponse>>(
      '/v1/auth/login',
      data
    );
    return response.data;
  } catch (error) {
    return handleApiError(error) as ApiResponse<LoginResponse>;
  }
};

/**
 * Logout user
 * POST /v1/api/me/logout
 */
export const logoutUser = async (
  data: LogoutRequest
): Promise<ApiResponse<null>> => {
  try {
    const response = await apiClient.post<ApiResponse<null>>(
      '/v1/me/logout',
      data
    );
    return response.data;
  } catch (error) {
    return handleApiError(error) as ApiResponse<null>;
  }
};

/**
 * Get current user (for checking auth state)
 * GET /v1/me
 */
export const getCurrentUser = async (): Promise<ApiResponse<User>> => {
  try {
    const response = await apiClient.get<ApiResponse<User>>('/v1/me');
    return response.data;
  } catch (error) {
    return handleApiError(error) as ApiResponse<User>;
  }
};

/**
 * Initiate Google OAuth flow
 * GET /v1/oauth/google
 */
export const initiateGoogleOAuth = async (): Promise<
  ApiResponse<GoogleOAuthInitResponse>
> => {
  try {
    const response = await apiClient.get<ApiResponse<GoogleOAuthInitResponse>>(
      '/v1/oauth/google'
    );
    return response.data;
  } catch (error) {
    return handleApiError(error) as ApiResponse<GoogleOAuthInitResponse>;
  }
};

/**
 * Handle Google OAuth callback
 * GET /v1/oauth/google/callback?code={code}&state={state}
 */
export const handleGoogleOAuthCallback = async (
  code: string,
  state: string
): Promise<ApiResponse<GoogleOAuthCallbackResponse>> => {
  try {
    const response = await apiClient.get<
      ApiResponse<GoogleOAuthCallbackResponse>
    >('/v1/oauth/google/callback', {
      params: { code, state },
    });
    return response.data;
  } catch (error) {
    return handleApiError(error) as ApiResponse<GoogleOAuthCallbackResponse>;
  }
};
