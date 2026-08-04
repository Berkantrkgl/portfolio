import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { ArrowDefs } from "@/components/diagrams/arrow-defs";
import { DiagramFigure } from "@/components/diagrams/diagram-figure";
import { PaceupArchitecture } from "@/components/diagrams/paceup-architecture";
import { PaceupSignals } from "@/components/diagrams/paceup-signals";
import { QuitqosArchitecture } from "@/components/diagrams/quitqos-architecture";
import { QuitqosTokens } from "@/components/diagrams/quitqos-tokens";
import { Reveal } from "@/components/motion/reveal";
import { ScreenshotGallery } from "@/components/screenshot-gallery";
import { copy } from "@/content/copy";
import { getCaseStudy } from "@/content/case-studies";
import { getProject, projectSlugs, type ProjectSlug } from "@/content/projects";

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: `${project.title} — Berkan Türkoğlu`,
    description: project.summary ?? project.meta,
  };
}

/** Mono uppercase heading used above each block of the case study. */
function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="m-0 font-mono text-[13px] tracking-[0.08em] text-ink-label uppercase">
      {children}
    </h2>
  );
}

function Diagrams({ slug }: { slug: ProjectSlug }) {
  if (slug === "quitqos") {
    return (
      <>
        <Reveal>
          <DiagramFigure
            title="QuitQOS — system architecture"
            subtitle="Java 21 · Spring Boot 4.1 · PostgreSQL · Firebase"
            minWidth={900}
          >
            <QuitqosArchitecture />
          </DiagramFigure>
        </Reveal>
        <Reveal>
          <DiagramFigure
            title="Two identities, never mixed"
            subtitle="token issue & rotation"
            minWidth={860}
          >
            <QuitqosTokens />
          </DiagramFigure>
        </Reveal>
      </>
    );
  }

  if (slug === "paceup") {
    return (
      <>
        <Reveal>
          <DiagramFigure
            title="PaceUp — three services, one monorepo"
            subtitle="Django 6 · FastAPI · LangGraph · Hetzner"
            minWidth={980}
          >
            <PaceupArchitecture />
          </DiagramFigure>
        </Reveal>
        <Reveal>
          <DiagramFigure
            title="One save, four independent effects"
            subtitle="Django signal chain"
            minWidth={900}
          >
            <PaceupSignals />
          </DiagramFigure>
        </Reveal>
      </>
    );
  }

  return null;
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const study = getCaseStudy(project.slug);
  const hasDiagrams = project.slug !== "pegasos";

  return (
    <article className="py-12 lg:py-16">
      <ArrowDefs />

      {/* Title block */}
      <header>
        <Link
          href="/#projects"
          className="font-mono text-[12.5px] text-ink-meta transition-colors hover:text-accent"
        >
          ← {copy.projects.back}
        </Link>

        <div className="mt-8 flex items-center gap-2.5 font-mono text-[11.5px] tracking-[0.06em] text-accent uppercase">
          <span className="size-1.5 rounded-full bg-accent" />
          {project.category}
        </div>

        <h1 className="mt-4 text-[clamp(2rem,7vw,3.375rem)] leading-none font-extrabold tracking-[-0.045em]">
          {project.title}
        </h1>

        <p className="mt-5 max-w-[62ch] text-[19px] leading-relaxed text-ink-2">
          {project.summary ?? project.meta}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noreferrer"
              className="rounded-[9px] bg-ink px-5 py-2.5 text-sm font-bold text-inverse transition-colors hover:bg-accent"
            >
              Visit the site ↗
            </a>
          )}
          {project.links.repo && (
            <a
              href={project.links.repo}
              target="_blank"
              rel="noreferrer"
              className={`rounded-[9px] px-5 py-2.5 text-sm font-bold transition-colors ${
                project.links.live
                  ? "border border-border-strong bg-surface text-ink hover:border-accent hover:text-accent"
                  : "bg-ink text-inverse hover:bg-accent"
              }`}
            >
              Repository
            </a>
          )}
          <span className="rounded-[9px] border border-border-strong px-5 py-2.5 font-mono text-[12.5px] text-ink-3">
            {project.status}
          </span>
        </div>
      </header>

      {/* Problem + stack side by side */}
      <div className="mt-14 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
        <div className="flex flex-col gap-12">
          <Reveal>
            <SubHeading>The problem</SubHeading>
            <p className="mt-3.5 mb-0 text-[16.5px] leading-[1.7] text-ink-body">{study.problem}</p>
          </Reveal>

          <Reveal>
            <SubHeading>What I built</SubHeading>
            <div className="mt-4 flex flex-col gap-5">
              {study.built.map((block) => (
                <div key={block.title} className="border-l-2 border-accent-border pl-4.5">
                  <h3 className="m-0 text-[16.5px] font-bold">{block.title}</h3>
                  <p className="mt-1.5 mb-0 text-[15.5px] leading-[1.65] text-ink-soft">
                    {block.body}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Sidebar */}
        <Reveal className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border bg-surface p-5.5">
            <div className="font-mono text-[10.5px] tracking-[0.08em] text-accent uppercase">
              Tech stack
            </div>
            <div className="mt-4 flex flex-col gap-3.5">
              {study.stack.map((row) => (
                <div key={row.label}>
                  <div className="font-mono text-[11.5px] text-ink-label">{row.label}</div>
                  <div className="mt-1 text-[14.5px] leading-normal">{row.value}</div>
                </div>
              ))}
            </div>
          </div>

          {study.numbers && (
            <div className="rounded-2xl border border-border bg-surface p-5.5">
              <div className="font-mono text-[10.5px] tracking-[0.08em] text-ink-label uppercase">
                By the numbers
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {study.numbers.map((stat) => (
                  <div key={stat.caption}>
                    <div className="text-2xl font-extrabold tracking-[-0.03em] tabular-nums">
                      {stat.value}
                    </div>
                    <div className="mt-0.5 text-xs text-ink-meta">{stat.caption}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {study.role && (
            <div className="rounded-2xl border border-border bg-surface p-5.5">
              <div className="font-mono text-[10.5px] tracking-[0.08em] text-ink-label uppercase">
                Role
              </div>
              <p className="mt-3 mb-0 text-[15px] leading-[1.6] text-ink-soft">{study.role}</p>
            </div>
          )}
        </Reveal>
      </div>

      {/* Architecture */}
      {hasDiagrams && (
        <section className="mt-16">
          <Reveal>
            <SubHeading>Architecture</SubHeading>
          </Reveal>
          <div className="mt-4 flex flex-col gap-6">
            <Diagrams slug={project.slug} />
          </div>
        </section>
      )}

      {/* Screenshots */}
      <section className="mt-16">
        <Reveal>
          <SubHeading>{study.screenshots.heading}</SubHeading>
        </Reveal>
        <Reveal>
          <div className="mt-5">
            <ScreenshotGallery
              shots={study.screenshots.shots}
              variant={study.screenshots.variant}
            />
          </div>
        </Reveal>
      </section>

      {/* Next / back */}
      <Reveal className="mt-16 border-t border-border-soft pt-8">
        <Link
          href="/#projects"
          className="font-mono text-[12.5px] text-accent-link transition-colors hover:text-accent-link-hover"
        >
          ← {copy.projects.back}
        </Link>
      </Reveal>
    </article>
  );
}
