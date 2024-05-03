import {
  type HeadersFunction,
  type LoaderFunctionArgs,
  type MetaFunction,
  defer,
} from "@remix-run/node";
import { useLoaderData, useNavigation } from "@remix-run/react";

import {
  ErrorResults,
  LoadingResults,
  PackageSearch,
  SearchResults,
} from "~/features/package-search";
import { isErrorResponse } from "~/server-services/package-data/errors";
import {
  getPackageMetadata,
  getTypesPackageMetadata,
} from "~/server-services/package-data/package-data.server";

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return {
    "Cache-Control": loaderHeaders.get("Cache-Control") ?? "",
  };
};

export const meta: MetaFunction = ({ params }) => {
  const packageName = params["*"]!;
  return [{ title: `${packageName} - Find Types` }];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const packageName = params["*"]!;
  const metadata = await getPackageMetadata(packageName);

  if (isErrorResponse(metadata)) {
    return defer(
      {
        name: packageName,
        metadata: null,
        typesPackage: Promise.resolve(null),
        error: metadata.message,
      },
      { status: metadata.statusCode },
    );
  }
  return defer(
    {
      name: packageName,
      metadata,
      typesPackage: getTypesPackageMetadata(packageName),
      error: null,
    },
    { headers: { "Cache-Control": "public, max-age=3600" } },
  );
};

export default function Package() {
  const { name, metadata, typesPackage, error } = useLoaderData<typeof loader>();
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
