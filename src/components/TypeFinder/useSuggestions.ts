import {useQuery} from 'react-query'
import {useDebounce} from 'use-debounce'

import {API} from '/@/api/client'

export function useSuggestions(packageName: string) {
  const [packageKey] = useDebounce(packageName, 200, {
    leading: true,
  })

  return useQuery({
    queryKey: ['suggestions', packageKey],
    queryFn: () => API.getSuggestions(packageKey),
    config: {
      enabled: !!packageKey,
      staleTime: Infinity,
    },
  })
}