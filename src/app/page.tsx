import { Career } from "@/components/sections/career";
import { ContactCta } from "@/components/sections/contact-cta";
import { Education } from "@/components/sections/education";
import { Intro } from "@/components/sections/intro";
import { Marquee } from "@/components/sections/marquee";
import { Projects } from "@/components/sections/projects";
import { Tech } from "@/components/sections/tech";

export default function HomePage() {
  return (
    <>
      <Intro />
      <Tech />
      <Marquee />
      <Career />
      <Projects />
      <Education />
      <ContactCta />
    </>
  );
}
