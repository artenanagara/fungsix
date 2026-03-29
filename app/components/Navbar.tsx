"use client";

import { useState, useEffect } from "react";

const NAV_ITEMS = ["Services", "Work", "About", "Contact Us"];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav className="relative z-20 flex items-center justify-between px-4 md:px-20 py-5">
        {/* Logo */}
        <span
          className="font-manrope font-bold text-white leading-none"
          style={{ fontSize: "clamp(22px, 5vw, 32px)" }}
        >
          FUNGSIX
        </span>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-8 font-manrope font-normal text-base text-white list-none m-0 p-0">
          {NAV_ITEMS.map((item) => (
            <li key={item} className="cursor-pointer hover:opacity-70 transition-opacity">
              {item}
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="hidden md:block font-manrope font-semibold text-white underline underline-offset-4 hover:opacity-70 transition-opacity"
          style={{ fontSize: "16px" }}
        >
          Let&apos;s Collaborate
        </a>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[6px] flex-shrink-0"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span
            className="block w-6 bg-white transition-all duration-300 origin-center"
            style={{
              height: "2px",
              transform: open ? "translateY(8px) rotate(45deg)" : "none",
            }}
          />
          <span
            className="block w-6 bg-white transition-all duration-300"
            style={{ height: "2px", opacity: open ? 0 : 1 }}
          />
          <span
            className="block w-6 bg-white transition-all duration-300 origin-center"
            style={{
              height: "2px",
              transform: open ? "translateY(-8px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </nav>

      {/* Mobile Full-screen Menu */}
      <div
        className="fixed inset-0 bg-[#111] z-50 flex flex-col px-6 pt-6 pb-12 md:hidden transition-all duration-300"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transform: open ? "translateY(0)" : "translateY(-8px)",
        }}
      >
        {/* Close button */}
        <div className="flex items-center justify-between mb-12">
          <span
            className="font-manrope font-bold text-white leading-none"
            style={{ fontSize: "22px" }}
          >
            FUNGSIX
          </span>
          <button
            className="flex flex-col justify-center items-center w-10 h-10 gap-[6px]"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <span
              className="block w-6 bg-white"
              style={{ height: "2px", transform: "translateY(1px) rotate(45deg)" }}
            />
            <span
              className="block w-6 bg-white"
              style={{ height: "2px", transform: "translateY(-1px) rotate(-45deg)" }}
            />
          </button>
        </div>

        {/* Nav Links */}
        <ul className="flex flex-col font-manrope font-bold text-white list-none m-0 p-0" style={{ gap: "0" }}>
          {NAV_ITEMS.map((item, i) => (
            <li
              key={item}
              onClick={() => setOpen(false)}
              className="cursor-pointer hover:opacity-70 transition-opacity border-b border-white/10 py-6"
              style={{ fontSize: "clamp(28px, 8vw, 40px)" }}
            >
              <span
                className="block transition-transform duration-300"
                style={{ transform: open ? "translateX(0)" : "translateX(-16px)", transitionDelay: `${i * 50}ms` }}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA at bottom */}
        <a
          href="#contact"
          onClick={() => setOpen(false)}
          className="mt-auto font-manrope font-semibold text-white underline underline-offset-4 hover:opacity-70 transition-opacity"
          style={{ fontSize: "16px" }}
        >
          Let&apos;s Collaborate →
        </a>
      </div>
    </>
  );
}
