"use client";

import { useEffect, useRef, useState } from "react";
import content from "@/data/content.json";
import Icon from "@/components/ui/Icon";

/* ============================================================
   RESUME / CV SECTION (lives on /about, below the About story)

   This renders experience, education, skills, and certifications
   as real, static HTML — not behind tabs that hide half the
   content from the DOM — so search engines can index it the
   same way they'd index any other page text. The formal PDF is
   offered alongside it for anyone who wants the traditional
   document.

   To add a certification: add an entry to the `certs` array below
   and drop the PDF into /public/files/.
   ============================================================ */

const certs = [
  {
    id: 1,
    title: "Google Data Analytics Professional Certificate",
    issuer: "Google / Coursera",
    date: "March 8, 2026",
    logo: "graduation-cap",
    color: "#4285F4",
    colorBg: "rgba(66,133,244,0.08)",
    colorBorder: "rgba(66,133,244,0.25)",
    tags: ["Data Analytics", "SQL", "Tableau", "R", "Spreadsheets"],
    download: "/files/google-data-analytics-certificate.pdf",
    credly: "https://www.credly.com/users/gerald-gumahad/badges#credly",
  },
  {
    id: 2,
    title: "Data Analytics Essentials",
    issuer: "Cisco Networking Academy",
    date: "March 23, 2026",
    logo: "bar-chart",
    color: "#00bceb",
    colorBg: "rgba(0,188,235,0.08)",
    colorBorder: "rgba(0,188,235,0.25)",
    tags: ["Data Analytics", "Excel", "SQL", "Tableau", "Statistics"],
    download: "/files/data-analytics-essentials-certificate.pdf",
    credly: null as string | null,
  },
  {
    id: 3,
    title: "HTML Essentials",
    issuer: "Cisco Networking Academy",
    date: "May 13, 2026",
    logo: "globe",
    color: "var(--color-accent)",
    colorBg: "rgba(59,158,255,0.1)",
    colorBorder: "rgba(59,158,255,0.25)",
    tags: ["HTML", "Web Development", "Accessibility", "CSS", "JavaScript"],
    download: "/files/html-essentials-certificate.pdf",
    credly: null as string | null,
  },
];

