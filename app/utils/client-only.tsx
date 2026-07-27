/* Source: https://github.com/sergiodxa/remix-utils MIT License */

import { useHydrated } from "./hooks";

type Props = {
	children(): React.ReactNode;
	fallback?: React.ReactNode;
};

/**
 * Render the children only after the JS has loaded client-side. Use an optional
 * fallback component if the JS is not yet loaded.
 */
export function ClientOnly({ children, fallback = null }: Props) {
	return useHydrated() ? children() : fallback;
}
