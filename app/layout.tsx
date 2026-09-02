import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Source_Serif_4,
  IBM_Plex_Mono,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  axes: ["opsz", "wdth"],
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mikaismayilli.vercel.app"),
  title: "Mika Ismayilli — Data Scientist",
  description:
    "Behavioral scientist turned data scientist. MSBA candidate at Boston University. I build models, run experiments, and ship tools.",
  openGraph: {
    title: "Mika Ismayilli — Data Scientist",
    description:
      "Behavioral scientist turned data scientist. MSBA candidate at Boston University.",
    type: "website",
    locale: "en_US",
    url: "https://mikaismayilli.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mika Ismayilli — Data Scientist",
    description: "Behavioral scientist turned data scientist.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${sourceSerif.variable} ${plexMono.variable}`}
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
