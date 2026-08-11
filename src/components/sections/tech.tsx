import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { getContent } from "@/content";
import type { Locale } from "@/content/locales";

/**
 * One row per group: the label and a line of context on the left, the tokens
 * as chips on the right. Rows read as a list rather than four equal cards,
 * which lets the Java group sit first and carry visible weight.
 */
export function Tech({ locale }: { locale: Locale }) {
  const { tech } = getContent(locale).copy;

  return (
    <section id="about" className="border-t border-border-soft py-16 lg:py-20">
      <SectionHeading label={tech.label} heading={tech.heading} />

      <div className="flex flex-col">
        {tech.groups.map((group, i) => (
          <Reveal
            key={group.category}
            index={i}
            className="grid gap-4 border-t border-border-soft py-7 md:grid-cols-[240px_1fr] md:gap-10"
          >
            <div>
              <div
                className={`font-mono text-[10.5px] tracking-[0.08em] uppercase ${
                  group.primary ? "text-accent" : "text-ink-label"
                }`}
              >
                {group.category}
              </div>
              <p className="mt-2 mb-0 text-[14.5px] leading-[1.5] text-ink-3">{group.blurb}</p>
            </div>

            <div className="flex flex-wrap content-start gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className={`rounded-lg px-3 py-2 font-mono text-[12.5px] leading-none ${
                    group.primary
                      ? "border border-accent-border bg-[oklch(0.99_0.008_60)] text-[oklch(0.4_0.06_44)]"
                      : "bg-surface-muted text-[oklch(0.4_0.012_60)]"
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
