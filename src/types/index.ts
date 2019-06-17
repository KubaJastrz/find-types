// FIXME: rename to `index.d.ts` and remove this
// I don't actually know what is causing the 'module not found' TS error (@vue/cli@4-alpha maybe?)
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
