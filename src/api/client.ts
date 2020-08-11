import ky, {Options as FetchOptions} from 'ky'

import type {PackageResponseData, SuggestionsResponseData} from '/@/types/api'

const Client = {
  get: async <Response>(url: string, options?: FetchOptions) => {
    return await ky.get(url, options).json<Response>()
  },
}

export const API = {
  getPackageDetails: async (packageName: string) => {
    const encodedName = encodeURIComponent(packageName)
    return Client.get<PackageResponseData>(`/api/package?name=${encodedName}`)
  },

  getSuggestions: async (query: string, size = 10) => {
    return Client.get<SuggestionsResponseData[]>(`https://api.npms.io/v2/search/suggestions`, {
      searchParams: {
        q: query,
        size,
      },
    })
  },
}
