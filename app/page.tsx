import Hero from "@/components/sections/Hero";
import WhatIDo from "@/components/sections/WhatIDo";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import QuickAnswers from "@/components/sections/QuickAnswers";
import ToolsMarquee from "@/components/sections/ToolsMarquee";
import CtaBand from "@/components/sections/CtaBand";

/* ============================================================
   HOME PAGE
   Hero (who you are + signature terminal) → What I Do (service
   domains) → Featured Projects (proof) → Quick Answers (AEO/GEO
   FAQ block) → Tools Marquee (scrolling tool strip) → CTA band
   → /contact.
   Full project list lives at /projects; full story + resume at
   /about; full skill breakdown at /skills.
   ============================================================ */
export default function Home() {
  return (
    <>
      <Hero />
      <WhatIDo />
      <FeaturedProjects />
      <QuickAnswers />
      <ToolsMarquee />
      <CtaBand />
    </>
  );
}
