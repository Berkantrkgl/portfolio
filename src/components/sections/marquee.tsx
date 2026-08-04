import { marqueeTokens } from "@/content/site";

/**
 * Full-bleed infinite token band. The list is rendered twice inside a `w-max`
 * row that animates to -50%, so the seam is invisible. Pure CSS.
 *
 * It breaks out of the page's 1120px column deliberately — the band is the one
 * element that spans the whole viewport, which is what gives the page its
 * horizontal breathing point between two dense sections.
 */
export function Marquee() {
  return (
    <div className="full-bleed mt-16 overflow-hidden border-y border-border-soft bg-band py-9 lg:mt-20 lg:py-11">
      <div className="animate-marquee flex w-max">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex gap-12 pr-12 font-mono text-[19px] whitespace-nowrap text-[oklch(0.55_0.012_60)] lg:gap-16 lg:pr-16 lg:text-[22px]"
          >
            {marqueeTokens.map((token) => (
              <span key={token} className="flex gap-12 lg:gap-16">
                {token}
                <span className="text-slash">/</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
