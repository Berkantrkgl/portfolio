import type { Metadata } from "next";
import { JetBrains_Mono, Manrope } from "next/font/google";

import { ScrollProgress } from "@/components/scroll-progress";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { copy } from "@/content/copy";
import "./globals.css";

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

export const metadata: Metadata = {
  title: copy.meta.title,
  description: copy.meta.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} ${jetbrainsMono.variable} antialiased`}>
      {/* Horizontal clipping lives here, not on <main> — the marquee is
          full-bleed (100vw) and <main> clipping it is what pinned the band to
          the content column. */}
      <body className="overflow-x-hidden">
        <ScrollProgress />
        <SiteHeader />

        <main className="mx-auto max-w-[1120px] px-5 sm:px-8">
          {children}
          <SiteFooter />
        </main>
      </body>
    </html>
  );
}
