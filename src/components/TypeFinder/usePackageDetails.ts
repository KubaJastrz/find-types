import {useQuery} from 'react-query'

import {API} from '/@/api/client'

export function usePackageDetails(packageKey: string) {
  return useQuery({
    queryKey: ['details', packageKey],
    queryFn: () => API.getPackageDetails(packageKey),
    config: {
      enabled: !!packageKey,
    },
  })
}
