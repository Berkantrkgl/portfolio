"use client";

import Image from "next/image";
import { useState } from "react";

import { Lightbox } from "@/components/lightbox";

export type Shot = {
  /** Path under `public/`, or omitted while the screenshot is still missing. */
  src?: string;
  label: string;
  caption: string;
};

/**
 * Screenshot strip for a case study.
 *
 * `phone` frames match the source captures (735×1600) so nothing is cropped;
 * `wide` frames are 16:10 browser shots. The column count follows the number
 * of shots rather than being fixed, so three images don't leave a hole.
 *
 * Clicking a shot opens it full-screen — the thumbnails are small enough that
 * anything text-heavy needs a closer look.
 */
export function ScreenshotGallery({
  shots,
  variant = "phone",
}: {
  shots: Shot[];
  variant?: "phone" | "wide";
}) {
  const [open, setOpen] = useState<number | null>(null);
  const isPhone = variant === "phone";

  /** Only shots with an image are viewable; the lightbox indexes into these. */
  const viewable = shots.filter((shot) => shot.src);

  const columns = isPhone
    ? shots.length === 3
      ? "grid-cols-2 sm:grid-cols-3"
      : "grid-cols-2 lg:grid-cols-4"
    : "sm:grid-cols-2";

  return (
    <>
      <div className={`grid gap-4 sm:gap-5 ${columns}`}>
        {shots.map((shot) => {
          const frame = (
            <div
              className={`relative overflow-hidden border border-border bg-surface-muted transition-[transform,border-color,box-shadow] duration-350 ${
                isPhone ? "rounded-[22px] p-1.5" : "aspect-16/10 rounded-xl"
              } ${
                shot.src
                  ? "group-hover:-translate-y-1 group-hover:border-accent-hover-border group-hover:shadow-[0_24px_50px_-34px_oklch(0.24_0.012_60/0.45)]"
                  : ""
              }`}
              style={isPhone ? { aspectRatio: "735 / 1600" } : undefined}
            >
              <div
                className={`relative h-full w-full overflow-hidden ${
                  isPhone ? "rounded-[16px] bg-bg" : ""
                }`}
              >
                {shot.src ? (
                  <Image
                    src={shot.src}
                    alt={shot.caption}
                    fill
                    sizes={
                      isPhone ? "(max-width: 640px) 45vw, 260px" : "(max-width: 640px) 92vw, 520px"
                    }
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center px-3 text-center font-mono text-[10.5px] tracking-[0.06em] text-ink-meta uppercase">
                    {shot.label}
                  </div>
                )}
              </div>
            </div>
          );

          return (
            <figure key={shot.label} className="m-0">
              {shot.src ? (
                <button
                  type="button"
                  onClick={() => setOpen(viewable.indexOf(shot))}
                  aria-label={`Enlarge: ${shot.caption}`}
                  className="group block w-full cursor-zoom-in text-left"
                  style={{ transitionTimingFunction: "cubic-bezier(0.2, 0.7, 0.2, 1)" }}
                >
                  {frame}
                </button>
              ) : (
                frame
              )}

              <figcaption className="mt-2.5 font-mono text-[11px] leading-[1.5] text-ink-meta">
                {shot.caption}
              </figcaption>
            </figure>
          );
        })}
      </div>

      <Lightbox
        shots={viewable}
        index={open}
        onClose={() => setOpen(null)}
        onNavigate={setOpen}
        variant={variant}
      />
    </>
  );
}
