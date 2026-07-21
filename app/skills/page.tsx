import type { Metadata } from "next";
import Skills from "@/components/sections/Skills";
import content from "@/data/content.json";

export const metadata: Metadata = {
  title: `Skills & Tools — ${content.hero.name}`,
  description: "SEO, data analytics, and web development skills and tools used by Gerald Gumahad.",
};

export default function SkillsPage() {
  return <Skills />;
}
