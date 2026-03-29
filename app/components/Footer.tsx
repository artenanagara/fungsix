


const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "X", href: "#" },
  { label: "LinkedIn", href: "#" },
];

const NAV_LINKS = ["Works", "Services", "About"];

export default function Footer() {
  return (
    <footer
      className="bg-[#111] px-4 md:px-20 flex flex-col"
      style={{ paddingTop: "clamp(48px, 8vw, 100px)", paddingBottom: "32px", gap: "clamp(60px, 10vw, 200px)", minHeight: "100vh" }}
    >
      {/* Top row */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 md:gap-0">
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            className="font-manrope font-bold text-white leading-none"
            style={{ fontSize: "clamp(40px, 6vw, 72px)", letterSpacing: "-2px" }}
          >
            FUNGSI<span style={{ color: "#DF2B2B" }}>(X)</span>
          </span>
        </div>

        {/* Links */}
        <div className="flex gap-12 md:gap-0 md:justify-between" style={{ width: "auto", minWidth: "0" }}>
          <div className="flex flex-col" style={{ gap: "16px", minWidth: "120px" }}>
            <span
              className="font-manrope font-semibold text-white/40 leading-[1.3] uppercase"
              style={{ fontSize: "12px", letterSpacing: "1.5px" }}
            >
              Social
            </span>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="font-manrope font-semibold text-white hover:opacity-70 transition-opacity leading-[1.3]"
                style={{ fontSize: "16px" }}
              >
                {s.label}
              </a>
            ))}
          </div>
          <div className="flex flex-col" style={{ gap: "16px" }}>
            <span
              className="font-manrope font-semibold text-white/40 leading-[1.3] uppercase"
              style={{ fontSize: "12px", letterSpacing: "1.5px" }}
            >
              Email
            </span>
            <a
              href="mailto:hello@fungsix.com"
              className="font-manrope font-semibold text-white hover:opacity-70 transition-opacity leading-[1.3]"
              style={{ fontSize: "16px" }}
            >
              hello@fungsix.com
            </a>
          </div>
        </div>
      </div>

      {/* Bottom block */}
      <div className="flex flex-col" style={{ gap: "32px" }}>
        {/* Nav row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
          <span
            className="font-manrope font-semibold text-white leading-[1.3]"
            style={{ fontSize: "16px" }}
          >
            ©2026 Fungsi(X)
          </span>
          <nav className="flex items-center flex-wrap" style={{ gap: "24px" }}>
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="font-manrope font-semibold text-white hover:opacity-70 transition-opacity leading-[1.3]"
                style={{ fontSize: "16px" }}
              >
                {link}
              </a>
            ))}
          </nav>
        </div>

        {/* Large CTA text */}
        <p
          className="font-manrope font-semibold text-white leading-[1.4]"
          style={{ fontSize: "clamp(24px, 4.5vw, 64px)" }}
        >
          We&apos;re always excited to hear from people who believe in what they&apos;re creating.{" "}
          <span style={{ color: "rgba(255,255,255,0.5)" }}>
            Let&apos;s Collaborate →
          </span>
        </p>
      </div>
    </footer>
  );
}
