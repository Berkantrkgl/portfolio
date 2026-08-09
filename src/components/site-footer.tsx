import { getContent } from "@/content";
import type { Locale } from "@/content/locales";
import { site } from "@/content/site";

export function SiteFooter({ locale }: { locale: Locale }) {
  const { copy } = getContent(locale);

  return (
    <footer className="flex flex-wrap items-center justify-between gap-6 pt-10 pb-14 font-mono text-xs text-ink-meta">
      <span>{copy.footer.rights}</span>
      <span className="flex gap-5">
        <a
          href={site.github}
          target="_blank"
          rel="noreferrer"
          className="transition-colors hover:text-accent"
        >
          GitHub
        </a>
        <a
          href={site.linkedin}
          target="_blank"
          rel="noreferrer"
          className="transition-colors hover:text-accent"
        >
          LinkedIn
        </a>
        <a href={`mailto:${site.email}`} className="transition-colors hover:text-accent">
          Email
        </a>
      </span>
    </footer>
  );
}
