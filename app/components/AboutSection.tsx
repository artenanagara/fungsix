"use client";

import { useEffect, useState, useRef } from "react";
import Reveal from "./Reveal";
import { useInView } from "framer-motion";



const STATS = [
  { num: "25+", label: "Leading Brands" },
  { num: "100+", label: "Projects Delivered" },
  { num: "10+", label: "Years of Experience" },
];

const LOGOS = Array(7).fill("LOGO");

function AnimatedStat({ value }: { value: string }) {
  const target = parseInt(value, 10);
  const suffix = value.replace(/[0-9]/g, "");

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const duration = 2500; // 2.5 seconds counting

    function update(time: number) {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (progress < 1) {
        // Ease out cubic
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentBase = easeProgress * target;

        // Random jitter that decays as progress reaches 1
        // (Math.random() is 0 to 1). We make it flutter wildly.
        const jitterMagnitude = (1 - progress) * target * 0.8;
        const jitter = (Math.random() * jitterMagnitude) - (jitterMagnitude / 2);

        let finalVal = Math.floor(currentBase + jitter);

        // Ensure it doesn't dip below 0
        if (finalVal < 0) finalVal = 0;

        setDisplay(finalVal.toString());
        requestAnimationFrame(update);
      } else {
        setDisplay(target.toString());
      }
    }

    requestAnimationFrame(update);
  }, [isInView, target]);

  return (
    <span
      ref={ref}
      className="font-manrope font-bold text-white leading-none"
      style={{ fontSize: "clamp(56px, 8vw, 100px)" }}
    >
      {display}{suffix}
    </span>
  );
}

export default function AboutSection() {
  return (
    <>
      {/* ── Two-column content ─────────────────────────────── */}
      <section className="bg-white px-4 md:px-20 relative z-10 shadow-2xl" style={{ paddingTop: "clamp(60px, 8vw, 100px)", paddingBottom: "clamp(60px, 8vw, 100px)" }}>
        <div className="flex flex-col md:flex-row" style={{ gap: "clamp(40px, 6vw, 100px)", alignItems: "flex-start" }}>

          {/* Left */}
          <div className="flex flex-col w-full md:w-auto md:flex-shrink-0" style={{ gap: "32px", maxWidth: "450px" }}>
            <Reveal delay={0.1}>
              <span
                className="font-manrope font-semibold text-[#df2b2b] uppercase"
                style={{ fontSize: "14px", letterSpacing: "2.8px" }}
              >
                About Us
              </span>
            </Reveal>
            <Reveal delay={0.2}>
              <h2
                className="font-manrope font-bold text-[#111] leading-[1.4]"
                style={{ fontSize: "clamp(36px, 5vw, 56px)" }}
              >
                Planners<br />That Implement.
              </h2>
            </Reveal>
            <Reveal delay={0.3}>
              <p
                className="font-manrope font-medium text-[#111]/70 leading-[1.6]"
                style={{ fontSize: "20px", maxWidth: "324px" }}
              >
                FUNGSI X was built on one belief that strategy without execution
                is just a document.
              </p>
            </Reveal>
          </div>

          {/* Right */}
          <div className="flex flex-col w-full" style={{ gap: "32px" }}>
            <Reveal delay={0.4}>
              <div
                style={{
                  width: "100%",
                  height: "clamp(220px, 30vw, 458px)",
                  background: "linear-gradient(135deg, #1a1a2e 0%, #DF2B2B 100%)",
                  display: "block",
                }}
              />
            </Reveal>
            <div className="flex flex-col" style={{ gap: "24px" }}>
              {[
                "We are an integrated creative and production agency based in Jakarta. We don't believe in hand-offs or middlemen — we own the entire process from strategy to execution.",
                "From immersive brand activations and large-scale corporate events to digital campaigns and physical builds, every project is handled by one team, end to end.",
                "Because for us, the work isn't done until the impact is felt.",
              ].map((text, i) => (
                <Reveal key={i} delay={0.1 + i * 0.1}>
                  <p
                    className="font-manrope font-medium text-[#111]/70 leading-[1.6]"
                    style={{ fontSize: "20px" }}
                  >
                    {text}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── Stats + Logo bar ───────────────────────────────── */}
      <div className="bg-[#111] relative z-10">
        {/* Stats row */}
        <div
          className="flex flex-col md:flex-row px-4 md:px-20"
          style={{ paddingTop: "60px", paddingBottom: "60px", gap: "clamp(24px, 4vw, 48px)" }}
        >
          {STATS.map((s, i) => (
            <Reveal key={i} delay={0.1 + i * 0.1} className="flex-1">
              <div
                className="flex flex-col items-center"
                style={{ gap: "8px" }}
              >
                <AnimatedStat value={s.num} />
                <span
                  className="font-manrope font-semibold text-white/70 leading-[1.2]"
                  style={{ fontSize: "20px" }}
                >
                  {s.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Logo ticker */}
        <div className="relative overflow-hidden" style={{ paddingBottom: "60px" }}>
          {/* Left fade */}
          <div
            className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
            style={{ width: "120px", background: "linear-gradient(to right, #111, transparent)" }}
          />
          {/* Right fade */}
          <div
            className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
            style={{ width: "120px", background: "linear-gradient(to left, #111, transparent)" }}
          />
          <div className="flex items-center animate-ticker" style={{ gap: "64px", width: "max-content" }}>
            {[...LOGOS, ...LOGOS].map((l, i) => (
              <span
                key={i}
                className="font-manrope font-extrabold text-white/50 leading-none shrink-0"
                style={{ fontSize: "48px" }}
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
