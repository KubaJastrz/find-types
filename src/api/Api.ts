import ky, { Options } from 'ky';

import { PackageResponseData, SuggestionsResponseData } from './ApiTypes';
import { PackageJson } from '@/types';
import { getCdnFileLink } from '@/helpers';

export default class API {
    public static async get<Response>(url: string, options?: Options) {
        const response = await ky.get(url, options).json<Response>();
        return response;
    }

    public static async getPackageDetails(packageName: string) {
        const encodedName = encodeURIComponent(packageName);
        const response = await API.get<PackageResponseData>(
            `https://api.npms.io/v2/package/${encodedName}`,
        );
        return response.collected.metadata;
    }

    public static getSuggestions(query: string) {
        return API.get<SuggestionsResponseData[]>(`https://api.npms.io/v2/search/suggestions`, {
            searchParams: {
                q: query,
                size: 10,
            },
        });
    }

    public static getPackageJson(packageString: string) {
        const encodedString = encodeURIComponent(packageString);
        const url = getCdnFileLink(encodedString, 'package.json');
        return API.get<PackageJson>(url);
    }
}
