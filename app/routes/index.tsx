import { type MetaFunction, redirect, useNavigation } from "react-router";

import { LoadingResults, PackageSearch } from "#app/features/package-search";

import type { Route } from "./+types/index";

// Handles legacy `q` query param
export const loader = async ({ request }: Route.LoaderArgs) => {
	const url = new URL(request.url);
	const packageName = url.searchParams.get("q");
	if (packageName) {
		return redirect(`/package/${packageName}`);
	}
	return null;
};

export const meta: MetaFunction = () => {
	return [{ title: "Find Types" }];
};

export default function Index() {
	const navigation = useNavigation();

	const isLoadingPackage =
		navigation.state === "loading" && navigation.location.pathname.startsWith("/package");

	return (
		<main className="default-container">
			<PackageSearch />
			{isLoadingPackage ? <LoadingResults /> : null}
		</main>
	);
}
