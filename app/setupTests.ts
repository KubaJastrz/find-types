import '@testing-library/jest-dom';

import fetch from 'node-fetch';

import { queryClient } from './features/app/query-client';
import { server } from './utils/mock-server';

// @ts-expect-error: needed for msw https://github.com/mswjs/msw/issues/1388
globalThis.fetch = fetch;

beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'warn',
  });
});

afterEach(() => {
  server.resetHandlers();
  queryClient.clear();
});

afterAll(() => {
  server.close();
});
