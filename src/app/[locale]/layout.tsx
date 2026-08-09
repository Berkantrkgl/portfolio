import type { Metadata } from "next";
import { JetBrains_Mono, Manrope } from "next/font/google";
import { notFound } from "next/navigation";

import { ScrollProgress } from "@/components/scroll-progress";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getContent } from "@/content";
import { isLocale, localeHtmlLang, locales } from "@/content/locales";
import "../globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
});

/** The root layout lives under `[locale]`, so `lang` is known before render. */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const { copy } = getContent(locale);

  return {
    title: copy.meta.title,
    description: copy.meta.description,
    alternates: {
      canonical: `/${locale}/`,
      languages: Object.fromEntries(locales.map((it) => [it, `/${it}/`])),
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html
      lang={localeHtmlLang[locale]}
      className={`${manrope.variable} ${jetbrainsMono.variable} antialiased`}
    >
      {/* Horizontal clipping lives here, not on <main> — the marquee is
          full-bleed (100vw) and <main> clipping it is what pinned the band to
          the content column. */}
      <body className="overflow-x-hidden">
        <ScrollProgress />
        <SiteHeader locale={locale} />

        <main className="mx-auto max-w-[1120px] px-5 sm:px-8">
          {children}
          <SiteFooter locale={locale} />
        </main>
      </body>
    </html>
  );
}
