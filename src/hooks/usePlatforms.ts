import { useQuery } from '@tanstack/react-query';
import { getPlatforms, getPlatformById } from '@/lib/api/platforms';

/**
 * Hook to fetch all platforms
 * @returns Query result with platforms list
 */
export const usePlatforms = () => {
  return useQuery({
    queryKey: ['platforms'],
    queryFn: async () => {
      const response = await getPlatforms();
      if (response.meta.code === 200 && response.data) {
        return response.data;
      }
      return [];
    },
    retry: 1,
  });
};

/**
 * Hook to fetch a single platform by ID
 * @param id - Platform ID
 * @returns Query result with platform data
 */
export const usePlatform = (id: string) => {
  return useQuery({
    queryKey: ['platform', id],
    queryFn: async () => {
      const response = await getPlatformById(id);
      if (response.meta.code === 200 && response.data) {
        return response.data;
      }
      return null;
    },
    enabled: !!id,
    retry: 1,
  });
};
