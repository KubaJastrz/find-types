import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData, useTransition } from '@remix-run/react';

import type { PackageData, PackageErrorData } from '~/features/package-data';
import { FetchError, getPackageData } from '~/features/package-data';
import { PackageSearch } from '~/features/package-search';

export const loader: LoaderFunction = async ({ params }) => {
  const packageName = params['*']!;

  try {
    const metadata = await getPackageData(packageName);
    return json(metadata);
  } catch (error: unknown) {
    if (error instanceof FetchError) {
      return json(
        {
          name: packageName,
          error: error.response,
        },
        {
          status: error.response.statusCode,
        },
      );
    }
    throw error;
  }
};

export const meta: MetaFunction = ({ params }) => {
  const packageName = params['*']!;
  return {
    title: `${packageName} - Find Types`,
  };
};

export default function Package() {
  const packageMetadata = useLoaderData() as PackageData | PackageErrorData;
  const transition = useTransition();

  const isLoadingPackage =
    transition.state === 'loading' && transition.location.pathname.startsWith('/package');

  return (
    <main className="default-container">
      <PackageSearch initialQuery={packageMetadata.name} />
      <pre>{JSON.stringify(packageMetadata, null, 2)}</pre>
      {/* {isLoadingPackage ? <LoadingResults /> : <SearchResults packageMetadata={packageMetadata} />} */}
    </main>
  );
}
