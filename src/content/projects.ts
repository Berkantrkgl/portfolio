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
    meta: "Habit-tracking app (iOS) · personal project · on the App Store",
    summary:
      "An iOS app I built for people trying to quit IQOS. It runs a timer from the moment you stop and marks off the health milestones of the body's recovery one by one. Backend, mobile, design, deployment — the whole thing is my work.",
    highlights: [
      "Stateless JWT authentication on top of Firebase Auth, with a custom Spring Security filter chain and one-time refresh-token rotation.",
      "Seven Flyway migrations own the schema; a @Scheduled job catches health milestones and sends an FCM notification in the user's language.",
      "Runs on Hetzner behind a shared edge proxy, deployed by GitHub Actions on every push to main.",
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
    meta: "AI-powered running coach (iOS) · personal project",
    bullets: [
      "Event-driven Django backend: 6 apps, 18+ REST endpoints. One workout save triggers stats, achievements and notifications through signals.",
      "Subscription handling with RevenueCat; verification holds even when the webhook and the app confirm the same purchase at once.",
      "Programme generation is bound to a real backend tool, so the LLM can't present a plan that doesn't exist.",
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
      "Built a 5-schema headless CMS model on Sanity so the client can update their own content.",
      "Solved the SPA's SEO problem with a Puppeteer prerender pipeline and readable Turkish URLs.",
      "Built the appointment form serverless: API Gateway → Lambda → SES.",
    ],
    tags: ["React 19", "Sanity CMS", "Lambda · SES", "Puppeteer"],
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
