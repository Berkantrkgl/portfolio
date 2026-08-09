import type { Metadata } from "next";

import { defaultLocale } from "@/content/locales";

const target = `/${defaultLocale}/`;

/**
 * `/` is not a real page — it only forwards to the default locale. A static
 * export has no server to redirect with, so the redirect is a meta refresh
 * plus a visible link for anyone who lands here with JS and refresh disabled.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: true },
  alternates: { canonical: target },
};

export default function RootRedirect() {
  return (
    <html lang={defaultLocale}>
      <head>
        <meta httpEquiv="refresh" content={`0; url=${target}`} />
      </head>
      <body>
        <a href={target}>Continue to the site</a>
      </body>
    </html>
  );
}
