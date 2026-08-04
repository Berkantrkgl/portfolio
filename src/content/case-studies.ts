import type { Shot } from "@/components/screenshot-gallery";
import type { ProjectSlug } from "@/content/projects";

/**
 * Case-study bodies. Every claim here traces back to the repo notes in
 * `docs/project-mds/` — no rounding up, no borrowed résumé numbers.
 */

export type Block = {
  title: string;
  body: string;
};

export type StackRow = {
  label: string;
  value: string;
};

export type Stat = {
  value: string;
  caption: string;
};

export type CaseStudy = {
  /** Sits under the summary, sets up why the project exists. */
  problem: string;
  built: Block[];
  stack: StackRow[];
  /** Four numbers, 2×2. Omitted for the client project. */
  numbers?: Stat[];
  /** Replaces `numbers` where a role statement is the more honest thing. */
  role?: string;
  screenshots: {
    heading: string;
    variant: "phone" | "wide";
    shots: Shot[];
  };
};

const quitqos: CaseStudy = {
  problem:
    "Quitting is a long game and motivation decays fast. The app has to keep a precise quit timer, recognise a health milestone at the moment it is actually reached — not the next time the app happens to open — and reach the user with a push even after days of silence. It also had to work without forcing anyone to create an account: registration exists only for sync and the leaderboard.",
  built: [
    {
      title: "Two identities, never mixed",
      body: "Firebase answers exactly one question — does this person really own this Google or Apple account — and hands back an ID token. The backend verifies that once, upserts the user, and issues its own access JWT plus a refresh token. Every later request carries only our token; Firebase is never called again. Refresh is one-time rotation: the presented token is looked up by hash, the old row is deleted, a fresh pair is issued. The raw refresh value is never stored, only its SHA-256 hash.",
    },
    {
      title: "Business rules the database enforces",
      body: "A user may have at most one ACTIVE quit attempt. That isn't a service-layer check that a race condition can slip past — it's a partial unique index in PostgreSQL. Guest-to-registered sync is idempotent through a client-supplied localId, and the merge preserves the same invariant: the earliest start wins, the rest are closed as relapsed, and the insert is flushed first so the index never trips.",
    },
    {
      title: "A scheduler that can't double-reward",
      body: "A @Scheduled job scans active attempts every 60 seconds, creates the achievement, awards the badge, and only then sends the push. The order matters: if FCM fails transiently and the write came second, the next tick would hand out the same badge twice. Push is skipped entirely when notifications are off or no device token exists — the achievement is still recorded.",
    },
    {
      title: "Schema owned by migrations, not the ORM",
      body: "Seven versioned Flyway migrations carry the schema from the first five tables to per-user locale and translated milestone content. Hibernate runs with ddl-auto=validate, so it can only ever confirm the shape it was given — it never alters it. Every environment gets the same schema by replaying the same files.",
    },
    {
      title: "A public endpoint that leaks nothing",
      body: "Guests get a 403 from the leaderboard, which left the guest ranking screen with nothing to show. The fix was a small public summary endpoint returning community totals and a top three. Its DTO deliberately has no userId field, so an anonymous caller learns the numbers without learning who anyone is.",
    },
    {
      title: "Shipped, not just built",
      body: "It's on the App Store. The backend runs on Hetzner behind a shared edge proxy, redeployed by GitHub Actions on every push that touches it. Getting there meant work that has nothing to do with features: account deletion end to end because Apple requires it, privacy and support pages, iOS static-framework linkage for the Firebase pods, and a settings screen reworked into a scrollable view after a reviewer couldn't reach the delete button.",
    },
  ],
  stack: [
    { label: "Backend", value: "Java 21 · Spring Boot 4.1 · Spring JPA · Spring Security · Maven" },
    { label: "Data", value: "PostgreSQL (Aiven) · Flyway" },
    { label: "Auth & push", value: "Firebase Auth · JWT · FCM" },
    { label: "Testing", value: "JUnit · Mockito" },
    { label: "Mobile", value: "React Native 0.85 · Expo 56 · TypeScript · i18next" },
    { label: "Infra", value: "Hetzner · Docker Compose · GitHub Actions · EAS" },
  ],
  numbers: [
    { value: "20", caption: "REST endpoints" },
    { value: "42", caption: "unit tests" },
    { value: "7", caption: "Flyway migrations" },
    { value: "13", caption: "health milestones" },
  ],
  screenshots: {
    heading: "The app",
    variant: "phone",
    shots: [
      {
        src: "/shots/quitqos/timer.webp",
        label: "quit timer",
        caption: "The live quit timer, counting from the moment you started",
      },
      {
        src: "/shots/quitqos/auth.webp",
        label: "sign-in",
        caption: "Sign-in — or carry on as a guest, no account needed",
      },
      {
        src: "/shots/quitqos/settings.webp",
        label: "settings",
        caption: "Streak stats, milestone notifications, Turkish and English",
      },
    ],
  },
};

