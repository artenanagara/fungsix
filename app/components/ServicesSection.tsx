"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import Reveal from "./Reveal";



// Rapid 20-color sequence acting as a placeholder for a fast image/video showreel
const SHOWREEL_COLORS = [
  "#DF2B2B", "#2B5ADF", "#1A8A55", "#F2C94C", "#BB6BD9",
  "#F2994A", "#56CCF2", "#6FCF97", "#9B51E0", "#EB5757",
  "#2F80ED", "#2196F3", "#9C27B0", "#FF9800", "#4CAF50",
  "#E91E63", "#00BCD4", "#8BC34A", "#FFC107", "#3F51B5"
];

// Bright ambient colors cycling in idle (no hover) state
const IDLE_COLORS = [
  "#DF2B2B", "#2B7FDF", "#D4A017", "#9B3DDF",
  "#1A8A55", "#DF6B2B", "#2BB5DF", "#DF2B7A",
  "#DF2B2B",
];

const SERVICES_DATA = [
  {
    title: "Event & Brand Activation",
    desc: "End-to-end production of brand experiences that leave lasting impressions and drive real audience engagement.",
    tags: [
      "Brand & Product Launches",
      "Exhibitions & Booth Activations",
      "Public & Mall Activations",
      "Corporate & Internal Events",
      "Community Engagement",
    ],
    colors: ["#DF2B2B", "#FF6B35", "#E91E63", "#FF4444", "#C62828", "#DF2B2B"],
  },
  {
    title: "Digital Campaign & Video Production",
    desc: "Integrated digital campaigns and high-quality video content that connect your brand to the right audience at the right moment.",
    tags: [
      "Social Media Campaigns",
      "Commercial Videos",
      "Interactive Content",
      "Digital Strategy",
    ],
    colors: ["#2B7FDF", "#00BCD4", "#9B51E0", "#2196F3", "#673AB7", "#2B7FDF"],
  },
  {
    title: "Construction & Production",
    desc: "We build with precision, quality, and full production control.",
    tags: [
      "Stage & Set Building",
      "Custom Booths",
      "Lighting & Rigging",
      "Logistics & Ops",
    ],
    colors: ["#1A8A55", "#F2C94C", "#DF6B2B", "#4CAF50", "#FFC107", "#1A8A55"],
  },
];

function ArrowTopRight() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 17L17 7M17 7H7M17 7V17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Framer Motion Variants for Hover Transitions
const cardVariants: Variants = {
  rest: { backgroundColor: "rgba(17,17,17,0.5)", y: 0 },
  hover: { backgroundColor: "rgba(255,255,255,1)", y: -10 },
};

const titleVariants: Variants = {
  rest: { color: "rgba(255,255,255,1)" },
  hover: { color: "rgba(17,17,17,1)" },
};

const descVariants: Variants = {
  rest: { color: "rgba(255,255,255,0.7)" },
  hover: { color: "rgba(17,17,17,0.7)" },
};

const arrowVariants: Variants = {
  rest: { opacity: 1, x: 0, y: 0, scale: 1 },
  hover: { opacity: 0, x: 10, y: -10, scale: 0.8 },
};

const tagsContainerVariants: Variants = {
  rest: { height: 0, opacity: 0, marginTop: 0 },
  hover: {
    height: "auto",
    opacity: 1,
    marginTop: "24px",
    transition: { staggerChildren: 0.05, delayChildren: 0.1, duration: 2.3, ease: "easeOut" },
  },
};

const tagVariants: Variants = {
  rest: { opacity: 0, y: 20 },
  hover: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.3 } },
};

export default function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      className="relative px-4 md:px-20"
      style={{
        paddingTop: "clamp(60px, 8vw, 100px)",
        paddingBottom: "clamp(60px, 8vw, 100px)",
        minHeight: "auto",
        backgroundColor: "#0d0d1a",
      }}
    >

      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Slow ambient color cycle — is the idle background, no image */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={{ backgroundColor: IDLE_COLORS[0] }}
          animate={{
            opacity: hoveredIndex !== null ? 0 : 1,
            backgroundColor: IDLE_COLORS,
          }}
          transition={{
            opacity: { duration: 0.7, ease: "easeInOut" },
            backgroundColor: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 12,
              ease: "easeInOut",
            },
          }}
        />

        {SERVICES_DATA.map((service, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0, backgroundColor: service.colors[0] }}
            animate={
              hoveredIndex === i
                ? { opacity: 1, backgroundColor: service.colors }
                : { opacity: 0 }
            }
            transition={{
              opacity: { duration: 0.3, ease: "easeInOut" },
              backgroundColor: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 8,
                ease: "easeInOut",
              },
            }}
          />
        ))}

        {/* Global Dark overlay ensuring text contrast */}
        <div className="absolute inset-0 bg-[#111]/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col" style={{ gap: "clamp(48px, 8vw, 100px)" }}>
        {/* Header */}
        <div className="flex flex-col" style={{ gap: "16px" }}>
          <Reveal delay={0.1}>
            <span
              className="font-manrope font-semibold text-[#df2b2b] uppercase"
              style={{ fontSize: "14px", letterSpacing: "2.8px" }}
            >
              What We Do
            </span>
          </Reveal>
          <Reveal delay={0.2}>
            <h2
              className="font-manrope font-bold text-white leading-[1.4]"
              style={{ fontSize: "clamp(28px, 4vw, 56px)", maxWidth: "1094px" }}
            >
              Three capabilities. One integrated team. Full execution control.
            </h2>
          </Reveal>
        </div>

        {/* Cards — row on desktop, column on mobile */}
        <div
          className="flex flex-col md:flex-row items-stretch"
          style={{ gap: "20px", width: "100%" }}
        >
          {SERVICES_DATA.map((service, i) => (
            <motion.div
              key={i}
              onHoverStart={() => setHoveredIndex(i)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="flex flex-col justify-between overflow-hidden cursor-pointer"
              style={{
                flex: 1,
                padding: "20px",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.05)",
                minHeight: "450px"
              }}
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={cardVariants}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="flex flex-col justify-between relative h-full">
                {/* Top Section: Arrow Isolated */}
                <div className="flex justify-end items-start w-full">
                  <motion.div variants={arrowVariants} className="text-white">
                    <ArrowTopRight />
                  </motion.div>
                </div>

                {/* Bottom Section: Title, Desc, and expanding Tags pinned to bottom */}
                <div className="flex flex-col mt-8" style={{ zIndex: 10 }}>
                  <div className="flex flex-col" style={{ gap: "16px" }}>
                    <motion.h3
                      className="font-manrope font-bold leading-[1.3]"
                      style={{ fontSize: "20px", maxWidth: "100%" }}
                      variants={titleVariants}
                    >
                      {service.title}
                    </motion.h3>
                    <motion.p
                      className="font-manrope font-normal leading-[1.6]"
                      style={{ fontSize: "16px" }}
                      variants={descVariants}
                    >
                      {service.desc}
                    </motion.p>
                  </div>

                  {/* Tags Section (Expands structural height from 0 to push text UP) */}
                  <motion.div
                    className="flex flex-wrap overflow-hidden"
                    style={{ gap: "8px" }}
                    variants={tagsContainerVariants}
                  >
                  {service.tags.map((tag) => (
                    <motion.span
                      key={tag}
                      variants={tagVariants}
                      className="font-manrope font-semibold text-white bg-[#111] leading-none transition-transform hover:scale-105"
                      style={{
                        fontSize: "12px",
                        padding: "8px 8px",
                        borderRadius: "999px",
                      }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>

                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
