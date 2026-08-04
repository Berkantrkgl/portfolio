"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type Variant = "up" | "left" | "scale";

const initialFor: Record<Variant, { y?: number; x?: number; scale?: number }> = {
  up: { y: 14 },
  left: { x: -16 },
  scale: { scale: 0.98, y: 14 },
};

/**
 * Scroll reveal — opacity 0 → 1 with a small translate. One-shot: `once: true`
 * means content never re-hides on scroll up.
 *
 * No blur, and deliberately quick. The handoff specified an 850ms reveal with
 * a blur that resolves, but someone scrolling fast outruns it — they arrive at
 * a section that is still mid-fade. Content should be readable by the time it
 * is looked at, so the motion is a short accent rather than an entrance.
 *
 * `index` produces the in-section stagger the design calls for.
 */
export function Reveal({
  children,
  variant = "up",
  index = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  variant?: Variant;
  index?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li";
}) {
  const reduced = useReducedMotion();
  const Component = motion[as];

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, ...initialFor[variant] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      /* Starts a little before the element reaches the fold, so it has already
         settled by the time it is properly in view. */
      viewport={{ once: true, margin: "0px 0px -4% 0px", amount: 0.01 }}
      transition={{
        duration: 0.4,
        ease: [0.2, 0.7, 0.2, 1],
        delay: Math.min(index, 3) * 0.05,
      }}
    >
      {children}
    </Component>
  );
}
