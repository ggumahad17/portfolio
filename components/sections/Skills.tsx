"use client";

import { useEffect, useRef, useState } from "react";
import content from "@/data/content.json";
import Icon from "@/components/ui/Icon";

/* ============================================================
   SKILLS SECTION (standalone /skills page)
   All categories render at once (not behind a single active
   tab) so every skill is present in the HTML for SEO/crawling.
   Content editable in /data/content.json → skills
   ============================================================ */
export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const { skills } = content;

  return (
    <section
      id="skills"
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "var(--color-section-alt)" }}
    >
      <div
        className="absolute -right-40 top-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--color-chip-bg) 0%, transparent 70%)",
          transform: "translateY(-50%)",
        }}
      />

      <div className="container-max" ref={ref}>
        <div
          className="transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)" }}
        >
          <div className="text-center mb-12">
            <div className="section-tag mx-auto w-fit">
              <span>01</span>
              <span>Skills & Tools</span>
            </div>
            <h2 className="section-heading">
              What I bring to the <span className="text-gradient">table</span>
            </h2>
            <p className="max-w-xl mx-auto text-base mb-3" style={{ color: "var(--color-text-secondary)" }}>
              A Chemical Engineering background means I came into SEO and data work already trained to think in
              processes, variables, and root causes — not shortcuts. That habit carried over directly: before I
              touch a keyword list or a dashboard, I want to know what's actually being measured and why it moved.
            </p>
            <p className="max-w-xl mx-auto text-base" style={{ color: "var(--color-text-secondary)" }}>
              The four domains below aren't separate skillsets so much as one approach applied to different
              surfaces — search visibility, raw data, the sites that hold both, and the people who need the
              results explained in plain language.
            </p>
          </div>

          {/* All categories, stacked */}
          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((cat, ci) => (
              <div
                key={cat.category}
                className="card p-6 md:p-8"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.5s ease ${ci * 100}ms`,
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Icon name={cat.icon} className="w-6 h-6" style={{ color: "var(--color-accent)" }} />
                  <div>
                    <h3 className="text-lg font-display font-semibold" style={{ color: "var(--color-text-primary)" }}>
                      {cat.category}
                    </h3>
                    <p className="text-xs font-mono" style={{ color: "var(--color-text-muted)" }}>
                      {cat.items.length} skills
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  {cat.items.map((skill, i) => (
                    <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={i * 60} animate={visible} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* How I work */}
          <div className="mt-14 grid sm:grid-cols-3 gap-5">
            {[
              {
                title: "Measure before changing anything",
                body: "I check what the data actually says before touching a page, a query, or a process — engineering habit, applied to marketing.",
              },
              {
                title: "Process over one-off fixes",
                body: "A ranking bump or a clean dashboard is only useful if it holds. I document the steps so the result is repeatable, not a lucky one-time win.",
              },
              {
                title: "Plain-language reporting",
                body: "Data and SEO work is wasted if the person reading it can't act on it. I write findings for the decision they're meant to support.",
              },
            ].map((p) => (
              <div key={p.title} className="card p-5">
                <h3 className="text-sm font-display font-semibold mb-2" style={{ color: "var(--color-text-primary)" }}>
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  {p.body}
                </p>
              </div>
            ))}
          </div>

          {/* Tools row */}
          <div className="mt-12">
            <p
              className="text-center text-xs font-mono uppercase tracking-widest mb-6"
              style={{ color: "var(--color-text-muted)" }}
            >
              All Platforms & Tools
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "WordPress", "Divi", "Semrush", "GA4", "GSC",
                "Google PageSpeed Insights", "ClickUp", "Asana",
                "Slack", "Microsoft Teams", "Power BI", "Excel VBA",
                "Google Workspace", "Google Sheets",
              ].map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-default hover:-translate-y-0.5"
                  style={{
                    backgroundColor: "var(--color-chip-bg)",
                    border: "1px solid var(--color-chip-border)",
                    color: "var(--color-text-secondary)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(59,158,255,0.4)";
                    e.currentTarget.style.color = "var(--color-accent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-chip-border)";
                    e.currentTarget.style.color = "var(--color-text-secondary)";
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillBar({
  name,
  level,
  delay,
  animate,
}: {
  name: string;
  level: number;
  delay: number;
  animate: boolean;
}) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => setWidth(level), delay + 300);
      return () => clearTimeout(timer);
    }
  }, [animate, level, delay]);

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
          {name}
        </span>
        <span className="text-xs font-mono" style={{ color: "var(--color-accent)" }}>
          {level}%
        </span>
      </div>
      <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "var(--color-chip-bg)" }}>
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%`, background: "linear-gradient(90deg, var(--color-accent), #ffb020)" }}
        />
      </div>
    </div>
  );
}
