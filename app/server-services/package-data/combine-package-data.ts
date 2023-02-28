import type {
  PackageDataLoaderData,
  PackageDataLoaderPayload,
  PackageDataLoaderPayloadError,
} from './package-data.server';

export function combinePackageData(name: string) {
  let data = { name } as PackageDataLoaderData;

  function append(payload: string | null) {
    if (!payload) return;
    const payloadObj = JSON.parse(payload) as PackageDataLoaderPayload;
    if (!payloadObj) return;
    const newData = { ...data };
    switch (payloadObj.key) {
      case 'metadata':
        newData.metadata = getPayload(payloadObj);
        break;
      case 'types':
        newData.typesPackage = getPayload(payloadObj);
        break;
    }
    data = newData;
    return data;
  }

  return append;
}

function getPayload(payload: PackageDataLoaderPayload) {
  return isErrorPayload(payload) ? payload.error : payload.data;
}

function isErrorPayload(payload: any): payload is PackageDataLoaderPayloadError {
  return payload.error !== undefined;
}
