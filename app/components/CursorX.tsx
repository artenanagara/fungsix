"use client";

import { useEffect, useRef, useState } from "react";

export default function CursorX() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check mobile initially
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let currentX = window.innerWidth / 2;
    let currentY = window.innerHeight / 2;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let animId: number;
    let cssW = window.innerWidth;
    let cssH = window.innerHeight;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const parent = canvas.parentElement;
      cssW = parent?.offsetWidth || window.innerWidth;
      cssH = parent?.offsetHeight || window.innerHeight;

      // Scale canvas internal resolution by DPR for sharp text
      canvas.width = cssW * dpr;
      canvas.height = cssH * dpr;
      ctx.scale(dpr, dpr);

      // Coordinates stay in CSS pixel space
      currentX = cssW / 2;
      currentY = cssH / 2;
      targetX = cssW / 2;
      targetY = cssH / 2;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    };

    // Fix: parentElement has pointer-events: none, so it captures NO events.
    // We attach to the nearest interactive section wrapper instead.
    const interactiveHero = canvas.closest("section") || window;
    interactiveHero.addEventListener("mousemove", handleMouseMove as EventListener);

    const drawRotatedText = (
      ctx: CanvasRenderingContext2D,
      text: string,
      x: number,
      y: number,
      angle: number
    ) => {
      ctx.save();
      // Move exactly to the intersection
      ctx.translate(x, y);
      ctx.rotate(angle);

      // Font settings
      ctx.font = '500 14px "Manrope", sans-serif';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Draw background pill exactly centered on intersection
      const textWidth = ctx.measureText(text).width;
      ctx.fillStyle = "#111"; // Matches Background
      ctx.fillRect(-textWidth / 2 - 16, -16, textWidth + 32, 32);

      // Draw Text exactly centered
      ctx.fillStyle = "rgba(255, 255, 255, 1)";
      ctx.fillText(text, 0, 0);

      ctx.restore();
    };

    const animate = () => {
      // Smooth lerp (more delay and smoother inertia)
      currentX += (targetX - currentX) * 0.03;
      currentY += (targetY - currentY) * 0.03;

      const w = cssW;
      const h = cssH;
      const cx = currentX;
      const cy = currentY;

      // Clear rect in CSS pixel dimensions (handled by scale automatically)
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.4)"; // Sharp, visible lines
      ctx.lineWidth = 1; // 1 CSS pixel thick

      // We want a perfect rigid "X", crossing at 30 degrees.
      // 30 degrees in radians is Math.PI / 6.
      const angle = Math.PI / 6;
      const L = 4000; // Massive length to ensure they reach past screen edges

      // Line 1: top-left to bottom-right direction
      const dx1 = Math.cos(angle) * (L / 2);
      const dy1 = Math.sin(angle) * (L / 2);
      ctx.beginPath();
      ctx.moveTo(cx - dx1, cy - dy1);
      ctx.lineTo(cx + dx1, cy + dy1);
      ctx.stroke();

      // Line 2: bottom-left to top-right direction
      const dx2 = Math.cos(-angle) * (L / 2);
      const dy2 = Math.sin(-angle) * (L / 2);
      ctx.beginPath();
      ctx.moveTo(cx - dx2, cy - dy2);
      ctx.lineTo(cx + dx2, cy + dy2);
      ctx.stroke();

      // Text exactly AT the intersection point (cx, cy), perfectly parallel to Line 1
      drawRotatedText(ctx, "Delivering where it matters.", cx, cy, angle);

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      if (interactiveHero) {
        interactiveHero.removeEventListener("mousemove", handleMouseMove as EventListener);
      }
    };
  }, [isMobile]);

  if (isMobile) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}
