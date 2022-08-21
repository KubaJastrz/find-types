import type { MetaFunction } from '@remix-run/node';

import { Header } from '~/features/app/layout';

export const meta: MetaFunction = () => {
  return {
    title: 'Find Types',
  };
};

export default function Index() {
  return <Header />;
}
