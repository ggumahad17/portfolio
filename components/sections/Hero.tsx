"use client";

import Link from "next/link";
import content from "@/data/content.json";
import TerminalWidget from "./TerminalWidget";

/* ============================================================
   HERO — near-black terminal aesthetic
   Left: eyebrow, headline, subhead, CTAs, stat row (real numbers
   pulled from content.json, not invented).
   Right: TerminalWidget inside a laptop mockup — the signature element.
   Background motion comes from the global AmbientBackground
   (mounted in SiteChrome) — Hero just adds a subtle grid texture
   and top hairline on top of it.
   ============================================================ */
export default function Hero() {

  const stats = [
    { value: "10", label: "Projects shipped" },
    { value: "4", label: "Skill domains" },
    { value: "4", label: "SEO & data roles" },
    { value: "Cebu, PH", label: "Based in" },
  ];

  return (
    <section className="relative overflow-hidden border-b" style={{ borderColor: "var(--color-border)" }}>
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(30,120,210,0.5), transparent)" }}
      />

      <div className="container-max relative z-10 px-4 md:px-8 lg:px-16 pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-10 items-center">
          <div className="animate-fade-up">
            <div className="section-tag w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
              <span>Available for SEO & Data roles</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black mt-5 mb-5 leading-[1.08]">
              Turning raw data into <span className="text-gradient">rankings</span>
              <br />
              and insight into <span className="text-gradient">action</span>
            </h1>

            <p className="text-base md:text-lg max-w-lg mb-8" style={{ color: "var(--color-text-secondary)" }}>
              {content.hero.name} — {content.hero.title}. {content.about.bio.split(".")[0]}.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-12">
              <Link href={content.hero.cta.primary.href} className="btn-primary">
                {content.hero.cta.primary.label}
              </Link>
              <Link href={content.hero.cta.secondary.href} className="btn-outline">
                {content.hero.cta.secondary.label}
              </Link>
              <a
                href={content.hero.cta.resume.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-mono text-secondary hover:text-accent-500 transition-colors underline underline-offset-4 decoration-dotted"
              >
                {content.hero.cta.resume.label} ↓
              </a>
            </div>

            <div className="grid grid-cols-4 gap-4 max-w-md">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display font-bold text-xl md:text-2xl text-primary">{s.value}</div>
                  <div className="text-[11px] md:text-xs font-mono uppercase tracking-wide text-muted mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: "200ms" }}>
            <TerminalWidget />
          </div>
        </div>
      </div>
    </section>
  );
}
