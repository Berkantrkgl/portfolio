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
    "Someone who has just quit is motivated for a few days, and then that feeling fades. What keeps them going is seeing their progress — but nobody opens an app every day to check it. So the app has to work while it is closed: notice on its own that a health milestone has been reached, and tell the user. One more condition: none of this should require an account. Registration is only for people who want their data on another device or a place on the leaderboard.",
  built: [
    {
      title: "How I use Firebase Auth",
      body: "Firebase does exactly one job for me: confirm that this person really owns this Google or Apple account. I verify the ID token it returns once, then issue my own access JWT and refresh token. Firebase is never called again. Refresh is one-time only, and the token itself never sits in the database — only its SHA-256 hash.",
    },
    {
      title: "The database enforces the business rules",
      body: "A user may have at most one ACTIVE quit attempt at a time. I don't check that with an if block in the service layer, because a race condition can slip between the check and the write; the rule lives in PostgreSQL as a partial unique index, so the database refuses the second row itself. The same rule holds when a guest's data is merged into a registered account: the earliest attempt stays active, the rest are closed as relapsed.",
    },
    {
      title: "A scheduler that can't hand out the same reward twice",
      body: "A @Scheduled job scans active attempts every 60 seconds: it creates the achievement record first, awards the badge, and only then sends the push. That order is deliberate. If the push went first and FCM failed transiently, the next tick would hand out the same badge a second time. When the user has notifications off or no device token on file, the push step is skipped entirely — the achievement is still recorded.",
    },
    {
      title: "Migrations own the schema, not the ORM",
      body: "Seven versioned Flyway migrations carry the schema from the first five tables to where it is today, per-user locale and translated milestone content included. Hibernate runs with ddl-auto=validate, so it can only ever confirm the shape it was given — it never alters it. Every environment replays the same files in the same order, so every environment ends up with an identical schema.",
    },
    {
      title: "A public endpoint that exposes nobody",
      body: "Guests were getting a 403 from the leaderboard, which left the ranking screen completely empty for them. So I wrote a small public endpoint that returns community totals and a top three. Its DTO deliberately has no userId field: someone who hasn't signed in can see the overall table without seeing who anyone is.",
    },
    {
      title: "Writing it isn't the end — shipping it is",
      body: "The app is live on the App Store. The backend runs on Hetzner behind a shared edge proxy, and GitHub Actions deploys it automatically on every push that touches it. Getting there threw up a pile of work with nothing to do with features: account deletion end to end because Apple requires it, privacy and support pages, static-framework linkage on iOS because of the Firebase pods, and a settings screen I rebuilt as a scrollable view after App Store review couldn't reach the delete button.",
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
        caption: "The live counter, running from the moment you quit",
      },
      {
        src: "/shots/quitqos/auth.webp",
        label: "sign-in",
        caption: "Sign-in — or carry on without an account if you'd rather",
      },
      {
        src: "/shots/quitqos/settings.webp",
        label: "settings",
        caption: "Streak stats, milestone notifications, Turkish and English support",
      },
    ],
  },
};

const paceup: CaseStudy = {
  problem:
    "I used to ask AI for running plans myself. Every time I had to explain my age, my weight, my current pace, how many days a week I was free — and what came back was a list. That was the problem: the plan stays inside the chat as text, and after a while you stop going back to it and drift off. In PaceUp you fill in your profile once. The chatbot already knows you, so from then on you just state the goal — \"I want to run a half marathon in three months\". The moment you confirm it, the programme lands in the app's calendar day by day. You tick the workouts off there, and the app reminds you with a notification the day before.",
  built: [
    {
      title: "One save, four independent effects",
      body: "Finishing a workout creates one WorkoutResult, and Django signals handle the rest: the workout is marked complete, the programme counter increments, user stats and streaks recalculate, and an achievement check fires — sending a notification if one is earned. Each effect is independent and lives in its own Django app. Deleting the result runs the same chain in reverse, so counters and streaks stay consistent.",
    },
    {
      title: "Counters that survive a race",
      body: "I increment programme and user counters with F() expressions. The arithmetic happens inside the database rather than as a read-modify-write in Python. Two workouts finishing in the same second can't overwrite each other's count.",
    },
    {
      title: "Subscriptions that survive a race too",
      body: "RevenueCat verification has to be idempotent, because the webhook and the app itself can both try to confirm the same purchase at once. I match on the RevenueCat app user id and the store's immutable original transaction id — the same id used to trace a refund or dispute later. I also keep the timestamp of the last verification, for debugging.",
    },
    {
      title: "An LLM that can't claim work it didn't do",
      body: "I split the agent's tools in two. UI tools open a typed form in the app instead of emitting free text. Exactly one backend tool actually writes to the database: create_workout_plan. The model can write \"I've prepared your programme\" and it means nothing on its own — a plan exists only once that backend tool has really run.",
    },
    {
      title: "Two services, one auth system",
      body: "The FastAPI service verifies the JWTs Django issues, using the same signing key over HS256, and reads the same PostgreSQL database. So there is no second login screen, no token exchange, and no second user table to keep in sync. LangGraph's checkpointer picks conversations up where they left off, even across a restart or a redeploy.",
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
        caption: "Today's session — distance and streak both arrive via signals",
      },
      {
        src: "/shots/paceup/calendar.webp",
        label: "calendar",
        caption: "The generated programme, spread across the calendar day by day",
      },
      {
        src: "/shots/paceup/plans.webp",
        label: "plans",
        caption: "The active programme — 48 workouts over 12 weeks",
      },
      {
        src: "/shots/paceup/profile.webp",
        label: "profile",
        caption: "Profile and premium membership state, verified through RevenueCat",
      },
    ],
  },
};

