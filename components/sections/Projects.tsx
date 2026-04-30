"use client";

import { useEffect, useRef, useState } from "react";
import content from "@/data/content.json";

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
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      <div
        className="absolute left-1/2 top-0 w-96 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,200,180,0.4), transparent)", transform: "translateX(-50%)" }}
      />
      <div className="container-max" ref={ref}>
        <div className="transition-all duration-700" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)" }}>
          <div className="text-center mb-12">
            <div className="section-tag mx-auto w-fit"><span>03</span><span>Projects</span></div>
            <h2 className="section-heading">Work that <span className="text-gradient">speaks</span></h2>
            <p className="max-w-lg mx-auto text-base" style={{ color: "var(--color-text-secondary)" }}>
              SEO campaigns, data systems, analytics dashboards, and design work.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)} className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
                style={{ backgroundColor: filter === cat ? "rgba(0,200,180,0.15)" : "transparent", border: filter === cat ? "1px solid rgba(0,200,180,0.5)" : "1px solid rgba(18,45,92,0.5)", color: filter === cat ? "#00c8b4" : "var(--color-text-secondary)" }}>
                {cat}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} visible={visible} onImageClick={(img) => setLightbox(img)} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <a href="https://www.kaggle.com/ggumahad17" target="_blank" rel="noopener noreferrer" className="btn-outline inline-flex items-center gap-2">
              <span>🔬</span> View All Data Work on Kaggle
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M224,104a8,8,0,0,1-16,0V59.32l-82.34,82.34a8,8,0,0,1-11.32-11.32L196.68,48H152a8,8,0,0,1,0-16h64a8,8,0,0,1,8,8Zm-40,24a8,8,0,0,0-8,8v72H48V80h72a8,8,0,0,0,0-16H48A16,16,0,0,0,32,80V208a16,16,0,0,0,16,16H176a16,16,0,0,0,16-16V136A8,8,0,0,0,184,128Z"/></svg>
            </a>
          </div>
        </div>
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(4,13,26,0.95)" }} onClick={() => setLightbox(null)}>
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setLightbox(null)} className="absolute -top-10 right-0 text-white text-sm font-mono opacity-60 hover:opacity-100">ESC to close ✕</button>
            <img src={lightbox} alt="Project preview" className="w-full rounded-xl" style={{ border: "1px solid rgba(0,200,180,0.2)" }} />
          </div>
        </div>
      )}
    </section>
  );
}

type Project = typeof content.projects[number];

function ProjectCard({ project, index, visible, onImageClick }: { project: Project; index: number; visible: boolean; onImageClick: (img: string) => void; }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div className="card card-hover flex flex-col overflow-hidden"
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: `all 0.5s ease ${index * 100}ms`, borderColor: hovered ? "rgba(0,200,180,0.35)" : "rgba(18,45,92,0.6)" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>

      {project.image && !imgError ? (
        <div className="relative w-full overflow-hidden cursor-zoom-in" style={{ height: "180px", backgroundColor: "rgba(7,20,40,0.8)" }} onClick={() => project.image && onImageClick(project.image)}>
          <img src={project.image} alt={project.title} onError={() => setImgError(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease", transform: hovered ? "scale(1.05)" : "scale(1)" }} />
          <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300" style={{ backgroundColor: "rgba(0,200,180,0.15)", opacity: hovered ? 1 : 0 }}>
            <span className="text-xs font-mono px-3 py-1.5 rounded-full" style={{ backgroundColor: "rgba(4,13,26,0.8)", border: "1px solid rgba(0,200,180,0.4)", color: "#00c8b4" }}>🔍 Click to enlarge</span>
          </div>
        </div>
      ) : (
        <div className="w-full flex items-center justify-center" style={{ height: "80px", background: "linear-gradient(135deg, rgba(7,20,40,0.8), rgba(18,45,92,0.3))", borderBottom: "1px solid rgba(18,45,92,0.4)" }}>
          <span className="text-3xl opacity-30">{project.category === "SEO" ? "🔍" : project.category === "Data" ? "📊" : "🎨"}</span>
        </div>
      )}

      <div className="p-6 flex flex-col gap-4 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          {project.featured && (
            <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(240,165,0,0.1)", border: "1px solid rgba(240,165,0,0.3)", color: "#f0a500" }}>Featured</span>
          )}
          <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(0,200,180,0.08)", border: "1px solid rgba(0,200,180,0.2)", color: "#00c8b4" }}>{project.category}</span>
        </div>

        <div>
          <h3 className="text-lg font-display font-semibold mb-2 transition-colors duration-300" style={{ color: hovered ? "#00c8b4" : "var(--color-text-primary)" }}>{project.title}</h3>
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{project.description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs font-mono px-2.5 py-1 rounded-md" style={{ backgroundColor: "rgba(18,45,92,0.6)", border: "1px solid rgba(18,45,92,0.8)", color: "var(--color-text-secondary)" }}>{tag}</span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg" style={{ backgroundColor: "rgba(0,200,180,0.1)", border: "1px solid rgba(0,200,180,0.3)", color: "#00c8b4" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" viewBox="0 0 256 256"><path d="M224,104a8,8,0,0,1-16,0V59.32l-82.34,82.34a8,8,0,0,1-11.32-11.32L196.68,48H152a8,8,0,0,1,0-16h64a8,8,0,0,1,8,8Zm-40,24a8,8,0,0,0-8,8v72H48V80h72a8,8,0,0,0,0-16H48A16,16,0,0,0,32,80V208a16,16,0,0,0,16,16H176a16,16,0,0,0,16-16V136A8,8,0,0,0,184,128Z"/></svg>
              View Live
            </a>
          )}
          {project.download && (
            <a href={project.download} download className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg" style={{ backgroundColor: "rgba(240,165,0,0.1)", border: "1px solid rgba(240,165,0,0.3)", color: "#f0a500" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" viewBox="0 0 256 256"><path d="M224,152v56a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V152a8,8,0,0,1,16,0v56H208V152a8,8,0,0,1,16,0Zm-101.66,5.66a8,8,0,0,0,11.32,0l40-40a8,8,0,0,0-11.32-11.32L136,132.69V40a8,8,0,0,0-16,0v92.69L93.66,106.34a8,8,0,0,0-11.32,11.32Z"/></svg>
              {project.downloadLabel || "Download File"}
            </a>
          )}
          {project.external && (
            <a href={project.external} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg" style={{ backgroundColor: "rgba(96,144,214,0.1)", border: "1px solid rgba(96,144,214,0.3)", color: "#6090d6" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" viewBox="0 0 256 256"><path d="M224,104a8,8,0,0,1-16,0V59.32l-82.34,82.34a8,8,0,0,1-11.32-11.32L196.68,48H152a8,8,0,0,1,0-16h64a8,8,0,0,1,8,8Zm-40,24a8,8,0,0,0-8,8v72H48V80h72a8,8,0,0,0,0-16H48A16,16,0,0,0,32,80V208a16,16,0,0,0,16,16H176a16,16,0,0,0,16-16V136A8,8,0,0,0,184,128Z"/></svg>
              {project.externalLabel || "View External"}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
