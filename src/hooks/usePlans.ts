import { useQuery } from '@tanstack/react-query';
import { getPlans } from '@/lib/api/plans';

/**
 * Hook to fetch all plans
 * Uses React Query for caching and state management
 */
export const usePlans = () => {
  return useQuery({
    queryKey: ['plans'],
    queryFn: async () => {
      const response = await getPlans();
      if (response.meta.code === 200 && response.data) {
        return response.data;
      }
      return [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};
