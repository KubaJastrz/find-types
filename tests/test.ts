import { test as baseTest } from "@playwright/test";
import { type MockServiceWorker, createWorkerFixture } from "playwright-msw";

export const test = baseTest.extend<{
  worker: MockServiceWorker;
}>({
  worker: createWorkerFixture(),
});

export { expect } from "@playwright/test";
