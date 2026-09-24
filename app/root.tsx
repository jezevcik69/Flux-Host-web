import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { SmoothScroll } from "./components/SmoothScroll";
import { LangProvider } from "./i18n";

export const links: Route.LinksFunction = () => [
  { rel: "icon", type: "image/png", href: "/img/logo.png" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400..700&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="grain font-sans">
        <LangProvider>
          <SmoothScroll />
          {children}
        </LangProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Error";
  let details = "Something went wrong. Try reloading the page.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "This page does not exist." : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-3xl flex-col justify-center px-6">
      <h1 className="font-medium tracking-[-0.02em] text-7xl">{message}</h1>
      <p className="mt-4 text-mute">{details}</p>
      <a href="/" className="mt-8 w-fit rounded-md bg-paper px-6 py-3 font-medium text-ink">
        Back to home
      </a>
      {stack && (
        <pre className="mt-8 w-full overflow-x-auto p-4 text-xs text-mute">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
