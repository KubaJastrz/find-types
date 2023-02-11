import type { HeadersFunction, LoaderArgs, MetaFunction } from '@remix-run/node';
import { useLoaderData, useTransition } from '@remix-run/react';

import { LoadingResults, PackageSearch, SearchResults } from '~/features/package-search';
import { packageDataLoader } from '~/server-services/package-data';

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return {
    'Cache-Control': loaderHeaders.get('Cache-Control') ?? '',
  };
};

export const meta: MetaFunction = ({ params }) => {
  const packageName = params['*']!;
  return {
    title: `${packageName} - Find Types`,
  };
};

export const loader = async ({ params }: LoaderArgs) => {
  const packageName = params['*']!;
  return packageDataLoader(packageName);
};

export default function Package() {
  const packageData = useLoaderData<typeof loader>();
  const transition = useTransition();

  const isLoadingPackage =
    transition.state === 'loading' && transition.location.pathname.startsWith('/package');

  return (
    <main className="default-container">
      <PackageSearch initialQuery={packageData.name} />
      {isLoadingPackage ? <LoadingResults /> : <SearchResults packageData={packageData} />}
    </main>
  );
}
