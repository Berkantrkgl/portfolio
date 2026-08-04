"use client";

import Link from "next/link";
import { useRef, useState, type PointerEvent, type ReactNode } from "react";

/**
 * Card shell with the pointer-tracked light. The whole card is a link to the
 * case study, so keyboard users get it for free and the URL is shareable.
 */
export function ProjectCard({
  href,
  className = "",
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [glow, setGlow] = useState<{ x: number; y: number } | null>(null);

  const handleMove = (event: PointerEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setGlow({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  };

  return (
    <Link
      ref={ref}
      href={href}
      onPointerMove={handleMove}
      onPointerLeave={() => setGlow(null)}
      className={`group relative block overflow-hidden rounded-2xl border border-border bg-surface text-ink transition-[transform,box-shadow,border-color] duration-350 hover:-translate-y-1 hover:border-[oklch(0.82_0.04_60)] hover:shadow-[0_24px_50px_-34px_oklch(0.24_0.012_60/0.4)] ${className}`}
      style={{ transitionTimingFunction: "cubic-bezier(0.2, 0.7, 0.2, 1)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-400"
        style={{
          opacity: glow ? 1 : 0,
          background: glow
            ? `radial-gradient(520px circle at ${glow.x}px ${glow.y}px, oklch(0.6 0.16 44 / 0.07), transparent 62%)`
            : undefined,
        }}
      />
      {children}
    </Link>
  );
}
