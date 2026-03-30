"use client";

import CursorX from "./CursorX";
import Reveal from "./Reveal";
import FeaturedWork from "./FeaturedWork";
import Navbar from "./Navbar";

export default function Hero() {
  return (
    <section
      className="relative bg-[#111]"
      style={{ minHeight: "clamp(600px, 100vh, 1291px)" }}
    >
      <div
        data-cursor-area
        className="absolute inset-x-0 top-0 overflow-hidden pointer-events-none hidden md:block"
        style={{ height: "811px", zIndex: 1 }}
      >
        <CursorX />
      </div>

      <Navbar />

      <div
        className="relative z-20 px-4 md:px-20 md:pb-20"
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

      <div
        className="absolute w-full hidden md:block"
        style={{ top: "811px", height: "321px", zIndex: 20 }}
      >
        <FeaturedWork />
      </div>

      <div className="block md:hidden relative z-20 px-4 mt-12 pb-10">
        <div className="flex flex-col gap-3">
          {[
            { title: "Pixar Fest × MRT Jakarta", tags: "Brand Activation · Exhibition Build", bg: "#162447" },
            { title: "Nike Air Max Day", tags: "Event Production · Social Campaign", bg: "#1a1a2e" },
            { title: "Google I/O Jakarta", tags: "Tech Event · Experiential Design", bg: "#0d1f0d" },
          ].map((p) => (
            <div key={p.title} className="flex items-center gap-3 p-3 border border-neutral/10">
              <div className="w-16 h-12 flex-shrink-0" style={{ background: p.bg }} />
              <div>
                <p className="font-manrope font-bold text-black text-sm leading-tight">{p.title}</p>
                <p className="font-manrope text-[#11111] text-xs mt-1">{p.tags}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hidden md:block" style={{ height: "321px" }} />
    </section>
  );
}