import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--inter",
  weight: ["400", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--manrope",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "FungsiX — Creative Production Agency",
  description:
    "Integrated creative & production agency that turns bold ideas into real, measurable experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body className="antialiased bg-white">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
