import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/Hero";
import ProjectsSection from "@/components/ProjectsSection";
import WhySection from "@/components/WhySection";
import AboutSection from "@/components/AboutSection";
import ContactSection, { Footer } from "@/components/ContactSection";
import CursorRipple from "@/components/CursorRipple";

export default function Home() {
  return (
    <SmoothScroll>
      <CursorRipple />
      <main className="min-h-screen bg-white">
        <Hero />
        <ProjectsSection />
        <WhySection />
        <AboutSection />
        <ContactSection />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
