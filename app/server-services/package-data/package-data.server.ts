import { eventStream } from 'remix-utils';

import { getTypesPackageName } from '~/utils/package';

import type { ErrorResponseData } from './errors';
import { FetchError } from './errors';
import { getPackageData } from './get-package-data';
import type { PackageData } from './types';

export type PackageDataLoaderPayloadSuccess = {
  key: 'metadata' | 'types';
  data: PackageData;
};

export type PackageDataLoaderPayloadError = {
  key: 'metadata' | 'types';
  error: ErrorResponseData;
};

export type PackageDataLoaderPayload =
  | PackageDataLoaderPayloadSuccess
  | PackageDataLoaderPayloadError;

export type PackageDataLoaderData = {
  name: string;
  metadata?: PackageData | ErrorResponseData;
  typesPackage?: PackageData | ErrorResponseData;
};

export async function packageDataLoaderStream(
  packageName: string,
  abortSignal: AbortSignal,
): Promise<any> {
  return eventStream(abortSignal, (send) => {
    const sendPayload = (payload: PackageDataLoaderPayload) => {
      send({
        event: 'packageData',
        data: JSON.stringify(payload),
      });
    };

    getPackageData(packageName)
      .then((data) => {
        sendPayload({
          key: 'metadata',
          data,
        });
      })
      .catch((error) => {
        const errorData = handleError(error);
        sendPayload({
          key: 'metadata',
          error: errorData,
        });
      })
      .then(() => {
        const typesPackageName = getTypesPackageName(packageName);
        return getPackageData(typesPackageName);
      })
      .then((data) => {
        sendPayload({
          key: 'types',
          data,
        });
      })
      .catch((error) => {
        const errorData = handleError(error);
        sendPayload({
          key: 'types',
          error: errorData,
        });
      });

    return () => {
      // TODO: abort server fetch
    };
  });
}

function handleError(error: unknown) {
  if (error instanceof FetchError) {
    return error.response;
  }
  console.error(error);
  return FetchError.createResponse(500, 'Internal Server Error');
}
