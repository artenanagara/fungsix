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
          style={{ minHeight: "1291px" }}
        >
          {/* Crosshair — z-index 1, below featured work (z-20) so image occludes it */}
          <div
            data-cursor-area
            className="absolute inset-x-0 top-0 overflow-hidden pointer-events-none"
            style={{ height: "811px", zIndex: 1 }}
          >
            <CursorX />
          </div>

          {/* ── Navbar ── */}
          <nav className="relative z-20 flex items-center justify-between px-20 py-5">
            <span className="font-manrope font-bold text-white leading-none" style={{ fontSize: "32px" }}>
              FUNGSIX
            </span>
            <ul className="flex items-center gap-8 font-manrope font-normal text-base text-white list-none m-0 p-0">
              {["Services", "Work", "About", "Contact Us"].map((item) => (
                <li key={item} className="cursor-pointer hover:opacity-70 transition-opacity">
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="font-manrope font-semibold text-white underline underline-offset-4 hover:opacity-70 transition-opacity"
              style={{ fontSize: "16px" }}
            >
              Let&apos;s Collaborate
            </a>
          </nav>

          {/* ── Headline + subtitle ── */}
          <div className="relative z-20 px-20" style={{ paddingTop: "162px" }}>
            <Reveal delay={0.2}>
              <h1
                className="font-manrope font-bold text-white leading-[1.2] whitespace-pre-wrap"
                style={{ fontSize: "100px", maxWidth: "1063px" }}
              >
                {`We build experiences \nthat drive real impact.`}
              </h1>
            </Reveal>
            <Reveal delay={0.4}>
              <p
                className="font-manrope font-normal text-white/70 leading-[1.6] mt-8"
                style={{ fontSize: "20px", maxWidth: "411px" }}
              >
                Integrated creative &amp; production agency that turns bold ideas
                into real, measurable experiences.
              </p>
            </Reveal>
          </div>

          {/* ── Featured work strip — z-20 so it sits above cursor X lines ── */}
          <div
            className="absolute w-full"
            style={{ top: "811px", height: "321px", zIndex: 20 }}
          >
            <FeaturedWork />
          </div>
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
