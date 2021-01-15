import {useQuery} from 'react-query'
import {useDebounce} from 'use-debounce'

import {API} from '@/api/client'
import {SuggestionsResponseData} from '@/types/api'

export function useSuggestions(packageName: string) {
  const [packageKey] = useDebounce(packageName, 200, {
    leading: true,
  })

  return useQuery<SuggestionsResponseData[], Error>({
    queryKey: ['suggestions', packageKey],
    queryFn: () => API.getSuggestions(packageKey),
    enabled: !!packageKey,
    staleTime: Infinity,
  })
}
