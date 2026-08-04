/** All site copy. Emphasis inside strings uses `**bold**` — see lib/emphasis. */

type Role = {
  period: string;
  company: string;
  role: string;
  bullets: string[];
  /** Only the current role carries tag chips. */
  tags?: string[];
};

type TechGroup = {
  category: string;
  blurb: string;
  items: string[];
  /** The one group rendered in accent; everything else is neutral. */
  primary?: boolean;
};

export const copy = {
  meta: {
    title: "Berkan Türkoğlu — Backend & Cloud Engineer",
    description:
      "Backend engineer focused on Java and Spring Boot. AWS certified, building and running production systems.",
  },

  nav: {
    about: "Tech",
    career: "Career",
    projects: "Projects",
    education: "Education",
    contact: "Contact",
    resume: "CV",
  },

  intro: {
    /** Three lines; the middle one is accent-coloured. */
    headline: ["Hi, I'm Berkan —", "backend engineer", "who runs it in production."],
    paragraphs: [
      "I'm a Backend & Cloud Engineer in Istanbul. For the past 1.5 years at NovaDSA I've been building and running production systems on AWS — REST APIs, containerized services on ECS and EKS, and AI-driven features powered by LangGraph and AWS Bedrock for enterprise clients.",
      "My focus now is **Java and Spring Boot** — the stack I'm building my next chapter around. I like systems where the data model does the heavy lifting: clear domains, honest transactions, migrations you can trust, and tests that describe the business instead of the framework.",
      "I studied Mechatronic Systems Engineering, which is probably why I care more about how a system behaves under load than how it looks on a whiteboard. I work in Turkish, English and German.",
    ],
    stats: [
      { value: 1.5, decimals: 1, suffix: "+", caption: "Years in production" },
      { value: 2, decimals: 0, suffix: "×", caption: "AWS certified" },
    ],
    currentlyLabel: "Currently",
    currently: [
      "Just launched **QuitQOS** and **PaceUp** — two iOS apps, both live, backend to app store.",
      "Going deep on **Java & Spring Boot** as my target backend stack.",
      "Starting a **veterinary booking platform** — two-sided, for clinics and pet owners.",
      "Deepening **Kubernetes / EKS** and Infrastructure-as-Code.",
    ],
    actions: {
      email: "Email me",
      github: "GitHub",
      linkedin: "LinkedIn",
      resume: "Résumé (PDF)",
    },
    portraitAlt: "Berkan Türkoğlu",
  },

  tech: {
    label: "01",
    heading: "Tech I work with",
    groups: [
      {
        category: "Primary — Java",
        blurb: "The stack I build on and go deepest in.",
        /** The one group rendered in accent; everything else is neutral. */
        primary: true,
        items: [
          "Java 21",
          "Spring Boot",
          "Spring Data JPA",
          "Spring Security",
          "Maven",
          "JUnit · Mockito",
          "REST design",
          "JWT",
        ],
      },
      {
        category: "Also backend",
        blurb: "What I use day to day at work.",
        items: ["Python", "Django · DRF", "FastAPI", "PostgreSQL", "Flyway", "Redis"],
      },
      {
        category: "Cloud & DevOps",
        blurb: "How it reaches production, and stays there.",
        items: [
          "AWS",
          "ECS Fargate",
          "Kubernetes (EKS)",
          "Docker",
          "GitHub Actions",
          "ArgoCD",
          "Linux · Bash",
        ],
      },
      {
        category: "Data & AI",
        blurb: "LLM services and pipelines for client work.",
        items: ["AWS Bedrock", "LangGraph", "RAG", "OpenSearch", "Lambda · Kinesis", "Redshift"],
      },
    ] as TechGroup[],
    pills: ["Turkish — native", "English — professional", "German — professional"],
  },

  career: {
    label: "02",
    heading: "Career",
    roles: [
      {
        period: "Sep 2024 — Present",
        company: "NovaDSA",
        role: "Cloud Engineer",
        bullets: [
          "Built and deployed production backend services on AWS (EKS, ECS Fargate, RDS) for enterprise client projects — AI chatbot platforms and data warehousing solutions.",
          "Designed and maintained CI/CD pipelines with GitHub Actions, GitLab CI and ArgoCD: automated Docker builds, ECR pushes and rolling Kubernetes deployments.",
          "Developed services in Python (Django, FastAPI) integrated with PostgreSQL and LLM agents via AWS Bedrock and LangGraph.",
        ],
        tags: ["AWS EKS", "ECS Fargate", "ArgoCD", "Bedrock", "PostgreSQL"],
      },
      {
        period: "May 2024 — Sep 2024",
        company: "Hannover Fairs Turkey",
        role: "IT Trainee",
        bullets: [
          "Supported production IT operations: Windows Server, Active Directory and networking fundamentals across the local office.",
        ],
      },
    ] as Role[],
  },

  projects: {
    label: "03",
    heading: "Projects",
    hint: "click a card for the full case study",
    cta: "View case study",
    back: "Projects",
  },

  education: {
    label: "04",
    heading: "Education & Certificates",
    educationLabel: "Education",
    school: "Turkish-German University",
    degree: "B.Sc. Mechatronic Systems Engineering",
    period: "2019 — 2024",
    gpa: "GPA 3.30 / 4.00",
    certificationsLabel: "Certifications",
    certifications: [
      { name: "AWS Certified Solutions Architect", level: "Professional" },
      { name: "AWS Certified Developer", level: "Associate" },
    ],
    verified: "verified",
  },

  cta: {
    heading: "Get in touch.",
    body: "If something here is worth a conversation — a project, a question, or just a hello — email is the fastest way to reach me.",
  },

  footer: {
    rights: "© 2026 Berkan Türkoğlu",
  },
};
