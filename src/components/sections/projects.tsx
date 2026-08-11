import { Reveal } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { getContent } from "@/content";
import type { Locale } from "@/content/locales";

/**
 * The card-wide link has no hover affordance on touch, so below `sm` the CTA
 * takes a button's outline to look tappable; from `sm` up it is plain text again.
 */
function CardCta({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-[10px] border border-accent-border px-3.5 py-2 font-mono text-[12.5px] font-medium text-accent-link sm:rounded-none sm:border-0 sm:px-0 sm:py-0">
      {label}
      <span aria-hidden>→</span>
    </div>
  );
}

export function Projects({ locale }: { locale: Locale }) {
  const { copy, projects } = getContent(locale);
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-16 lg:py-22">
      <SectionHeading
        label={copy.projects.label}
        heading={copy.projects.heading}
        aside={
          <span className="hidden font-mono text-[12.5px] text-ink-meta sm:block">
            {copy.projects.hint}
          </span>
        }
      />

      <div className="flex flex-col gap-5">
        {featured && (
          <Reveal>
            <ProjectCard href={`/${locale}/projects/${featured.slug}/`} className="p-7 sm:p-9">
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-11">
                <div>
                  <div className="flex items-center gap-2.5 font-mono text-[11.5px] tracking-[0.06em] text-accent uppercase">
                    <span className="size-1.5 rounded-full bg-accent" />
                    {featured.category}
                  </div>

                  <h3 className="mt-4 mb-2 text-[clamp(1.5rem,4vw,1.875rem)] font-extrabold tracking-[-0.03em]">
                    {featured.title}
                  </h3>
                  <div className="text-[15px] text-ink-3">{featured.meta}</div>

                  <p className="mt-4.5 mb-0 text-base leading-[1.65] text-ink-body">
                    {featured.summary}
                  </p>

                  {featured.tags && (
                    <div className="mt-5.5 flex flex-wrap gap-2">
                      {featured.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-surface-muted px-2.5 py-[5px] font-mono text-[11.5px] text-ink-nav"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-6.5">
                    <CardCta label={copy.projects.cta} />
                  </div>
                </div>

                <div className="flex flex-col gap-3.5 lg:border-l lg:border-border-inner lg:pl-10">
                  {featured.highlights?.map((highlight) => (
                    <div key={highlight.slice(0, 24)} className="flex gap-3.5">
                      <span className="pt-[3px] font-mono text-xs text-arrow">→</span>
                      <span className="text-[15.5px] leading-[1.6] text-ink-2">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ProjectCard>
          </Reveal>
        )}

        <div className="grid gap-5 lg:grid-cols-2">
          {rest.map((project, i) => (
            <Reveal key={project.slug} index={i + 1}>
              <ProjectCard
                href={`/${locale}/projects/${project.slug}/`}
                className="h-full p-6 sm:p-8"
              >
                <div className="font-mono text-[11.5px] tracking-[0.06em] text-ink-label uppercase">
                  {project.category}
                </div>

                <h3 className="mt-3.5 mb-2 text-[26px] font-extrabold tracking-[-0.03em]">
                  {project.title}
                </h3>
                <div className="text-[14.5px] text-ink-3">{project.meta}</div>

                <ul className="mt-5 mb-0 flex list-disc flex-col gap-2.5 pl-4.5 text-[15.5px] leading-[1.6] text-ink-body">
                  {project.bullets?.map((bullet) => (
                    <li key={bullet.slice(0, 24)}>{bullet}</li>
                  ))}
                </ul>

                <div className="mt-5.5">
                  <CardCta label={copy.projects.cta} />
                </div>
              </ProjectCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
