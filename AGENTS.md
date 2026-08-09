<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Berkan Türkoğlu — portfolio site

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind 4 · Motion. Static export to S3.

## Working agreements

- **Reply in Turkish.** Code, comments and commit messages stay in English.
- **Berkan runs the server and checks the page himself.** `npm run dev` is already
  running. After a change: `npm run typecheck`, and if it's clean, say so. Do not start
  dev servers, do not build-and-screenshot to inspect the UI. `npm run build` is fine when
  the export output itself is the deliverable.
- Go step by step. Confirm before large or hard-to-reverse changes.
- He handles all `git commit` / `push` — don't commit unless asked.

## Structure

```
src/
├── app/
│   ├── page.tsx                  — `/` → meta-refresh to the default locale
│   └── [locale]/
│       ├── layout.tsx            — the root layout: <html lang>, fonts, header, footer, metadata
│       ├── page.tsx              — the home page, assembled from sections
│       └── projects/[slug]/      — case-study pages
├── components/
│   ├── diagrams/                 — ArrowDefs, DiagramFigure + one component per diagram
│   ├── motion/                   — Reveal, MaskedHeading, CountUp
│   ├── locale-switcher.tsx       — EN/TR toggle; swaps the segment, keeps the path
│   ├── screenshot-gallery.tsx    — 9:16 phone frames or 16:10 wide frames
│   └── sections/                 — Intro, Tech, Marquee, Career, Projects, Education, ContactCta
├── content/                      — see "Language" below for the per-locale layout
└── lib/
    └── emphasis.tsx              — renders **bold** inside copy strings
```

## Architecture diagrams

Four hand-tuned inline SVGs, ported verbatim from `docs/design/website/Diagrams.dc.html`:
QuitQOS architecture + token flow, PaceUp architecture + signal chain. Pegasos has none.

- **Do not re-lay-out them.** Coordinates, paths and text positions were tuned and verified
  free of overlap in the handoff. Edit content, not geometry.
- Arrowheads live in one shared `<ArrowDefs />`, rendered once per case-study page.
- Animation is four `data-*` roles (`node`, `edge`, `elabel`, `pulse`) driven by CSS in
  `globals.css` under `.diagram-in`. Per-element `animation-delay` is inline in each
  component and carries the sequencing — keep it.
- `DiagramFigure` adds the caption bar and the IntersectionObserver that adds `.diagram-in`,
  with a 4s safety timeout. Below its `minWidth` the figure scrolls sideways instead of
  reflowing.

## Screenshots

`ScreenshotGallery` has two variants: `phone` (9:16, device shell) for QuitQOS and PaceUp,
`wide` (16:10) for Pegasos. Slots without a `src` render as labelled placeholders, so the
layout is final before the images exist. Drop real screenshots in `public/shots/<slug>/` and
add the `src` in `content/case-studies.ts`.

## Language

**Bilingual: English + Turkish.** English is the default — `/` forwards to `/en/`, since the
site stands in for a CV in job applications. Turkish lives at `/tr/`. Switching the default
is one line: `defaultLocale` in `content/locales.ts`. The order of `locales` there also
drives the order of the header switcher.

The Turkish copy is **not a translation of the English** — it was rewritten natively after
the literal translation read badly. Treat each language as its own text: fixing a phrase in
one does not mean porting the same sentence to the other. The English side is still the
original wording and has not been reconciled with the Turkish rewrite.

Every route is nested under `app/[locale]/`, which also holds the root layout — that is
where `<html lang>` is set, so the locale is known before anything renders. The static
export produces `/en/`, `/tr/` and both sets of case studies; `/` is a meta-refresh stub
with no server behind it.

```
content/
├── locales.ts          — the locale list, default, and `isLocale` guard
├── index.ts            — `getContent(locale)` — the ONLY place a locale becomes content
├── copy.ts             — English copy; the source of truth for shape
├── copy.tr.ts          — typed `typeof copyEn`, so a missing key fails typecheck
├── projects.ts / .tr.ts
├── case-studies.ts / .tr.ts
└── site.ts             — locale-independent: links, email, marquee tokens
```

Rules that keep this from rotting:

- **Components never import `copy.ts` directly.** They take a `locale` prop and call
  `getContent(locale)`. The one exception is `type`-only imports for prop typing.
- **Add a key to English first.** The `tr` mirrors are typed against the English objects,
  so `npm run typecheck` is what catches an untranslated key — not a blank page.
- Never hardcode user-facing strings in components, in either language.
- Adding a third language = one entry in `locales.ts`, one mirror file per content file,
  one row in each map in `content/index.ts`. No component changes.
- The diagram SVGs are language-independent; only their caption bars
  (`copy.caseStudy.diagrams`) are translated. Tech-list subtitles stay as-is.

## Design

`design-reference/design_handoff_portfolio/` is the Claude Design handoff — **a reference,
not code to copy.** `README.md` there carries the full token table and motion spec;
`Portfolio.dc.html` is the visual prototype. It is excluded from lint.

- Tokens live in the `@theme` block in `src/app/globals.css`, as Tailwind 4 CSS variables.
  All colours are `oklch()` and match the handoff exactly — don't convert or approximate.
- Type: Manrope (sans) + JetBrains Mono (mono), via `next/font/google`.
- Motion is part of the design, not decoration: scroll reveals with an 80ms in-section
  stagger, masked heading lines, count-up stats, portrait parallax, a shrinking header,
  the infinite tech marquee, pointer-tracked light on project cards.
- Every animation must be neutralised under `prefers-reduced-motion`. Motion's
  `useReducedMotion()` handles the JS side; a media query in `globals.css` handles the CSS.

## Content sources

`docs/quitqos.md`, `docs/paceup.md`, `docs/pegasos.md` — written by reading the actual
repositories in `~/dev`. They are the source of truth for project copy, and each ends
with a "portfolyo için öne çıkanlar" section aimed at the site.

Two facts the CVs get wrong and the repos get right:

- **PaceUp runs on Hetzner** (Caddy + Aiven Postgres), migrated off AWS ECS Fargate.
- **QuitQOS has 42 unit tests and 7 Flyway migrations**, not the 39 / 6 in the CV.

## Still to do

- Real screenshots — four per project, into `public/shots/<slug>/`. Phone-shaped for the two
  apps, wide for Pegasos. The gallery slots and captions already exist.
- CV PDF at `public/cv/berkan-turkoglu.pdf` (the Résumé button already points there).
