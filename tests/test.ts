import { defineNetworkFixture, type NetworkFixture } from "@msw/playwright";
import { test as baseTest } from "@playwright/test";
import type { AnyHandler } from "msw";

interface Fixtures {
	handlers: AnyHandler[];
	network: NetworkFixture;
}

export const test = baseTest.extend<Fixtures>({
	handlers: [],

	network: [
		async ({ context, handlers }, use) => {
			const network = defineNetworkFixture({ context, handlers });

			await network.enable();
			await use(network);
			await network.disable();
		},
		{ auto: true },
	],
});

export { expect } from "@playwright/test";
