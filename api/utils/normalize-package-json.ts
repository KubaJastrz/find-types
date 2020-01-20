import normalizePackage from 'normalize-package-data';
import { PackageJson } from 'type-fest';
import _ from 'lodash';

export type NormalizedPackageJson = normalizePackage.Package;

export function normalizePackageJson(packageJson: PackageJson) {
  const clonedPackage = _.cloneDeep(packageJson);
  normalizePackage(clonedPackage);
  return clonedPackage as NormalizedPackageJson;
}