const paceup: CaseStudy = {
  problem:
    "Planning a run shouldn't mean filling in a form. A runner should be able to say \"I want to run a half marathon in three months, I'm free three days a week\" and get back a structured programme. Behind that: one saved workout has to fan out into stats, achievements, notifications and programme progress without turning the request into a slow pile of side effects — and subscription state has to stay correct while webhooks and clients race each other.",
  built: [
    {
      title: "One save, four independent effects",
      body: "Saving a WorkoutResult fires a chain of Django signals: the workout is marked complete, the programme counter increments, user stats and streaks recalculate, and an achievement check cascades into a notification and a push. Each effect is independent and lives in its own app. Deleting the result unwinds the same chain, so counters and streaks stay honest.",
    },
    {
      title: "Counters that survive a race",
      body: "Programme and user counters increment with F() expressions, so the arithmetic happens inside the database rather than as a read-modify-write in Python. Two workouts finishing at the same moment can't overwrite each other's count.",
    },
    {
      title: "Subscriptions that survive a race too",
      body: "RevenueCat verification has to be idempotent because the webhook and the client can both try to confirm the same purchase at once. Matching runs on the RevenueCat app user id and the store's immutable original transaction id — the same id used to trace a refund or dispute later — with the last verification timestamp kept for debugging.",
    },
    {
      title: "An LLM that cannot fake the work",
      body: "The agent's tools are split in two. UI tools open a typed form in the app instead of emitting free text. Exactly one backend tool, create_workout_plan, produces a real side effect. The model can't announce \"I've created your programme\" and be believed — a plan exists only once the backend tool has actually run.",
    },
    {
      title: "Two services, one auth system",
      body: "The FastAPI service verifies the same JWTs Django issues, using the same signing key over HS256, and reads the same PostgreSQL database. There is no second login, no token exchange, no user table to keep in sync. LangGraph's checkpointer keeps conversations alive across restarts and redeploys.",
    },
    {
      title: "Deploys that only touch what changed",
      body: "A push to main runs a paths filter to work out which service moved, then rebuilds just that one over SSH. Two flags carry the weight: a fixed project name so Caddy's TLS volume is reused instead of re-issuing certificates on every deploy, and --no-deps so rebuilding the chat service doesn't restart Django alongside it.",
    },
  ],
  stack: [
    { label: "Backend", value: "Python 3.12 · Django 6 · DRF · SimpleJWT · django-q2" },
    { label: "AI service", value: "FastAPI · LangGraph · LangChain · AWS Bedrock · SSE" },
    { label: "Data", value: "Aiven managed PostgreSQL · S3" },
    { label: "Infra", value: "Hetzner · Docker Compose · Caddy · GitHub Actions" },
    { label: "Mobile", value: "TypeScript · Expo · React Native · RevenueCat" },
  ],
  numbers: [
    { value: "3", caption: "services, one monorepo" },
    { value: "6", caption: "Django apps" },
    { value: "18+", caption: "REST endpoints" },
    { value: "4", caption: "signal receivers" },
  ],
  screenshots: {
    heading: "The app",
    variant: "phone",
    shots: [
      {
        src: "/shots/paceup/home.webp",
        label: "home",
        caption: "Today's session, with distance and streak carried by signals",
      },
      {
        src: "/shots/paceup/calendar.webp",
        label: "calendar",
        caption: "The generated programme, laid out day by day",
      },
      {
        src: "/shots/paceup/plans.webp",
        label: "plans",
        caption: "The active programme — 48 workouts over 12 weeks",
      },
      {
        src: "/shots/paceup/profile.webp",
        label: "profile",
        caption: "Profile and premium state, verified through RevenueCat",
      },
    ],
  },
};

