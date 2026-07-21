"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import content from "@/data/content.json";
import ProjectCard from "./ProjectCard";

/* ============================================================
   FEATURED PROJECTS — Home page preview
   Shows a handful of featured projects with a link through to
   the full /projects grid.
   ============================================================ */
export default function FeaturedProjects() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const featured = content.projects.filter((p) => p.featured).slice(0, 4);

  return (
    <section id="featured-projects" className="section-padding relative overflow-hidden">
      <div className="absolute left-1/2 top-0 w-96 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,200,180,0.4), transparent)", transform: "translateX(-50%)" }} />

      <div className="container-max" ref={ref}>
        <div className="transition-all duration-700" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)" }}>

          <div className="text-center mb-12">
            <div className="section-tag mx-auto w-fit"><span>01</span><span>Featured Work</span></div>
            <h2 className="section-heading">A few things I&apos;ve <span className="text-gradient">shipped</span></h2>
            <p className="max-w-lg mx-auto text-base" style={{ color: "var(--color-text-secondary)" }}>
              SEO campaigns, data systems, analytics dashboards, and full-stack builds.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {featured.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} visible={visible} onImageClick={(img) => setLightbox(img)} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/projects" className="btn-primary inline-flex items-center gap-2">
              View All Projects
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(4,13,26,0.96)" }} onClick={() => setLightbox(null)}>
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setLightbox(null)}
              className="absolute -top-10 right-0 text-white text-sm font-mono opacity-60 hover:opacity-100">
              ESC to close ✕
            </button>
            <img src={lightbox} alt="Project preview" className="w-full rounded-xl"
              style={{ border: "1px solid rgba(0,200,180,0.2)" }} />
          </div>
        </div>
      )}
    </section>
  );
}
