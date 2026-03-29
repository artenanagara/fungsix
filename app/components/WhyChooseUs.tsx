import React from "react";
import Reveal from "./Reveal";

const ITEMS = [
  {
    num: "01",
    title: "End-to-End Execution",
    body: "One partner, full responsibility. From the first brief to the final breakdown — we own every step so nothing falls through.",
  },
  {
    num: "02",
    title: "In-House Production",
    body: "No outsourcing. No middlemen. No surprises. Every build, every shoot, every set — handled by our own team.",
  },
  {
    num: "03",
    title: "Global IP Experience",
    body: "We've executed for clients who demand perfection at a global standard. We know exactly what world-class looks like because we've delivered it.",
  },
  {
    num: "04",
    title: "Detail-Driven",
    body: "The difference between good and unforgettable is always in the details. We obsess over every element so your audience feels every bit of it.",
  },
];

export default function WhyChooseUs() {
  return (
    <div className="relative">
      {/* Global Shield to hide items scrolling up into the padding zone */}
      <div className="sticky top-0 w-full bg-white z-20 pointer-events-none" style={{ height: "100px" }} />
      
      <section
        className="bg-white px-20 flex relative items-start"
        style={{ gap: "99px", paddingTop: "100px", paddingBottom: "100px", marginTop: "-100px" }}
      >
      {/* Left — static */}
      <div
        className="flex flex-col sticky top-[100px]"
        style={{
          width: "451px",
          flexShrink: 0,
          gap: "24px",
        }}
      >
        <Reveal delay={0.1}>
          <span
            className="font-manrope font-semibold text-[#df2b2b] uppercase"
            style={{ fontSize: "14px", letterSpacing: "2.8px" }}
          >
            Why Choose Us
          </span>
        </Reveal>
        <Reveal delay={0.2}>
          <h2
            className="font-manrope font-bold text-[#111] leading-[1.4]"
            style={{ fontSize: "56px" }}
          >
            One Partner.<br />Everything Covered.
          </h2>
        </Reveal>
        <Reveal delay={0.3}>
          <p
            className="font-manrope font-normal text-[#111]/70 leading-[1.6]"
            style={{ fontSize: "16px" }}
          >
            We don&apos;t hand you off to vendors.<br />
            We handle it all in-house,<br />
            from strategy to execution.
          </p>
        </Reveal>
      </div>

      {/* Right — scrolling items */}
      <div className="flex flex-col" style={{ width: "600px", flexShrink: 0 }}>
        {ITEMS.map((item, i) => (
          <div
            key={i}
            className="flex flex-col relative"
          >
            {/* Standard "Push-Out" Sticky Header (Title + Description) */}
            <div 
              className="flex flex-col sticky top-[100px] bg-white z-10"
              style={{
                borderTop: "1px solid rgba(17,17,17,0.3)",
                paddingTop: "32px",
                paddingBottom: "32px",
                gap: "24px",
              }}
            >
              <div className="flex items-center">
                <div style={{ width: "48px", flexShrink: 0 }}>
                  <span
                    className="font-manrope font-bold text-[#df2b2b] leading-none"
                    style={{ fontSize: "20px" }}
                  >
                    {item.num}
                  </span>
                </div>
                <h3
                  className="font-manrope font-bold text-[#111] leading-[1.3]"
                  style={{ fontSize: "32px" }}
                >
                  {item.title}
                </h3>
              </div>
              <div style={{ paddingLeft: "48px" }}>
                <Reveal delay={0.1}>
                  <p
                    className="font-manrope font-normal text-[#111]/70 leading-[1.6]"
                    style={{ fontSize: "16px" }}
                  >
                    {item.body}
                  </p>
                </Reveal>
              </div>
            </div>

            {/* Image */}
            <Reveal delay={0.2} width="w-full">
              <div
                style={{
                  width: "100%",
                  height: "400px",
                  background: "#d9d9d9",
                  flexShrink: 0,
                  marginBottom: "32px",
                }}
              />
            </Reveal>
          </div>
        ))}
      </div>
    </section>
    </div>
  );
}
