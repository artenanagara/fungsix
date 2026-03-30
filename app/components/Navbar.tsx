"use client";

import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Why Choose Us", href: "#why-choose-us" },
  { label: "Testimonials", href: "#testimonials" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Scroll down, hide navbar
      } else {
        setIsVisible(true); // Scroll up, show navbar
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-4 md:px-20 py-5 bg-[#111] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
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
            <li key={item.label} className="cursor-pointer hover:opacity-70 transition-opacity">
              <button onClick={() => handleNavClick(item.href)} className="text-white bg-transparent border-none cursor-pointer font-manrope font-normal text-base">
                {item.label}
              </button>
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
              key={item.label}
              className="cursor-pointer hover:opacity-70 transition-opacity border-b border-white/10 py-6"
              style={{ fontSize: "clamp(28px, 8vw, 40px)" }}
            >
              <button
                onClick={() => handleNavClick(item.href)}
                className="block text-white bg-transparent border-none cursor-pointer font-manrope font-bold transition-transform duration-300 w-full text-left"
                style={{ transform: open ? "translateX(0)" : "translateX(-16px)", transitionDelay: `${i * 50}ms` }}
              >
                {item.label}
              </button>
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
