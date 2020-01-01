import React from 'react';

import * as Styled from './Results.styles';
import { NpmPackage } from '@/types';

interface Props {
  packageData: NpmPackage;
  hideDescription?: boolean;
  small?: boolean;
}

function PackageDetails({ packageData, hideDescription = false, small = false }: Props) {
  return (
    <Styled.PackageDetails small={small}>
      <Styled.PackageMeta>
        <Styled.PackageName>{packageData.name}</Styled.PackageName>
        <Styled.PackageVersion>{packageData.version}</Styled.PackageVersion>
      </Styled.PackageMeta>
      {!hideDescription && (
        <Styled.PackageDescription>{packageData.description}</Styled.PackageDescription>
      )}
    </Styled.PackageDetails>
  );
}

export default PackageDetails;
