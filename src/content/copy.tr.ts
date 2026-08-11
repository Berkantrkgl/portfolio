/**
 * Turkish mirror of `copy.ts`. Same shape, enforced by `typeof copyEn`.
 * Emphasis inside strings uses `**bold**` — see lib/emphasis.
 */

import { copy as copyEn } from "@/content/copy";

export const copyTr: typeof copyEn = {
  meta: {
    title: "Berkan Türkoğlu — Backend & Cloud Engineer",
    description:
      "İstanbul'da Backend & Cloud Engineer. Java ve Spring Boot odaklı, AWS sertifikalı. Kurduğu production sistemlerini kendisi işletiyor.",
  },

  nav: {
    about: "Teknoloji",
    career: "Kariyer",
    projects: "Projeler",
    education: "Eğitim",
    contact: "İletişim",
    resume: "CV",
    menuOpen: "Menüyü aç",
    menuClose: "Menüyü kapat",
  },

  intro: {
    /** Three lines; the middle one is accent-coloured. */
    headline: ["Merhaba, ben Berkan —", "Backend & Cloud Engineer", "olarak çalışıyorum."],
    paragraphs: [
      "Yaklaşık 2 yıldır İstanbul'da, Novadsa adlı bir bulut danışmanlık firmasında Cloud Engineer olarak çalışmaktayım. Danışanlarımızın ihtiyaçlarına yönelik; data lake / data warehouse çözümleri, altyapı modernizasyonu ve chatbot ürünleri geliştirme gibi geniş bir yelpazede hizmet veriyoruz. Geliştirdiğimiz uygulamaları containerize ederek AWS üzerinde ECS ya da EKS üzerinden production ortamına sunuyoruz. Projelerimizi genellikle Python ile yazıyoruz; backend tarafında ağırlıklı olarak Django kullanıyoruz, veri ve AI odaklı servislerde ise FastAPI'ye yöneliyoruz. LLM agent'larını AWS Bedrock ve LangGraph ile kuruyorum. Yazdığım sistemin canlıya çıkışını ve sonrasını da ben takip ediyorum.",
      "Hedefim **Java ve Spring Boot**; güncel olarak bunu aktif şekilde öğreniyorum ve kendi kişisel projelerimde kullanmaya başladım — örneğin QuitQOS uygulamasının backend'ini tamamen Spring Boot ile geliştirdim: domain modelleme, REST API tasarımı, Spring Security ile authentication ve iş mantığını gerçekten kapsayan testler. Python tarafında ise kurumsal projelerden gelen sağlam bir geçmişim var.",
    ],
    stats: [
      /** Rendered uppercase; "production" would become "PRODUCTİON" in a tr locale. */
      { value: 2, decimals: 0, suffix: "", caption: "Yıllık deneyim" },
      { value: 2, decimals: 0, suffix: "×", caption: "AWS sertifikası" },
    ],
    currentlyLabel: "Şu sıralar",
    currently: [
      "**QuitQOS** ve **PaceUp**'ı yayına aldım — iki iOS uygulaması, ikisi de backend'inden App Store'una kadar bana ait.",
      "**Java & Spring Boot**'ta derinleşiyorum; hedeflediğim stack bu.",
      "Yeni projem olan **veteriner randevu platformunu** geliştirmeye başladım — klinikler ve hayvan sahipleri için, iki taraflı.",
      "**Kubernetes / EKS** ve Infrastructure-as-Code tarafında kendimi geliştiriyorum.",
    ],
    actions: {
      email: "E-posta gönder",
      github: "GitHub",
      linkedin: "LinkedIn",
      resume: "CV (PDF)",
    },
    portraitAlt: "Berkan Türkoğlu",
  },

  tech: {
    label: "01",
    heading: "Kullandığım teknolojiler",
    groups: [
      {
        category: "Odak — Java",
        blurb: "Kendi projelerimi bununla yazıyorum, en çok da burada derinleşiyorum.",
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
        category: "Diğer backend",
        blurb: "İş yerinde her gün kullandığım araçlar.",
        items: ["Python", "Django · DRF", "FastAPI", "PostgreSQL", "Redis"],
      },
      {
        category: "Cloud & DevOps",
        blurb: "Yazdığım kodu production'a taşıyan ve orada tutan taraf.",
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
        blurb: "Müşteri projelerinde kurduğum LLM servisleri ve veri pipeline'ları.",
        items: ["AWS Bedrock", "LangGraph", "RAG", "OpenSearch", "Lambda · Kinesis", "Redshift"],
      },
    ],
  },

  career: {
    label: "02",
    heading: "Kariyer",
    roles: [
      {
        period: "Eyl 2024 — Halen",
        company: "NovaDSA",
        role: "Cloud Engineer",
        bullets: [
          "Amazon EKS üzerinde çalışan çoklu chatbot platformunun CI/CD ve GitOps altyapısını kurdum: ArgoCD ile App of Apps yapısı, autoscaling için Karpenter, yetkilendirme için IRSA ve secret yönetimi için External Secrets Operator.",
          "Bunun arkasındaki delivery pipeline'ını da ben yazdım — GitLab CI → CodeBuild → ECR → ArgoCD Image Updater — böylece Kubernetes'e deploy'lar manuel değil, tamamen declarative şekilde ilerliyor.",
          "Matlı Yem için bir AI analitik chatbot'u geliştirdim; LangGraph ve Bedrock agent'larını veri katmanında OpenSearch ve Databricks ile birleştirdim.",
          "MEF Üniversitesi için bir AI chatbot geliştirdim: Django/LTI üzerine kurulu LangGraph + FastAPI servisi, Next.js arayüzü ve Bedrock/Cohere embedding'leriyle çalışan OpenSearch hybrid search.",
          "Çok servisli deployment'lar için AWS network tasarımını da ben yaptım: host-based routing kullanan ortak bir ALB, ACM sertifikaları, autoscaling ve cross-account IAM.",
        ],
        tags: ["AWS EKS", "ArgoCD", "Karpenter", "Bedrock", "LangGraph", "OpenSearch"],
      },
      {
        period: "May 2024 — Eyl 2024",
        company: "Hannover Fairs Turkey",
        role: "IT Trainee",
        bullets: [
          "Ofisin IT operasyonlarına destek verdim: Windows Server, Active Directory ve temel network yönetimi.",
        ],
      },
    ],
  },

  projects: {
    label: "03",
    heading: "Projeler",
    hint: "projenin detayları için karta tıkla",
    cta: "Projeyi incele",
    back: "Projeler",
  },

  /** Labels on the case-study pages. */
  caseStudy: {
    problem: "Problem",
    built: "Teknik detaylar",
    stack: "Teknoloji",
    numbers: "Sayılarla",
    role: "Rolüm",
    architecture: "Mimari",
    visit: "Siteyi aç ↗",
    repository: "Repository",
    /**
     * Captions on the four architecture figures. The SVGs themselves are
     * language-independent — only these caption bars are translated.
     */
    diagrams: {
      quitqosArchitecture: "QuitQOS — sistem mimarisi",
      quitqosTokens: "Firebase kimliği ile kendi token'ım",
      quitqosTokensSubtitle: "token üretimi & rotasyon",
      paceupArchitecture: "PaceUp — üç servis, tek monorepo",
      paceupSignals: "Tek kayıt, dört bağımsız etki",
      paceupSignalsSubtitle: "Django signal zinciri",
    },
  },

  education: {
    label: "04",
    heading: "Eğitim & Sertifikalar",
    educationLabel: "Eğitim",
    school: "Türk-Alman Üniversitesi",
    degree: "Mekatronik Sistemler Mühendisliği (Lisans)",
    period: "2019 — 2024",
    gpa: "GNO 3.30 / 4.00",
    certificationsLabel: "Sertifikalar",
    certifications: [
      { name: "AWS Certified Solutions Architect", level: "Professional" },
      { name: "AWS Certified Developer", level: "Associate" },
    ],
    verified: "doğrulandı",
    languagesLabel: "Diller",
    languages: ["Türkçe — ana dil", "İngilizce — profesyonel", "Almanca — profesyonel"],
  },

  cta: {
    heading: "İletişime geç.",
    body: "Aklına takılan bir şey olduysa — bir proje, bir soru ya da sadece bir merhaba — bana en hızlı e-posta ile ulaşabilirsin.",
  },

  footer: {
    rights: "© 2026 Berkan Türkoğlu",
  },
};
