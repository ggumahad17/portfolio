"use client";

import { useEffect, useRef, useState } from "react";
import content from "@/data/content.json";
import Icon from "@/components/ui/Icon";

/* ============================================================
   WHAT I DO — service/domain cards on Home
   Pulled directly from content.json skill categories, so this
   never drifts out of sync with the real /skills page.
   ============================================================ */
export default function WhatIDo() {
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

  const blurbs: Record<string, string> = {
    "SEO & Content": "Keyword research, on-page fixes, and audits that move real rankings — not vanity metrics.",
    "Data & Analytics": "Turning raw spreadsheets and event data into dashboards people actually act on.",
    "CMS & Tools": "Shipping and maintaining WordPress sites, from page speed to on-site structure.",
    "Project Management": "Keeping cross-functional work — reporting, client comms, process — moving on schedule.",
  };

  return (
    <section id="what-i-do" className="section-padding border-b" style={{ borderColor: "var(--color-border)" }}>
      <div className="container-max" ref={ref}>
        <div className="transition-all duration-700" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)" }}>
          <div className="section-tag w-fit"><Icon name="compass" className="w-3.5 h-3.5" /><span>what-i-do</span></div>
          <h2 className="section-heading">Where I <span className="text-gradient">add value</span></h2>
          <p className="max-w-xl text-base mb-10" style={{ color: "var(--color-text-secondary)" }}>
            Four domains, one habit in common: measure first, then change something.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {content.skills.map((cat, i) => (
              <div
                key={cat.category}
                className="card card-hover p-6 transition-all duration-500"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(20px)",
                  transitionDelay: `${i * 90}ms`,
                }}
              >
                <div className="mb-4"><Icon name={cat.icon} className="w-7 h-7" style={{ color: "var(--color-accent)" }} /></div>
                <h3 className="font-display font-semibold text-lg mb-2 text-primary">{cat.category}</h3>
                <p className="text-sm text-secondary mb-4">{blurbs[cat.category] ?? ""}</p>
                <div className="flex flex-wrap gap-1.5">
                  {cat.items.slice(0, 3).map((item) => (
                    <span key={item.name} className="text-[11px] font-mono px-2 py-1 rounded border" style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}>
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
