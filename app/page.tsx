import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/ui/Footer";

/* ============================================================
   PAGE LAYOUT
   Add or remove sections by including/excluding them here.
   All content comes from /data/content.json — no need to touch
   individual components for text/data changes.
   ============================================================ */
export default function Home() {
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
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
