import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { getContent } from "@/content";
import type { Locale } from "@/content/locales";

/**
 * Rows, not cards. Tech and Career both read as a ruled list with the label in
 * a left column — three bordered boxes here broke that grammar and made the
 * page look assembled from a template. The degree, the certificates and the
 * languages are now three rows of the same list, separated by hairlines.
 */
export function Education({ locale }: { locale: Locale }) {
  const { education } = getContent(locale).copy;

  return (
    <section id="education" className="scroll-mt-20 py-16 lg:pt-22 lg:pb-10">
      <SectionHeading label={education.label} heading={education.heading} />

      <div className="flex flex-col">
        {/* Degree */}
        <Reveal className="grid gap-4 border-t border-border-soft py-8 md:grid-cols-[240px_1fr] md:gap-10">
          <div className="font-mono text-[10.5px] tracking-[0.08em] text-ink-label uppercase">
            {education.educationLabel}
          </div>
          <div>
            <div className="text-xl font-extrabold tracking-[-0.02em]">{education.school}</div>
            <div className="mt-1.5 text-[15.5px] text-ink-soft">{education.degree}</div>
            <div className="mt-3 flex gap-4.5 font-mono text-[12.5px] text-ink-meta">
              <span>{education.period}</span>
              <span>{education.gpa}</span>
            </div>
          </div>
        </Reveal>

        {/* Certificates */}
        <Reveal
          index={1}
          className="grid gap-4 border-t border-border-soft py-8 md:grid-cols-[240px_1fr] md:gap-10"
        >
          <div className="font-mono text-[10.5px] tracking-[0.08em] text-ink-label uppercase">
            {education.certificationsLabel}
          </div>
          <div className="flex flex-col gap-4">
            {education.certifications.map((cert) => (
              <div key={cert.name} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-[17px] font-bold tracking-[-0.015em]">{cert.name}</span>
                {/* The tier is the real information; "verified" rides along quietly. */}
                <span className="font-mono text-[12px] text-accent-link">{cert.level}</span>
                <span className="font-mono text-[11px] text-ink-meta">{education.verified}</span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Languages */}
        <Reveal
          index={2}
          className="grid gap-4 border-y border-border-soft py-8 md:grid-cols-[240px_1fr] md:gap-10"
        >
          <div className="font-mono text-[10.5px] tracking-[0.08em] text-ink-label uppercase">
            {education.languagesLabel}
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2.5">
            {education.languages.map((language) => (
              <span key={language} className="text-[15.5px] text-ink-soft">
                {language}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
