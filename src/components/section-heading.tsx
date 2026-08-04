import { MaskedHeading } from "@/components/motion/masked-heading";
import { Reveal } from "@/components/motion/reveal";
import type { ReactNode } from "react";

/**
 * Numbered section label + masked h2, with an optional right-aligned hint.
 *
 * The heading is NOT wrapped in `Reveal`: the mask already animates it, and
 * nesting the two meant a transformed parent skewed the child's viewport
 * check — the h2 could stay parked at translateY(115%), i.e. invisible.
 */
export function SectionHeading({
  label,
  heading,
  aside,
}: {
  label: string;
  heading: string;
  aside?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4 sm:mb-11">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-xs tracking-[0.08em] text-accent">{label}</span>
        <MaskedHeading
          lines={[heading]}
          className="m-0 text-[clamp(1.75rem,5vw,2.5rem)] font-extrabold tracking-[-0.035em]"
        />
      </div>
      {aside && <Reveal>{aside}</Reveal>}
    </div>
  );
}
