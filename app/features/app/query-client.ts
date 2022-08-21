import { QueryClient } from 'react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry(failureCount, error) {
        // ignore 404
        if ((error as any)?.response?.status === 404) return false;
        // retry 3 times before giving up
        if (failureCount < 2) return true;
        return false;
      },
      staleTime: 10 * 60 * 1000, // 10 minutes
    },
    mutations: {},
  },
});
