"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

// Canvas: 1100px wide
// 16:9 cards: 700×394  (700 * 9/16 = 393.75 ≈ 394)
// 9:16 cards: 350×622  (350 * 16/9 = 622.2  ≈ 622)
//
// Overlap-free layout (verified):
// A (16:9) x[0..700]   y[0..394]
// B (9:16) x[750..1100] y[0..622]   — no x-overlap with A (700<750) ✓
// C (9:16) x[0..350]   y[450..1072] — no y-overlap with A (394<450) ✓, no x-overlap with B (350<750) ✓
// D (16:9) x[400..1100] y[680..1074] — no x-overlap with C (350<400) ✓, no y-overlap with B (622<680) ✓
// E (16:9) x[0..700]   y[1130..1524] — no y-overlap with C (1072<1130) ✓, D x-overlap ok (y-gap 1074<1130) ✓

interface WorkItem {
  title: string;
  tags: string;
  bg: string;
  w: number;
  h: number;
  x: number;
  y: number;
  video?: string;
}

const ITEMS: WorkItem[] = [
  { title: "Pixar Fest × MRT Jakarta",  tags: "Brand Activation · Exhibition Build · Digital Campaign", bg: "#162447", w: 700, h: 394, x: 0,   y: 0    },
  { title: "PUMA Store Grand Opening",  tags: "Event Production · Brand Activation",                    bg: "#1f0d0d", w: 350, h: 622, x: 750, y: 0    },
  { title: "Nike Air Max Day",          tags: "Event Production · Social Campaign",                     bg: "#1A4A2E", w: 350, h: 622, x: 0,   y: 450  },
  { title: "Google I/O Jakarta",        tags: "Tech Event · Experiential Design",                       bg: "#2B1A47", w: 700, h: 394, x: 400, y: 680  },
  { title: "Shopee 12.12 Campaign",     tags: "Integrated Campaign · Motion Design",                    bg: "#0d1a1f", w: 700, h: 394, x: 0,   y: 1130 },
];

const SCATTER_W = 1100;
const SCATTER_H = Math.max(...ITEMS.map((i) => i.y + i.h)); // 1524

const WRAPPER_H = `calc(100vh + ${SCATTER_H + 120}px)`;

function PlayIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <polygon points="6,3 22,12 6,21" fill="white" />
    </svg>
  );
}

function VideoModal({ item, onClose }: { item: WorkItem; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex: 9999 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90" />

      {/* Player */}
      <motion.div
        className="relative w-full max-w-4xl mx-4"
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/60 hover:text-white transition-colors"
          style={{ lineHeight: 1 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Video */}
        <div className="relative w-full" style={{ aspectRatio: "16/9", background: "#000" }}>
          {item.video ? (
            <video
              src={item.video}
              className="absolute inset-0 w-full h-full"
              controls
              autoPlay
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div
                className="w-full h-full absolute inset-0"
                style={{ background: item.bg, opacity: 0.4 }}
              />
              <PlayIcon />
              <p className="font-manrope text-white/40 text-sm relative z-10">No video source</p>
            </div>
          )}
        </div>

        {/* Caption */}
        <div className="mt-4">
          <p className="font-manrope font-bold text-white" style={{ fontSize: 18 }}>
            {item.title}
          </p>
          <p className="font-manrope text-white/40 mt-1" style={{ fontSize: 13 }}>
            {item.tags}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function WorkCard({ item, onClick }: { item: WorkItem; onClick: () => void }) {
  return (
    <div
      className="group relative cursor-pointer overflow-hidden"
      style={{ width: item.w, height: item.h }}
      onClick={onClick}
    >
      <div
        className="absolute inset-0 transition-[filter] duration-500 group-hover:brightness-75 group-hover:blur-[3px]"
        style={{ background: item.bg }}
      />

      <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div
          className="flex items-center justify-center rounded-full border-2 border-white/90"
          style={{ width: 64, height: 64 }}
        >
          <PlayIcon />
        </div>
      </div>

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

function WorkSectionDesktop() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<WorkItem | null>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const cardsY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(SCATTER_H + 120)]
  );

  return (
    <>
    <AnimatePresence>
      {active && <VideoModal item={active} onClose={() => setActive(null)} />}
    </AnimatePresence>
    <div
      ref={wrapperRef}
      className="relative bg-[#111]"
      style={{ height: WRAPPER_H }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Text — behind cards */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none select-none"
          style={{ zIndex: 5 }}
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

        {/* Cards — in front of text */}
        <motion.div
          className="absolute left-0 right-0"
          style={{
            top: "100%",
            y: cardsY,
            zIndex: 20,
          }}
        >
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
                <WorkCard item={item} onClick={() => setActive(item)} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
    </>
  );
}

function WorkSectionMobile() {
  const [active, setActive] = useState<WorkItem | null>(null);
  return (
    <div className="bg-[#111] px-4 py-16">
      <div className="flex flex-col items-center gap-3 mb-10">
        <span
          className="font-manrope font-semibold uppercase text-[#df2b2b]"
          style={{ fontSize: 14, letterSpacing: "2.8px" }}
        >
          Our Work
        </span>
        <h2
          className="font-manrope font-bold text-white text-center leading-[1.15]"
          style={{ fontSize: "clamp(28px, 8vw, 48px)" }}
        >
          Some of our work.<br />All of our effort.
        </h2>
      </div>
      <div className="flex flex-col gap-4">
        {ITEMS.map((item, i) => (
          <div
            key={i}
            className="relative overflow-hidden"
            style={{
              width: "100%",
              aspectRatio: item.w > item.h ? "16/9" : "9/16",
            }}
          >
            <div
              className="absolute inset-0"
              style={{ background: item.bg }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 px-4 pb-3 pt-8"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75), transparent)" }}
            >
              <p className="font-manrope font-bold text-white leading-[1.2]" style={{ fontSize: 14 }}>
                {item.title}
              </p>
              <p className="font-manrope text-white/55 leading-[1.3] mt-1" style={{ fontSize: 11 }}>
                {item.tags}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WorkSection() {
  return (
    <>
      <div className="hidden md:block">
        <WorkSectionDesktop />
      </div>
      <div className="block md:hidden">
        <WorkSectionMobile />
      </div>
    </>
  );
}
