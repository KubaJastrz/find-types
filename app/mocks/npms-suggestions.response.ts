import { rest } from 'msw';

import type { SuggestionsResponseData } from '~/features/package-search/suggestions';

export function npmsSuggestionsReact() {
  const data: SuggestionsResponseData[] = [
    {
      package: {
        name: 'react',
        version: '18.2.0',
      },
      highlight: '<em>react</em>',
    },
    {
      package: {
        name: 'react-dom',
        version: '18.2.0',
      },
      highlight: '<em>react</em>-dom',
    },
    {
      package: {
        name: 'react-redux',
        version: '8.0.5',
      },
      highlight: '<em>react</em>-redux',
    },
  ];
  return rest.get('https://api.npms.io/v2/search/suggestions', (req, res, ctx) => {
    return res(ctx.json(data));
  });
}

export function npmsSuggestionsEmpty() {
  const data: SuggestionsResponseData[] = [];
  return rest.get('https://api.npms.io/v2/search/suggestions', (req, res, ctx) => {
    return res(ctx.json(data));
  });
}