import { getTypesPackageName } from "~/utils/package";

import { type ErrorResponseData, FetchError } from "./errors";
import { getPackageData } from "./get-package-data.server";
import { type PackageData } from "./types";

export type PackageDataLoaderData = {
  name: string;
  metadata: PackageData | ErrorResponseData | null;
  typesPackage: Promise<PackageData | ErrorResponseData | null>;
};

export async function getPackageMetadata(
  packageName: string,
): Promise<PackageData | ErrorResponseData> {
  try {
    return await getPackageData(packageName);
  } catch (error) {
    return handleError(error);
  }
}

export async function getTypesPackageMetadata(
  packageName: string,
): Promise<PackageData | ErrorResponseData> {
  try {
    const typesPackageName = getTypesPackageName(packageName);
    return await getPackageData(typesPackageName);
  } catch (error) {
    return handleError(error);
  }
}

function handleError(error: unknown) {
  if (error instanceof FetchError) {
    return error.response;
  }
  console.error(error);
  return FetchError.createResponse(500, "Internal Server Error");
}
