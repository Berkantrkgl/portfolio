/**
 * Turkish mirror of `projects.ts`. Same order, same slugs, featured flags and
 * links as the English source; only the human-readable text differs.
 */

import type { Project } from "@/content/projects";

export const projectsTr: Project[] = [
  {
    slug: "quitqos",
    featured: true,
    category: "Java · Spring Boot",
    title: "QuitQOS",
    meta: "Alışkanlık takip uygulaması (iOS) · kişisel proje · App Store'da",
    summary:
      "IQOS'u bırakmak isteyenler için geliştirdiğim bir iOS uygulaması. Bıraktığın andan itibaren çalışan bir sayaç tutuyor, vücudun toparlanmasındaki sağlık eşiklerini sırayla işaretliyor. Backend'inden mobiline, tasarımından deploy'una kadar tüm geliştirmeler bana ait.",
    highlights: [
      "Firebase Auth üzerine kurulu stateless JWT authentication; özel bir Spring Security filter chain ve tek kullanımlık refresh token rotasyonu.",
      "Şemayı 7 Flyway migration'ı yönetiyor; bir @Scheduled job sağlık eşiklerini yakalayıp kullanıcının diline göre FCM bildirimi gönderiyor.",
      "Hetzner'da, ortak bir edge proxy arkasında çalışıyor; main'e her push'ta GitHub Actions ile deploy ediliyor.",
    ],
    tags: ["Spring Security", "Flyway", "JUnit · Mockito", "React Native", "Hetzner"],
    links: { repo: "https://github.com/Berkantrkgl/quitqos" },
    status: "durum: App Store'da yayında",
  },
  {
    slug: "paceup",
    featured: false,
    category: "Django · FastAPI · LangGraph",
    title: "PaceUp",
    meta: "AI destekli koşu koçu (iOS) · kişisel proje",
    bullets: [
      "Event-driven Django backend: 6 app, 18+ REST endpoint. Tek bir antrenman kaydı signal'lar üzerinden istatistikleri, achievement'ları ve bildirimleri tetikliyor.",
      "RevenueCat ile abonelik yönetimi; webhook ve uygulama aynı satın almayı aynı anda onaylamaya çalıştığında bile doğrulama şaşmıyor.",
      "Program üretimini gerçek bir backend tool'una bağladım, yani LLM olmayan bir programı var gibi gösteremiyor.",
    ],
    tags: ["Django", "FastAPI", "AWS Bedrock", "Hetzner"],
    links: { repo: "https://github.com/Berkantrkgl/paceup" },
    status: "durum: yayında",
  },
  {
    slug: "pegasos",
    featured: false,
    category: "Müşteri projesi · React · AWS",
    title: "Pegasos",
    meta: "Veteriner hastanesi web sitesi · üç şube",
    bullets: [
      "Müşteri içeriğini kendi güncelleyebilsin diye Sanity üzerinde 5 şemalı bir headless CMS modeli kurdum.",
      "SPA'nın SEO problemini Puppeteer ile prerender pipeline'ı ve okunabilir Türkçe URL'ler kurarak çözdüm.",
      "Randevu formunu sunucusuz kurdum: API Gateway → Lambda → SES.",
    ],
    tags: ["React 19", "Sanity CMS", "Lambda · SES", "Puppeteer"],
    links: {
      repo: "https://github.com/Berkantrkgl/pegasos",
      live: "https://pegasoshayvanhastanesi.com",
    },
    status: "durum: yayında · müşteri projesi",
  },
];
