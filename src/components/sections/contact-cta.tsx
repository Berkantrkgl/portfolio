import { Reveal } from "@/components/motion/reveal";
import { getContent } from "@/content";
import type { Locale } from "@/content/locales";
import { site } from "@/content/site";

export function ContactCta({ locale }: { locale: Locale }) {
  const { copy } = getContent(locale);

  return (
    <Reveal as="section" className="mt-10">
      <div className="flex flex-wrap items-center justify-between gap-8 rounded-[20px] bg-ink px-8 py-14 text-inverse sm:px-14 sm:py-18">
        <div>
          <h2 className="m-0 mb-3 text-[clamp(1.875rem,5vw,2.75rem)] font-extrabold tracking-[-0.04em]">
            {copy.cta.heading}
          </h2>
          <p className="m-0 max-w-[46ch] text-[17px] leading-relaxed text-inverse-body">
            {copy.cta.body}
          </p>
        </div>

        <a
          href={`mailto:${site.email}`}
          className="rounded-xl bg-accent px-7 py-4 text-base font-bold whitespace-nowrap text-white transition-colors hover:bg-inverse hover:text-ink"
        >
          {site.email}
        </a>
      </div>
    </Reveal>
  );
}
