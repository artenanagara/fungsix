"use client";

import { useRef, useEffect, useState } from "react";

/**
 * Pins the footer at the bottom of the viewport (z-index: 0) so it sits
 * "behind" the rest of the page. As the section above scrolls up, the footer
 * is gradually revealed from top to bottom.
 *
 * A spacer div with the measured footer height is injected into normal flow
 * so the page scroll length stays correct.
 */
export default function FooterWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const footerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const measure = () => setHeight(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      {/* Holds the footer's space in normal flow so scroll depth is correct */}
      <div style={{ height }} aria-hidden />

      {/* Footer is fixed at the bottom, behind all content (z-index: 0) */}
      <div
        ref={footerRef}
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 0,
        }}
      >
        {children}
      </div>
    </>
  );
}
