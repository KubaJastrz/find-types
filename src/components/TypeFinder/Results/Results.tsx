import React from 'react';

import Loading from '@/components/Loading';
import { PackageData, ErrorResponseData } from '@/types/api';
import PackageDetails from './PackageDetails';
import TypesPackageDetails from './TypesPackageDetails';
import DeclarationFiles from './DeclarationFiles';
import * as Styled from './Results.styles';

interface Props {
  packageData: PackageData;
  typesPackageData: PackageData | ErrorResponseData;
}

function Results({ packageData, typesPackageData }: Props) {
  if (!packageData) {
    return <Loading />;
  }

  return (
    <Styled.Results>
      <PackageDetails packageData={packageData} />
      <Styled.TypesResults>
        <TypesPackageDetails packageData={typesPackageData} />
        <DeclarationFiles packageName={packageData.name} packageJsonTypes={packageData.types} />
      </Styled.TypesResults>
    </Styled.Results>
  );
}

export default Results;
