import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  isRouteErrorResponse,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import type { ReactNode } from "react";

import { Layout } from "~/features/app/layout";

import { Providers } from "./features/app/providers";
import styles from "./tailwind.css";

// https://remix.run/api/conventions#links
export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "manifest", href: "/manifest.webmanifest" },
    { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
    { rel: "icon", sizes: "32x32", href: "/favicon-32x32.png" },
    { rel: "icon", sizes: "16x16", href: "/favicon-16x16.png" },
  ];
};

// https://remix.run/api/conventions#meta
export const meta: MetaFunction = () => {
  return [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width,initial-scale=1" },
    { name: "description", content: "Search engine for TypeScript definitions" },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "https://types.kubajastrz.com/share-image.png" },
    { property: "og:image:width", content: "640" },
    { property: "og:image:height", content: "320" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:image", content: "https://types.kubajastrz.com/android-chrome-512x512.png" },
  ];
};

// https://remix.run/api/conventions#default-export
// https://remix.run/api/conventions#route-filenames
export default function App() {
  return (
    <Document>
      <Providers>
        <Layout>
          <Outlet />
        </Layout>
      </Providers>
    </Document>
  );
}

// https://remix.run/api/conventions#errorboundary
export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Document>
        <Providers>
          <Layout>
            <div>
              <h1>Oops</h1>
              <p>{error.status}</p>
              <p>{error.statusText}</p>
            </div>
          </Layout>
        </Providers>
      </Document>
    );
  }

  let errorMessage = "Unknown error";
  if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <Document>
      <Providers>
        <Layout>
          <div>
            <h1>Uh oh ...</h1>
            <p>Something went wrong.</p>
            <pre>{errorMessage}</pre>
          </div>
        </Layout>
      </Providers>
    </Document>
  );
}

function Document({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <html lang="en">
      <head>
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
