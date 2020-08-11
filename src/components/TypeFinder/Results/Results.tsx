import React from 'react'
import {PackageDetails} from './PackageDetails'
import {TypesPackageDetails} from './TypesPackageData'
import {DeclarationFiles} from './DeclarationFiles'

import {PackageData, ErrorResponseData} from '/@/types/api'

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
