import type { PackageJson } from 'type-fest';

import { FetchError, HttpError } from './errors';
import type { NormalizedPackageJson } from './normalize-package-json';
import { normalizePackageJson } from './normalize-package-json';
import type { NpmResponseData, PackageData } from './types';

export async function getPackageData(packageName: string): Promise<PackageData> {
  let npmMetadata: NpmResponseData | undefined;
  let packageJson: NormalizedPackageJson | undefined;

  try {
    const [npmMetadataRaw, packageJsonRaw] = await Promise.all([
      getNpmPackageMetadata(packageName),
      getPackageJson(packageName),
    ]);
    npmMetadata = npmMetadataRaw;
    packageJson = normalizePackageJson(packageJsonRaw);
  } catch (error: unknown) {
    if (error instanceof HttpError && error.response.status === 404) {
      throw new FetchError(404, `Package "${packageName}" not found`);
    }

    console.error(error);
  }

  if (!npmMetadata || !packageJson) {
    throw new FetchError(500, `Fetching "${packageName}" package data failed`);
  }

  const latestVersion = npmMetadata['dist-tags'].latest;
  const latestMetadata = npmMetadata.versions[latestVersion];

  return {
    name: npmMetadata.name,
    version: latestVersion,
    description: packageJson.description ?? null,
    links: {
      homepage: packageJson.homepage ?? null,
      npm: `https://www.npmjs.com/package/${packageName}`,
      repository: packageJson.repository ?? null,
    },
    types: packageJson.types ?? packageJson.typings ?? null,
    deprecated: !!latestMetadata.deprecated,
  };
}

async function getNpmPackageMetadata(packageName: string): Promise<NpmResponseData> {
  return fetch(`https://registry.npmjs.org/${packageName}`, {
    headers: {
      // use abbreviated metadata format
      Accept: 'application/vnd.npm.install-v1+json',
    },
  }).then(toJson);
}

async function getPackageJson(packageName: string): Promise<PackageJson> {
  return fetch(`https://unpkg.com/${packageName}/package.json`).then(toJson);
}

function toJson(response: Response) {
  if (response.ok) {
    return response.json();
  }
  throw new HttpError(response);
}
