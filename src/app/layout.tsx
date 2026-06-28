import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "leaflet/dist/leaflet.css";

import { Providers } from "@/components/layout/Providers";
import { env } from "@/lib/env";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["700"]
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"]
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"]
});

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: "FX Logistics | Real-Time Shipment Tracking",
  description:
    "Track shipments in real time, book freight, and manage delivery status with FX Logistics.",
  keywords: [
    "shipment tracking",
    "package tracking",
    "international delivery",
    "real-time tracking",
    "courier tracking",
    "logistics"
  ],
  openGraph: {
    title: "FX Logistics | Global Shipment Tracking",
    description:
      "Enter your tracking number for instant, real-time visibility on your shipment.",
    siteName: "FX Logistics",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "FX Logistics | Real-Time Shipment Tracking",
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
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetBrainsMono.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
