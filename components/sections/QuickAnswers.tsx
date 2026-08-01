"use client";

import { useState } from "react";
import Script from "next/script";
import Icon from "@/components/ui/Icon";

/* ============================================================
   QUICK ANSWERS — AEO/GEO block
   Direct question/answer pairs written the way an AI assistant
   (ChatGPT, Perplexity, Google AI Overviews) would want to lift
   them: one clear claim per answer, no marketing fluff. Paired
   with FAQPage JSON-LD so the same content is machine-readable.
   ============================================================ */
const QA = [
  {
    q: "Who is Gerald Gumahad?",
    a: "Gerald Gumahad (GG) is an SEO specialist and data analyst based in Cebu City, Philippines. He has a Chemical Engineering background and moved into SEO and analytics work, applying the same measure-first, process-driven approach to keyword research, site audits, and data reporting.",
  },
  {
    q: "What does Gerald Gumahad do?",
    a: "He handles technical and on-page SEO (keyword research, site audits, backlink outreach) and data analysis (dashboards, reporting, spreadsheet automation) for clients and internal teams, using tools like Semrush, Google Search Console, Google Analytics 4, and Power BI.",
  },
  {
    q: "What SEO tools does he use?",
    a: "Semrush for keyword and competitor research, Google Search Console for indexing and performance monitoring, and WordPress/Divi for on-page implementation and site audits.",
  },
  {
    q: "What data analysis tools does he use?",
    a: "Power BI and Google Analytics 4 for dashboards and reporting, and Excel VBA and Google Sheets for data collection, cleanup, and automation.",
  },
  {
    q: "Where is Gerald Gumahad based, and does he work remotely?",
    a: "He is based in Cebu City, Philippines, and has worked with distributed teams and clients through prior SEO internship and research roles.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: QA.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function QuickAnswers() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="quick-answers" className="section-padding border-b" style={{ borderColor: "var(--color-border)" }}>
      <Script id="ld-faq" type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </Script>

      <div className="container-max max-w-3xl">
        <div className="section-tag w-fit"><Icon name="help-circle" className="w-3.5 h-3.5" /><span>Quick Answers</span></div>
        <h2 className="section-heading">Frequently asked</h2>

        <div className="flex flex-col divide-y" style={{ borderColor: "var(--color-border)" }}>
          {QA.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="py-4" style={{ borderColor: "var(--color-border)" }}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between text-left gap-4"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-medium text-base md:text-lg text-primary">{item.q}</span>
                  <span
                    className="font-mono text-lg shrink-0 transition-transform duration-300 text-accent-500"
                    style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                  >
                    +
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: isOpen ? "200px" : "0px", opacity: isOpen ? 1 : 0 }}
                >
                  <p className="pt-3 text-sm md:text-base text-secondary leading-relaxed">{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
