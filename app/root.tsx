import { TooltipProvider } from "@radix-ui/react-tooltip";
import { type LinksFunction, type MetaFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { type ReactNode } from "react";
import { MainLayout } from "~/components/layout";
import styles from "./tailwind.css?url";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "manifest", href: "/manifest.webmanifest" },
    { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
    { rel: "icon", sizes: "32x32", href: "/favicon-32x32.png" },
    { rel: "icon", sizes: "16x16", href: "/favicon-16x16.png" },
  ];
};

export const meta: MetaFunction = () => {
  return [
    { name: "description", content: "Search engine for TypeScript definitions" },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "https://types.kubajastrz.com/share-image.png" },
    { property: "og:image:width", content: "640" },
    { property: "og:image:height", content: "320" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:image", content: "https://types.kubajastrz.com/android-chrome-512x512.png" },
  ];
};

export function Layout({ children }: { children: ReactNode }) {
  return (
    <Document>
      <MainLayout>{children}</MainLayout>
    </Document>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1 className="font-medium">
          {error.status} {error.statusText}
        </h1>
        <p>Something went wrong.</p>
        <pre>{error.data}</pre>
      </div>
    );
  }

  let errorMessage = "Unknown error";
  if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div>
      <h1>Uh oh ...</h1>
      <p>Something went wrong.</p>
      <pre>{errorMessage}</pre>
    </div>
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 10 * 60 * 1000, // 10 minutes
    },
    mutations: {},
  },
});

function Document({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>{children}</TooltipProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
        <Scripts />
        <ScrollRestoration />
      </body>
    </html>
  );
}
