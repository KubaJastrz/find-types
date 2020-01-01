import React from 'react';

import { PackageResponseData } from '@/types/api';
import PackageDetails from './PackageDetails';
import * as Styled from './Results.styles';

interface Props {
  response?: PackageResponseData;
}

function Results({ response }: Props) {
  if (!response) {
    return <pre>Loading...</pre>;
  }

  return (
    <Styled.Results>
      <PackageDetails packageData={response} />
    </Styled.Results>
  );
}

export default Results;
