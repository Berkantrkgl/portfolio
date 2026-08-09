import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { getContent } from "@/content";
import type { Locale } from "@/content/locales";

export function Career({ locale }: { locale: Locale }) {
  const { career } = getContent(locale).copy;

  return (
    <section id="career" className="scroll-mt-20 py-16 lg:py-22">
      <SectionHeading label={career.label} heading={career.heading} />

      <div className="flex flex-col">
        {career.roles.map((role, i) => (
          <Reveal
            key={role.company}
            index={i}
            className={`grid gap-4 border-t border-border-soft py-8 md:grid-cols-[240px_1fr] md:gap-10 ${
              i === career.roles.length - 1 ? "border-b" : ""
            }`}
          >
            <div>
              <div
                className={`font-mono text-[12.5px] ${i === 0 ? "text-accent" : "text-[oklch(0.62_0.01_60)]"}`}
              >
                {role.period}
              </div>
              <div className="mt-2.5 text-lg font-extrabold tracking-[-0.02em]">{role.company}</div>
              <div className="mt-0.5 text-sm text-ink-3">{role.role}</div>
            </div>

            <div>
              <ul className="m-0 flex list-disc flex-col gap-3 pl-5 text-base leading-[1.65] text-ink-body">
                {role.bullets.map((bullet) => (
                  <li key={bullet.slice(0, 24)}>{bullet}</li>
                ))}
              </ul>

              {role.tags && (
                <div className="mt-4.5 flex flex-wrap gap-2">
                  {role.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-surface-muted px-2.5 py-[5px] font-mono text-[11.5px] text-ink-nav"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
