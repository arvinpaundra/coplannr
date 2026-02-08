// Standardized API Response Structure
export interface ApiResponse<T = unknown> {
  meta: {
    code: number;
    message: string;
  };
  data: T | null;
  errors?: Record<string, string>;
}

// User Types
export interface User {
  id: string;
  email: string;
  fullname: string;
  status: string;
  provider: string;
  avatar_url: string | null;
  org_name: string | null;
  subscription?: UserSubscription;
  has_claim_trial?: boolean;
}

// Platform Types
export interface Platform {
  id: string;
  name: string;
  code: string;
  icon: string;
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

export interface UpdateProfileRequest {
  fullname: string;
  email: string;
  org_name?: string | null;
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

// Subscription Types
// Full subscription from /v1/subscriptions/current
export interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  plan_name: string;
  plan_code: string;
  plan_type: 'free' | 'paid';
  status: string;
  is_active: boolean;
  current_period_start: string;
  current_period_end: string;
  started_at: string;
  ended_at: string | null;
  canceled_at: string | null;
}

// Simplified subscription from /v1/me (included in User response)
export interface UserSubscription {
  id: string;
  plan_id: string;
  plan_name: string;
  plan_code: string;
  plan_type: 'free' | 'paid';
  status: string;
  is_active: boolean;
  current_period_start: string;
  current_period_end: string;
}

// Usage data from /v1/subscriptions/:id/usage
export interface Usage {
  plan_name: string;
  plan_code: string;
  connected_account: number;
  posts_created: number;
  posts_scheduled: number;
  max_connected_account: number;
  max_posts_created: number;
}

// Subscription history from /v1/subscriptions/histories
export interface SubscriptionHistory {
  id: string;
  subscription_id: string;
  type: string;
  previous_plan_id: string | null;
  previous_plan_name: string | null;
  new_plan_id: string | null;
  new_plan_name: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

// Backend Plan type (from API response)
export interface Plan {
  id: string;
  code: string;
  name: string;
  type: string;
  currency: string;
  price: number;
  days_valid: number;
  trial_days: number;
  is_recommended: boolean;
  features: string[];
  description?: string | null;
}

export interface PricingPlan {
  id: string;
  name: string;
  code: string;
  type: 'free' | 'paid';
  currency: string;
  price: number;
  days_valid: number;
  trial_days: number;
  is_recommended: boolean;
  features: string[];
  description?: string | null;
  monthly_posts_limit: number;
  is_eligible_schedule_post: boolean;
  connected_accounts_limit: number;
}

export interface BillingHistory {
  id: string;
  user_id: string;
  plan_name: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'failed' | 'refunded';
  invoice_url: string | null;
  paid_at: string;
  created_at: string;
}

export interface ClaimTrialRequest {
  plan_code: string;
}

export interface CancelSubscriptionRequest {
  reason?: string;
}

// Error Types
export interface ValidationError {
  field: string;
  messages: string[];
}

export interface ApiError {
  code: number;
  message: string;
  errors?: Record<string, string>;
}
