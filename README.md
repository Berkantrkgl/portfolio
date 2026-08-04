# Portfolio — Berkan Türkoğlu

My personal site: an introduction, what I work with, and case studies of the
projects I've built.

Built with **Next.js 16** (App Router) · React 19 · TypeScript · Tailwind CSS 4 ·
Motion. Statically exported — no server at runtime.

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run typecheck    # tsc --noEmit
npm run lint
npm run build        # static export → out/
```

## Structure

```
src/
├── app/
│   ├── layout.tsx            fonts, header, footer, scroll progress
│   ├── page.tsx              home
│   └── projects/[slug]/      case studies
├── components/
│   ├── diagrams/             inline SVG architecture diagrams
│   ├── motion/               Reveal, MaskedHeading, CountUp
│   └── sections/             Intro, Tech, Marquee, Career, Projects, …
├── content/                  all copy and project data
└── lib/
docs/                         design handoffs, and the notes the copy came from
```

Content lives in `src/content/` as typed objects — `copy.ts` for site text,
`projects.ts` for the cards, `case-studies.ts` for the detail pages. Nothing
user-facing is hardcoded in components.

## Deployment

`npm run build` writes a static site to `out/`, hosted on S3.

## License

The code is MIT. The written content, screenshots and photographs are not —
please don't reuse those.
