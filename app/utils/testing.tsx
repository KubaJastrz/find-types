import { TooltipProvider } from "@radix-ui/react-tooltip";
import type { Router } from "@remix-run/router";
import type { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { cloneElement } from "react";
import { createMemoryRouter, RouterProvider } from "react-router";

import { queryClient } from "~/features/app/query-client";

interface WithRouter {
  additionalRoutes?: { path: string; element: JSX.Element }[];
}

export class RenderBuilder {
  public router: Router | undefined;
  private wrappers: {
    // lower order renders first
    order: number;
    jsx: JSX.Element;
  }[] = [];

  constructor(private ui: JSX.Element) {
    this.withBaseProviders();
  }

  withBaseProviders() {
    this.wrappers.push({ order: 100, jsx: <TooltipProvider>dummy</TooltipProvider> });
    return this;
  }

  withRouter({ additionalRoutes = [] }: WithRouter = {}) {
    const router = createMemoryRouter([{ path: "/", element: this.ui }, ...additionalRoutes]);
    this.wrappers.push({ order: 1, jsx: <RouterProvider router={router} /> });
    this.router = router;
    return this;
  }

  withQueryClient(_client?: QueryClient) {
    const client = _client ?? queryClient;
    this.wrappers.push({ order: 5, jsx: <QueryClientProvider client={client} /> });
    return this;
  }

  render() {
    const Wrapper = ({ children }: { children: JSX.Element }) => {
      return this.wrappers
        .slice()
        .sort((a, b) => a.order - b.order)
        .reduce((acc, { jsx }) => {
          return cloneElement(jsx, {}, acc);
        }, children);
    };

    return {
      ...render(this.ui, { wrapper: Wrapper }),
      router: this.router,
    };
  }
}
