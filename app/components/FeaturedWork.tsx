"use client";

import { useState, useCallback } from "react";

const ICON_X =
  "https://www.figma.com/api/mcp/asset/234f5c12-bd85-4c62-ad01-4aaab45a91a9";


const MARQUEE_ITEMS = [
  "End-to-End Execution",
  "25+ Leading Brands",
  "One Partner. Full Responsibility.",
  "Global IP Experience",
  "Detail-Driven. Always.",
];

interface Project {
  title: string;
  tags: string;
  image?: string;
  bg?: string;
}

const PROJECTS: Project[] = [
  { title: "Pixar Fest × MRT Jakarta",  tags: "Brand Activation · Exhibition Build · Digital Campaign", bg: "#162447" },
  { title: "Nike Air Max Day",           tags: "Event Production · Social Campaign",                     bg: "#1a1a2e" },
  { title: "Google I/O Jakarta",         tags: "Tech Event · Experiential Design",                       bg: "#0d1f0d" },
  { title: "Shopee 12.12 Campaign",      tags: "Integrated Campaign · Motion Design",                    bg: "#1f0d0d" },
  { title: "Unilever Brand Relaunch",    tags: "Brand Strategy · Production",                            bg: "#0d1a1f" },
];

function ChevronLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M9 2L4 7L9 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function ChevronRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M5 2L10 7L5 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ProjectImage({ project }: { project: Project }) {
  return project.image ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={project.image} alt={project.title} draggable={false}
      className="w-full h-full object-cover block" />
  ) : (
    <div className="w-full h-full" style={{ background: project.bg ?? "#222" }} />
  );
}

export default function FeaturedWork() {
  const [idx,      setIdx]      = useState(0);
  const [prevIdx,  setPrevIdx]  = useState<number | null>(null);
  // "next" | "prev"
  const [dir, setDir] = useState<"next" | "prev">("next");
  const [token, setToken] = useState(0); // forces remount

  const navigate = useCallback((d: "prev" | "next") => {
    setDir(d);
    setToken(t => t + 1);
    setPrevIdx(idx);
    setIdx(prev =>
      d === "next"
        ? (prev + 1) % PROJECTS.length
        : (prev - 1 + PROJECTS.length) % PROJECTS.length
    );
  }, [idx]);

  const project = PROJECTS[idx];
  const total   = PROJECTS.length;
  const progress = ((idx + 1) / total) * 100;

  const enterCls = dir === "next" ? "wipe-enter-next" : "wipe-enter-prev";

  return (
    <div className="relative w-full h-full">

      {/* ── Image + info row ─ flex items-end, gap-24 (Figma) ── */}
      <div
        className="absolute flex items-end"
        style={{ top: "-181px", left: 0, width: "100%", gap: "24px", zIndex: 2 }}
      >
        {/* Image 817 × 459 — two-layer stack */}
        <div style={{ width: "817px", height: "459px", flexShrink: 0, position: "relative", overflow: "hidden" }}>
          {/* EXIT layer — old image (static behind) */}
          {prevIdx !== null && (
            <div
              key={`exit-${token}`}
              className="absolute inset-0 z-0"
            >
              <ProjectImage project={PROJECTS[prevIdx]} />
            </div>
          )}
          {/* ENTER layer — new image wiping ON TOP */}
          <div 
            key={`enter-${token}`} 
            className={`absolute inset-0 z-10 ${enterCls}`}
            onAnimationEnd={() => setPrevIdx(null)}
          >
            <ProjectImage project={project} />
          </div>
        </div>

        {/* Title + category — fade-up on change */}
        <div
          key={`info-${token}`}
          className="flex flex-col fade-up"
          style={{ gap: "4px", width: "519px", flexShrink: 0, paddingBottom: "4px" }}
        >
          <p className="font-manrope font-bold text-white leading-[1.2]" style={{ fontSize: "16px" }}>
            {project.title}
          </p>
          <p className="font-manrope font-normal text-white/70 leading-[1.2]" style={{ fontSize: "16px" }}>
            {project.tags}
          </p>
        </div>
      </div>

      {/* ── White marquee — right half (720px → edge) ── */}
      <div
        className="absolute overflow-hidden"
        style={{ left: "720px", top: 0, right: 0, paddingTop: "8px", paddingBottom: "8px", background: "white", zIndex: 1 }}
      >
        <div className="flex items-center animate-marquee">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <div key={i} className="flex items-center shrink-0" style={{ gap: "16px", padding: "0 16px" }}>
              <span className="font-manrope font-bold text-black leading-[1.2] whitespace-nowrap" style={{ fontSize: "20px" }}>
                {item}
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ICON_X} alt="" style={{ width: "33px", height: "24px" }} className="block shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* ── Progress + chevrons (top=299 — Figma) ── */}
      <div
        className="absolute flex items-center gap-6"
        style={{ left: "80px", top: "299px", zIndex: 4 }}
      >
        <div style={{ width: "737px", height: "1px", background: "rgba(255,255,255,0.2)", position: "relative" }}>
          <div style={{
            position: "absolute", left: 0, top: 0, height: "100%",
            width: `${progress}%`, background: "rgba(255,255,255,0.85)",
            transition: "width 0.45s cubic-bezier(0.22,1,0.36,1)",
          }} />
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button onClick={() => navigate("prev")}
            className="opacity-60 hover:opacity-100 transition-opacity" aria-label="Previous">
            <ChevronLeft />
          </button>
          <span className="font-manrope font-normal text-white leading-[1.2]" style={{ fontSize: "18px" }}>
            {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <button onClick={() => navigate("next")}
            className="opacity-60 hover:opacity-100 transition-opacity" aria-label="Next">
            <ChevronRight />
          </button>
        </div>
      </div>

    </div>
  );
}
