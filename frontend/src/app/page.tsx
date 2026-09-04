import SmoothScroll from "@/components/SmoothScroll";
import WhySection from "@/components/WhySection";
import AboutSection, { TechnicalArsenal } from "@/components/AboutSection";
import ContactSection, { Footer } from "@/components/ContactSection";
import CursorRipple from "@/components/CursorRipple";
import ChatWidget from "@/components/ChatWidget";
import SiteHeader from "@/components/SiteHeader";
import TestimonialSection from "@/components/TestimonialSection";

export default function Home() {
  return (
    <SmoothScroll>
      <CursorRipple />
      <main className="min-h-screen bg-white">
        <SiteHeader />
        <AboutSection />
        <TechnicalArsenal />
        <WhySection />
        <TestimonialSection />
        <ContactSection />
        <Footer />
      </main>
      <ChatWidget />
    </SmoothScroll>
  );
}
