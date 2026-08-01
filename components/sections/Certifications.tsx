"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/Icon";

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
    logo: "graduation-cap",
    color: "#4285F4",
    colorBg: "rgba(66,133,244,0.08)",
    colorBorder: "rgba(66,133,244,0.25)",
    description:
      "Completed the 8-course professional certificate covering data cleaning, analysis, visualization, and tools including spreadsheets, SQL, Tableau, and R.",
    tags: ["Data Analytics", "SQL", "Tableau", "R", "Spreadsheets"],
    download: "/files/google-data-analytics-certificate.pdf",
    credly: "https://www.credly.com/users/gerald-gumahad/badges#credly",
    featured: true,
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
    logo: "globe",
    color: "var(--color-accent)",
    colorBg: "rgba(59,158,255,0.1)",
    colorBorder: "rgba(59,158,255,0.25)",
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
      style={{ backgroundColor: "var(--color-section-alt)" }}
    >
      {/* Top border accent */}
      <div
        className="absolute left-0 top-0 w-full h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-border), rgba(59,158,255,0.3), var(--color-border), transparent)",
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
              <span>01</span>
              <span>Certificates</span>
            </div>
            <h2 className="section-heading">
              Credentials &{" "}
              <span className="text-gradient">Continuous Learning</span>
            </h2>
            <p
              className="max-w-2xl mx-auto text-base leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              I treat certifications as proof of work, not just a line on a
              resume — each one below maps to skills I actually use day to
              day, from cleaning and modeling data to shipping accessible
              HTML. I picked Google's Data Analytics program and Cisco's
              Networking Academy courses specifically to pressure-test the
              fundamentals behind my SEO and analytics work: statistics,
              SQL, spreadsheets, and the front-end basics that make a page
              rank in the first place. Every credential here is downloadable
              as a PDF, and where the issuer supports it, verifiable
              independently on Credly.
            </p>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto mb-12">
            <StatBlock value={certs.length.toString()} label="Certificates" />
            <StatBlock
              value={Array.from(new Set(certs.map((c) => c.issuer))).length.toString()}
              label="Issuing Bodies"
            />
            <StatBlock
              value={Array.from(new Set(certs.flatMap((c) => c.tags))).length.toString()}
              label="Skills Covered"
            />
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

          {/* Why certifications */}
          <div className="max-w-2xl mx-auto mt-14 mb-10 text-center">
            <h3
              className="font-display font-semibold text-lg mb-3"
              style={{ color: "var(--color-text-primary)" }}
            >
              Why I keep earning these
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Coming from a chemical engineering background, I didn't have a
              formal computer science or marketing degree to point to — so
              I built one course at a time. Google's Data Analytics program
              gave me a repeatable process for turning raw data into a
              decision; Cisco's Data Analytics Essentials reinforced the
              statistics underneath it; and HTML Essentials made sure the
              technical SEO recommendations I give are grounded in how a
              browser and a crawler actually read a page. I'm continuing to
              add to this list as I take on new SEO and analytics work.
            </p>
          </div>

          {/* Credly CTA */}
          <div className="mt-10 text-center">
            <a
              href="https://www.credly.com/users/gerald-gumahad/badges#credly"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex items-center gap-2"
            >
              <Icon name="award" className="w-4 h-4" />
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

function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="card p-4 text-center">
      <p
        className="font-display font-bold text-2xl mb-1"
        style={{ color: "var(--color-accent)" }}
      >
        {value}
      </p>
      <p
        className="text-xs font-mono uppercase tracking-wide"
        style={{ color: "var(--color-text-muted)" }}
      >
        {label}
      </p>
    </div>
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
        borderColor: hovered ? cert.colorBorder : "var(--color-border)",
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
          <Icon name={cert.logo} className="w-6 h-6" style={{ color: cert.color }} />
        </div>
        {cert.featured && (
          <span
            className="text-xs font-mono px-2 py-0.5 rounded-full flex-shrink-0"
            style={{
              backgroundColor: "rgba(255,176,32,0.12)",
              border: "1px solid rgba(255,176,32,0.35)",
              color: "#ffb020",
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
              backgroundColor: "var(--color-chip-bg)",
              border: "1px solid var(--color-chip-border)",
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
              backgroundColor: "rgba(255,176,32,0.12)",
              border: "1px solid rgba(255,176,32,0.35)",
              color: "#ffb020",
            }}
          >
            <Icon name="award" className="w-4 h-4" />
            View Badge
          </a>
        )}
      </div>
    </div>
  );
}
