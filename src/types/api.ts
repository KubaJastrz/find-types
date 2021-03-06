export interface ErrorResponseData {
  statusCode: number
  message: string
}

export interface PackageData {
  name: string
  version: string
  description?: string
  links: {
    homepage?: string
    npm?: string
    repository?: string
  }
  types?: string
  deprecated?: true
}

export interface PackageResponseData {
  package: PackageData
  typesPackage: PackageData | ErrorResponseData
}

// uses abbreviated metadata format
// source: https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md
export interface NpmResponseData {
  name: string
  modified: string
  'dist-tags': {
    latest: string
    [tagName: string]: string
  }
  versions: {
    [version: string]: {
      name: string
      version: string
      deprecated?: string
    }
  }
}

// irrelevant fields are skipped
// source: https://api-docs.npms.io/#api-Search-SearchSuggestions
export interface SuggestionsResponseData {
  package: {
    name: string
    version: string
  }
  /**
   * a string containing highlighted matched text
   */
  highlight: string
}
