import { notFound } from "next/navigation";

import { Career } from "@/components/sections/career";
import { ContactCta } from "@/components/sections/contact-cta";
import { Education } from "@/components/sections/education";
import { Intro } from "@/components/sections/intro";
import { Marquee } from "@/components/sections/marquee";
import { Projects } from "@/components/sections/projects";
import { Tech } from "@/components/sections/tech";
import { isLocale } from "@/content/locales";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <Intro locale={locale} />
      <Tech locale={locale} />
      <Marquee />
      <Career locale={locale} />
      <Projects locale={locale} />
      <Education locale={locale} />
      <ContactCta locale={locale} />
    </>
  );
}
