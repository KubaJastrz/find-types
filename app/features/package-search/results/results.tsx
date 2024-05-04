import { Await } from "@remix-run/react";
import { Suspense } from "react";

import { isErrorResponse } from "~/server-services/package-data/errors";
import { type PackageDataLoaderData } from "~/server-services/package-data/package-data.server";
import { DeclarationFiles } from "./declaration-files";
import { LoadingResults } from "./loading-results";
import { PackageDetails } from "./package-details";
import { TypesPackageDetails } from "./types-package-data";

interface Props {
  packageData: PackageDataLoaderData;
}

export function Results({ packageData }: Props) {
  if (!packageData.metadata) {
    return <LoadingResults />;
  }

  if (isErrorResponse(packageData.metadata)) {
    return <ErrorResults>{packageData.metadata.message}</ErrorResults>;
  }

  return (
    <div className="mt-6 space-y-6 md:mt-12">
      <PackageDetails packageData={packageData.metadata} />
      <div className="space-y-5">
        <DeclarationFiles
          packageName={packageData.name}
          packageJsonTypes={packageData.metadata.types}
        />
        <Suspense>
          <Await resolve={packageData.typesPackage}>
            {(typesPackage) => <TypesPackageDetails packageData={typesPackage} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

export function ErrorResults({ children }: { children: string }) {
  return <div className="mt-6 space-y-6 text-center md:mt-12">{children}</div>;
}
