"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  width?: "w-fit" | "w-full";
  direction?: "up" | "left" | "right" | "down";
  className?: string;
}

export default function Reveal({
  children,
  delay = 0,
  width = "w-full",
  direction = "up",
  className = "",
}: RevealProps) {
  const directionOffset = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { x: 50, y: 0 },
    right: { x: -50, y: 0 },
  };

  return (
    <div className={`relative ${width} ${className}`}>
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            x: directionOffset[direction].x,
            y: directionOffset[direction].y,
          },
          visible: {
            opacity: 1,
            x: 0,
            y: 0,
          },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1], // Custom bouncy/smooth easing
          delay: delay,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
