import ky, { Options as FetchOptions } from 'ky';

import { PackageResponseData, SuggestionsResponseData } from '../../types/api';

export default class API {
  public static async get<Response>(url: string, options?: FetchOptions) {
    const response = await ky.get(url, options).json<Response>();
    return response;
  }

  public static async getFile(url: string, options?: FetchOptions) {
    const response = await ky.get(url, options).text();
    return response;
  }

  public static async getPackageDetails(packageName: string) {
    const encodedName = encodeURIComponent(packageName);
    const response = await API.get<PackageResponseData>(`/api/package?name=${encodedName}`);
    return response;
  }

  public static getSuggestions(query: string) {
    return API.get<SuggestionsResponseData[]>(`https://api.npms.io/v2/search/suggestions`, {
      searchParams: {
        q: query,
        size: 10,
      },
    });
  }
}
