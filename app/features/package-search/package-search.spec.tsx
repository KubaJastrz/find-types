import { act, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { npmsSuggestionsReact } from '~/mocks/npms-suggestions.response';
import { server } from '~/utils/mock-server';
import { RenderBuilder } from '~/utils/testing';

import { PackageSearch } from './package-search';

vi.useFakeTimers();

function render(ui: JSX.Element) {
  return new RenderBuilder(ui)
    .withQueryClient()
    .withRouter({ additionalRoutes: [{ path: '/package/:id', element: <></> }] })
    .render();
}

it('opens a suggestion box', async () => {
  server.use(npmsSuggestionsReact());

  render(<PackageSearch />);
  const user = userEvent.setup({
    advanceTimers(delay) {
      vi.advanceTimersByTime(delay);
    },
  });

  const input = screen.getByRole('combobox', {
    name: /npm package/i,
  });

  await user.type(input, 'react');
  expect(input).toHaveValue('react');

  expect(screen.getByTestId('loading')).toBeVisible();
  act(() => {
    vi.advanceTimersToNextTimer();
  });

  await waitForElementToBeRemoved(() => screen.getByTestId('loading'));

  const options = screen.getAllByRole('option').map((option) => option.children[0].innerHTML);
  expect(options).toMatchInlineSnapshot(`
    [
      "<em>react</em>",
      "<em>react</em>-dom",
      "<em>react</em>-redux",
    ]
  `);
});

it('navigates to the package page when a suggestion is selected', async () => {
  server.use(npmsSuggestionsReact());

  const { router } = render(<PackageSearch />);
  const user = userEvent.setup({
    advanceTimers(delay) {
      vi.advanceTimersByTime(delay);
    },
  });

  const input = screen.getByRole('combobox', {
    name: /npm package/i,
  });

  await user.type(input, 'react');

  act(() => {
    vi.advanceTimersToNextTimer();
  });

  await waitForElementToBeRemoved(() => screen.getByTestId('loading'));

  const option = screen.getByRole('option', { name: /react -dom/i });
  await user.click(option);

  await waitFor(() => {
    expect(router?.state.location.pathname).toBe('/package/react-dom');
  });
});

it('triggers a search from a prefilled form', async () => {
  server.use(npmsSuggestionsReact());

  const { router } = render(<PackageSearch initialQuery="react" />);
  const user = userEvent.setup({
    advanceTimers(delay) {
      vi.advanceTimersByTime(delay);
    },
  });

  const input = screen.getByRole('combobox', {
    name: /npm package/i,
  });

  expect(input).toHaveValue('react');
  await user.click(input);

  await waitForElementToBeRemoved(() => screen.getByTestId('loading'));

  const option = screen.getByRole('option', { name: /^react$/i });
  await user.click(option);

  await waitFor(() => {
    expect(router?.state.location.pathname).toBe('/package/react');
  });
});

it('triggers a search on Enter key without any selection', async () => {
  server.use(npmsSuggestionsReact());

  const { router } = render(<PackageSearch initialQuery="react" />);
  const user = userEvent.setup({
    advanceTimers(delay) {
      vi.advanceTimersByTime(delay);
    },
  });

  const input = screen.getByRole('combobox', {
    name: /npm package/i,
  });

  expect(input).toHaveValue('react');
  await user.click(input);

  await waitForElementToBeRemoved(() => screen.getByTestId('loading'));

  await user.keyboard('{enter}');

  await waitFor(() => {
    expect(router?.state.location.pathname).toBe('/package/react');
  });
});
