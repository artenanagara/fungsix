"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ── Scatter layout — mathematically verified, zero overlaps
// Canvas: 1080px wide
interface WorkItem {
  title: string;
  tags: string;
  bg: string;
  w: number;
  h: number;
  x: number;
  y: number;
}

const ITEMS: WorkItem[] = [
  // A: x[0..640]   y[0..360]
  { title: "Pixar Fest × MRT Jakarta",  tags: "Brand Activation · Exhibition Build · Digital Campaign", bg: "#162447", w: 640, h: 360, x: 0,   y: 0   },
  // B: x[700..1000] y[0..520]  — no x-overlap with A (640<700) ✓
  { title: "PUMA Store Grand Opening",  tags: "Event Production · Brand Activation",                    bg: "#1f0d0d", w: 300, h: 520, x: 700, y: 0   },
  // C: x[0..560]   y[400..740] — no y-overlap with A (360<400) ✓, no x-overlap with B (560<700) ✓
  { title: "Nike Air Max Day",          tags: "Event Production · Social Campaign",                     bg: "#1A4A2E", w: 560, h: 340, x: 0,   y: 400 },
  // D: x[580..1080] y[560..880] — no x-overlap with C (560<580) ✓, no y-overlap with B (520<560) ✓
  { title: "Google I/O Jakarta",        tags: "Tech Event · Experiential Design",                       bg: "#2B1A47", w: 500, h: 320, x: 580, y: 560 },
  // E: x[60..360]  y[800..1300] — no y-overlap with C (740<800) ✓, no x-overlap with D (360<580) ✓
  { title: "Shopee 12.12 Campaign",     tags: "Integrated Campaign · Motion Design",                    bg: "#0d1a1f", w: 300, h: 500, x: 60,  y: 800 },
];

const SCATTER_W = 1080;
const SCATTER_H = Math.max(...ITEMS.map((i) => i.y + i.h)); // 1300

// Wrapper height = sticky viewport + full rise distance + padding
// This ensures scroll ends ONLY when the last card is fully visible
const WRAPPER_H = `calc(100vh + ${SCATTER_H + 120}px)`;

function PlayIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <polygon points="6,3 22,12 6,21" fill="white" />
    </svg>
  );
}

function WorkCard({ item }: { item: WorkItem }) {
  return (
    <div
      className="group relative cursor-pointer overflow-hidden"
      style={{ width: item.w, height: item.h }}
    >
      {/* Color fill */}
      <div
        className="absolute inset-0 transition-[filter] duration-500 group-hover:brightness-75 group-hover:blur-[3px]"
        style={{ background: item.bg }}
      />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div
          className="flex items-center justify-center rounded-full border-2 border-white/90"
          style={{ width: 64, height: 64 }}
        >
          <PlayIcon />
        </div>
      </div>

      {/* Caption */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 px-5 pb-4 pt-10"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75), transparent)" }}
      >
        <p className="font-manrope font-bold text-white leading-[1.2]" style={{ fontSize: 16 }}>
          {item.title}
        </p>
        <p className="font-manrope text-white/55 leading-[1.3] mt-1" style={{ fontSize: 12 }}>
          {item.tags}
        </p>
      </div>
    </div>
  );
}

export default function WorkSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // scrollYProgress = 0 when wrapper top hits viewport top
  //                 = 1 when wrapper bottom hits viewport bottom
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // Cards start at y=0 (anchored at top: 100% = below sticky viewport)
  // As user scrolls, they rise by the full SCATTER_H + padding
  // → last card bottom (y=800+500=1300) lands exactly at viewport bottom
  const cardsY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(SCATTER_H + 120)]
  );

  return (
    <div
      ref={wrapperRef}
      className="relative bg-[#111]"
      style={{ height: WRAPPER_H }}
    >
      {/* Sticky viewport: pins the scene while wrapper scrolls */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ── Title: always visible, floats above rising cards ── */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none select-none"
          style={{ zIndex: 20 }}
        >
          <span
            className="font-manrope font-semibold uppercase text-[#df2b2b]"
            style={{ fontSize: 14, letterSpacing: "2.8px" }}
          >
            Our Work
          </span>
          <h2
            className="font-manrope font-bold text-white text-center leading-[1.15]"
            style={{ fontSize: 72 }}
          >
            Some of our work.<br />All of our effort.
          </h2>
        </div>

        {/* ── Cards: anchored just below viewport, rise on scroll ── */}
        <motion.div
          className="absolute left-0 right-0"
          style={{
            top: "100%",  // starts at bottom edge of sticky viewport (= below screen)
            y: cardsY,    // translated upward as user scrolls
            zIndex: 10,
          }}
        >
          {/* Centered scatter canvas */}
          <div
            className="relative mx-auto"
            style={{ width: SCATTER_W, height: SCATTER_H }}
          >
            {ITEMS.map((item, i) => (
              <div
                key={i}
                className="absolute"
                style={{ left: item.x, top: item.y }}
              >
                <WorkCard item={item} />
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
