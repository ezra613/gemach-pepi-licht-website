import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gemach Lahachnossas Kallah Pepi Licht",
  description:
    "Supporting the next generation of Jewish families with interest-free loans and financial guidance for newlyweds across America. Donate today — your love builds futures.",
  metadataBase: new URL("https://gemachpepilicht.org"),
  openGraph: {
    title: "Gemach Lahachnossas Kallah Pepi Licht",
    description:
      "Help Jewish couples facing financial hardship start their marriages with dignity and hope.",
    images: ["/kallah-hall.webp"],
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
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col font-sans"
      >
        {children}
      </body>
    </html>
  );
}
