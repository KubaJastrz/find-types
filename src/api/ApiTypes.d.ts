// source: https://api-docs.npms.io/#api-Search-SearchSuggestions
// irrelevant fields are skipped, see source above for more data
export interface SuggestionsResponseResult {
    package: {
        name: string;
        version: string;
    };
    /**
     * scores are numbers between 0 and 1 (inclusive?)
     */
    score: {
        final: number;
        detail: {
            quality: number;
            popularity: number;
            maintenance: number;
        };
    };
    searchScore: number;
    /**
     * a string containing highlighted matched text
     */
    highlight: string;
}
