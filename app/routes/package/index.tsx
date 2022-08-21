import type { LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';

// Handles cases where JavaScript is disabled in the browsers and the search form sends
// a GET request to `/package`, eg. `/package?packageName=vue`
export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const packageName = url.searchParams.get('packageName');
  return redirect(`/package/${packageName}`);
};
