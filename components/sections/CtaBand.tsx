"use client";

import Link from "next/link";
import content from "@/data/content.json";

/* ============================================================
   CTA BAND — closes the Home page, routes to /contact
   ============================================================ */
export default function CtaBand() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{ background: "radial-gradient(600px circle at 50% 0%, rgba(59,158,255,0.08), transparent 70%)" }}
      />
      <div className="container-max relative z-10 text-center max-w-2xl mx-auto">
        <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-primary">
          Have a site that needs to rank, or data that needs a home?
        </h2>
        <p className="text-base mb-8" style={{ color: "var(--color-text-secondary)" }}>
          I'm open to SEO and data analyst roles, freelance audits, and dashboard builds.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/contact" className="btn-primary">
            Get in touch
          </Link>
          <a href={`mailto:${content.contact.email}`} className="btn-outline">
            {content.contact.email}
          </a>
        </div>
      </div>
    </section>
  );
}
