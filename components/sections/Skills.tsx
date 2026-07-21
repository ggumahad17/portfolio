"use client";

import { useEffect, useRef, useState } from "react";
import content from "@/data/content.json";

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
      style={{ backgroundColor: "rgba(7,20,40,0.4)" }}
    >
      <div
        className="absolute -right-40 top-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(18,45,92,0.3) 0%, transparent 70%)",
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
            <p className="max-w-lg mx-auto text-base" style={{ color: "var(--color-text-secondary)" }}>
              A mix of analytical rigour from engineering and hands-on digital marketing experience.
            </p>
          </div>

          {/* All categories, stacked */}
          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((cat, ci) => (
              <div
                key={cat.category}
                className="card p-6 md:p-8"
                style={{
                  border: "1px solid rgba(18,45,92,0.6)",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.5s ease ${ci * 100}ms`,
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">{cat.icon}</span>
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
                    backgroundColor: "rgba(18,45,92,0.4)",
                    border: "1px solid rgba(18,45,92,0.7)",
                    color: "var(--color-text-secondary)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(0,200,180,0.4)";
                    e.currentTarget.style.color = "#00c8b4";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(18,45,92,0.7)";
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
        <span className="text-xs font-mono" style={{ color: "#00c8b4" }}>
          {level}%
        </span>
      </div>
      <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(18,45,92,0.6)" }}>
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%`, background: "linear-gradient(90deg, #00c8b4, #6090d6)" }}
        />
      </div>
    </div>
  );
}
