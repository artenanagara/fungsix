import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import WorkSection from "./components/WorkSection";
import WhyChooseUs from "./components/WhyChooseUs";
import TestimonialsSection from "./components/TestimonialsSection";
import Footer from "./components/Footer";
import FooterWrapper from "./components/FooterWrapper";
import BrandStatement from "./components/BrandStatement";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <main>
      <div className="relative" style={{ zIndex: 1 }}>
        <Hero />

        <BrandStatement />
        <div id="about">
          <AboutSection />
        </div>
        <div id="services">
          <ServicesSection />
        </div>
        <div id="work">
          <WorkSection />
        </div>
        <div id="why-choose-us">
          <WhyChooseUs />
        </div>
        <div id="testimonials">
          <TestimonialsSection />
        </div>
      </div>

      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </main>
  );
}
