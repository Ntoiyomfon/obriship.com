import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono, Syne } from "next/font/google";
import "leaflet/dist/leaflet.css";

import { Providers } from "@/components/layout/Providers";
import { env } from "@/lib/env";

import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["700", "800"]
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "700"]
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"]
});

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: "Orbis | Track Anything, Anywhere",
  description:
    "Real-time shipment tracking for international and domestic deliveries. Enter your tracking number and get instant visibility on your package, wherever it is in the world.",
  keywords: [
    "shipment tracking",
    "package tracking",
    "international delivery",
    "real-time tracking",
    "courier tracking",
    "logistics"
  ],
  openGraph: {
    title: "Orbis | Global Shipment Tracking",
    description:
      "Enter your tracking number for instant, real-time visibility on your shipment.",
    siteName: "Orbis",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Orbis — Track Anything, Anywhere",
    description:
      "Enter your tracking number for instant, real-time visibility on your shipment."
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} ${jetBrainsMono.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
