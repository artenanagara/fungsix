"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

const WORDS = [
  { w: "We", h: false },
  { w: "partner", h: false },
  { w: "with", h: false },
  { w: "leading brands", h: true },
  { w: "and", h: false },
  { w: "ambitious companies,", h: true },
  { w: "combining", h: false },
  { w: "strategic", h: false },
  { w: "planning", h: false },
  { w: "and", h: false },
  { w: "in-house", h: false },
  { w: "production", h: false },
  { w: "to", h: false },
  { w: "create", h: false },
  { w: "experiences,", h: false },
  { w: "activations,", h: false },
  { w: "and", h: false },
  { w: "campaigns", h: false },
  { w: "that", h: false },
  { w: "move", h: false },
  { w: "audiences", h: false },
  { w: "and", h: false },
  { w: "deliver real impact.", h: true },
];

function Word({ children, progress, range, isHighlight }: { children: React.ReactNode; progress: MotionValue<number>; range: [number, number]; isHighlight: boolean }) {
  const color = useTransform(progress, range, ["#aaaaaa", "#111111"]);

  if (isHighlight) {
    // Highlighted text uses a viewport-fixed spinning text gradient
    return (
      <span className="unified-text-gradient inline-block mr-[14px] last:mr-0 relative z-0">
        {children}
      </span>
    );
  }

  // Normal text
  return (
    <motion.span className="inline-block mr-[14px] last:mr-0 relative z-20" style={{ color }}>
      {children}
    </motion.span>
  );
}

export default function BrandStatement() {
  const container = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    // Starts exactly when it sticks ("start start").
    // Finishes when 40% of the 200vh wrapper has passed (80vh of scroll).
    // The next section only appears after 100vh of scroll, so text is done early!
    offset: ["start start", "20% start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 25,
    restDelta: 0.001
  });

  // Maps the spring-dampened progress to a subtle upward drift (0 to -80px)
  const yShift = useTransform(smoothProgress, [0, 1], [0, -150]);

  return (
    <section
      ref={container}
      className="bg-[#f7f7f7] relative z-0"
      style={{ height: "200vh", marginBottom: "-100vh" }}
    >
      {/* The sticky element tracking normally within the wrapper */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden z-0">
        <motion.p
          className="font-manrope font-bold leading-[1.6] flex flex-wrap relative w-full px-4 md:px-0"
          style={{
            y: yShift,
            fontSize: "clamp(20px, 3.5vw, 40px)",
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          {WORDS.map((w, i) => {
            const start = i / WORDS.length;
            const end = start + 1 / WORDS.length;
            return (
              <Word
                key={i}
                progress={smoothProgress}
                range={[start, end]}
                isHighlight={w.h}
              >
                {w.w}
              </Word>
            );
          })}
        </motion.p>
      </div>
    </section>
  );
}
