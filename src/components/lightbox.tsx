"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef } from "react";

import type { Shot } from "@/components/screenshot-gallery";

/**
 * Full-screen viewer for a screenshot.
 *
 * Rendered through a portal into <body>: the case-study page wraps sections in
 * Motion's `Reveal`, and a transformed ancestor would otherwise become the
 * containing block for `position: fixed`, pinning the overlay inside the
 * gallery instead of the viewport.
 */
export function Lightbox({
  shots,
  index,
  onClose,
  onNavigate,
  variant,
}: {
  shots: Shot[];
  /** Index into `shots`, or null when closed. */
  index: number | null;
  onClose: () => void;
  onNavigate: (next: number) => void;
  variant: "phone" | "wide";
}) {
  const reduced = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  const open = index !== null;
  const shot = open ? shots[index] : null;

  const step = useCallback(
    (delta: number) => {
      if (index === null) return;
      onNavigate((index + delta + shots.length) % shots.length);
    },
    [index, shots.length, onNavigate],
  );

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    const previous = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [open, onClose, step]);

  /** Nothing to portal into during prerender; the overlay is user-triggered. */
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && shot?.src && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={shot.caption}
          className="fixed inset-0 z-[100] bg-[oklch(0.17_0.008_60/0.88)] backdrop-blur-md"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          {/* Top bar */}
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-4 px-5 py-5 sm:px-7">
            <span className="font-mono text-[11.5px] tracking-[0.08em] text-[oklch(0.72_0.01_80)] uppercase tabular-nums">
              {shots.length > 1 ? `${(index ?? 0) + 1} / ${shots.length}` : ""}
            </span>

            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="rounded-full border border-[oklch(1_0_0/0.16)] bg-[oklch(1_0_0/0.06)] px-4 py-2 font-mono text-[11.5px] text-[oklch(0.88_0.008_80)] backdrop-blur-sm transition-colors hover:border-[oklch(1_0_0/0.32)] hover:text-[oklch(0.99_0.004_90)]"
            >
              close · esc
            </button>
          </div>

          {/* Stage — the backdrop is the click-through area; the figure isn't.
              The image is sized by intrinsic dimensions and capped by viewport
              units, so a tall phone shot and a wide browser shot both fit
              without stretching or overflowing. */}
          <div className="flex h-full w-full items-center justify-center px-4 py-20 sm:px-20">
            <motion.figure
              key={shot.src}
              className="m-0 flex max-h-full flex-col items-center gap-5"
              initial={reduced ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={shot.src}
                alt={shot.caption}
                width={variant === "phone" ? 735 : 1600}
                height={variant === "phone" ? 1600 : 842}
                sizes={
                  variant === "phone" ? "min(88vw, 380px)" : "(max-width: 1024px) 92vw, 1152px"
                }
                priority
                className={`min-h-0 w-auto rounded-2xl object-contain shadow-[0_40px_100px_-30px_oklch(0_0_0/0.7)] ring-1 ring-[oklch(1_0_0/0.1)] ${
                  variant === "phone"
                    ? "max-h-[calc(100dvh-11rem)] max-w-[min(88vw,380px)]"
                    : "max-h-[calc(100dvh-11rem)] max-w-full"
                }`}
              />

              <figcaption className="max-w-[62ch] shrink-0 text-center font-mono text-[11.5px] leading-[1.6] text-[oklch(0.75_0.01_80)]">
                {shot.caption}
              </figcaption>
            </motion.figure>
          </div>

          {shots.length > 1 && (
            <>
              <NavButton side="left" onClick={() => step(-1)} label="Previous screenshot" />
              <NavButton side="right" onClick={() => step(1)} label="Next screenshot" />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function NavButton({
  side,
  onClick,
  label,
}: {
  side: "left" | "right";
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      className={`absolute top-1/2 z-10 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-[oklch(1_0_0/0.16)] bg-[oklch(1_0_0/0.06)] pb-0.5 text-xl text-[oklch(0.88_0.008_80)] backdrop-blur-sm transition-colors hover:border-[oklch(1_0_0/0.32)] hover:bg-[oklch(1_0_0/0.14)] hover:text-[oklch(0.99_0.004_90)] sm:flex ${
        side === "left" ? "left-5" : "right-5"
      }`}
    >
      {side === "left" ? "‹" : "›"}
    </button>
  );
}
