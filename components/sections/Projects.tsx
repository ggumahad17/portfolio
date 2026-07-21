"use client";

import { useEffect, useRef, useState } from "react";
import content from "@/data/content.json";
import ProjectCard from "./ProjectCard";

/* ============================================================
   PROJECTS SECTION — full grid (used on /projects)
   Filtering hides non-matching cards with CSS rather than
   removing them from the array, so all project text stays in
   the rendered HTML for search engines to crawl.
   ============================================================ */
export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const { projects } = content;
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      <div className="absolute left-1/2 top-0 w-96 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,200,180,0.4), transparent)", transform: "translateX(-50%)" }} />

      <div className="container-max" ref={ref}>
        <div className="transition-all duration-700" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)" }}>

          <div className="text-center mb-12">
            <div className="section-tag mx-auto w-fit"><span>01</span><span>Projects</span></div>
            <h2 className="section-heading">Work that <span className="text-gradient">speaks</span></h2>
            <p className="max-w-lg mx-auto text-base" style={{ color: "var(--color-text-secondary)" }}>
              SEO campaigns, data systems, analytics dashboards, and design work.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)}
                className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
                style={{ backgroundColor: filter === cat ? "rgba(0,200,180,0.15)" : "transparent", border: filter === cat ? "1px solid rgba(0,200,180,0.5)" : "1px solid rgba(18,45,92,0.5)", color: filter === cat ? "#00c8b4" : "var(--color-text-secondary)" }}>
                {cat}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <div
                key={project.id}
                style={{ display: filter === "All" || project.category === filter ? undefined : "none" }}
              >
                <ProjectCard project={project} index={i} visible={visible} onImageClick={(img) => setLightbox(img)} />
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a href="https://www.kaggle.com/geraldmgumahad" target="_blank" rel="noopener noreferrer" className="btn-outline inline-flex items-center gap-2">
              <span>🔬</span> View All Data Work on Kaggle
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M224,104a8,8,0,0,1-16,0V59.32l-82.34,82.34a8,8,0,0,1-11.32-11.32L196.68,48H152a8,8,0,0,1,0-16h64a8,8,0,0,1,8,8Zm-40,24a8,8,0,0,0-8,8v72H48V80h72a8,8,0,0,0,0-16H48A16,16,0,0,0,32,80V208a16,16,0,0,0,16,16H176a16,16,0,0,0,16-16V136A8,8,0,0,0,184,128Z"/></svg>
            </a>
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
