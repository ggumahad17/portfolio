import type { Metadata } from "next";
import { notFound } from "next/navigation";
import content from "@/data/content.json";
import ProjectCaseStudy from "@/components/sections/ProjectCaseStudy";

/* ============================================================
   PROJECT CASE STUDY — dynamic route
   Only projects with a `caseStudy` object in data/content.json
   get their own page here. To add a new one: give the project
   a unique `slug` and a `caseStudy` object with overview /
   problem / solution / techStack / results / links.
   ============================================================ */

function getProject(slug: string) {
  return content.projects.find((p) => (p as any).slug === slug && (p as any).caseStudy);
}

export function generateStaticParams() {
  return content.projects
    .filter((p) => (p as any).caseStudy)
    .map((p) => ({ slug: (p as any).slug as string }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${content.hero.name}`,
    description: project.description,
  };
}

export default function ProjectCaseStudyPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();
  return <ProjectCaseStudy project={project} />;
}