const pegasos: CaseStudy = {
  problem:
    "I built the site for a three-branch veterinary hospital. The client's main requirement was this: they wanted to update the doctors, the blog posts, the patient reviews and the Google rating themselves, without having to come to me every time. The site also needed to rank well on Google, and a browser-rendered SPA can't manage that on its own. On top of that, the appointment form collects personal data — which in Turkey means legal obligations under KVKK.",
  built: [
    {
      title: "The client really does own the content",
      body: "I set up five Sanity schemas covering everything on the site that can change: team members, blog posts, patient testimonials, the general rating and an Instagram feed. The front end reads them through the CDN, no token required. I mapped Sanity's image hotspot onto CSS object-position, so when hospital staff mark where the face is in a doctor's photo, that photo stays correctly framed at every size the layout uses.",
    },
    {
      title: "An SPA search engines can read",
      body: "A Puppeteer step runs after the build and walks every page on the site one by one: static pages, the three branches, each doctor and each blog post. For every page it visits, it writes the rendered HTML to disk. Google's crawler gets a page full of content instead of an empty div, while a visitor still gets the normal SPA experience once the page loads. The URLs are readable Turkish addresses too, not ids buried in a query string.",
    },
    {
      title: "I didn't run a server for a contact form",
      body: "The appointment and contact forms go through API Gateway to a Python Lambda, which sends the mail via SES. There is no server sitting in the middle to keep running or keep patched. The cost comes to about what the site actually receives — a handful of forms a day.",
    },
  ],
  stack: [
    { label: "Front end", value: "React 19 · React Router · Sass · Swiper · Leaflet" },
    { label: "CMS", value: "Sanity · GROQ · Portable Text" },
    { label: "Serverless", value: "AWS API Gateway · Lambda (Python) · SES · DynamoDB" },
    { label: "SEO", value: "Puppeteer prerender · Turkish route slugs" },
    { label: "Tooling", value: "Pillow · pillow-heif · rawpy — HEIC/RAW → WebP" },
  ],
  role: "I was the only developer on the project: front end, CMS modelling, serverless backend and the SEO pipeline.",
  screenshots: {
    heading: "The site",
    variant: "wide",
    shots: [
      {
        src: "/shots/pegasos/home.webp",
        label: "home",
        caption: "Home — the hero slider, prerendered for search engines",
      },
      {
        src: "/shots/pegasos/appointment.webp",
        label: "appointment",
        caption: "The appointment form, submitted through API Gateway and Lambda",
      },
      {
        src: "/shots/pegasos/reviews.webp",
        label: "services",
        caption: "Services and the Google rating — the client updates both from Sanity",
      },
      {
        src: "/shots/pegasos/doctors.webp",
        label: "doctors",
        caption: "Doctor profiles — the framing follows the hotspot the client marks in the CMS",
      },
    ],
  },
};

export const caseStudies: Record<ProjectSlug, CaseStudy> = { quitqos, paceup, pegasos };

export function getCaseStudy(slug: ProjectSlug): CaseStudy {
  return caseStudies[slug];
}
