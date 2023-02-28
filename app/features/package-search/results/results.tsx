import type { PackageDataLoaderData } from '~/server-services/package-data';

import { DeclarationFiles } from './declaration-files';
import { LoadingResults } from './loading-results';
import { PackageDetails } from './package-details';
import { TypesPackageDetails } from './types-package-data';

interface Props {
  packageData: PackageDataLoaderData;
}

export function Results({ packageData }: Props) {
  if (!packageData.metadata) {
    return <LoadingResults />;
  }

  if ('statusCode' in packageData.metadata) {
    return (
      <div className="mt-6 space-y-6 text-center md:mt-12">{packageData.metadata.message}</div>
    );
  }

  return (
    <div className="mt-6 space-y-6 md:mt-12">
      <PackageDetails packageData={packageData.metadata} />
      <div className="space-y-5">
        <TypesPackageDetails packageData={packageData.typesPackage} />
        <DeclarationFiles
          packageName={packageData.name}
          packageJsonTypes={packageData.metadata.types}
        />
      </div>
    </div>
  );
}
