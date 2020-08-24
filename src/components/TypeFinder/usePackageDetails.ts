import {useQuery} from 'react-query'

import {API} from '/@/api/client'
import {PackageResponseData} from '/@/types/api'

export function usePackageDetails(packageKey: string) {
  return useQuery<PackageResponseData, Error>({
    queryKey: ['details', packageKey],
    queryFn: () => API.getPackageDetails(packageKey),
    config: {
      enabled: !!packageKey,
    },
  })
}
