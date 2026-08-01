"use client";

import { useEffect, useRef } from "react";

/* ============================================================
   AMBIENT BACKGROUND — full-bleed photo + subtle particle
   network overlay.
   The attached analytics-dashboard photo replaces the old
   "+" grid. A dark #051523-tinted overlay sits on top of the
   photo to keep text legible, then the particle-network canvas
   layers on top of that — giving a "live data on top of a
   dashboard backdrop" feel.
   ============================================================ */
export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let t = 0;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const LINK_DIST = 140;

    const nodes = Array.from({ length: 55 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.16,
      vy: (Math.random() - 0.5) * 0.16,
      r: 1 + Math.random() * 1.4,
    }));

    function waveY(x: number, phase: number, baseline: number) {
      return (
        baseline +
        Math.sin(x * 0.006 + phase) * 30 +
        Math.sin(x * 0.014 + phase * 1.7) * 14 +
        Math.sin(x * 0.03 + phase * 0.5) * 7
      );
    }

    function drawWave(baseline: number, phase: number, color: string, glow: number) {
      if (!ctx) return;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 8) {
        const y = waveY(x, phase, baseline);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.3;
      ctx.shadowColor = color;
      ctx.shadowBlur = glow;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    function draw() {
      if (!ctx) return;
      const isLight = document.documentElement.classList.contains("light");
      ctx.clearRect(0, 0, w, h);

      // Flowing chart lines — accent blue at lower opacity in light mode so
      // they read as a subtle wash instead of a heavy dark streak.
      const waveOpacity1 = isLight ? 0.10 : 0.18;
      const waveOpacity2 = isLight ? 0.06 : 0.10;
      drawWave(h * 0.30, t, `rgba(59, 158, 255, ${waveOpacity1})`, isLight ? 4 : 10);
      drawWave(h * 0.70, t + 2.2, `rgba(74, 160, 232, ${waveOpacity2})`, isLight ? 3 : 7);

      // Particle network — dimmer, smaller nodes in light mode so they sit
      // as a quiet texture rather than competing with page content.
      const linkOpacity = isLight ? 0.08 : 0.14;
      const nodeOpacity = isLight ? 0.28 : 0.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST) {
            ctx.strokeStyle = `rgba(59, 158, 255, ${(1 - dist / LINK_DIST) * linkOpacity})`;
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.fillStyle = `rgba(74, 160, 232, ${nodeOpacity})`;
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
        if (!reduced) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
        }
      });

      if (!reduced) {
        t += 0.005;
        raf = requestAnimationFrame(draw);
      }
    }
    draw();

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  return (
    <>
      {/* Hero background photo — full-bleed, fixed, visible in BOTH themes.
          The overlay on top of it (below) is what changes per theme, not
          the photo itself. */}
      <div
        className="hero-bg-photo fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "url('/images/hero-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
        aria-hidden="true"
      />
      {/* Dark-mode overlay — heavy near-black tint so text stays legible
          over the photo (dark mode only) */}
      <div
        className="hero-overlay-dark fixed inset-0 pointer-events-none z-0"
        style={{
          background: "linear-gradient(180deg, rgba(3,14,26,0.93) 0%, rgba(3,14,26,0.87) 35%, rgba(3,14,26,0.94) 100%)",
        }}
        aria-hidden="true"
      />
      {/* Light-mode overlay — the same photo, washed with a soft white
          scrim (heavier top/bottom, lighter through the middle so a hint
          of the photo's blue survives) plus faint blue/gold accent glows
          echoing the brand palette, so text stays dark-on-white legible
          without the page going flat and textureless (light mode only) */}
      <div
        className="hero-overlay-light fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.90) 0%, rgba(238,244,250,0.80) 40%, rgba(255,255,255,0.93) 100%), radial-gradient(ellipse 80% 60% at 15% 0%, rgba(59,158,255,0.10) 0%, transparent 55%), radial-gradient(ellipse 70% 50% at 100% 20%, rgba(255,176,32,0.08) 0%, transparent 55%)",
        }}
        aria-hidden="true"
      />
      {/* Particle-network canvas on top — stays mounted in both themes,
          it self-adjusts opacity based on the active theme above */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        aria-hidden="true"
      />
    </>
  );
}
