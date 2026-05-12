import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageVisitTracker from "@/components/PageVisitTracker";
import SiteBreadcrumbs from "@/components/SiteBreadcrumbs";
import StickyCallButton from "@/components/StickyCallButton";
import { brandName, siteUrl } from "@/data/site";
import { buildSiteGraphSchema } from "@/lib/seo";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${brandName} | Tulare County Landscaping for Homeowners`,
    template: `%s | ${brandName}`
  },
  description:
    "Tulare County homeowners: get matched with vetted local landscaping contractors for turf, sod, irrigation, lighting, yard cleanup, and gravel. Free introductions and same-week walkthroughs.",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }]
  },
  openGraph: {
    title: `${brandName} | Tulare County Landscaping for Homeowners`,
    description:
      "Match with licensed landscaping contractors across Tulare County for installs, repairs, and outdoor upgrades.",
    url: siteUrl,
    siteName: brandName,
    type: "website",
    locale: "en_US",
    images: [{ url: "/facebook-banner-840x360.png", width: 840, height: 360, alt: brandName }]
  },
  twitter: {
    card: "summary_large_image",
    title: `${brandName} | Tulare County Landscaping for Homeowners`,
    description:
      "Vetted local landscaping contractors — turf, sod, irrigation, lighting, cleanup, and gravel across Tulare County."
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
        <PageVisitTracker />
        <SiteBreadcrumbs />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyCallButton />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
