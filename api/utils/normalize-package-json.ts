import normalizePackage from 'normalize-package-data';
import { PackageJson } from 'type-fest';
import gitUrlParse from 'git-url-parse';
import _ from 'lodash';

// few other fields (look at normalizePackage.Package) are different but were skipped as irrelevant
export interface NormalizedPackageJson extends PackageJson {
  repository?: string;
}

export function normalizePackageJson(packageJson: PackageJson): NormalizedPackageJson {
  const clonedPackage = _.cloneDeep(packageJson) as any;
  normalizePackage(clonedPackage);
  return {
    ...clonedPackage,
    repository: getRepositoryUrl(clonedPackage.repository),
  };
}

function getRepositoryUrl(repository?: { type: string; url: string }) {
  if (!repository) {
    return undefined;
  }

  const urlObject = gitUrlParse(repository.url);
  const parsedUrl = urlObject.git_suffix
    ? urlObject.toString('https').replace(/\.git$/, '')
    : urlObject.toString('https');

  return parsedUrl;
}
