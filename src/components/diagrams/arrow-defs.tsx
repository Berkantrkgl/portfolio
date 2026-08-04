/**
 * Shared arrowheads for every diagram. Rendered once per page; the diagrams
 * reference them by id (`url(#arw)` / `url(#arwA)`).
 */
export function ArrowDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden>
      <defs>
        <marker
          id="arw"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0,1 L9,5 L0,9 z" fill="oklch(0.68 0.012 70)" />
        </marker>
        <marker
          id="arwA"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0,1 L9,5 L0,9 z" fill="oklch(0.6 0.16 44)" />
        </marker>
      </defs>
    </svg>
  );
}
