import type { Metadata } from "next";
import Certifications from "@/components/sections/Certifications";
import content from "@/data/content.json";

export const metadata: Metadata = {
  title: `Certificates — ${content.hero.name}`,
  description:
    "Professional certificates earned by Gerald Gumahad in data analytics and web development, including Google Data Analytics, Cisco Data Analytics Essentials, and Cisco HTML Essentials — with downloadable PDFs and verified Credly badges.",
};

export default function CertificatesPage() {
  return <Certifications />;
}
