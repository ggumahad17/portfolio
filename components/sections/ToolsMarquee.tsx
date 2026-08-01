"use client";

import {
  siSemrush,
  siGooglesearchconsole,
  siGoogleanalytics,
  siPagespeedinsights,
  siPowerbi,
  siMicrosoftexcel,
  siGooglesheets,
  siWordpress,
  siClickup,
  siAsana,
  siSlack,
  siMicrosoftteams,
  siGoogle,
} from "simple-icons";

/* ============================================================
   TOOLS MARQUEE — infinite auto-scrolling strip of real tool
   logos (via simple-icons, official brand SVG marks + colors).
   Icon-only, no text labels, per request. Respects reduced-motion.
   "Google Workspace" uses the generic Google mark — Workspace
   doesn't have its own distinct simple-icons entry.
   ============================================================ */
const TOOLS = [
  siSemrush,
  siGooglesearchconsole,
  siGoogleanalytics,
  siPagespeedinsights,
  siPowerbi,
  siMicrosoftexcel,
  siGooglesheets,
  siWordpress,
  siClickup,
  siAsana,
  siSlack,
  siMicrosoftteams,
  siGoogle,
];

function BrandLogo({ icon }: { icon: (typeof TOOLS)[number] }) {
  return (
    <div className="tools-marquee-badge" title={icon.title}>
      <svg
        role="img"
        viewBox="0 0 24 24"
        className="tools-marquee-icon"
        fill={`#${icon.hex}`}
        aria-label={icon.title}
      >
        <path d={icon.path} />
      </svg>
    </div>
  );
}

export default function ToolsMarquee() {
  return (
    <section className="py-14 border-b overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
      <div className="container-max mb-6">
        <p
          className="text-center text-xs font-mono uppercase tracking-widest"
          style={{ color: "var(--color-text-muted)" }}
        >
          Tools I work in daily
        </p>
      </div>

      <div className="tools-marquee-mask">
        <div className="tools-marquee-track">
          {[...TOOLS, ...TOOLS, ...TOOLS].map((icon, i) => (
            <BrandLogo key={`${icon.title}-${i}`} icon={icon} />
          ))}
        </div>
      </div>
    </section>
  );
}
