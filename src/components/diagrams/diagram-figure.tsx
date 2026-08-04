"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Caption bar + the scroll trigger that starts a diagram's animation.
 *
 * The SVG keeps its own width and scrolls horizontally on narrow screens
 * rather than reflowing — the layout inside is hand-tuned and doesn't survive
 * being squeezed.
 */
export function DiagramFigure({
  title,
  subtitle,
  minWidth = 900,
  children,
}: {
  title: string;
  subtitle: string;
  /** Below this the figure scrolls sideways instead of shrinking further. */
  minWidth?: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /** No observer support: reveal on the next frame rather than mid-effect. */
    if (!("IntersectionObserver" in window)) {
      const frame = requestAnimationFrame(() => setRevealed(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setRevealed(true);
        observer.disconnect();
      },
      { threshold: 0.12 },
    );

    observer.observe(el);

    /** Safety net — content must never be stuck invisible. */
    const timeout = setTimeout(() => setRevealed(true), 4000);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  return (
    <figure
      ref={ref}
      className={`m-0 overflow-hidden rounded-2xl border border-border bg-surface ${
        revealed ? "diagram-in" : ""
      }`}
    >
      <figcaption className="flex flex-wrap items-center justify-between gap-3 border-b border-border-inner bg-bg px-5 py-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="size-[7px] rounded-full bg-accent" />
          <span className="text-[15.5px] font-extrabold tracking-[-0.02em]">{title}</span>
        </div>
        <span className="font-mono text-[11px] text-ink-meta">{subtitle}</span>
      </figcaption>

      <div className="overflow-x-auto px-4 pt-5 pb-6 sm:px-5">
        <div style={{ minWidth }}>{children}</div>
      </div>
    </figure>
  );
}
