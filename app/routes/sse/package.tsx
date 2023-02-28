import type { LoaderArgs } from '@remix-run/node';

import { packageDataLoaderStream } from '~/server-services/package-data/package-data.server';

export async function loader({ request }: LoaderArgs) {
  const packageName = new URL(request.url).searchParams.get('name')!;
  return packageDataLoaderStream(packageName, request.signal);
}
