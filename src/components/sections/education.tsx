import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { copy } from "@/content/copy";

export function Education() {
  const { education } = copy;

  return (
    <section id="education" className="scroll-mt-20 py-16 lg:pt-22 lg:pb-10">
      <SectionHeading label={education.label} heading={education.heading} />

      <div className="grid gap-5 lg:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-2xl border border-border bg-surface p-8">
            <div className="font-mono text-[11.5px] tracking-[0.06em] text-ink-label uppercase">
              {education.educationLabel}
            </div>
            <div className="mt-5 border-t border-border-inner pt-5">
              <div className="text-xl font-extrabold tracking-[-0.02em]">{education.school}</div>
              <div className="mt-1.5 text-[15.5px] text-ink-soft">{education.degree}</div>
              <div className="mt-3 flex gap-4.5 font-mono text-[12.5px] text-ink-meta">
                <span>{education.period}</span>
                <span>{education.gpa}</span>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal index={1}>
          <div className="h-full rounded-2xl border border-border bg-surface p-8">
            <div className="font-mono text-[11.5px] tracking-[0.06em] text-ink-label uppercase">
              {education.certificationsLabel}
            </div>
            <div className="flex flex-col">
              {education.certifications.map((cert, i) => (
                <div
                  key={cert.name}
                  className={`flex items-center justify-between gap-4 border-t border-border-inner ${
                    i === 0 ? "mt-5 pt-5" : "mt-4.5 pt-4.5"
                  }`}
                >
                  <div>
                    <div className="text-[17px] font-bold tracking-[-0.015em]">{cert.name}</div>
                    <div className="mt-[3px] text-sm text-ink-3">{cert.level}</div>
                  </div>
                  <span className="shrink-0 rounded-full border border-accent-border px-2.5 py-1.5 font-mono text-[11px] text-accent-link">
                    {education.verified}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
