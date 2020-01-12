import { NowRequest, NowResponse } from '@now/node';
import got from 'got';
import gitUrlParse from 'git-url-parse';
import { PackageJson } from 'type-fest';

import { PackageData, NpmResponseData, PackageResponseData, ErrorResponseData } from '@/types/api';

/**
 * Route handler
 */
export default async (req: NowRequest, res: NowResponse) => {
  const packageName = req.query.name;

  if (!packageName || Array.isArray(packageName)) {
    const errorData = FetchError.createResponse(400, 'Package `name` must be a valid string');
    return res.status(errorData.statusCode).send(errorData);
  }

  let packageData: PackageResponseData['package'];
  let typesPackageData: PackageResponseData['typesPackage'];

  try {
    packageData = await getPackageData(packageName);
  } catch (error) {
    if (FetchError.isFetchError(error)) {
      return res.status(error.response.statusCode).send(error.response);
    }

    console.error(error);
    const errorData = FetchError.createResponse(500, 'Internal Server Error');
    return res.status(errorData.statusCode).send(errorData);
  }

  try {
    const typesPackageName = getTypesPackageName(packageName);
    typesPackageData = await getPackageData(typesPackageName);
  } catch (error) {
    if (FetchError.isFetchError(error)) {
      typesPackageData = error.response;
    } else {
      console.error(error);
      const errorData = FetchError.createResponse(500, 'Internal Server Error');
      return res.status(errorData.statusCode).send(errorData);
    }
  }

  return res.json({
    package: packageData,
    typesPackage: typesPackageData,
  });
};

// Helpers

async function getPackageData(packageName: string): Promise<PackageData> {
  let npmMetadata: NpmResponseData | undefined;
  let packageJson: PackageJson | undefined;

  try {
    npmMetadata = await getNpmPackageMetadata(packageName);
    packageJson = await getPackageJson(packageName);
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
}

class FetchError extends Error {
  constructor(statusCode: number, message: string) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = 'FetchError';
    this.response = FetchError.createResponse(statusCode, message);
  }

  response: ErrorResponseData;

  static createResponse = (statusCode: number, message: string): ErrorResponseData => ({
    statusCode,
    message,
  });

  static isFetchError = (error: any): error is FetchError => {
    return error.name === 'FetchError';
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

// FIXME: short format like: 'github:user/repo' - https://docs.npmjs.com/files/package.json#repository
function getRepositoryUrl(repository: PackageJson['repository']) {
  if (!repository) {
    return undefined;
  }

  const urlToParse = typeof repository === 'string' ? repository : repository.url;

  const urlObject = gitUrlParse(urlToParse);
  const parsedUrl = urlObject.git_suffix
    ? urlObject.toString('https').replace(/\.git$/, '')
    : urlObject.toString('https');

  return parsedUrl;
}

// scoped packages should be parsed like this: @foo/bar -> foo__bar
// https://github.com/DefinitelyTyped/DefinitelyTyped#what-about-scoped-packages
const typesPrefix = '@types/';
export function getTypesPackageName(npmPackage: string): string {
  const parsedName = npmPackage.replace('@', '').replace(/\//g, '__');
  return typesPrefix + parsedName;
}
