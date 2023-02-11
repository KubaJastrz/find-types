import '@testing-library/jest-dom';

import fetch from 'node-fetch';

import { queryClient } from './features/app/query-client';
import { server } from './utils/mock-server';

// needed for msw https://github.com/mswjs/msw/issues/1388
// @ts-expect-error
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
