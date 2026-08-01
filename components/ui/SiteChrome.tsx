"use client";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ChatWidget from "@/components/ui/ChatWidget";
import AmbientBackground from "@/components/ui/AmbientBackground";

/* ============================================================
   SITE CHROME
   Wraps every page: animated ambient background, faint grid
   texture, Navbar, Footer, ChatWidget. Lives in the root layout
   so it persists across route changes instead of being
   re-declared on every page.
   ============================================================ */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen" style={{ backgroundColor: "var(--color-bg)" }}>
      {/* Subtle vignette — darkens edges for depth (hidden in light mode) */}
      <div
        className="fixed inset-0 pointer-events-none z-0 dark-vignette"
        style={{
          background: "radial-gradient(ellipse 100% 80% at 50% 50%, transparent 50%, rgba(3,14,26,0.65) 100%)",
        }}
      />

      {/* Animated ambient background — data network + flowing chart glow */}
      <AmbientBackground />

      <div className="relative z-10">
        <Navbar />
        {children}
        <Footer />
        <ChatWidget />
      </div>
    </main>
  );
}
