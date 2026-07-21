"use client";

import { useState } from "react";
import Link from "next/link";
import type { Project } from "./ProjectCard";

export default function ProjectCaseStudy({ project }: { project: Project }) {
  const cs = (project as any).caseStudy as {
    role?: string;
    overview?: string;
    problem?: string[];
    solution?: string[];
    techStack?: string[];
    results?: string;
    links?: { live?: string; liveLabel?: string };
  } | null;

  const [imgError, setImgError] = useState(false);

  if (!cs) return null;

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-max">
        {/* Back link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium mb-8 transition-colors duration-200"
          style={{ color: "var(--color-text-secondary)" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
            <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" />
          </svg>
          Back to all projects
        </Link>

        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 flex-wrap mb-4">
            <span
              className="text-xs font-mono px-2.5 py-1 rounded-full"
              style={{ backgroundColor: "rgba(0,200,180,0.08)", border: "1px solid rgba(0,200,180,0.2)", color: "#00c8b4" }}
            >
              {project.category}
            </span>
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono px-2.5 py-1 rounded-md"
                style={{ backgroundColor: "rgba(18,45,92,0.6)", border: "1px solid rgba(18,45,92,0.8)", color: "var(--color-text-secondary)" }}
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="section-heading mb-2">{project.title}</h1>
          {cs.role && (
            <p className="text-sm font-mono" style={{ color: "var(--color-text-muted)" }}>
              {cs.role}
            </p>
          )}
        </div>

        {/* Cover image (graceful fallback if not uploaded yet) */}
        {project.image && !imgError ? (
          <div
            className="w-full rounded-2xl overflow-hidden mb-12"
            style={{ border: "1px solid rgba(0,200,180,0.2)", maxHeight: "420px" }}
          >
            <img
              src={project.image}
              alt={project.title}
              onError={() => setImgError(true)}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        ) : (
          <div
            className="w-full rounded-2xl flex items-center justify-center mb-12"
            style={{
              height: "220px",
              background: "linear-gradient(135deg, rgba(0,200,180,0.1), rgba(18,45,92,0.4), rgba(240,165,0,0.08))",
              border: "1px solid rgba(18,45,92,0.6)",
            }}
          >
            <span className="text-5xl opacity-40">🚀</span>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 flex flex-col gap-10">
            {cs.overview && (
              <div>
                <h2 className="text-xl font-display font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>
                  Overview
                </h2>
                <p className="text-base leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  {cs.overview}
                </p>
              </div>
            )}

            {cs.problem && cs.problem.length > 0 && (
              <div>
                <h2 className="text-xl font-display font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>
                  The Problem
                </h2>
                <ul className="flex flex-col gap-2">
                  {cs.problem.map((line, i) => (
                    <li key={i} className="flex gap-3 text-base leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                      <span style={{ color: "#f0a500" }}>—</span>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {cs.solution && cs.solution.length > 0 && (
              <div>
                <h2 className="text-xl font-display font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>
                  The Approach
                </h2>
                <ul className="flex flex-col gap-2">
                  {cs.solution.map((line, i) => (
                    <li key={i} className="flex gap-3 text-base leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                      <span style={{ color: "#00c8b4" }}>—</span>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {cs.results && (
              <div>
                <h2 className="text-xl font-display font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>
                  Results
                </h2>
                <p className="text-base leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  {cs.results}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            {cs.techStack && cs.techStack.length > 0 && (
              <div className="card p-6" style={{ border: "1px solid rgba(18,45,92,0.6)" }}>
                <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: "var(--color-text-muted)" }}>
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {cs.techStack.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono px-2.5 py-1 rounded-md"
                      style={{ backgroundColor: "rgba(18,45,92,0.6)", border: "1px solid rgba(18,45,92,0.8)", color: "var(--color-text-secondary)" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {cs.links?.live && (
              <a
                href={cs.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary justify-center"
              >
                {cs.links.liveLabel || "View Live"}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M224,104a8,8,0,0,1-16,0V59.32l-82.34,82.34a8,8,0,0,1-11.32-11.32L196.68,48H152a8,8,0,0,1,0-16h64a8,8,0,0,1,8,8Zm-40,24a8,8,0,0,0-8,8v72H48V80h72a8,8,0,0,0,0-16H48A16,16,0,0,0,32,80V208a16,16,0,0,0,16,16H176a16,16,0,0,0,16-16V136A8,8,0,0,0,184,128Z" />
                </svg>
              </a>
            )}

            <Link href="/projects" className="btn-outline justify-center">
              ← All Projects
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
