# Handoff: Architecture diagrams — QuitQOS &amp; PaceUp

Companion to `design_handoff_portfolio/`. Four animated SVG diagrams that go into the two
project case-study pages of the portfolio site.

## Nasıl kullanılır

1. Bu klasörü Next.js projenin içine kopyala.
2. Claude Code'a şunu söyle:
   > `design_handoff_diagrams/README.md`'yi oku ve `Diagrams.dc.html` içindeki 4 SVG diyagramı
   > React bileşenleri olarak bu projeye taşı. SVG geometrisini birebir koru.
3. `Diagrams.dc.html`'i tarayıcıda açıp referans olarak yanında tut.

## What this is

`Diagrams.dc.html` is a design reference containing four inline-SVG diagrams:

| # | Diagram | Goes on | viewBox |
|---|---|---|---|
| 1 | QuitQOS — system architecture | `/projects/quitqos` | `0 0 1160 840` |
| 2 | QuitQOS — two identities, never mixed (token issue &amp; rotation) | `/projects/quitqos` | `0 0 1160 400` |
| 3 | PaceUp — three services, one monorepo | `/projects/paceup` | `0 0 1280 800` |
| 4 | PaceUp — one save, four independent effects (signal chain) | `/projects/paceup` | `0 0 1160 440` |

Each is wrapped in a `<figure data-fig>` with a caption bar (accent dot + title left, mono
subtitle right). Diagrams 1 and 3 are the "general architecture" pieces; 2 and 4 are the
project-specific stories worth their own graphic.

**These are real vector diagrams, not images.** Port the SVG markup as-is into a React
component per diagram (`QuitqosArchitecture.tsx` etc.) — all coordinates, paths and text
positions are hand-tuned and verified free of overlap. Do not re-lay-out.

## Content source of truth

The diagram content comes from `uploads/quitqos.md` and `uploads/paceup.md` (repo-derived
project notes). Two deliberate deviations from the older résumé PDFs:

- **PaceUp runs on Hetzner**, not AWS ECS Fargate. The diagram shows Caddy + Aiven managed
  Postgres. The ECS→Hetzner migration is shown as a note in the container label.
- **QuitQOS has 42 unit tests** across 7 services (the résumés say 39).

## Visual system

Matches the portfolio exactly — same tokens.

| Role | Value |
|---|---|
| figure border / card stroke | `oklch(0.9 0.008 80)` / node stroke `oklch(0.86 0.01 80)` |
| node fill | `oklch(1 0 0)`; nested sub-box `oklch(0.985 0.004 90)` |
| container (dashed group) | fill `oklch(0.975 0.005 88)`, stroke `oklch(0.86 0.01 80)`, `stroke-dasharray="5 4"` |
| accent node | fill `oklch(0.99 0.008 60)`, stroke `oklch(0.86 0.04 60)`, `stroke-width 1.4` |
| accent text | `oklch(0.55 0.14 44)` · accent line/arrow `oklch(0.6 0.16 44)` |
| success chip (public endpoint) | fill `oklch(0.97 0.02 150)`, stroke `oklch(0.9 0.02 150)`, text `oklch(0.45 0.09 150)` |
| edge stroke | `oklch(0.78 0.012 70)` at `1.4`; soft/dashed `oklch(0.82 0.012 70)` at `1.3` |
| node title | Manrope 14.5–16 / 700–800 / `oklch(0.24 0.012 60)` |
| node detail | JetBrains Mono 10–11 / `oklch(0.52 0.01 60)`; list rows `oklch(0.45 0.01 60)` |
| group label | JetBrains Mono 10–10.5, `letter-spacing: 1.1`, uppercase, `oklch(0.55 0.01 60)` |
| corner radius | node `rx=10`, sub-box `rx=7–9`, container `rx=14`, edge-label pill `rx=5–6` |

**Edges are orthogonal only** — horizontal and vertical segments, right-angle turns
(`M x,y H x2 V y2 H x3`). No curves, no diagonals. Draw.io convention.

**Arrowheads** come from two shared `<marker>` defs in a single hidden `<svg>` at the top of
the document (`#arw` neutral, `#arwA` accent), `viewBox="0 0 10 10" refX="9" refY="5"
markerWidth="7" markerHeight="7" orient="auto-start-reverse"`. In React, render this defs
`<svg width="0" height="0">` once in the layout, or duplicate the defs inside each diagram
with namespaced ids if the diagrams may render in isolation.

**Edge labels** are a white pill (`rect` + 1px stroke) with centered mono 10px text, placed
over the line so the connector reads through cleanly. Pill width must be the text width plus
~12px padding each side — several were resized during review; do not shrink them.

## Animation

Each `<figure data-fig>` gets an `in` class when it scrolls into view
(IntersectionObserver, `threshold: 0.12`, unobserve after firing, 4s safety timeout that
force-reveals everything).

Four element roles, driven by CSS on descendants of `.in`:

| Attribute | Initial | On `.in` |
|---|---|---|
| `data-node` | `opacity: 0` | `nodeIn .55s cubic-bezier(.2,.7,.2,1) both` — fade + `translateY(9px) → 0` |
| `data-edge` | `stroke-dasharray: 2400; stroke-dashoffset: 2400` | `drawIn .8s cubic-bezier(.4,0,.2,1) both` — dashoffset → 0, the line draws itself |
| `data-elabel` | `opacity: 0` | `fadeOn .4s both` |
| `data-pulse` | `opacity: 0` | `fadeOn .5s both, march 1.3s linear infinite` |

`data-pulse` is a duplicate of an important edge's `d`, drawn on top with
`stroke-width: 3; stroke-dasharray: 4 18; stroke-linecap: round; opacity: .5` in the accent
color; `march` animates `stroke-dashoffset: 0 → -44`, so dots travel the line forever.
Used only on the flows worth highlighting (JWT request, scheduler→FCM, refresh rotation,
SSE stream, achievement chain).

**Sequencing** is per-element `animation-delay` set inline in the SVG, roughly:
container → nodes top-to-bottom (~60–80ms apart) → edges as each pair of nodes lands →
edge labels ~600ms after their edge → pulses last. Delays are already in the file; keep them.

`@media (prefers-reduced-motion: reduce)` forces `opacity: 1`, `stroke-dashoffset: 0` and
`animation: none` on all four roles.

## Porting notes

- One React component per diagram; the caption bar is shared chrome — extract a
  `<DiagramFigure title subtitle>` wrapper.
- `data-*` attributes survive JSX unchanged. `stroke-dasharray` → `strokeDasharray` etc. if
  you convert attributes to camelCase; `style="animation-delay:.5s"` →
  `style={{ animationDelay: '.5s' }}`.
- The reveal CSS can't be inline (it uses descendant selectors and keyframes) — put it in a
  CSS module or global stylesheet.
- Diagrams are responsive by `width: 100%; height: auto` on the SVG. Below ~900px they get
  small; add horizontal scroll (`overflow-x: auto` with a `min-width` on the SVG) for mobile
  rather than reflowing the layout.
- For PDF/OG images, these render fine to static SVG with the `in` class applied.

## Files

- `Diagrams.dc.html` — all four diagrams (open in a browser).
- `quitqos.md`, `paceup.md` — the project notes the diagrams were built from; use them for
  case-study copy too.
