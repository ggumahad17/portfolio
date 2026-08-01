import type { MetadataRoute } from "next";
import content from "@/data/content.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = content.site.url;
  const now = new Date();

  const staticRoutes = ["/", "/about", "/projects", "/skills", "/certificates", "/contact"].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
  }));

  const projectRoutes = content.projects
    .filter((p) => (p as any).caseStudy)
    .map((p) => ({
      url: `${base}/projects/${(p as any).slug}`,
      lastModified: now,
    }));

  return [...staticRoutes, ...projectRoutes];
}
