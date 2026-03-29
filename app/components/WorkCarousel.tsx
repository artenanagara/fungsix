"use client";

import { useEffect, useRef, useCallback } from "react";

interface Card {
  num: string;
  title: string;
  tags: string;
  image?: string;
  bg?: string;
}

const FRICTION = 0.88;
const LERP = 0.1;

export default function WorkCarousel({ cards }: { cards: Card[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Mutable refs — no re-renders needed in the hot path
  const targetX = useRef(0);
  const currentX = useRef(0);
  const vel = useRef(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartTarget = useRef(0);
  const lastPointerX = useRef(0);
  const rafId = useRef<number>(0);

  // Apply transform directly to DOM (skip React state for perf)
  const applyTransform = useCallback((x: number) => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${x}px)`;
    }
  }, []);

  const clamp = useCallback((x: number) => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return x;
    const max = 0;
    const min = -(track.scrollWidth - container.clientWidth);
    return Math.max(min, Math.min(max, x));
  }, []);

  // RAF animation loop
  const tick = useCallback(() => {
    if (!isDragging.current) {
      // Apply momentum
      targetX.current = clamp(targetX.current + vel.current);
      vel.current *= FRICTION;
    }
    // Lerp toward target
    currentX.current += (targetX.current - currentX.current) * LERP;
    applyTransform(currentX.current);
    rafId.current = requestAnimationFrame(tick);
  }, [applyTransform, clamp]);

  useEffect(() => {
    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [tick]);

  // Pointer events
  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartTarget.current = targetX.current;
    lastPointerX.current = e.clientX;
    vel.current = 0;
    containerRef.current?.setPointerCapture(e.pointerId);
    if (containerRef.current) containerRef.current.style.cursor = "grabbing";
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStartX.current;
    vel.current = e.clientX - lastPointerX.current;
    lastPointerX.current = e.clientX;
    targetX.current = clamp(dragStartTarget.current + dx);
  };

  const onPointerUp = () => {
    isDragging.current = false;
    if (containerRef.current) containerRef.current.style.cursor = "grab";
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden select-none"
      style={{ cursor: "grab" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      {/* Track */}
      <div
        ref={trackRef}
        className="flex will-change-transform"
        style={{ gap: "16px", paddingLeft: "5vw", paddingRight: "5vw" }}
      >
        {cards.map((card, i) => (
          <div
            key={i}
            className="shrink-0 relative flex flex-col justify-end overflow-hidden"
            style={{
              width: "85vw",
              height: "62vh",
              background: card.bg ?? "#1a1a1a",
            }}
          >
            {/* Image */}
            {card.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={card.image}
                alt={card.title}
                draggable={false}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}

            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0) 50%)",
              }}
            />

            {/* Card info */}
            <div className="relative z-10 px-8 pb-7 flex items-end justify-between">
              <div>
                <p
                  className="font-manrope font-bold text-white leading-[1.2] mb-1"
                  style={{ fontSize: "20px" }}
                >
                  {card.title}
                </p>
                <p
                  className="font-manrope font-normal text-white/60 leading-[1.2]"
                  style={{ fontSize: "13px" }}
                >
                  {card.tags}
                </p>
              </div>
              <span
                className="font-manrope font-light text-white/40 leading-none shrink-0"
                style={{ fontSize: "13px" }}
              >
                {card.num} / {String(cards.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
