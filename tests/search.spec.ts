import { npmsSuggestionsReact } from '~/mocks/npms-suggestions.response';

import { expect, test } from './test';

test('opens a suggestion box and navigates to selected package', async ({ page, worker }) => {
  await page.goto('/');
  await worker.use(npmsSuggestionsReact());
  const responsePromise = page.waitForResponse('https://api.npms.io/v2/search/suggestions?**');

  const search = page.getByRole('combobox', { name: /npm package/i });
  await search.fill('react');
  await expect(search).toHaveValue('react');

  expect(await page.getByTestId('loading').isVisible()).toBe(true);

  await responsePromise;

  expect(await page.getByRole('option').count()).toBe(3);
  expect(await page.getByRole('option', { name: 'react', exact: true }).isVisible()).toBe(true);
  expect(await page.getByRole('option', { name: 'react-dom' }).isVisible()).toBe(true);
  expect(await page.getByRole('option', { name: 'react-redux' }).isVisible()).toBe(true);

  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');

  expect(await page.getByRole('option').count()).toBe(0);

  await page.waitForURL('**/package/react-dom');

  const search2 = page.getByRole('combobox', { name: /npm package/i });
  await expect(search2).toHaveValue('react-dom');
});

test('navigates to package page without suggestions', async ({ page, worker }) => {
  await page.goto('/');
  await worker.use(npmsSuggestionsReact());
  const responsePromise = page.waitForResponse('https://api.npms.io/v2/search/suggestions?**');

  const search = page.getByRole('combobox', { name: /npm package/i });
  await search.fill('react');
  await expect(search).toHaveValue('react');

  expect(await page.getByTestId('loading').isVisible()).toBe(true);

  await responsePromise;

  expect(await page.getByRole('option').count()).toBe(3);
  expect(await page.getByRole('option', { name: 'react', exact: true }).isVisible()).toBe(true);
  expect(await page.getByRole('option', { name: 'react-dom' }).isVisible()).toBe(true);
  expect(await page.getByRole('option', { name: 'react-redux' }).isVisible()).toBe(true);

  await page.keyboard.press('Enter');

  expect(await page.getByRole('option').count()).toBe(0);

  await page.waitForURL('http://127.0.0.1:3000/package/react');

  const search2 = page.getByRole('combobox', { name: /npm package/i });
  await expect(search2).toHaveValue('react');
});
