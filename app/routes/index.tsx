import type { MetaFunction } from '@remix-run/node';
import { useTransition } from '@remix-run/react';

import { PackageSearch } from '~/features/package-search';

export const meta: MetaFunction = () => {
  return {
    title: 'Find Types',
  };
};

export default function Index() {
  const transition = useTransition();

  const isLoadingPackage =
    transition.state === 'loading' && transition.location.pathname.startsWith('/package');

  return (
    <main className="default-container">
      <PackageSearch />
      {/* {isLoadingPackage ? <LoadingResults /> : <About />} */}
    </main>
  );
}
