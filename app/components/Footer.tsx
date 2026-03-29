


const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "X", href: "#" },
  { label: "LinkedIn", href: "#" },
];

const NAV_LINKS = ["Works", "Services", "About"];

export default function Footer() {
  return (
    <footer
      className="bg-[#111] px-20 flex flex-col h-screen"
      style={{ paddingTop: "100px", paddingBottom: "32px", gap: "200px" }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <div style={{ width: "593px", height: "100px", display: "flex", alignItems: "center" }}>
          <span
            className="font-manrope font-bold text-white leading-none"
            style={{ fontSize: "72px", letterSpacing: "-2px" }}
          >
            FUNGSI<span style={{ color: "#DF2B2B" }}>(X)</span>
          </span>
        </div>

        {/* Links */}
        <div className="flex justify-between" style={{ width: "400px" }}>
          <div className="flex flex-col" style={{ gap: "16px" }}>
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
        <div className="flex items-center justify-between">
          <span
            className="font-manrope font-semibold text-white leading-[1.3]"
            style={{ fontSize: "16px" }}
          >
            ©2026 Fungsi(X)
          </span>
          <nav className="flex items-center" style={{ gap: "32px" }}>
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
          style={{ fontSize: "64px" }}
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
