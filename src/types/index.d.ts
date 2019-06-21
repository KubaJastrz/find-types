import { SuggestionsResponseData, PackageResponseData } from '@/api/ApiTypes';

export type Suggestion = SuggestionsResponseData;

export type PackageData = PackageResponseData['collected']['metadata'];
