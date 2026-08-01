"use client";

import { useEffect, useRef, useState } from "react";

/* ============================================================
   TERMINAL WIDGET — Hero signature element
   Types out real GG workflows (SEO audit, data pipeline, resume
   tool deploy) line by line, like a console session. Grounded
   in actual tools from content.json — Semrush, GSC, Power BI,
   ATSify — not generic "growth hacking" filler.
   Respects prefers-reduced-motion by rendering the final frame
   statically.
   ============================================================ */

type Line = { text: string; type: "cmd" | "out" | "ok" | "comment" };

const SESSIONS: Line[][] = [
  [
    { text: "gg run seo-audit --client=retail-outlets", type: "cmd" },
    { text: "> crawling site structure & metadata...", type: "out" },
    { text: "> cross-checking Semrush + Search Console", type: "out" },
    { text: "✓ 42 keyword opportunities found", type: "ok" },
    { text: "✓ 12 on-page fixes queued", type: "ok" },
  ],
  [
    { text: "gg build dashboard --source=inventory.xlsx", type: "cmd" },
    { text: "> parsing records via Excel VBA macro...", type: "out" },
    { text: "> pushing clean dataset to Power BI", type: "out" },
    { text: "✓ dashboard refreshed in 2.4s", type: "ok" },
    { text: "# from raw sheet to decision-ready view", type: "comment" },
  ],
  [
    { text: "gg deploy atsify --model=gemini", type: "cmd" },
    { text: "> parsing resume (pdf, docx, image)...", type: "out" },
    { text: "> matching against job description", type: "out" },
    { text: "✓ ATS score improved 61% → 89%", type: "ok" },
  ],
];

const TYPE_SPEED = 22;
const LINE_PAUSE = 260;
const SESSION_PAUSE = 1800;

export default function TerminalWidget() {
  const [reduced, setReduced] = useState(false);
  const [sessionIdx, setSessionIdx] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [doneLines, setDoneLines] = useState<Line[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
  }, []);

  useEffect(() => {
    if (reduced) {
      setDoneLines(SESSIONS[0]);
      return;
    }

    const session = SESSIONS[sessionIdx];
    const current = session[lineIdx];

    if (!current) {
      timeoutRef.current = setTimeout(() => {
        setDoneLines([]);
        setLineIdx(0);
        setCharIdx(0);
        setSessionIdx((s) => (s + 1) % SESSIONS.length);
      }, SESSION_PAUSE);
      return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
    }

    if (charIdx <= current.text.length) {
      timeoutRef.current = setTimeout(() => setCharIdx((c) => c + 1), current.type === "cmd" ? TYPE_SPEED : TYPE_SPEED * 0.6);
    } else {
      timeoutRef.current = setTimeout(() => {
        setDoneLines((prev) => [...prev, current]);
        setLineIdx((l) => l + 1);
        setCharIdx(0);
      }, LINE_PAUSE);
    }

    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charIdx, lineIdx, sessionIdx, reduced]);

  const session = SESSIONS[sessionIdx];
  const typingLine = session[lineIdx];
  const typedText = typingLine ? typingLine.text.slice(0, charIdx) : "";

  const colorFor = (type: Line["type"]) =>
    type === "cmd" ? "text-primary" : type === "ok" ? "text-accent-500" : type === "comment" ? "text-muted" : "text-secondary";

  return (
    <div className="device-laptop w-full max-w-md" role="img" aria-label="Laptop screen showing a terminal that runs an SEO audit, a data dashboard build, and an ATSify deploy — representative of Gerald Gumahad's day-to-day workflow.">
      {/* Laptop screen bezel */}
      <div className="device-laptop-bezel">
        <span className="device-laptop-cam" />
        <div
          className="rounded-md border overflow-hidden"
          style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}
        >
          {/* Terminal chrome */}
          <div
            className="flex items-center gap-2 px-4 py-2.5 border-b"
            style={{ borderColor: "var(--color-border)", background: "var(--color-surface-2)" }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-gold-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-accent-500/50" />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--color-text-muted)" }} />
            <span className="ml-2 text-xs font-mono text-muted">gg_terminal</span>
          </div>

          {/* Terminal body */}
          <div className="p-4 font-mono text-[13px] leading-relaxed min-h-[180px]">
            {doneLines.map((l, i) => (
              <div key={i} className={colorFor(l.type)}>
                {l.text}
              </div>
            ))}
            {typingLine && (
              <div className={colorFor(typingLine.type)}>
                {typedText}
                {!reduced && <span className="inline-block w-[7px] h-[13px] bg-accent-500 ml-0.5 align-middle animate-pulse" />}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Laptop base/hinge */}
      <div className="device-laptop-base" />
    </div>
  );
}
