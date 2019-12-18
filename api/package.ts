import { NowRequest, NowResponse } from '@now/node';
import got from 'got';
import { PackageJson } from 'type-fest';

import { PackageResponseData, NpmResponseData } from '../types/api';

/**
 * Route handler
 */
export default async (req: NowRequest, res: NowResponse) => {
  try {
    const packageName = req.query.name as string;
    const npmResponse = await getNpmPackageData(packageName);
    const packageJson = await getPackageJson(packageName);

    const latestVersion = npmResponse['dist-tags'].latest;
    const latestMetadata = npmResponse.versions[latestVersion];

    const body: PackageResponseData = {
      name: npmResponse.name,
      version: latestVersion,
      description: packageJson.description,
      // FIXME: get from unpkg, not available in abbreviated metadata
      readme: '',
      links: {
        homepage: packageJson.homepage,
        npm: `https://www.npmjs.com/package/${packageName}`,
        repository: getRepositoryUrl(packageJson.repository),
      },
      types: packageJson.types || packageJson.typings || undefined,
      deprecated: !!latestMetadata.deprecated || undefined,
    };

    res.json(body);
  } catch (error) {
    // TODO: add 404 if package name is not found
    res.status(500).send(error);
  }
};

// Helpers

async function getNpmPackageData(packageName: string) {
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

function getRepositoryUrl(repository: PackageJson['repository']) {
  if (typeof repository === 'string' || !repository) {
    return repository;
  }

  return repository.url;
}
