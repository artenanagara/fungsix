import CursorX from "./components/CursorX";
import Reveal from "./components/Reveal";
import FeaturedWork from "./components/FeaturedWork";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import WorkSection from "./components/WorkSection";
import WhyChooseUs from "./components/WhyChooseUs";
import TestimonialsSection from "./components/TestimonialsSection";
import Footer from "./components/Footer";
import FooterWrapper from "./components/FooterWrapper";
import BrandStatement from "./components/BrandStatement";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main>

      {/*
        All page content sits at z-index: 1 so it renders on top of the
        fixed footer (z-index: 0). As the user scrolls, the last section
        (Testimonials) slides up, revealing the footer from the top down.
      */}
      <div className="relative" style={{ zIndex: 1 }}>

        {/* ─── HERO ──────────────────────────────────────────────────────── */}
        <section
          className="relative bg-[#111]"
          style={{ minHeight: "clamp(600px, 100vh, 1291px)" }}
        >
          {/* Crosshair — desktop only, z-index 1, below featured work (z-20) */}
          <div
            data-cursor-area
            className="absolute inset-x-0 top-0 overflow-hidden pointer-events-none hidden md:block"
            style={{ height: "811px", zIndex: 1 }}
          >
            <CursorX />
          </div>

          {/* ── Navbar with hamburger menu ── */}
          <Navbar />

          {/* ── Headline + subtitle ── */}
          <div
            className="relative z-20 px-4 md:px-20"
            style={{ paddingTop: "clamp(60px, 10vw, 162px)" }}
          >
            <Reveal delay={0.2}>
              <h1
                className="font-manrope font-bold text-white leading-[1.2]"
                style={{ fontSize: "clamp(40px, 8vw, 100px)", maxWidth: "1063px" }}
              >
                We build experiences that drive real impact.
              </h1>
            </Reveal>
            <Reveal delay={0.4}>
              <p
                className="font-manrope font-normal text-white/70 leading-[1.6] mt-6 md:mt-8"
                style={{ fontSize: "clamp(16px, 2vw, 20px)", maxWidth: "411px" }}
              >
                Integrated creative &amp; production agency that turns bold ideas
                into real, measurable experiences.
              </p>
            </Reveal>
          </div>

          {/* ── Featured work strip — desktop only (absolute positioned layout) ── */}
          <div
            className="absolute w-full hidden md:block"
            style={{ top: "811px", height: "321px", zIndex: 20 }}
          >
            <FeaturedWork />
          </div>

          {/* ── Mobile featured work — simple card list ── */}
          <div className="block md:hidden relative z-20 px-4 mt-12 pb-10">
            <div className="flex flex-col gap-3">
              {[
                { title: "Pixar Fest × MRT Jakarta", tags: "Brand Activation · Exhibition Build", bg: "#162447" },
                { title: "Nike Air Max Day", tags: "Event Production · Social Campaign", bg: "#1a1a2e" },
                { title: "Google I/O Jakarta", tags: "Tech Event · Experiential Design", bg: "#0d1f0d" },
              ].map((p) => (
                <div key={p.title} className="flex items-center gap-3 p-3 border border-white/10">
                  <div className="w-16 h-12 flex-shrink-0" style={{ background: p.bg }} />
                  <div>
                    <p className="font-manrope font-bold text-white text-sm leading-tight">{p.title}</p>
                    <p className="font-manrope text-white/60 text-xs mt-1">{p.tags}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Spacer so hero is tall enough on desktop for FeaturedWork ── */}
          <div className="hidden md:block" style={{ height: "321px" }} />
        </section>

        {/* ─── BRAND STATEMENT ───────────────────────────────────────────── */}
        <BrandStatement />

        {/* ─── ABOUT ─────────────────────────────────────────────────────── */}
        <AboutSection />

        {/* ─── SERVICES ──────────────────────────────────────────────────── */}
        <ServicesSection />

        {/* ─── WORK PORTFOLIO ────────────────────────────────────────────── */}
        <WorkSection />

        {/* ─── WHY CHOOSE US ─────────────────────────────────────────────── */}
        <WhyChooseUs />

        {/* ─── TESTIMONIALS ──────────────────────────────────────────────── */}
        <TestimonialsSection />

      </div>

      {/* ─── FOOTER — fixed behind content, revealed as testimonials scrolls up */}
      <FooterWrapper>
        <Footer />
      </FooterWrapper>

    </main>
  );
}
