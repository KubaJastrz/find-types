import { data, useNavigation } from "react-router";
import {
	ErrorResults,
	LoadingResults,
	PackageSearch,
	SearchResults,
} from "#app/features/package-search";
import { isErrorResponse } from "#app/server-services/package-data/errors";
import {
	getPackageMetadata,
	getTypesPackageMetadata,
} from "#app/server-services/package-data/package-data.server";

import type { Route } from "./+types/package.$";

export const headers = ({ loaderHeaders }: Route.HeadersArgs) => {
	return {
		"Cache-Control": loaderHeaders.get("Cache-Control") ?? "",
	};
};

export const meta = ({ params }: Route.MetaArgs) => {
	const packageName = params.slug;
	return [{ title: `${packageName} - Find Types` }];
};

export const loader = async ({ params }: Route.LoaderArgs) => {
	const packageName = params.slug;
	const metadata = await getPackageMetadata(packageName);

	if (isErrorResponse(metadata)) {
		return data(
			{
				name: packageName,
				metadata: null,
				typesPackage: Promise.resolve(null),
				error: metadata.message,
			},
			{ status: metadata.statusCode },
		);
	}
	return data(
		{
			name: packageName,
			metadata,
			typesPackage: getTypesPackageMetadata(packageName),
			error: null,
		},
		{ headers: { "Cache-Control": "public, max-age=3600" } },
	);
};

export default function Package({ loaderData }: Route.ComponentProps) {
	const { name, metadata, typesPackage, error } = loaderData;
	const navigation = useNavigation();

	const isLoadingPackage =
		navigation.state === "loading" && navigation.location.pathname.startsWith("/package");

	return (
		<main className="default-container">
			<PackageSearch initialQuery={name} />
			{isLoadingPackage ? (
				<LoadingResults />
			) : error ? (
				<ErrorResults>{error}</ErrorResults>
			) : (
				<SearchResults packageData={{ name, metadata, typesPackage }} />
			)}
		</main>
	);
}
