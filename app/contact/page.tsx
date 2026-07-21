import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";
import content from "@/data/content.json";

export const metadata: Metadata = {
  title: `Contact — ${content.hero.name}`,
  description: "Get in touch with Gerald Gumahad for SEO, data analysis, or web development work.",
};

export default function ContactPage() {
  return <Contact />;
}
