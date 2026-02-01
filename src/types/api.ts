// Standardized API Response Structure
export interface ApiResponse<T = unknown> {
  meta: {
    code: number;
    message: string;
  };
  data: T | null;
  errors?: Record<string, string[]>;
}

// User Types
export interface User {
  id: string;
  email: string;
  fullname: string;
  status: string;
  provider: string;
  avatar_url: string | null;
}

// Auth Request Types
export interface RegisterRequest {
  email: string;
  fullname: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LogoutRequest {
  access_token: string;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

// Auth Response Types
export interface AuthResponse {
  access_token: string;
  user: User;
  refresh_token?: string;
}

// Actual backend response (without user object)
export interface BackendAuthResponse {
  access_token: string;
  refresh_token: string;
  user_id: string;
}

export type LoginResponse = BackendAuthResponse;
export type RegisterResponse = AuthResponse;
export type RefreshTokenResponse = BackendAuthResponse;

export interface GoogleOAuthInitResponse {
  auth_url: string;
}

export type GoogleOAuthCallbackResponse = BackendAuthResponse;

// Error Types
export interface ValidationError {
  field: string;
  messages: string[];
}

export interface ApiError {
  code: number;
  message: string;
  errors?: Record<string, string[]>;
}
