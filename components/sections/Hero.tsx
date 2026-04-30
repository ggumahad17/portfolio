"use client";

import { useEffect, useRef } from "react";
import content from "@/data/content.json";

/* ============================================================
   HERO SECTION
   Content editable in /data/content.json → hero
   ============================================================ */
export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animated particle field
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: Array<{
      x: number; y: number; vx: number; vy: number; size: number; opacity: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 200, 180, ${p.opacity})`;
        ctx.fill();
      });

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(18, 45, 92, ${0.4 * (1 - dist / 120)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const { hero } = content;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,200,180,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 container-max section-padding text-center">
        {/* Status badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest mb-8 border"
          style={{
            backgroundColor: "rgba(0,200,180,0.08)",
            borderColor: "rgba(0,200,180,0.25)",
            color: "#00c8b4",
            animationDelay: "0s",
          }}
        >
          <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse-slow" />
          Available for Opportunities
        </div>

        {/* Name */}
        <h1
          className="font-display font-bold mb-4"
          style={{
            fontSize: "clamp(2.5rem, 8vw, 6rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: "var(--color-text-primary)",
          }}
        >
          {hero.name.split(" ").map((word, i) => (
            <span
              key={i}
              className={i === 1 ? "text-gradient" : ""}
              style={{ display: "inline-block", marginRight: "0.25em" }}
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Title */}
        <div
          className="flex items-center justify-center gap-3 mb-6"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {hero.title.split(" · ").map((t, i, arr) => (
            <span key={i} className="flex items-center gap-3">
              <span className="text-lg md:text-xl font-medium">{t}</span>
              {i < arr.length - 1 && (
                <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "#00c8b4" }} />
              )}
            </span>
          ))}
        </div>

        {/* Tagline */}
        <p
          className="text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {hero.tagline}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a href={hero.cta.primary.href} className="btn-primary text-base px-8 py-4">
            {hero.cta.primary.label}
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
              <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
            </svg>
          </a>
          <a href={hero.cta.secondary.href} className="btn-outline text-base px-8 py-4">
            {hero.cta.secondary.label}
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="flex flex-col items-center gap-2 animate-float">
          <span
            className="text-xs font-mono uppercase tracking-widest"
            style={{ color: "var(--color-text-muted)" }}
          >
            Scroll
          </span>
          <div
            className="w-5 h-8 rounded-full border-2 flex items-start justify-center p-1"
            style={{ borderColor: "rgba(0,200,180,0.3)" }}
          >
            <div
              className="w-1 h-2 rounded-full animate-bounce"
              style={{ backgroundColor: "#00c8b4" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
