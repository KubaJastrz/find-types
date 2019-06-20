// source: https://api-docs.npms.io/#api-Package-GetPackageInfo
// irrelevant fields are skipped, see source above for more data
export interface PackageResponseData {
    collected: {
        metadata: {
            name: string;
            version: string;
            description: string;
            links: {
                homepage: string;
                npm: string;
                repository: string;
            };
            deprecated?: string;
        };
    };
}

// source: https://api-docs.npms.io/#api-Search-SearchSuggestions
// irrelevant fields are skipped, see source above for more data
export interface SuggestionsResponseData {
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
