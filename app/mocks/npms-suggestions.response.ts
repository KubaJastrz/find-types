import { rest } from "msw";

import { type SuggestionsResponseData } from "~/features/package-search/suggestions";

export function npmsSuggestionsReact() {
  const data: SuggestionsResponseData[] = [
    {
      package: {
        name: "react",
        version: "18.2.0",
        description: "React is a JavaScript library for building user interfaces.",
      },
      highlight: "<em>react</em>",
    },
    {
      package: {
        name: "react-dom",
        version: "18.2.0",
        description: "React package for working with the DOM.",
      },
      highlight: "<em>react</em>-dom",
    },
    {
      package: {
        name: "react-redux",
        version: "8.0.5",
        description: "Official React bindings for Redux.",
      },
      highlight: "<em>react</em>-redux",
    },
  ];
  return rest.get("https://api.npms.io/v2/search/suggestions", async (req, res, ctx) => {
    return res(ctx.delay(), ctx.json(data));
  });
}

export function npmsSuggestionsEmpty() {
  const data: SuggestionsResponseData[] = [];
  return rest.get("https://api.npms.io/v2/search/suggestions", async (req, res, ctx) => {
    return res(ctx.delay(), ctx.json(data));
  });
}
