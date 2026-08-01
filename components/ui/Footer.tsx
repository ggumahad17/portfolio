"use client";

import Link from "next/link";
import content from "@/data/content.json";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="pt-10 pb-8 px-4 md:px-8 lg:px-16"
      style={{
        borderTop: "1px solid var(--color-border)",
        backgroundColor: "var(--color-surface)",
      }}
    >
      <div className="container-max flex flex-col gap-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
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

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {content.nav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-mono transition-colors duration-200"
                style={{ color: "var(--color-text-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6"
          style={{ borderTop: "1px solid var(--color-border)" }}>
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
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
          >
            {content.contact.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
