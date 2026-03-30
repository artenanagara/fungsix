import Reveal from "./Reveal";

// Pure CSS sticky stacking.
// Each card sticks at an increasing top offset. Higher z-index cards cover
// the content of lower ones as the user scrolls — pure CSS, zero JS animation.
// Section height = natural content height → no empty space at bottom.

const NAVBAR_H = 80;
const TITLE_H  = 88; // height of collapsed title bar

const ITEMS = [
  {
    num: "01",
    title: "End-to-End Execution",
    body: "One partner, full responsibility. From the first brief to the final breakdown — we own every step so nothing falls through.",
    showImage: true,
  },
  {
    num: "02",
    title: "In-House Production",
    body: "No outsourcing. No middlemen. No surprises. Every build, every shoot, every set — handled by our own team.",
    showImage: true,
  },
  {
    num: "03",
    title: "Global IP Experience",
    body: "We've executed for clients who demand perfection at a global standard. We know exactly what world-class looks like because we've delivered it.",
    showImage: true,
  },
  {
    num: "04",
    title: "Detail-Driven",
    body: "The difference between good and unforgettable is always in the details. We obsess over every element so your audience feels every bit of it.",
    showImage: true,
  },
];

export default function WhyChooseUs() {
  return (
    <section
      className="bg-white flex flex-col md:flex-row items-start"
      style={{
        gap: "clamp(40px, 6vw, 99px)",
        paddingTop: "clamp(60px, 8vw, 100px)",
        paddingBottom: "clamp(60px, 8vw, 100px)",
        paddingLeft: "clamp(16px, 5vw, 80px)",
        paddingRight: "clamp(16px, 5vw, 80px)",
      }}
    >
      {/* Left column — sticky */}
      <div
        className="md:sticky flex flex-col w-full md:w-auto md:flex-shrink-0"
        style={{ top: NAVBAR_H + 20, maxWidth: 451, gap: 24 }}
      >
        <Reveal delay={0.1}>
          <span
            className="font-manrope font-semibold text-[#df2b2b] uppercase"
            style={{ fontSize: 14, letterSpacing: "2.8px" }}
          >
            Why Choose Us
          </span>
        </Reveal>
        <Reveal delay={0.2}>
          <h2
            className="font-manrope font-bold text-[#111] leading-[1.4]"
            style={{ fontSize: "clamp(32px, 5vw, 56px)" }}
          >
            One Partner.<br />Everything Covered.
          </h2>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="font-manrope text-[#111]/60 leading-[1.7]" style={{ fontSize: 16 }}>
            We don&apos;t hand you off to vendors.<br />
            We handle it all in-house,<br />
            from strategy to execution.
          </p>
        </Reveal>
      </div>

      {/* Right column — sticky stacking cards */}
      <div className="flex-1 w-full" style={{ minWidth: 0 }}>
        {ITEMS.map((item, i) => (
          <div
            key={i}
            className="md:sticky bg-white"
            style={{
              top: NAVBAR_H + i * TITLE_H,
              zIndex: i + 1,
            }}
          >
            <div style={{ borderTop: "1px solid rgba(17,17,17,0.15)" }}>
              {/* Title bar — always visible */}
              <div
                style={{
                  height: TITLE_H,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 6,
                }}
              >
                <span
                  className="font-manrope font-bold"
                  style={{ fontSize: 13, color: "#df2b2b", lineHeight: 1 }}
                >
                  {item.num}
                </span>
                <h3
                  className="font-manrope font-bold text-[#111]"
                  style={{ fontSize: "clamp(18px, 2vw, 26px)", lineHeight: 1.2, margin: 0 }}
                >
                  {item.title}
                </h3>
              </div>

              {/* Content — covered by next card as user scrolls */}
              <div style={{ paddingBottom: 32 }}>
                <p
                  className="font-manrope text-[#111]/60"
                  style={{ fontSize: 15, lineHeight: 1.75, marginTop: 8, marginBottom: item.showImage ? 20 : 0 }}
                >
                  {item.body}
                </p>
                {item.showImage && (
                  <div style={{ width: "100%", height: 340, backgroundColor: "#d9d9d9" }} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
