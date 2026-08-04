/** Locale-independent facts: links, identity, the marquee token list. */

export const site = {
  name: "Berkan Türkoğlu",
  email: "berkan.trkgl35@gmail.com",
  github: "https://github.com/Berkantrkgl",
  linkedin: "https://linkedin.com/in/berkanturkoglu/",
  resume: "/cv/berkan-turkoglu-cv.pdf",
  /** Filename the browser saves it as, via the `download` attribute. */
  resumeFilename: "Berkan Turkoglu — CV.pdf",
  portrait: "/berkan.webp",
} as const;

export const marqueeTokens = [
  "Java 21",
  "Spring Boot",
  "Spring Security",
  "PostgreSQL",
  "Flyway",
  "Docker",
  "Kubernetes",
  "AWS",
  "ECS Fargate",
  "GitHub Actions",
  "ArgoCD",
  "Django",
  "FastAPI",
  "LangGraph",
  "Bedrock",
] as const;
