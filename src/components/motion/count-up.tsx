"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Counts from 0 to `value` when it scrolls into view — 1100ms, ease-out cubic.
 * Under reduced motion the final value renders straight away, no animation.
 */
export function CountUp({
  value,
  decimals = 0,
  suffix = "",
  className,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const [counted, setCounted] = useState<string | null>(null);

  useEffect(() => {
    if (!inView || reduced) return;

    const controls = animate(0, value, {
      duration: 1.1,
      ease: [0.33, 1, 0.68, 1],
      onUpdate: (latest) => setCounted(latest.toFixed(decimals)),
    });

    return () => controls.stop();
  }, [inView, reduced, value, decimals]);

  const display = reduced ? value.toFixed(decimals) : (counted ?? (0).toFixed(decimals));

  return (
    <div ref={ref} className={className}>
      {display}
      {suffix}
    </div>
  );
}