const pegasos: CaseStudy = {
  problem:
    "A three-branch veterinary hospital needed a site their own staff could keep current — doctors, blog posts, patient reviews, the Google rating — without calling a developer for every change. It had to be findable on Google, which a client-rendered SPA is not, and it collects personal data through an appointment form, which in Turkey carries legal obligations under KVKK.",
  built: [
    {
      title: "Content the client actually owns",
      body: "Five Sanity schemas cover the parts that change: team members, blog posts, testimonials, the general rating and an Instagram feed. The front end reads them through the CDN with no token. Sanity's image hotspot is mapped onto CSS object-position, so when staff mark the face in a doctor's photo it stays framed correctly at every aspect ratio the layout uses.",
    },
    {
      title: "An SPA that search engines can read",
      body: "A Puppeteer step walks every route after the build — static pages, the three branches, each doctor and post — and writes out rendered HTML. Crawlers get a full page instead of an empty root div; visitors still get the SPA once it hydrates. URLs are Turkish and readable rather than query-string ids.",
    },
    {
      title: "No server for a contact form",
      body: "Appointment and contact submissions go through API Gateway to a Python Lambda that sends mail via SES. There is nothing to patch, nothing to keep running, and the cost is proportional to the handful of forms a day the site actually receives.",
    },
    {
      title: "Consent you can prove afterwards",
      body: "Both forms took a KVKK checkbox and then threw the answer away — it only ever reached an email. In an audit the question is \"prove this person consented on this date\", and there was no record to produce. The design that answers it: a DynamoDB table holding who consented, when, from which IP, to which documents and at which version of the text, with a TTL that deletes the record after three years. The table sits in eu-north-1, inside the EU, which KVKK treats as adequately protected. The legal review is deliberately someone else's job — the technical record-keeping is mine.",
    },
  ],
  stack: [
    { label: "Front end", value: "React 19 · React Router · Sass · Swiper · Leaflet" },
    { label: "CMS", value: "Sanity · GROQ · Portable Text" },
    { label: "Serverless", value: "AWS API Gateway · Lambda (Python) · SES · DynamoDB" },
    { label: "SEO", value: "Puppeteer prerender · Turkish route slugs" },
    { label: "Tooling", value: "Pillow · pillow-heif · rawpy — HEIC/RAW → WebP" },
  ],
  role: "Sole developer — front end, CMS modelling, serverless backend, SEO pipeline and the KVKK consent design.",
  screenshots: {
    heading: "The site",
    variant: "wide",
    shots: [
      {
        src: "/shots/pegasos/home.webp",
        label: "home",
        caption: "Home — the hero slider, prerendered for crawlers",
      },
      {
        src: "/shots/pegasos/appointment.webp",
        label: "appointment",
        caption: "The appointment form, and the consent checkbox behind the KVKK work",
      },
      {
        src: "/shots/pegasos/reviews.webp",
        label: "services",
        caption: "Services and the Google rating — both edited in Sanity",
      },
      {
        src: "/shots/pegasos/doctors.webp",
        label: "doctors",
        caption: "Doctor profiles, framed by the hotspot the client sets in the CMS",
      },
    ],
  },
};

const caseStudies: Record<ProjectSlug, CaseStudy> = { quitqos, paceup, pegasos };

export function getCaseStudy(slug: ProjectSlug): CaseStudy {
  return caseStudies[slug];
}
