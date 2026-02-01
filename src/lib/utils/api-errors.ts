import type { ApiResponse } from '@/types/api';
import axios from 'axios';

/**
 * Extracts form field errors and general error message from API responses.
 * Handles both onSuccess (400 with errors) and onError cases.
 *
 * @param error - Can be an ApiResponse, AxiosError, or unknown error type
 * @returns Object containing fieldErrors (Record<string, string>) and generalError (string | null)
 */
export function getFormErrorsFromApiResponse(
  error: unknown
): {
  fieldErrors: Record<string, string>;
  generalError: string | null;
} {
  let apiResponse: ApiResponse | null = null;

  // Handle ApiResponse directly (from onSuccess with 400 status)
  if (
    error &&
    typeof error === 'object' &&
    'meta' in error &&
    'data' in error
  ) {
    apiResponse = error as ApiResponse;
  }
  // Handle AxiosError (from onError)
  else if (axios.isAxiosError(error)) {
    const axiosError = error as { response?: { data?: unknown } };
    if (
      axiosError.response?.data &&
      typeof axiosError.response.data === 'object' &&
      'meta' in axiosError.response.data
    ) {
      apiResponse = axiosError.response.data as ApiResponse;
    }
  }
  // Handle error object with response.data structure
  else if (
    error &&
    typeof error === 'object' &&
    'response' in error &&
    (error as { response?: { data?: unknown } }).response?.data
  ) {
    const responseData = (error as { response: { data: unknown } }).response
      .data;
    if (
      responseData &&
      typeof responseData === 'object' &&
      'meta' in responseData
    ) {
      apiResponse = responseData as ApiResponse;
    }
  }

  // Extract errors
  if (apiResponse) {
    const fieldErrors: Record<string, string> = {};
    const generalError: string | null =
      apiResponse.meta.code === 400 && apiResponse.errors
        ? null // Don't show general error if we have field errors
        : apiResponse.meta.message || null;

    // Extract field errors
    if (apiResponse.errors) {
      Object.entries(apiResponse.errors).forEach(([field, message]) => {
        fieldErrors[field] = message;
      });
    }

    return {
      fieldErrors,
      generalError,
    };
  }

  // Fallback for unknown error types
  return {
    fieldErrors: {},
    generalError: 'An unexpected error occurred. Please try again.',
  };
}
