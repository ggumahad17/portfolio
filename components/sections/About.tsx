"use client";

import { useEffect, useRef, useState } from "react";
import content from "@/data/content.json";

/* ============================================================
   ABOUT SECTION
   Content editable in /data/content.json → about
   ============================================================ */
export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const { about } = content;

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Decorative orb */}
      <div
        className="absolute -left-40 top-1/2 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,200,180,0.06) 0%, transparent 70%)",
          transform: "translateY(-50%)",
        }}
      />

      <div className="container-max" ref={ref}>
        <div
          className="transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)" }}
        >
          {/* Section label */}
          <div className="section-tag">
            <span>01</span>
            <span>About Me</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left — text */}
            <div>
              <h2 className="section-heading">
                Engineer by Training,{" "}
                <span className="text-gradient">Turning Data into Smart Decision-Making</span>
              </h2>
              <div className="section-divider" />

              <p
                className="text-base md:text-lg leading-relaxed mb-6"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {about.bio}
              </p>

              <p
                className="text-base leading-relaxed mb-10"
                style={{ color: "var(--color-text-secondary)" }}
              >
                My background in Chemical Engineering gave me an obsession with{" "}
                <span style={{ color: "#00c8b4" }}>precision and data integrity</span> — skills I now
                apply to SEO strategy, analytics dashboards, and process documentation.
              </p>

              {/* Highlights grid */}
              <div className="grid grid-cols-2 gap-4">
                {about.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="card card-hover p-4 flex items-center gap-3 cursor-default"
                    style={{
                      transitionDelay: `${i * 80}ms`,
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateY(0)" : "translateY(20px)",
                      transition: `all 0.5s ease ${i * 80}ms`,
                    }}
                  >
                    <span className="text-2xl">{h.icon}</span>
                    <div>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: "var(--color-text-primary)" }}
                      >
                        {h.label}
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {h.sublabel}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — profile image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Glowing border ring */}
                <div
                  className="absolute -inset-3 rounded-2xl"
                  style={{
                    background: "linear-gradient(135deg, rgba(0,200,180,0.4), rgba(18,45,92,0.2), rgba(240,165,0,0.3))",
                    filter: "blur(8px)",
                  }}
                />

                {/* Image container */}
                <div
                  className="relative w-72 h-80 lg:w-80 lg:h-96 rounded-2xl overflow-hidden"
                  style={{
                    border: "1px solid rgba(0,200,180,0.2)",
                    backgroundColor: "var(--color-surface-2)",
                  }}
                >
                  {/* Profile photo */}
                  {/* To change photo: replace /public/images/profile.jpg */}
                  <img
                    src="/images/profile.jpg"
                    alt="Gerald M. Gumahad"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center top",
                    }}
                  />

                  {/* Overlay badge */}
                  <div
                    className="absolute bottom-4 left-4 right-4 glass rounded-xl px-4 py-3"
                    style={{ border: "1px solid rgba(0,200,180,0.2)" }}
                  >
                    <p
                      className="text-xs font-mono uppercase tracking-wider mb-1"
                      style={{ color: "#00c8b4" }}
                    >
                      Currently
                    </p>
                    <p
                      className="text-sm font-medium"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      Open to SEO & Data roles
                    </p>
                  </div>
                </div>

                {/* Floating stat cards */}
                <div
                  className="absolute -right-6 top-8 glass rounded-xl px-4 py-3 text-center animate-float"
                  style={{
                    border: "1px solid rgba(0,200,180,0.2)",
                    animationDelay: "0s",
                  }}
                >
                  <p className="text-2xl font-bold text-gradient">3+</p>
                  <p
                    className="text-xs font-mono"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    Years Exp.
                  </p>
                </div>

                <div
                  className="absolute -left-6 bottom-20 glass rounded-xl px-4 py-3 text-center animate-float"
                  style={{
                    border: "1px solid rgba(240,165,0,0.2)",
                    animationDelay: "2s",
                  }}
                >
                  <p className="text-2xl font-bold" style={{ color: "#f0a500" }}>
                    4+
                  </p>
                  <p
                    className="text-xs font-mono"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    Tools Used
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
