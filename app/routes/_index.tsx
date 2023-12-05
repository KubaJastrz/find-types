import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useNavigation } from "@remix-run/react";

import { LoadingResults, PackageSearch } from "~/features/package-search";

// Handles legacy `q` query param.
export const loader = async ({ request }: LoaderFunctionArgs) => {
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
