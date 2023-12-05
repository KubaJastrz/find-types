import type { ErrorResponseData } from "./errors";

export interface PackageData {
  name: string;
  version: string;
  description: string | null;
  links: {
    homepage: string | null;
    npm: string;
    repository: string | null;
    unpkg: string;
  };
  types: string | null;
  deprecated: boolean;
}

export interface PackageErrorData {
  name: string;
  error: ErrorResponseData;
}

// uses abbreviated metadata format
// source: https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md
export interface NpmResponseData {
  name: string;
  modified: string; // ISO 8601 date
  "dist-tags": {
    latest: string;
    [tagName: string]: string;
  };
  versions: {
    [version: string]: {
      name: string;
      version: string;
      deprecated?: string;
    };
  };
}
