import type { Metadata } from "next";

import { defaultLocale } from "@/content/locales";

const target = `/${defaultLocale}/`;

/**
 * `/` is not a real page — it only forwards to the default locale. A static
 * export has no server to redirect with, so the forward happens in the browser.
 *
 * Three layers, fastest first: an inline script that replaces the URL before
 * the body paints, a meta refresh for JS-disabled browsers, and a plain link
 * as the last resort. The link is the only visible content, so it stays hidden
 * until the fallbacks are actually needed — otherwise it flashes in the corner
 * for the split second before the redirect lands.
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
        <style>{`.fallback{opacity:0;animation:show 0s linear 1s forwards}@keyframes show{to{opacity:1}}`}</style>
        {/* Runs before the body is parsed; `replace` keeps `/` out of history. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `location.replace(${JSON.stringify(target)})`,
          }}
        />
      </head>
      <body>
        <a className="fallback" href={target}>
          Continue to the site
        </a>
      </body>
    </html>
  );
}
