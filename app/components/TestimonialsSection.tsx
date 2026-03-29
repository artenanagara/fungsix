"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

const TESTIMONIALS = [
  {
    quote: "FUNGSI (X) is a dependable partner with a strong understanding of brand DNA. Their ideas are sharp, the execution is disciplined, and the team remains responsive even under tight timelines and high expectations. Working with them feels seamless—they think strategically and deliver with precision.",
    name: "Rachmat 'Reggy' Trilaksono",
    role: "Team Head Marketing — PUMA Indonesia",
    hasImage: true,
    bgColor: "#DF2B2B",
  },
  {
    quote: "Strong concepts, thoughtful design, and solid execution — even under extreme pressure.",
    name: "Rachmat 'Reggy' Trilaksono",
    role: "Team Head Marketing — PUMA Indonesia",
    hasImage: false,
  },
  {
    quote: "Their ability to translate abstract ideas into tangible, high-impact digital experiences is unmatched. We saw a completely transformed user retention after their redesign.",
    name: "Sarah Jenkins",
    role: "VP of Product — TechFlow",
    hasImage: true,
    bgColor: "#2B5ADF",
  },
  {
    quote: "Professional, wildly creative, and technically flawless. They didn't just meet our expectations; they completely redefined what we thought was possible for our brand.",
    name: "Marcus Thorne",
    role: "CEO — Thorne Logistics",
    hasImage: false,
  },
  {
    quote: "The sheer attention to detail in their animations and micro-interactions elevate our site from a standard corporate page to a premium digital journey.",
    name: "Elena Rostova",
    role: "Creative Director — Aura",
    hasImage: true,
    bgColor: "#1A7A4A",
  },
  {
    quote: "Communication was stellar throughout the entire project. They operated like an extension of our in-house team rather than an external agency.",
    name: "David Chen",
    role: "Head of Growth — FinStream",
    hasImage: false,
  },
  {
    quote: "We came to them with a broken user flow and a tight deadline. They delivered a masterpiece two days early. Absolute lifesavers and visionaries in the space.",
    name: "Amanda Pierce",
    role: "Founder — Elevate",
    hasImage: true,
    bgColor: "#9B51E0",
  },
  {
    quote: "They have a rare combination of raw artistic talent and deep engineering expertise. The performance of our new platform speaks entirely for itself.",
    name: "Jonathan Reyes",
    role: "CTO — Nexus Global",
    hasImage: false,
  },
  {
    quote: "Our branding finally matches the quality of our product. The visual identity they crafted has given us a massive competitive edge in the saturated market.",
    name: "Chloe Vance",
    role: "CMO — NovaTech",
    hasImage: true,
    bgColor: "#E8822A",
  },
  {
    quote: "From the initial discovery call to the final handoff, every step was handled with extreme professionalism. A world-class agency that executes flawlessly.",
    name: "Robert Sterling",
    role: "Operations Director — Apex",
    hasImage: false,
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Configuration for the slider math
  const cardWidth = 450;
  const gap = 32;

  const nextSlide = () => {
    // Assuming we want to stop when the last card is visible on screen.
    // We allow sliding up to length - 1 so the last card reaches the left edge.
    if (currentIndex < TESTIMONIALS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <section className="bg-[#222] w-full min-h-screen flex flex-col pt-20 pb-20 gap-16 relative overflow-hidden px-20">
      
      {/* Container for alignment */}
      <div className="w-full grid grid-cols-12 items-end relative">
        
        {/* Left Column: Title */}
        <div className="col-span-8 flex flex-col" style={{ gap: "24px" }}>
          <Reveal delay={0.1}>
            <span
              className="font-manrope font-semibold text-[#df2b2b] uppercase"
              style={{ fontSize: "14px", letterSpacing: "2.8px" }}
            >
              What They Said
            </span>
          </Reveal>
          <Reveal delay={0.2}>
            <h2
              className="font-manrope font-bold text-white leading-[1.2]"
              style={{ fontSize: "56px" }}
            >
              Don&apos;t take our<br/>word for it.
            </h2>
          </Reveal>
        </div>

        {/* Right Column: Next / Prev Controls */}
        <Reveal delay={0.3} className="col-span-4 flex justify-end">
          <div className="flex gap-4">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white transition-colors duration-300 flex-shrink-0"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex === TESTIMONIALS.length - 1}
              className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white transition-colors duration-300 flex-shrink-0"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </Reveal>
      </div>

      {/* Slider Viewer Window */}
      <div className="relative w-full">
        <motion.div
          className="flex items-start"
          style={{ gap: `${gap}px`, width: "max-content" }}
          initial={false}
          animate={{ x: -(currentIndex * (cardWidth + gap)) }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="flex flex-col justify-between"
              style={{
                width: `${cardWidth}px`,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.05)",
                padding: "16px",
                gap: "16px",
                borderRadius: "2px",
                maxHeight: "500px",
              }}
            >
              {/* Color placeholder replacing image */}
              {t.hasImage && (
                <div
                  style={{
                    width: "100%",
                    height: "220px",
                    background: t.bgColor ?? "#333",
                    borderRadius: "2px",
                    flexShrink: 0,
                  }}
                />
              )}
              
              <blockquote
                className="font-manrope font-normal text-white leading-[1.6]"
                style={{ fontSize: t.hasImage ? "16px" : "20px" }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              
              <div className="flex flex-col mt-auto" style={{ gap: "4px" }}>
                <p
                  className="font-manrope font-bold text-white leading-[1.4]"
                  style={{ fontSize: "14px" }}
                >
                  {t.name}
                </p>
                <p
                  className="font-manrope font-medium text-white/50 leading-[1.4]"
                  style={{ fontSize: "12px" }}
                >
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}
