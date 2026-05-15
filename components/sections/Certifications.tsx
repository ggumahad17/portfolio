"use client";

import { useEffect, useRef, useState } from "react";

/* ============================================================
   CERTIFICATIONS SECTION
   To add a new certificate:
   1. Add the PDF to /public/files/
   2. Add a new entry to the certs array below
   ============================================================ */

const certs = [
  {
    id: 1,
    title: "Google Data Analytics Professional Certificate",
    issuer: "Google / Coursera",
    date: "March 8, 2026",
    logo: "🎓",
    color: "#4285F4",
    colorBg: "rgba(66,133,244,0.08)",
    colorBorder: "rgba(66,133,244,0.25)",
    description:
      "Completed the 8-course professional certificate covering data cleaning, analysis, visualization, and tools including spreadsheets, SQL, Tableau, and R.",
    tags: ["Data Analytics", "SQL", "Tableau", "R", "Spreadsheets"],
    download: "/files/google-data-analytics-certificate.pdf",
    credly: "https://www.credly.com/go/GVay4CN1",
    featured: true,
  },
  {
    id: 2,
    title: "Data Analytics Essentials",
    issuer: "Cisco Networking Academy",
    date: "March 23, 2026",
    logo: "📊",
    color: "#00bceb",
    colorBg: "rgba(0,188,235,0.08)",
    colorBorder: "rgba(0,188,235,0.25)",
    description:
      "Credential for completing Data Analytics Essentials — covering the data analytics process, data characteristics, statistical techniques, and hands-on labs using Excel, SQL, and Tableau.",
    tags: ["Data Analytics", "Excel", "SQL", "Tableau", "Statistics"],
    download: "/files/data-analytics-essentials-certificate.pdf",
    credly: null,
    featured: true,
  },
  {
    id: 3,
    title: "HTML Essentials",
    issuer: "Cisco Networking Academy",
    date: "May 13, 2026",
    logo: "🌐",
    color: "#00c8b4",
    colorBg: "rgba(0,200,180,0.08)",
    colorBorder: "rgba(0,200,180,0.25)",
    description:
      "Credential for completing HTML Essentials — covering structured HTML documents, semantic markup, forms, accessibility, and the role of HTML in the web development process.",
    tags: ["HTML", "Web Development", "Accessibility", "CSS", "JavaScript"],
    download: "/files/html-essentials-certificate.pdf",
    credly: null,
    featured: false,
  },
];

export default function Certifications() {
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

  return (
    <section
      id="certifications"
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
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="section-tag mx-auto w-fit">
              <span>05</span>
              <span>Certifications</span>
            </div>
            <h2 className="section-heading">
              Credentials &{" "}
              <span className="text-gradient">Achievements</span>
            </h2>
            <p
              className="max-w-lg mx-auto text-base"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Professional certifications that validate my skills in data
              analytics and web technologies.
            </p>
          </div>

          {/* Cert cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {certs.map((cert, i) => (
              <CertCard
                key={cert.id}
                cert={cert}
                index={i}
                visible={visible}
              />
            ))}
          </div>

          {/* Credly CTA */}
          <div className="mt-10 text-center">
            <a
              href="https://www.credly.com/go/GVay4CN1"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex items-center gap-2"
            >
              <span>🏅</span>
              Verify My Badges on Credly
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M224,104a8,8,0,0,1-16,0V59.32l-82.34,82.34a8,8,0,0,1-11.32-11.32L196.68,48H152a8,8,0,0,1,0-16h64a8,8,0,0,1,8,8Zm-40,24a8,8,0,0,0-8,8v72H48V80h72a8,8,0,0,0,0-16H48A16,16,0,0,0,32,80V208a16,16,0,0,0,16,16H176a16,16,0,0,0,16-16V136A8,8,0,0,0,184,128Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function CertCard({
  cert,
  index,
  visible,
}: {
  cert: (typeof certs)[number];
  index: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="card flex flex-col gap-4 p-6 transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.5s ease ${index * 120}ms`,
        borderColor: hovered ? cert.colorBorder : "rgba(18,45,92,0.6)",
        boxShadow: hovered
          ? `0 8px 40px ${cert.colorBg}`
          : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{
            backgroundColor: cert.colorBg,
            border: `1px solid ${cert.colorBorder}`,
          }}
        >
          {cert.logo}
        </div>
        {cert.featured && (
          <span
            className="text-xs font-mono px-2 py-0.5 rounded-full flex-shrink-0"
            style={{
              backgroundColor: "rgba(240,165,0,0.1)",
              border: "1px solid rgba(240,165,0,0.3)",
              color: "#f0a500",
            }}
          >
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div>
        <h3
          className="font-display font-semibold text-base mb-1 leading-snug transition-colors duration-300"
          style={{
            color: hovered ? cert.color : "var(--color-text-primary)",
          }}
        >
          {cert.title}
        </h3>
        <p
          className="text-xs font-medium mb-1"
          style={{ color: cert.color }}
        >
          {cert.issuer}
        </p>
        <p
          className="text-xs font-mono mb-3"
          style={{ color: "var(--color-text-muted)" }}
        >
          Issued: {cert.date}
        </p>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {cert.description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {cert.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-mono px-2 py-0.5 rounded-md"
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

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2 mt-auto pt-1">
        {/* Download certificate */}
        <a
          href={cert.download}
          download
          className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg transition-all duration-200 hover:opacity-80"
          style={{
            backgroundColor: cert.colorBg,
            border: `1px solid ${cert.colorBorder}`,
            color: cert.color,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M224,152v56a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V152a8,8,0,0,1,16,0v56H208V152a8,8,0,0,1,16,0Zm-101.66,5.66a8,8,0,0,0,11.32,0l40-40a8,8,0,0,0-11.32-11.32L136,132.69V40a8,8,0,0,0-16,0v92.69L93.66,106.34a8,8,0,0,0-11.32,11.32Z" />
          </svg>
          Download
        </a>

        {/* Credly badge — only if available */}
        {cert.credly && (
          <a
            href={cert.credly}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg transition-all duration-200 hover:opacity-80"
            style={{
              backgroundColor: "rgba(240,165,0,0.1)",
              border: "1px solid rgba(240,165,0,0.3)",
              color: "#f0a500",
            }}
          >
            <span>🏅</span>
            View Badge
          </a>
        )}
      </div>
    </div>
  );
}
