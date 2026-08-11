"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

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

/**
 * Two bars that rotate into a cross. Transforms only — the bars keep their
 * box, so the button never reflows the header row as it toggles.
 */
function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block size-4" aria-hidden>
      {[0, 1].map((i) => (
        <span
          key={i}
          data-mobile-menu-icon
          className="absolute left-0 block h-[1.8px] w-full rounded-full bg-current transition-transform duration-300"
          style={{
            top: i === 0 ? "5px" : "10px",
            transitionTimingFunction: "var(--ease-sheet)",
            transform: open
              ? `translateY(${i === 0 ? "2.5px" : "-2.5px"}) rotate(${i === 0 ? 45 : -45}deg)`
              : "none",
          }}
        />
      ))}
    </span>
  );
}

/**
 * Scrolls a section's heading into view just below the sticky header.
 *
 * Two things make a single scrollTo() land short:
 *  - `body` sets `overflow-x: hidden` for the full-bleed marquee, promoting it
 *    to the scroll container, where `scroll-padding-top` isn't honoured.
 *  - `Reveal` blocks below the fold are still collapsed when the scroll starts,
 *    so the document grows underneath it and the target drifts.
 *
 * So we re-measure as the scroll settles and correct until the heading sits
 * where it should. `Math.min` covers the header shrinking 68px → 56px.
 */
function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /**
   * Align on the heading row, not the section box — the box opens with `py-16`,
   * so targeting it leaves ~64px of dead space above the title. The row is the
   * h2's parent, which also carries the "02" label alongside it.
   */
  const heading = target.querySelector("h1, h2");
  const anchor = heading?.closest("div") ?? heading ?? target;

  const settle = (behavior: ScrollBehavior) => {
    const header = document.querySelector("header");
    const clearance = (header ? Math.min(header.getBoundingClientRect().height, 56) : 56) + 16;
    const top = anchor.getBoundingClientRect().top + window.scrollY - clearance;

    if (Math.abs(top - window.scrollY) < 2) return true;
    window.scrollTo({ top, behavior });
    return false;
  };

  if (reduced) {
    settle("auto");
    return;
  }

  settle("smooth");

  /** Re-check while the smooth scroll runs; stop once it's on target or time's up. */
  let checks = 0;
  const timer = window.setInterval(() => {
    if (settle("auto") || ++checks > 12) window.clearInterval(timer);
  }, 60);
}

export function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const { copy } = getContent(locale);
  const home = `/${locale}/`;
  const [shrunk, setShrunk] = useState(false);
  const [active, setActive] = useState<SectionId | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

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

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    /** Growing past the md breakpoint restores the inline nav; drop the panel with it. */
    const desktop = window.matchMedia("(min-width: 768px)");
    const onDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onDesktop);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [menuOpen]);

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
        <Link
          href={home}
          onClick={() => setMenuOpen(false)}
          className="flex min-w-0 items-center gap-2.5 text-ink"
        >
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
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToSection(id);
                    history.replaceState(null, "", `#${id}`);
                  }}
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
            <LocaleSwitcher current={locale} onNavigate={() => setMenuOpen(false)} />
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? copy.nav.menuClose : copy.nav.menuOpen}
            className="ml-1 flex size-9 shrink-0 items-center justify-center rounded-full text-ink transition-colors hover:bg-[oklch(0.94_0.008_80)] md:hidden"
          >
            <MenuIcon open={menuOpen} />
          </button>
        </nav>
      </div>

      {/*
        Grid-rows trick: the panel animates between 0fr and 1fr, so it opens to
        its own height without hardcoding one. `invisible` keeps the collapsed
        links out of the tab order and the accessibility tree.
      */}
      <div
        id={menuId}
        data-mobile-menu
        className={`grid overflow-hidden border-border transition-[grid-template-rows,opacity] duration-300 md:hidden ${
          menuOpen ? "grid-rows-[1fr] border-t opacity-100" : "invisible grid-rows-[0fr] opacity-0"
        }`}
        style={{ transitionTimingFunction: "var(--ease-sheet)" }}
      >
        <div className="min-h-0">
          <nav className="mx-auto flex max-w-[1120px] flex-col px-5 py-3 sm:px-8">
            {isHome
              ? navLinks.map(({ id, label }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      setMenuOpen(false);
                      /** Let the panel collapse first so the header is at its final height. */
                      requestAnimationFrame(() => {
                        scrollToSection(id);
                        history.replaceState(null, "", `#${id}`);
                      });
                    }}
                    aria-current={active === id ? "true" : undefined}
                    className={`rounded-xl px-3 py-3 text-[15px] font-semibold transition-colors ${
                      active === id
                        ? "bg-[oklch(0.94_0.008_80)] text-ink"
                        : "text-ink-nav hover:bg-[oklch(0.94_0.008_80)] hover:text-ink"
                    }`}
                  >
                    {label}
                  </a>
                ))
              : navLinks.map(({ id, label }) => (
                  /** Off the home page the sections don't exist yet — route there first. */
                  <Link
                    key={id}
                    href={`${home}#${id}`}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl px-3 py-3 text-[15px] font-semibold text-ink-nav transition-colors hover:bg-[oklch(0.94_0.008_80)] hover:text-ink"
                  >
                    {label}
                  </Link>
                ))}

            <a
              href={`mailto:${site.email}`}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-3 py-3 text-[15px] font-semibold text-ink-nav transition-colors hover:bg-[oklch(0.94_0.008_80)] hover:text-ink"
            >
              {copy.nav.contact}
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
