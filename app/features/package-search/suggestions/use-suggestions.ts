import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { SuggestionsResponseData } from "./models";

async function fetchSuggestions(packageKey: string) {
	const url = new URL(`https://api.npms.io/v2/search/suggestions`);
	url.searchParams.set("q", packageKey);
	url.searchParams.set("size", "10");

	const response = await fetch(url.toString(), { method: "get" });
	if (!response.ok) {
		throw new Error(`Error ${response.status}`);
	}
	return response.json() as Promise<SuggestionsResponseData[]>;
}

export function useSuggestions(packageName: string) {
	const packageKey = useDebouncedValue(packageName, 300);

	return useQuery({
		queryKey: ["suggestions", packageKey],
		queryFn: async () => fetchSuggestions(packageKey),
		enabled: !!packageKey,
		staleTime: Infinity,
	});
}

function useDebouncedValue(value: string, delay: number) {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(timer);
		};
	}, [value, delay]);

	return debouncedValue;
}
