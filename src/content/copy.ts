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
      "Backend & Cloud Engineer in Istanbul. Focused on Java and Spring Boot, AWS certified. I run the production systems I build.",
  },

  nav: {
    about: "Tech",
    career: "Career",
    projects: "Projects",
    education: "Education",
    contact: "Contact",
    resume: "CV",
    /** Screen-reader labels on the mobile menu toggle. */
    menuOpen: "Open menu",
    menuClose: "Close menu",
  },

  intro: {
    /** Three lines; the middle one is accent-coloured. */
    headline: ["Hi, I'm Berkan —", "Backend & Cloud Engineer", "based in Istanbul."],
    paragraphs: [
      "For close to 2 years I've been a Cloud Engineer at Novadsa, a cloud consultancy in Istanbul. We cover a fairly wide range for our clients: data lake and data warehouse solutions, infrastructure modernisation, and chatbot products. We containerise what we build and put it into production on AWS, on ECS or EKS. Most of our work is Python — Django for the backend, FastAPI where the service is data- or AI-heavy. I build the LLM agents with AWS Bedrock and LangGraph, and I'm the one who takes a system live and looks after it afterwards.",
      "Where I'm heading is **Java and Spring Boot**. I'm actively learning it and already using it in my own projects — the QuitQOS backend is entirely Spring Boot: domain modelling, REST API design, authentication with Spring Security, and tests that actually cover the business logic. On the Python side I have solid experience from enterprise client work.",
    ],
    stats: [
      { value: 2, decimals: 0, suffix: "", caption: "Years in production" },
      { value: 2, decimals: 0, suffix: "×", caption: "AWS certified" },
    ],
    currentlyLabel: "Currently",
    currently: [
      "Launched **QuitQOS** and **PaceUp** — two iOS apps, both mine from the backend to the App Store.",
      "Going deep on **Java & Spring Boot**; that's the stack I'm aiming for.",
      "Started building my new project, a **veterinary booking platform** — two-sided, for clinics and pet owners.",
      "Building up my **Kubernetes / EKS** and Infrastructure-as-Code side.",
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
        category: "Focus — Java",
        blurb: "What I write my own projects in, and where I go deepest.",
        /** The one group rendered in accent; everything else is neutral. */
        primary: true,
        items: [
          "Java 21",
          "Spring Boot",
          "Spring Data JPA",
          "Spring Security",
          "Flyway",
          "Maven",
          "JUnit · Mockito",
          "REST design",
          "JWT",
        ],
      },
      {
        category: "Also backend",
        blurb: "The tools I use day to day at work.",
        items: ["Python", "Django · DRF", "FastAPI", "PostgreSQL", "Redis"],
      },
      {
        category: "Cloud & DevOps",
        blurb: "The side that carries my code to production and keeps it there.",
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
        blurb: "LLM services and data pipelines I've built on client projects.",
        items: ["AWS Bedrock", "LangGraph", "RAG", "OpenSearch", "Lambda · Kinesis", "Redshift"],
      },
    ] as TechGroup[],
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
          "Built the CI/CD and GitOps foundation for a multi-chatbot platform on Amazon EKS: ArgoCD's App of Apps pattern, Karpenter for autoscaling, IRSA for authorisation and External Secrets Operator for secret management.",
          "Wrote the delivery pipeline behind it as well — GitLab CI → CodeBuild → ECR → ArgoCD Image Updater — so deployments to Kubernetes are fully declarative rather than manual.",
          "Built an AI analytics chatbot for Matlı Yem, combining LangGraph and Bedrock agents with OpenSearch and Databricks in the data layer.",
          "Built an AI chatbot for MEF University: a LangGraph + FastAPI service on top of Django/LTI, a Next.js front end, and OpenSearch hybrid search running on Bedrock and Cohere embeddings.",
          "Designed the AWS networking for multi-service deployments as well: a shared ALB with host-based routing, ACM certificates, autoscaling and cross-account IAM.",
        ],
        tags: ["AWS EKS", "ArgoCD", "Karpenter", "Bedrock", "LangGraph", "OpenSearch"],
      },
      {
        period: "May 2024 — Sep 2024",
        company: "Hannover Fairs Turkey",
        role: "IT Trainee",
        bullets: [
          "Supported the office's IT operations: Windows Server, Active Directory and basic network administration.",
        ],
      },
    ] as Role[],
  },

  projects: {
    label: "03",
    heading: "Projects",
    hint: "click a card for the project details",
    cta: "View the project",
    back: "Projects",
  },

  /** Labels on the case-study pages. */
  caseStudy: {
    problem: "The problem",
    built: "Technical details",
    stack: "Tech stack",
    numbers: "By the numbers",
    role: "Role",
    architecture: "Architecture",
    visit: "Open the site ↗",
    repository: "Repository",
    /**
     * Captions on the four architecture figures. The SVGs themselves are
     * language-independent — only these caption bars are translated.
     */
    diagrams: {
      quitqosArchitecture: "QuitQOS — system architecture",
      quitqosTokens: "The Firebase identity and my own token",
      quitqosTokensSubtitle: "token issue & rotation",
      paceupArchitecture: "PaceUp — three services, one monorepo",
      paceupSignals: "One save, four independent effects",
      paceupSignalsSubtitle: "Django signal chain",
    },
  },

  education: {
    label: "04",
    heading: "Education & Certifications",
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
    languagesLabel: "Languages",
    languages: ["Turkish — native", "English — professional", "German — professional"],
  },

  cta: {
    heading: "Get in touch.",
    body: "If anything here caught your attention — a project, a question, or just a hello — email is the fastest way to reach me.",
  },

  footer: {
    rights: "© 2026 Berkan Türkoğlu",
  },
};
