import React from 'react'

import type {ErrorResponseData, PackageData} from '@/types/api'
import {isErrorResponse} from '@/utils/errors'

import {PackageDetails} from './PackageDetails'
import {ErrorIcon, ResultEntry, ResultType, SuccessIcon, WarningIcon} from './ResultEntry'

interface Props {
  packageData: PackageData | ErrorResponseData
}

export const TypesPackageDetails: React.FC<Props> = ({packageData}) => {
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
    )
  }

  const packageDetails = (
    <PackageDetails packageData={{...packageData, description: undefined}} small />
  )

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
  )
}
