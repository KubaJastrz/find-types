// FIXME: rename to `index.d.ts` and remove this
// not actually what is causing the 'module not found' TS error
export default {};

/**
 * eg. vue@2.6.10
 */
export type PackageString = string;

export interface NpmPackage {
    name: string;
    version: string;
}

export enum PackageSearchStatus {
    Init,
    Success,
    GenericError,
    NotFound,
}
