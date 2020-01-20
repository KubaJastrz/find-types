import got from 'got';
import { PackageJson } from 'type-fest';

import { PackageData, NpmResponseData } from '@/types/api';
import { FetchError } from './errors';
import { normalizePackageJson, NormalizedPackageJson } from './normalize-package-json';

export async function getPackageData(packageName: string): Promise<PackageData> {
  let npmMetadata: NpmResponseData | undefined;
  let packageJson: NormalizedPackageJson | undefined;

  try {
    npmMetadata = await getNpmPackageMetadata(packageName);

    const packageJsonData = await getPackageJson(packageName);
    packageJson = normalizePackageJson(packageJsonData);
  } catch (error) {
    if (error instanceof got.HTTPError && error.response?.statusCode === 404) {
      throw new FetchError(404, `Package "${packageName}" not found`);
    }

    console.log(error);
  }

  if (!npmMetadata || !packageJson) {
    throw new FetchError(500, `Fetching "${packageName}" package data failed`);
  }

  const latestVersion = npmMetadata['dist-tags'].latest;
  const latestMetadata = npmMetadata.versions[latestVersion];

  return {
    name: npmMetadata.name,
    version: latestVersion,
    description: packageJson.description,
    links: {
      homepage: packageJson.homepage,
      npm: `https://www.npmjs.com/package/${packageName}`,
      repository: packageJson.repository,
    },
    types: packageJson.types || packageJson.typings || undefined,
    deprecated: !!latestMetadata.deprecated || undefined,
  };
}

async function getNpmPackageMetadata(packageName: string) {
  return await got(`https://registry.npmjs.org/${packageName}`, {
    headers: {
      // use abbreviated metadata format
      Accept: 'application/vnd.npm.install-v1+json',
    },
  }).json<NpmResponseData>();
}

async function getPackageJson(packageName: string) {
  return await got(`https://unpkg.com/${packageName}/package.json`).json<PackageJson>();
}
