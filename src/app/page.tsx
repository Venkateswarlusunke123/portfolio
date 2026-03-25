import NeuralGraphCanvas from "@/components/NeuralGraphCanvas";
import AuroraOrbs from "@/components/AuroraOrbs";
import MouseSpotlight from "@/components/MouseSpotlight";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <>
      {/* Scanline texture */}
      <div className="scanline-overlay" aria-hidden />

      {/* Background layers */}
      <AuroraOrbs />
      <NeuralGraphCanvas />
      <MouseSpotlight />

      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      {/* App */}
      <Navbar />
      <main style={{ cursor: "none" }}>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
