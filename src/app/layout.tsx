import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://valentia.co.nz";

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
    default: "Valentia | One Serum. One Ritual.",
    template: "%s | Valentia",
  },
  description:
    "Valentia is a naturopath-formulated one-product skincare line built around a plant-led vitamin C serum, ingredient transparency, and long-term skin balance.",
  applicationName: "Valentia",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Valentia | One Serum. One Ritual.",
    description:
      "A plant-led vitamin C serum with Kakadu plum, ferulic acid, and botanical oils.",
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
    title: "Valentia | One Serum. One Ritual.",
    description:
      "A naturopath-formulated vitamin C serum for long-term skin balance.",
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
