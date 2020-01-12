import React from 'react';

import { PackageData, ErrorResponseData } from '@/types/api';
import PackageDetails from './PackageDetails';
import * as Styled from './Results.styles';

interface Props {
  packageData?: PackageData;
  typesPackageData?: PackageData | ErrorResponseData;
}

function Results({ packageData, typesPackageData }: Props) {
  if (!packageData) {
    return <pre>Loading...</pre>;
  }

  return (
    <Styled.Results>
      <PackageDetails packageData={packageData} />
      <pre>{JSON.stringify(typesPackageData, null, 2)}</pre>
    </Styled.Results>
  );
}

export default Results;
