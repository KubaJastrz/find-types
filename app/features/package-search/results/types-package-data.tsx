import {
  type ErrorResponseData,
  type PackageData,
  isErrorResponse,
} from "~/server-services/package-data";

import { PackageDetails } from "./package-details";
import { ErrorIcon, ResultEntry, ResultType, SuccessIcon, WarningIcon } from "./results-entry";

interface Props {
  packageData: PackageData | ErrorResponseData | null;
}

export function TypesPackageDetails({ packageData }: Props) {
  if (!packageData) {
    return null;
  }

  if (isErrorResponse(packageData)) {
    return packageData.statusCode === 404 ? (
      <ResultEntry
        type={ResultType.neutral}
        icon={<ErrorIcon />}
        title="No DefinitelyTyped Package"
      />
    ) : (
      <ResultEntry
        type={ResultType.neutral}
        icon={<WarningIcon />}
        title="Failed fetching DefinitelyTyped Package"
      />
    );
  }

  const packageDetails = (
    <PackageDetails packageData={{ ...packageData, description: null }} small />
  );

  return packageData.deprecated ? (
    <ResultEntry
      type={ResultType.warning}
      icon={<WarningIcon />}
      title="Deprecated DefinitelyTyped Package"
    >
      {packageDetails}
    </ResultEntry>
  ) : (
    <ResultEntry type={ResultType.success} icon={<SuccessIcon />} title="DefinitelyTyped Package">
      {packageDetails}
    </ResultEntry>
  );
}