export default function Resume() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [showPdf, setShowPdf] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const work = content.experience.filter((e) => e.type === "work");
  const education = content.experience.filter((e) => e.type === "education");

  return (
    <section
      id="resume"
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "var(--color-section-alt)" }}
    >
      <div
        className="absolute left-0 top-0 w-full h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, var(--color-border), rgba(59,158,255,0.3), var(--color-border), transparent)" }}
      />

      <div className="container-max" ref={ref}>
        <div
          className="transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)" }}
        >
          {/* Header */}
          <div className="text-center mb-10">
            <div className="section-tag mx-auto w-fit">
              <span>02</span>
              <span>Resume / CV</span>
            </div>
            <h2 className="section-heading">
              Experience, education, and skills <span className="text-gradient">at a glance</span>
            </h2>
            <p className="max-w-xl mx-auto text-base mb-6" style={{ color: "var(--color-text-secondary)" }}>
              {content.about.resumeSummary}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a href={content.resume.pdf} download className="btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M224,152v56a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V152a8,8,0,0,1,16,0v56H208V152a8,8,0,0,1,16,0Zm-101.66,5.66a8,8,0,0,0,11.32,0l40-40a8,8,0,0,0-11.32-11.32L136,132.69V40a8,8,0,0,0-16,0v92.69L93.66,106.34a8,8,0,0,0-11.32,11.32Z" />
                </svg>
                {content.resume.downloadLabel}
              </a>
              <button onClick={() => setShowPdf((v) => !v)} className="btn-outline">
                {showPdf ? "Hide PDF Preview" : "Preview PDF"}
              </button>
            </div>
          </div>

          {/* Optional embedded PDF viewer */}
          {showPdf && (
            <div className="max-w-3xl mx-auto mb-14 rounded-xl overflow-hidden" style={{ border: "1px solid var(--color-border)" }}>
              <embed
                src={content.resume.pdf}
                type="application/pdf"
                style={{ width: "100%", height: "70vh", minHeight: "480px" }}
              />
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-10 mb-14">
            {/* Work experience */}
            <div>
              <h3 className="text-lg font-display font-semibold mb-5 flex items-center gap-2" style={{ color: "var(--color-text-primary)" }}>
                <Icon name="briefcase" className="inline w-4 h-4 mr-1 -mt-0.5" /> Work Experience
              </h3>
              <div className="relative pl-8">
                <div className="timeline-line" style={{ left: "10px" }} />
                {work.map((item, i) => (
                  <ResumeItem key={item.id} item={item} index={i} visible={visible} />
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 className="text-lg font-display font-semibold mb-5 flex items-center gap-2" style={{ color: "var(--color-text-primary)" }}>
                <Icon name="graduation-cap" className="inline w-4 h-4 mr-1 -mt-0.5" /> Education
              </h3>
              <div className="relative pl-8">
                <div className="timeline-line" style={{ left: "10px" }} />
                {education.map((item, i) => (
                  <ResumeItem key={item.id} item={item} index={i} visible={visible} />
                ))}
              </div>
            </div>
          </div>

          {/* Skills summary */}
          <div className="mb-14">
            <h3 className="text-lg font-display font-semibold mb-5 text-center" style={{ color: "var(--color-text-primary)" }}>
              <Icon name="wrench" className="inline w-4 h-4 mr-1 -mt-0.5" /> Core Skills
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {content.skills.map((cat) => (
                <div key={cat.category} className="card p-4">
                  <p className="text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: "var(--color-text-primary)" }}>
                    <Icon name={cat.icon} className="w-4 h-4" style={{ color: "var(--color-accent)" }} /> {cat.category}
                  </p>
                  <ul className="flex flex-col gap-1">
                    {cat.items.map((s) => (
                      <li key={s.name} className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
                        {s.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-5 text-center" style={{ color: "var(--color-text-primary)" }}>
              <Icon name="scroll-text" className="inline w-4 h-4 mr-1 -mt-0.5" /> Certifications
            </h3>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {certs.map((cert) => (
                <div
                  key={cert.id}
                  className="card flex flex-col gap-3 p-6"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ backgroundColor: cert.colorBg, border: `1px solid ${cert.colorBorder}` }}
                  >
                    <Icon name={cert.logo} className="w-5 h-5" style={{ color: cert.color }} />
                  </div>
                  <h4 className="font-display font-semibold text-sm leading-snug" style={{ color: "var(--color-text-primary)" }}>
                    {cert.title}
                  </h4>
                  <p className="text-xs font-medium" style={{ color: cert.color }}>{cert.issuer}</p>
                  <p className="text-xs font-mono" style={{ color: "var(--color-text-muted)" }}>Issued: {cert.date}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-2 py-0.5 rounded-md"
                        style={{ backgroundColor: "var(--color-chip-bg)", border: "1px solid var(--color-chip-border)", color: "var(--color-text-secondary)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-auto pt-1">
                    <a
                      href={cert.download}
                      download
                      className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg transition-all duration-200 hover:opacity-80"
                      style={{ backgroundColor: cert.colorBg, border: `1px solid ${cert.colorBorder}`, color: cert.color }}
                    >
                      Download
                    </a>
                    {cert.credly && (
                      <a
                        href={cert.credly}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg transition-all duration-200 hover:opacity-80"
                        style={{ backgroundColor: "rgba(255,176,32,0.12)", border: "1px solid rgba(255,176,32,0.35)", color: "#ffb020" }}
                      >
                        <Icon name="award" className="inline w-3.5 h-3.5 mr-1 -mt-0.5" /> Badge
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center flex flex-wrap items-center justify-center gap-3">
              <a href="/certificates" className="btn-primary inline-flex items-center gap-2">
                <Icon name="scroll-text" className="inline w-4 h-4 mr-1 -mt-0.5" /> View Full Certificate Gallery
              </a>
              <a
                href="https://www.credly.com/users/gerald-gumahad/badges#credly"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center gap-2"
              >
                <Icon name="award" className="inline w-4 h-4 mr-1 -mt-0.5" /> Verify All Badges on Credly
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResumeItem({
  item,
  index,
  visible,
}: {
  item: typeof content.experience[number];
  index: number;
  visible: boolean;
}) {
  return (
    <div
      className="relative mb-7"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-20px)",
        transition: `all 0.5s ease ${index * 100}ms`,
      }}
    >
      <div
        className="absolute -left-8 top-1 w-4 h-4 rounded-full"
        style={{ border: "2px solid rgba(59,158,255,0.6)", backgroundColor: "var(--color-bg)" }}
      />
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
          <h4 className="font-display font-semibold text-sm" style={{ color: "var(--color-text-primary)" }}>
            {item.role}
          </h4>
          <span
            className="text-xs font-mono px-2 py-0.5 rounded-full flex-shrink-0 w-fit"
            style={{ backgroundColor: "rgba(59,158,255,0.1)", border: "1px solid rgba(59,158,255,0.2)", color: "var(--color-accent)" }}
          >
            {item.period}
          </span>
        </div>
        <p className="text-xs font-medium mb-2" style={{ color: "var(--color-accent)" }}>{item.company}</p>
        <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
          {item.description}
        </p>
      </div>
    </div>
  );
}
