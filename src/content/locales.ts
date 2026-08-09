/**
 * The two locales the site ships in. `en` is the default — `/` forwards there,
 * since the site stands in for a CV in job applications. Turkish lives at `/tr/`.
 */

export const locales = ["en", "tr"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Label shown in the header switcher. */
export const localeNames: Record<Locale, string> = {
  en: "EN",
  tr: "TR",
};

/** `lang` attribute on <html>. */
export const localeHtmlLang: Record<Locale, string> = {
  en: "en",
  tr: "tr",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
