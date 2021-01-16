import React from 'react'

import type {ErrorResponseData, PackageData} from '@/types/api'

import {DeclarationFiles} from './DeclarationFiles'
import {PackageDetails} from './PackageDetails'
import {TypesPackageDetails} from './TypesPackageData'

interface Props {
  packageData: PackageData
  typesPackageData: PackageData | ErrorResponseData
}

export const Results: React.FC<Props> = ({packageData, typesPackageData}) => {
  return (
    <div className="space-y-6">
      <PackageDetails packageData={packageData} />
      <div className="space-y-5">
        <TypesPackageDetails packageData={typesPackageData} />
        <DeclarationFiles packageName={packageData.name} packageJsonTypes={packageData.types} />
      </div>
    </div>
  )
}
