import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import StickyCallButton from "@/components/StickyCallButton";
import { brandName, siteUrl } from "@/data/site";
import { buildSiteGraphSchema } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${brandName} | Landscaping Leads in Tulare County`,
  description:
    "We connect Tulare County homeowners with vetted local landscaping pros for turf, sod, irrigation, lighting, cleanup, and gravel projects. Free match & same-week introductions.",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${brandName} | Landscaping Leads in Tulare County`,
    description:
      "Independent referral service matching you with licensed landscaping professionals across Tulare County.",
    url: siteUrl,
    siteName: brandName,
    type: "website",
    locale: "en_US",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: brandName }]
  },
  twitter: {
    card: "summary_large_image",
    title: `${brandName} | Landscaping Leads in Tulare County`,
    description:
      "Vetted local landscaping pros across Tulare County — turf, sod, irrigation, lighting, cleanup, and gravel."
  },
  robots: { index: true, follow: true }
};

export const viewport: Viewport = {
  themeColor: "#05100b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const siteGraph = buildSiteGraphSchema();
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteGraph) }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyCallButton />
      </body>
    </html>
  );
}
