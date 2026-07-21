import Hero from "@/components/sections/Hero";
import FeaturedProjects from "@/components/sections/FeaturedProjects";

/* ============================================================
   HOME PAGE
   Hero (who you are + CTAs) + a featured-projects preview.
   Full project list lives at /projects; full story + resume
   at /about.
   ============================================================ */
export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
    </>
  );
}
