import ky, {Options as FetchOptions} from 'ky'

import type {PackageResponseData, SuggestionsResponseData} from '/@/types/api'

const Client = {
  get: <Response>(url: string, options?: FetchOptions) => {
    const controller = new AbortController()
    const {signal} = controller

    const promise = ky.get(url, {...options, signal}).json<Response>()

    // https://react-query.tanstack.com/docs/guides/query-cancellation
    ;(promise as any).cancel = controller.abort
    return promise
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
