import React from 'react';

import { ReactComponent as NpmIcon } from '@/assets/icons/npm.svg';
import { NpmPackage } from '@/types';
import useSourceCodeIcon from './useSourceCodeIcon';
import * as Styled from './Results.styles';

interface Props {
  packageData: NpmPackage;
  hideDescription?: boolean;
  small?: boolean;
}

function PackageDetails({ packageData, hideDescription = false, small = false }: Props) {
  const SourceCodeIcon = useSourceCodeIcon(packageData.links.repository);

  return (
    <Styled.PackageDetails small={small}>
      <Styled.PackageMeta>
        <Styled.PackageName>{packageData.name}</Styled.PackageName>
        <Styled.PackageVersion>{packageData.version}</Styled.PackageVersion>
        <Styled.PackageMetaLinks>
          {packageData.links.npm && (
            <Styled.PackageMetaLink
              href={packageData.links.npm}
              title="Npm registry"
              className="-npm"
            >
              <NpmIcon />
            </Styled.PackageMetaLink>
          )}
          {SourceCodeIcon && (
            <Styled.PackageMetaLink
              href={packageData.links.repository}
              title="Source code repository"
            >
              <SourceCodeIcon />
            </Styled.PackageMetaLink>
          )}
        </Styled.PackageMetaLinks>
      </Styled.PackageMeta>
      {!hideDescription && (
        <Styled.PackageDescription>{packageData.description}</Styled.PackageDescription>
      )}
    </Styled.PackageDetails>
  );
}

export default PackageDetails;
