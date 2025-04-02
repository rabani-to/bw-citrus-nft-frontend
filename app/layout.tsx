import Web3Provider from "./Web3Provider";

import "@/styles/globals.css";

import { DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import React from "react";

const dmSans = DM_Sans({
  subsets: [],
  weight: ["500", "800", "900"],
  display: "fallback",
  variable: "--font-default",
});

const wbb = localFont({
  src: "../assets/fonts/western_bang_bang/regular.ttf",
  weight: "normal",
  display: "fallback",
  adjustFontFallback: "Arial",
  variable: "--font-wbb",
});

export const metadata = {
  title: "The Citrus Cartel ― Lemon Dapp",
  description:
    "The Citrus Cartel rises from ashes, 7 years after nukes destroyed all. We are defenders of Lemon Trees, the only vegetation that inexplicably survived this lifeless environment. In adversities we protect Lemon Trees, bringing hope in dark times.",
};

export default function RootLayout({ children }: Readonly< { children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.className} ${dmSans.variable} ${wbb.variable}`}
      >
        <Script
          src="https://tally.so/widgets/embed.js"
          strategy="afterInteractive"
        />
        <Web3Provider> {children}</Web3Provider>
      </body>
    </html>
  );
}
