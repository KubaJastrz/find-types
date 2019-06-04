import ky, { Options } from 'ky';

import { SuggestionsResponseResult } from './ApiTypes';

export default class API {
    static async get<Response>(url: string, options?: Options) {
        const response = await ky.get(url, options).json<Response>();
        return response;
    }

    static getSuggestions(query: string) {
        return API.get<SuggestionsResponseResult[]>(`https://api.npms.io/v2/search/suggestions`, {
            searchParams: {
                q: query,
                size: 10,
            },
        });
    }
}
