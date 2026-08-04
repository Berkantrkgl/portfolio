"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A heading whose lines rise out of their own baseline: each line is a
 * clipping box, the inner block animates translateY(115%) → 0.
 *
 * Driven by a plain IntersectionObserver rather than Motion's `whileInView`.
 * The heading starts fully outside its clip box, so any viewport check based
 * on the element's *visible* area can never be satisfied — that left sections
 * rendering with no title at all. This observes the clip box (always on-screen
 * when the section is) and force-reveals after 3s as a backstop.
 */
export function MaskedHeading({
  lines,
  className,
  delay = 0,
}: {
  lines: string[];
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      const frame = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    const timeout = setTimeout(() => setShown(true), 3000);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  return (
    <h2 ref={ref} className={className}>
      {lines.map((line, i) => (
        /* Padding gives descenders (g, j, y) room inside the clip box; the
           matching negative margin keeps the line spacing unchanged. */
        <span
          key={line}
          className="block overflow-hidden"
          style={{ paddingBottom: "0.16em", marginBottom: "-0.16em" }}
        >
          <span
            className="block will-change-transform"
            style={{
              transform: shown ? "none" : "translateY(115%)",
              transition: `transform 1.05s cubic-bezier(0.16, 1, 0.3, 1) ${delay + i * 0.08}s`,
            }}
          >
            {line}
          </span>
        </span>
      ))}
    </h2>
  );
}
