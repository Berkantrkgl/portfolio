"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { getContent } from "@/content";
import type { Locale } from "@/content/locales";
import { site } from "@/content/site";

const SECTIONS = ["about", "career", "projects", "education"] as const;
type SectionId = (typeof SECTIONS)[number];

function DownloadIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M8 2v8m0 0L4.75 6.75M8 10l3.25-3.25M2.5 13.5h11" />
    </svg>
  );
}

export function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const { copy } = getContent(locale);
  const home = `/${locale}/`;
  const [shrunk, setShrunk] = useState(false);
  const [active, setActive] = useState<SectionId | null>(null);

  /** Only the home page has the anchor sections. */
  const isHome = pathname === home || pathname === `/${locale}`;

  useEffect(() => {
    let frame: number | null = null;

    const read = () => {
      frame = null;
      setShrunk(window.scrollY > 60);

      if (!isHome) return;

      let current: SectionId | null = null;
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActive(current);
    };

    const queue = () => {
      if (frame === null) frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);

    return () => {
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [isHome]);

  const navLinks: { id: SectionId; label: string }[] = [
    { id: "about", label: copy.nav.about },
    { id: "career", label: copy.nav.career },
    { id: "projects", label: copy.nav.projects },
    { id: "education", label: copy.nav.education },
  ];

  return (
    <header
      className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md transition-shadow duration-400"
      style={{
        boxShadow: shrunk ? "0 10px 30px -26px oklch(0.24 0.012 60 / 0.6)" : "none",
      }}
    >
      <div
        className="mx-auto flex max-w-[1120px] items-center justify-between gap-4 px-5 transition-[height] duration-400 sm:px-8"
        style={{
          height: shrunk ? 56 : 68,
          transitionTimingFunction: "cubic-bezier(0.2, 0.7, 0.2, 1)",
        }}
      >
        {/* The name yields first when the row runs out of width; the actions don't. */}
        <Link href={home} className="flex min-w-0 items-center gap-2.5 text-ink">
          <span className="size-2.5 shrink-0 rounded-[2px] bg-accent" />
          <span className="truncate text-[15px] font-extrabold tracking-[-0.02em]">
            {site.name}
          </span>
        </Link>

        <nav className="flex shrink-0 items-center gap-1">
          {isHome && (
            <div className="hidden items-center gap-1 md:flex">
              {navLinks.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                    active === id
                      ? "bg-[oklch(0.94_0.008_80)] text-ink"
                      : "text-ink-nav hover:bg-[oklch(0.94_0.008_80)] hover:text-ink"
                  }`}
                >
                  {label}
                </a>
              ))}
            </div>
          )}

          {/* Contact moved out of the filled slot, but stays reachable here. */}
          <a
            href={`mailto:${site.email}`}
            className="hidden rounded-full px-3.5 py-2 text-sm font-semibold text-ink-nav transition-colors hover:bg-[oklch(0.94_0.008_80)] hover:text-ink sm:block"
          >
            {copy.nav.contact}
          </a>

          <a
            href={site.resume}
            download={site.resumeFilename}
            className="flex shrink-0 items-center gap-2 rounded-full bg-ink py-2 pr-3.5 pl-3 text-sm font-bold text-inverse transition-colors hover:bg-accent sm:ml-1.5 sm:pr-4 sm:pl-3.5"
          >
            <DownloadIcon />
            {copy.nav.resume}
          </a>

          <div className="ml-1 sm:ml-1.5">
            <LocaleSwitcher current={locale} />
          </div>
        </nav>
      </div>
    </header>
  );
}
