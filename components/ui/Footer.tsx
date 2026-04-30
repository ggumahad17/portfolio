"use client";

import content from "@/data/content.json";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="py-8 px-4 md:px-8 lg:px-16"
      style={{
        borderTop: "1px solid rgba(18,45,92,0.5)",
        backgroundColor: "rgba(4,13,26,0.8)",
      }}
    >
      <div className="container-max flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src="/images/logo.webp"
            alt="GG Portfolio Logo"
            style={{ height: "28px", width: "auto" }}
          />
          <span
            className="text-sm font-mono"
            style={{ color: "var(--color-text-muted)" }}
          >
            — SEO & Data Analyst
          </span>
        </div>

        <p
          className="text-xs font-mono text-center"
          style={{ color: "var(--color-text-muted)" }}
        >
          © {year} Gerald M. Gumahad · Cebu City, Philippines
        </p>

        <a
          href={`mailto:${content.contact.email}`}
          className="text-xs font-mono transition-colors duration-200"
          style={{ color: "var(--color-text-muted)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#00c8b4")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
        >
          {content.contact.email}
        </a>
      </div>
    </footer>
  );
}
