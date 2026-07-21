import type { Metadata } from "next";
import Projects from "@/components/sections/Projects";
import content from "@/data/content.json";

export const metadata: Metadata = {
  title: `Projects — ${content.hero.name}`,
  description: "SEO campaigns, data systems, analytics dashboards, and full-stack builds by Gerald Gumahad.",
};

export default function ProjectsPage() {
  return <Projects />;
}
