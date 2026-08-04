/**
 * Project data, drawn from the per-project notes in `docs/`, which were
 * written by reading the actual repositories.
 *
 * Case-study pages consume this too; the home page cards use the rest.
 */

export type ProjectSlug = "quitqos" | "paceup" | "pegasos";

export type Project = {
  slug: ProjectSlug;
  featured: boolean;
  /** Mono label above the title on the card. */
  category: string;
  title: string;
  /** One-line meta under the title. */
  meta: string;
  /** Featured card shows this paragraph instead of bullets. */
  summary?: string;
  /** Secondary cards show these as a list. */
  bullets?: string[];
  /** Featured card: the arrow-prefixed rows in the right column. */
  highlights?: string[];
  tags?: string[];
  links: {
    repo?: string;
    live?: string;
  };
  /** Outlined chip next to the repo button on the case-study page. */
  status: string;
};

export const projects: Project[] = [
  {
    slug: "quitqos",
    featured: true,
    category: "Java · Spring Boot",
    title: "QuitQOS",
    meta: "Habit-tracking iOS app · personal · shipped",
    summary:
      "A mobile app that helps people quit IQOS and track their recovery — a real-time quit timer and evidence-based health milestones. I built the whole thing end to end: the Java and Spring Boot backend, the React Native app, the design system and the deploy pipeline.",
    highlights: [
      "Stateless JWT auth on top of Firebase Auth, using a custom Spring Security filter chain with rotating refresh tokens.",
      "Schema evolution across 7 Flyway migrations, with a @Scheduled job firing localised FCM milestone notifications.",
      "Running in production on Hetzner behind a shared edge, deployed by GitHub Actions on every push to main.",
    ],
    tags: ["Spring Security", "Flyway", "JUnit · Mockito", "React Native", "Hetzner"],
    links: { repo: "https://github.com/Berkantrkgl/quitqos" },
    status: "status: live on the App Store",
  },
  {
    slug: "paceup",
    featured: false,
    category: "Django · FastAPI · LangGraph",
    title: "PaceUp",
    meta: "AI-powered running coach (iOS) · personal",
    bullets: [
      "Event-driven Django backend, 6 apps and 18+ REST endpoints — one workout save triggers stats, achievements and notifications via signals.",
      "RevenueCat subscriptions with race-safe purchase verification across concurrent webhook and client events.",
      "A LangGraph agent whose plan generation is bound to a real backend tool, so the LLM cannot fake it.",
    ],
    tags: ["Django", "FastAPI", "AWS Bedrock", "Hetzner"],
    links: { repo: "https://github.com/Berkantrkgl/paceup" },
    status: "status: live",
  },
  {
    slug: "pegasos",
    featured: false,
    category: "Client work · React · AWS",
    title: "Pegasos",
    meta: "Veterinary hospital website · three branches",
    bullets: [
      "A 5-schema Sanity headless CMS model so the client manages their own content.",
      "The SPA's SEO problem solved with a Puppeteer prerender pipeline and SEO-friendly Turkish URLs.",
      "Serverless appointment form: API Gateway → Lambda → SES, plus a TTL'd consent-record design for Turkish data-protection law.",
    ],
    tags: ["React 19", "Sanity CMS", "Lambda · SES", "KVKK"],
    links: {
      repo: "https://github.com/Berkantrkgl/pegasos",
      live: "https://pegasoshayvanhastanesi.com",
    },
    status: "status: live · client project",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const projectSlugs: ProjectSlug[] = projects.map((p) => p.slug);
