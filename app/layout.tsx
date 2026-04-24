import type { Metadata } from "next";
import { Fraunces, Montserrat, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mikaismayilli.com"),
  title: "Mika Ismayilli — Data Scientist",
  description:
    "Behavioral scientist turned data scientist. MSBA candidate at Boston University. I build models, run experiments, and ship tools.",
  openGraph: {
    title: "Mika Ismayilli — Data Scientist",
    description:
      "Behavioral scientist turned data scientist. MSBA candidate at Boston University.",
    type: "website",
    locale: "en_US",
    url: "https://mikaismayilli.com",
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
      className={`${fraunces.variable} ${montserrat.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
