import React from 'react';

import ResultEntry from './ResultEntry';
import PackageDetails from './PackageDetails';
import { PackageData, ErrorResponseData } from '@/types/api';
import { isErrorResponse } from '@/helpers';

import { ReactComponent as SuccessIcon } from '@/assets/icons/check-circle.svg';
import { ReactComponent as WarningIcon } from '@/assets/icons/alert-triangle.svg';
import { ReactComponent as ErrorIcon } from '@/assets/icons/x.svg';

interface Props {
  packageData: PackageData | ErrorResponseData;
}

function TypesPackageDetails({ packageData }: Props) {
  if (isErrorResponse(packageData)) {
    return packageData.statusCode === 404 ? (
      <ResultEntry type="neutral" icon={<ErrorIcon />} title="No DefinitelyTyped Package" />
    ) : (
      <ResultEntry
        type="neutral"
        icon={<WarningIcon />}
        title="Failed fetching DefinitelyTyped Package"
      />
    );
  }

  const packageDetails = (
    <PackageDetails packageData={packageData} small={true} hideDescription={true} />
  );

  return packageData.deprecated ? (
    <ResultEntry type="warning" icon={<WarningIcon />} title="Deprecated DefinitelyTyped Package">
      {packageDetails}
    </ResultEntry>
  ) : (
    <ResultEntry type="success" icon={<SuccessIcon />} title="DefinitelyTyped Package">
      {packageDetails}
    </ResultEntry>
  );
}

export default TypesPackageDetails;
