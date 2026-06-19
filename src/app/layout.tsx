import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://valentia.com";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Valentia | Wellness built on patience",
    template: "%s | Valentia",
  },
  description:
    "Naturopath-formulated, plant-led skincare for the woman whose body has stopped making sense. Start with the five-minute self-audit.",
  applicationName: "Valentia",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Valentia | Wellness built on patience",
    description:
      "Start with the five-minute self-audit for skin in transition.",
    url: "/",
    siteName: "Valentia",
    images: [
      {
        url: "/valentia/allisonharp_valentiaseptember-64-mqk5osc8.jpeg",
        width: 1200,
        height: 1800,
        alt: "Valentia Vitamin C Serum bottle and packaging",
      },
    ],
    locale: "en_NZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Valentia | Wellness built on patience",
    description:
      "Start with the five-minute self-audit for skin in transition.",
    images: ["/valentia/allisonharp_valentiaseptember-64-mqk5osc8.jpeg"],
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
      className={`${jost.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
