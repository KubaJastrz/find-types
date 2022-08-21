import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData, useTransition } from '@remix-run/react';

import { PackageSearch } from '~/features/package-search';

export const loader: LoaderFunction = async ({ params }) => {
  const packageName = params['*'];
  return json({
    name: packageName,
  });
  // const metadata = await getMetadataForPackage(packageName!);
  // return json(metadata, {
  //   status: metadata.notFound ? 404 : undefined,
  // });
};

export const meta: MetaFunction = ({ params }) => {
  const packageName = params['*'];
  return {
    title: `${packageName} - Find Types`,
  };
};

export default function Package() {
  const packageMetadata = useLoaderData() as { name: string };
  const transition = useTransition();

  const isLoadingPackage =
    transition.state === 'loading' && transition.location.pathname.startsWith('/package');

  return (
    <main className="default-container">
      <PackageSearch initialQuery={packageMetadata.name} />
      {/* {isLoadingPackage ? <LoadingResults /> : <SearchResults packageMetadata={packageMetadata} />} */}
    </main>
  );
}
