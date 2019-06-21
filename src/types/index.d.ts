import { SuggestionsResponseData, PackageResponseData } from '@/api/ApiTypes';

export type Suggestion = SuggestionsResponseData;

export type PackageData = PackageResponseData['collected']['metadata'];

export interface PackageJson {
    name: string;
    version: string;
    types?: string;
    typings?: string;
    [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
