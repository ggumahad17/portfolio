import type { Metadata } from "next";
import Blog from "@/components/sections/Blog";
import content from "@/data/content.json";

export const metadata: Metadata = {
  title: `Blog — ${content.hero.name}`,
  description: "SEO strategy and data-analysis writing from Gerald Gumahad.",
};

export default function BlogPage() {
  return <Blog />;
}
