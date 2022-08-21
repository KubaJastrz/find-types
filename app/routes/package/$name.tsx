import type { MetaFunction } from '@remix-run/node';

import { Header } from '~/features/app/layout';

export const meta: MetaFunction = ({ params }) => {
  return {
    title: `${params.name} - Find Types`,
  };
};

export default function Package() {
  return <Header />;
}
