"use client";

import { useEffect, useRef, useState } from "react";
import content from "@/data/content.json";

/* ============================================================
   EXPERIENCE / TIMELINE SECTION
   Content editable in /data/content.json → experience
   ============================================================ */
export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [tab, setTab] = useState<"work" | "education">("work");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const { experience } = content;
  const filtered = experience.filter((e) => e.type === tab);

  return (
    <section
      id="experience"
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "rgba(7,20,40,0.4)" }}
    >
      {/* Top border accent */}
      <div
        className="absolute left-0 top-0 w-full h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(18,45,92,0.8), rgba(0,200,180,0.3), rgba(18,45,92,0.8), transparent)",
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
              <span>04</span>
              <span>Experience</span>
            </div>
            <h2 className="section-heading">
              The journey{" "}
              <span className="text-gradient">so far</span>
            </h2>
          </div>

          {/* Work / Education toggle */}
          <div className="flex justify-center mb-10">
            <div
              className="flex rounded-xl p-1 gap-1"
              style={{
                backgroundColor: "rgba(7,20,40,0.8)",
                border: "1px solid rgba(18,45,92,0.6)",
              }}
            >
              {(["work", "education"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="px-6 py-2.5 rounded-lg text-sm font-medium capitalize transition-all duration-300"
                  style={{
                    backgroundColor:
                      tab === t ? "rgba(0,200,180,0.15)" : "transparent",
                    color: tab === t ? "#00c8b4" : "var(--color-text-secondary)",
                    border: tab === t ? "1px solid rgba(0,200,180,0.3)" : "1px solid transparent",
                  }}
                >
                  {t === "work" ? "💼 Work" : "🎓 Education"}
                </button>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="max-w-2xl mx-auto relative pl-10">
            {/* Vertical line */}
            <div className="timeline-line" />

            {filtered.map((item, i) => (
              <TimelineItem
                key={item.id}
                item={item}
                index={i}
                visible={visible}
                isLast={i === filtered.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type ExperienceItem = typeof content.experience[number];

function TimelineItem({
  item,
  index,
  visible,
  isLast,
}: {
  item: ExperienceItem;
  index: number;
  visible: boolean;
  isLast: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative mb-8"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-20px)",
        transition: `all 0.5s ease ${index * 120}ms`,
      }}
    >
      {/* Dot */}
      <div
        className="absolute -left-10 top-1 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          border: `2px solid ${hovered ? "#00c8b4" : "rgba(18,45,92,0.9)"}`,
          backgroundColor: hovered ? "rgba(0,200,180,0.2)" : "var(--color-bg)",
          boxShadow: hovered ? "0 0 12px rgba(0,200,180,0.4)" : "none",
        }}
      >
        <div
          className="w-2 h-2 rounded-full transition-all duration-300"
          style={{ backgroundColor: hovered ? "#00c8b4" : "rgba(18,45,92,0.9)" }}
        />
      </div>

      {/* Card */}
      <div
        className="card p-5 transition-all duration-300"
        style={{
          borderColor: hovered ? "rgba(0,200,180,0.3)" : "rgba(18,45,92,0.6)",
          transform: hovered ? "translateX(4px)" : "translateX(0)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <h3
            className="font-display font-semibold text-base"
            style={{ color: "var(--color-text-primary)" }}
          >
            {item.role}
          </h3>
          <span
            className="text-xs font-mono px-2 py-1 rounded-full flex-shrink-0"
            style={{
              backgroundColor: "rgba(0,200,180,0.08)",
              border: "1px solid rgba(0,200,180,0.2)",
              color: "#00c8b4",
            }}
          >
            {item.period}
          </span>
        </div>
        <p
          className="text-sm font-medium mb-3"
          style={{ color: "#00c8b4" }}
        >
          {item.company}
        </p>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {item.description}
        </p>
      </div>
    </div>
  );
}
