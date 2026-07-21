import type { Metadata } from "next";
import About from "@/components/sections/About";
import Resume from "@/components/sections/Resume";
import content from "@/data/content.json";

export const metadata: Metadata = {
  title: `About & Resume — ${content.hero.name}`,
  description: content.site.description,
};

export default function AboutPage() {
  return (
    <>
      <About />
      <Resume />
    </>
  );
}
