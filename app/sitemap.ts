import type { MetadataRoute } from "next";
import content from "@/data/content.json";
import postsData from "@/data/posts.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = content.site.url;
  const now = new Date();

  const staticRoutes = ["/", "/about", "/projects", "/skills", "/blog", "/contact"].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
  }));

  const projectRoutes = content.projects
    .filter((p) => (p as any).caseStudy)
    .map((p) => ({
      url: `${base}/projects/${(p as any).slug}`,
      lastModified: now,
    }));

  const posts = (postsData.posts as Array<{ slug: string }>) || [];
  const blogRoutes = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
