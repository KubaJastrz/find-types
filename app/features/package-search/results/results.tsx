import type { PackageDataLoaderData } from '~/server-services/package-data';

import { DeclarationFiles } from './declaration-files';
import { PackageDetails } from './package-details';
import { TypesPackageDetails } from './types-package-data';

interface Props {
  packageData: PackageDataLoaderData;
}

export function Results({ packageData }: Props) {
  if ('error' in packageData) {
    return <div className="mt-6 md:mt-12 space-y-6 text-center">{packageData.error.message}</div>;
  }

  return (
    <div className="mt-6 md:mt-12 space-y-6">
      <PackageDetails packageData={packageData.package} />
      <div className="space-y-5">
        <TypesPackageDetails packageData={packageData.typesPackage} />
        <DeclarationFiles
          packageName={packageData.name}
          packageJsonTypes={packageData.package.types}
        />
      </div>
    </div>
  );
}
