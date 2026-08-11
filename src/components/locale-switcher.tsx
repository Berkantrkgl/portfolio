"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { locales, localeNames, type Locale } from "@/content/locales";

/**
 * Swaps the locale segment and keeps the rest of the path, so switching
 * language on a case study lands on the same case study rather than home.
 */
function swapLocale(pathname: string, locale: Locale) {
  const segments = pathname.split("/").filter(Boolean);
  segments[0] = locale;
  return `/${segments.join("/")}/`;
}

export function LocaleSwitcher({
  current,
  onNavigate,
}: {
  current: Locale;
  /** Lets the header dismiss its mobile panel when a switch navigates away. */
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <div
      className="flex shrink-0 items-center rounded-full border border-border p-0.5"
      role="group"
    >
      {locales.map((locale) => {
        const active = locale === current;

        return (
          <Link
            key={locale}
            href={swapLocale(pathname, locale)}
            hrefLang={locale}
            onClick={onNavigate}
            aria-current={active ? "true" : undefined}
            className={`rounded-full px-2 py-1 font-mono text-[11px] font-medium transition-colors sm:px-2.5 sm:text-[11.5px] ${
              active
                ? "bg-ink text-inverse"
                : "text-ink-nav hover:bg-[oklch(0.94_0.008_80)] hover:text-ink"
            }`}
          >
            {localeNames[locale]}
          </Link>
        );
      })}
    </div>
  );
}
