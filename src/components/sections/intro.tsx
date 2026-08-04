"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

import { CountUp } from "@/components/motion/count-up";
import { copy } from "@/content/copy";
import { site } from "@/content/site";
import { renderEmphasis } from "@/lib/emphasis";

export function Intro() {
  const { intro } = copy;
  const portraitRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: portraitRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [28, -28]);

  return (
    <section className="grid items-start gap-10 py-14 lg:grid-cols-[380px_1fr] lg:gap-16 lg:pt-22 lg:pb-20">
      {/* Portrait + stats */}
      <motion.div
        ref={portraitRef}
        className="animate-rise mx-auto w-full max-w-[320px] lg:max-w-none"
        style={reduced ? undefined : { y: parallaxY }}
      >
        <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl border border-border bg-[oklch(0.965_0.006_85)]">
          <Image
            src={site.portrait}
            alt={intro.portraitAlt}
            fill
            priority
            sizes="(max-width: 1024px) 320px, 380px"
            className="object-cover"
          />
        </div>

        <div className="mt-2.5 grid grid-cols-2 gap-2.5">
          {intro.stats.map((stat) => (
            <div
              key={stat.caption}
              className="rounded-xl border border-border bg-surface px-4 py-3.5"
            >
              <CountUp
                value={stat.value}
                decimals={stat.decimals}
                suffix={stat.suffix}
                className="text-2xl font-extrabold tracking-[-0.03em] tabular-nums"
              />
              <div className="mt-[3px] font-mono text-[10.5px] tracking-[0.06em] text-ink-meta uppercase">
                {stat.caption}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Copy */}
      <div>
        <h1 className="m-0 text-[clamp(2.5rem,8vw,4rem)] leading-[1.04] font-extrabold tracking-[-0.045em] text-balance">
          {intro.headline.map((line, i) => (
            <span key={line} className="hero-line">
              <span
                style={{ animationDelay: `${[0.05, 0.16, 0.27][i]}s` }}
                className={i === 1 ? "text-accent" : undefined}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="animate-line-in mt-7 mb-6 h-px bg-hairline" />

        <div className="animate-rise flex flex-col gap-4.5 [animation-delay:0.18s]">
          {intro.paragraphs.map((paragraph, i) => (
            <p
              key={paragraph.slice(0, 24)}
              className={
                i === 0
                  ? "m-0 text-[19px] leading-relaxed text-ink-lead"
                  : "m-0 text-[17px] leading-[1.7] text-ink-soft"
              }
            >
              {renderEmphasis(paragraph, "font-bold text-ink-lead")}
            </p>
          ))}
        </div>

        {/* Currently */}
        <div className="animate-rise mt-8 rounded-2xl border border-border bg-surface px-6 py-5.5 [animation-delay:0.24s]">
          <div className="font-mono text-[10.5px] tracking-[0.08em] text-accent uppercase">
            {intro.currentlyLabel}
          </div>
          <div className="mt-3.5 flex flex-col gap-2.5">
            {intro.currently.map((line) => (
              <div
                key={line.slice(0, 24)}
                className="flex gap-3 text-[15.5px] leading-[1.55] text-ink-2"
              >
                <span className="text-arrow">→</span>
                <span>{renderEmphasis(line, "font-bold")}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="animate-rise mt-7 flex flex-wrap gap-3 [animation-delay:0.3s]">
          <a
            href={`mailto:${site.email}`}
            className="rounded-[10px] bg-ink px-6 py-3.5 text-[15px] font-bold text-inverse transition-colors hover:bg-accent"
          >
            {intro.actions.email}
          </a>
          {[
            { label: intro.actions.github, href: site.github, download: undefined },
            { label: intro.actions.linkedin, href: site.linkedin, download: undefined },
            { label: intro.actions.resume, href: site.resume, download: site.resumeFilename },
          ].map(({ label, href, download }) => (
            <a
              key={label}
              href={href}
              download={download}
              /* The CV downloads in place; the profile links open elsewhere. */
              target={download ? undefined : "_blank"}
              rel={download ? undefined : "noreferrer"}
              className="rounded-[10px] border border-border-strong bg-surface px-6 py-3.5 text-[15px] font-bold text-ink transition-colors hover:border-accent hover:text-accent"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
