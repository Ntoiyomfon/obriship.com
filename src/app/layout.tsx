import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Bricolage_Grotesque } from "next/font/google";
import "leaflet/dist/leaflet.css";

import { Providers } from "@/components/layout/Providers";
import { env } from "@/lib/env";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"]
});

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display", 
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  preload: false,
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
    <html lang="en" className={`${bricolageGrotesque.variable} ${inter.variable} ${jetBrainsMono.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
