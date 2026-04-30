"use client";

import { useEffect, useRef, useState } from "react";
import content from "@/data/content.json";

/* ============================================================
   PROJECTS SECTION
   Content editable in /data/content.json → projects
   Add new projects by adding items to the projects array.
   ============================================================ */
export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const { projects } = content;
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      {/* Decorative glow */}
      <div
        className="absolute left-1/2 top-0 w-96 h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(0,200,180,0.4), transparent)",
          transform: "translateX(-50%)",
        }}
      />

      <div className="container-max" ref={ref}>
        <div
          className="transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)" }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="section-tag mx-auto w-fit">
              <span>03</span>
              <span>Projects</span>
            </div>
            <h2 className="section-heading">
              Work that{" "}
              <span className="text-gradient">speaks</span>
            </h2>
            <p
              className="max-w-lg mx-auto text-base"
              style={{ color: "var(--color-text-secondary)" }}
            >
              A selection of projects spanning SEO campaigns, data systems, and analytics
              dashboards.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
                style={{
                  backgroundColor:
                    filter === cat
                      ? "rgba(0,200,180,0.15)"
                      : "transparent",
                  border:
                    filter === cat
                      ? "1px solid rgba(0,200,180,0.5)"
                      : "1px solid rgba(18,45,92,0.5)",
                  color:
                    filter === cat
                      ? "#00c8b4"
                      : "var(--color-text-secondary)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Project cards grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                visible={visible}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type Project = typeof content.projects[number];

function ProjectCard({
  project,
  index,
  visible,
}: {
  project: Project;
  index: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="card card-hover p-6 flex flex-col gap-4 cursor-default"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.5s ease ${index * 100}ms`,
        borderColor: hovered ? "rgba(0,200,180,0.35)" : "rgba(18,45,92,0.6)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          {project.featured && (
            <span
              className="text-xs font-mono px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: "rgba(240,165,0,0.1)",
                border: "1px solid rgba(240,165,0,0.3)",
                color: "#f0a500",
              }}
            >
              Featured
            </span>
          )}
          <span
            className="text-xs font-mono px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: "rgba(0,200,180,0.08)",
              border: "1px solid rgba(0,200,180,0.2)",
              color: "#00c8b4",
            }}
          >
            {project.category}
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 hover:bg-accent-500/10"
              style={{ color: "var(--color-text-muted)" }}
              aria-label="Live demo"
              onMouseEnter={(e) => (e.currentTarget.style.color = "#00c8b4")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                <path d="M224,104a8,8,0,0,1-16,0V59.32l-82.34,82.34a8,8,0,0,1-11.32-11.32L196.68,48H152a8,8,0,0,1,0-16h64a8,8,0,0,1,8,8Zm-40,24a8,8,0,0,0-8,8v72H48V80h72a8,8,0,0,0,0-16H48A16,16,0,0,0,32,80V208a16,16,0,0,0,16,16H176a16,16,0,0,0,16-16V136A8,8,0,0,0,184,128Z" />
              </svg>
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 hover:bg-accent-500/10"
              style={{ color: "var(--color-text-muted)" }}
              aria-label="GitHub"
              onMouseEnter={(e) => (e.currentTarget.style.color = "#00c8b4")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                <path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68Z" />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div>
        <h3
          className="text-lg font-display font-semibold mb-2 transition-colors duration-300"
          style={{ color: hovered ? "#00c8b4" : "var(--color-text-primary)" }}
        >
          {project.title}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {project.description}
        </p>
      </div>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2 mt-auto pt-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-mono px-2.5 py-1 rounded-md"
            style={{
              backgroundColor: "rgba(18,45,92,0.6)",
              border: "1px solid rgba(18,45,92,0.8)",
              color: "var(--color-text-secondary)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
