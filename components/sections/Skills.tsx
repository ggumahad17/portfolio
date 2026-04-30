"use client";

import { useEffect, useRef, useState } from "react";
import content from "@/data/content.json";

/* ============================================================
   SKILLS SECTION
   Content editable in /data/content.json → skills
   ============================================================ */
export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const { skills } = content;
  const active = skills[activeTab];

  return (
    <section
      id="skills"
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "rgba(7,20,40,0.4)" }}
    >
      {/* Decorative orb */}
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
          {/* Header */}
          <div className="text-center mb-12">
            <div className="section-tag mx-auto w-fit">
              <span>02</span>
              <span>Skills & Tools</span>
            </div>
            <h2 className="section-heading">
              What I bring to the{" "}
              <span className="text-gradient">table</span>
            </h2>
            <p
              className="max-w-lg mx-auto text-base"
              style={{ color: "var(--color-text-secondary)" }}
            >
              A mix of analytical rigour from engineering and hands-on digital
              marketing experience.
            </p>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {skills.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
                style={{
                  backgroundColor:
                    activeTab === i
                      ? "rgba(0,200,180,0.15)"
                      : "rgba(7,20,40,0.6)",
                  border:
                    activeTab === i
                      ? "1px solid rgba(0,200,180,0.5)"
                      : "1px solid rgba(18,45,92,0.5)",
                  color:
                    activeTab === i
                      ? "#00c8b4"
                      : "var(--color-text-secondary)",
                }}
              >
                <span>{cat.icon}</span>
                <span>{cat.category}</span>
              </button>
            ))}
          </div>

          {/* Skills panel */}
          <div
            className="card p-6 md:p-8"
            style={{ border: "1px solid rgba(18,45,92,0.6)" }}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl">{active.icon}</span>
              <div>
                <h3
                  className="text-xl font-display font-semibold"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {active.category}
                </h3>
                <p
                  className="text-sm font-mono"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {active.items.length} skills
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {active.items.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={i * 60}
                  animate={visible}
                />
              ))}
            </div>
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
        <span
          className="text-sm font-medium"
          style={{ color: "var(--color-text-primary)" }}
        >
          {name}
        </span>
        <span
          className="text-xs font-mono"
          style={{ color: "#00c8b4" }}
        >
          {level}%
        </span>
      </div>
      <div
        className="w-full h-1.5 rounded-full overflow-hidden"
        style={{ backgroundColor: "rgba(18,45,92,0.6)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${width}%`,
            background: "linear-gradient(90deg, #00c8b4, #6090d6)",
          }}
        />
      </div>
    </div>
  );
}
