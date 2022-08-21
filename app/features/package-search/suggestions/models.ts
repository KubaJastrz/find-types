// irrelevant fields are skipped
// source: https://api-docs.npms.io/#api-Search-SearchSuggestions
export interface SuggestionsResponseData {
  package: {
    name: string;
    version: string;
  };
  /**
   * a string containing highlighted matched text
   */
  highlight: string;
}
