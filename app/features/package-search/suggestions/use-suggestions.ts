import { useQuery } from 'react-query';
import { useDebounce } from 'use-debounce';

import type { SuggestionsResponseData } from './models';

async function fetchSuggestions(packageKey: string) {
  const url = new URL(`https://api.npms.io/v2/search/suggestions`);
  url.searchParams.set('q', packageKey);
  url.searchParams.set('size', '10');

  const response = await fetch(url.toString(), { method: 'get' });
  if (!response.ok) {
    throw new Error(`Error ${response.status}`);
  }
  return response.json() as Promise<SuggestionsResponseData[]>;
}

export function useSuggestions(packageName: string) {
  const [packageKey] = useDebounce(packageName, 200, {
    leading: true,
  });

  return useQuery({
    queryKey: ['suggestions', packageKey],
    queryFn: () => fetchSuggestions(packageKey),
    enabled: Boolean(packageKey),
    staleTime: Infinity,
  });
}
