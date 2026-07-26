import { redirect } from "react-router";
import type { Route } from "./+types/package.index";

// Handles cases where JavaScript is disabled in the browsers and the search form sends
// a GET request to `/package`, eg. `/package?packageName=vue`
export const loader = async ({ request }: Route.LoaderArgs) => {
	const url = new URL(request.url);
	const packageName = url.searchParams.get("packageName");
	if (packageName) {
		return redirect(`/package/${packageName}`);
	}
	return redirect("/");
};
