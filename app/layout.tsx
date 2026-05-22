import type { Metadata, Viewport } from "next";
import { Anton, Space_Grotesk, JetBrains_Mono, Caveat } from "next/font/google";
import "./globals.css";

const display = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const scrawl = Caveat({
  subsets: ["latin"],
  variable: "--font-scrawl",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#3aa8f0",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://leaptroll.vercel.app"),
  title: "$LEAPTROLL — real troll. real cause. real community.",
  description: "The token vs. the entire fake charity meta. While Leap/Donate.gg stay silent, $LEAPTROLL onboards everyone they screwed over.",
  openGraph: {
    title: "$LEAPTROLL",
    description: "Real troll. Real cause. Real community.",
    images: ["/banner.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@leaptroll_xyz",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable} ${scrawl.variable}`}>
      <head>
        <link rel="icon" href="/mascot.jpg" />
      </head>
      <body className="grain font-sans antialiased">{children}</body>
    </html>
  );
}
