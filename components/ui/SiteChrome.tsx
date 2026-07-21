"use client";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ChatWidget from "@/components/ui/ChatWidget";

/* ============================================================
   SITE CHROME
   Wraps every page: background grid, Navbar, Footer, ChatWidget.
   Lives in the root layout so it persists across route changes
   instead of being re-declared on every page.
   ============================================================ */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen" style={{ backgroundColor: "var(--color-bg)" }}>
      {/* Background grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(18,45,92,0.4) 0%, transparent 60%),
            linear-gradient(rgba(18,45,92,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(18,45,92,0.07) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 60px 60px, 60px 60px",
        }}
      />

      <div className="relative z-10">
        <Navbar />
        {children}
        <Footer />
        <ChatWidget />
      </div>
    </main>
  );
}
