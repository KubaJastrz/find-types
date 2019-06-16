import ky, { Options } from 'ky';

import { PackageResponseData, SuggestionsResponseData } from './ApiTypes';

export default class API {
    public static async get<Response>(url: string, options?: Options) {
        const response = await ky.get(url, options).json<Response>();
        return response;
    }

    public static getPackageDetails(packageName: string) {
        const encodedName = encodeURIComponent(packageName);
        return API.get<PackageResponseData>(`https://api.npms.io/v2/package/${encodedName}`);
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
