/**
 * The one place a locale turns into content.
 *
 * Every section takes its strings from `getContent(locale)`, so adding a
 * language means adding a mirror file and one row in each map here — never
 * touching a component. The English objects are the source of truth for shape:
 * the `tr` mirrors are typed against them, so a missing key fails typecheck
 * rather than rendering blank.
 */

import { caseStudiesTr } from "@/content/case-studies.tr";
import { copy as copyEn } from "@/content/copy";
import { copyTr } from "@/content/copy.tr";
import { caseStudies as caseStudiesEn, type CaseStudy } from "@/content/case-studies";
import type { Locale } from "@/content/locales";
import { projects as projectsEn, type Project, type ProjectSlug } from "@/content/projects";
import { projectsTr } from "@/content/projects.tr";

const copyByLocale = { en: copyEn, tr: copyTr };
const projectsByLocale = { en: projectsEn, tr: projectsTr };
const caseStudiesByLocale = { en: caseStudiesEn, tr: caseStudiesTr };

export type Content = {
  locale: Locale;
  copy: typeof copyEn;
  projects: Project[];
  getCaseStudy: (slug: ProjectSlug) => CaseStudy;
  getProject: (slug: string) => Project | undefined;
};

export function getContent(locale: Locale): Content {
  const projects = projectsByLocale[locale];
  const caseStudies = caseStudiesByLocale[locale];

  return {
    locale,
    copy: copyByLocale[locale],
    projects,
    getCaseStudy: (slug) => caseStudies[slug],
    getProject: (slug) => projects.find((project) => project.slug === slug),
  };
}
