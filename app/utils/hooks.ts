/* Source: https://github.com/sergiodxa/remix-utils MIT License */

import { useEffect, useState, useSyncExternalStore } from "react";

function subscribe() {
	return () => {};
}

export function useHydrated() {
	return useSyncExternalStore(
		subscribe,
		() => true,
		() => false,
	);
}

export function useDebouncedValue(value: string, delay: number) {
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
