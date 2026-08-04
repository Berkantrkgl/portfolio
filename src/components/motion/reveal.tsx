"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type Variant = "up" | "left" | "scale";

const initialFor: Record<Variant, { y?: number; x?: number; scale?: number }> = {
  up: { y: 26 },
  left: { x: -30 },
  scale: { scale: 0.96, y: 26 },
};

/**
 * Scroll reveal — opacity 0 → 1, a small translate, and a blur that resolves.
 * One-shot: `once: true` means content never re-hides on scroll up.
 *
 * `index` produces the in-section stagger (80ms steps, capped at 5) that the
 * design calls for.
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
      initial={{ opacity: 0, filter: "blur(8px)", ...initialFor[variant] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px", amount: 0.08 }}
      transition={{
        duration: 0.85,
        ease: [0.2, 0.7, 0.2, 1],
        delay: Math.min(index, 5) * 0.08,
        filter: { duration: 0.85, ease: "easeOut" },
      }}
    >
      {children}
    </Component>
  );
}
