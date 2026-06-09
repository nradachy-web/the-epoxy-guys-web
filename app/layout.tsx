import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCallBar } from "@/components/layout/MobileCallBar";
import { ScrollProgress } from "@/components/ui/Motion";
import { JsonLd, localBusinessSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import { asset } from "@/lib/asset";

// Fraunces — the one editorial serif voice. Variable axes (opsz, SOFT, WONK)
// drive optical sizing so large headlines read like a real foundry cut.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});
// Geist — the deliberate anti-Inter grotesque. The workhorse for ~95% of the page.
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
  weight: ["400", "500", "600"],
});
// Geist Mono — the engineered voice: every technical label, index, and figure.
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Epoxy Floor Coatings in Flint & Grand Blanc, MI | The Epoxy Guys",
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "epoxy floor",
    "epoxy garage floor",
    "concrete coatings",
    "epoxy basement floor",
    "polyaspartic coating",
    "polished concrete",
    "commercial epoxy flooring",
    "metallic epoxy",
    "epoxy flooring near me",
    "Flint MI",
    "Grand Blanc MI",
    "Genesee County epoxy",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: "One-Day Epoxy Floors in Genesee County, MI | The Epoxy Guys",
    description: site.description,
    images: [{ url: "/og/og-default.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "One-Day Epoxy Floors in Genesee County, MI | The Epoxy Guys",
    description: site.tagline,
    images: ["/og/og-default.jpg"],
  },
  alternates: { canonical: site.url },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${geist.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-screen bg-paper text-ink">
        <JsonLd data={localBusinessSchema()} />
        <link rel="preload" as="image" href={asset("/photos/graded/gallery-real-02.jpg")} type="image/jpeg" fetchPriority="high" />
        <ScrollProgress />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-paper"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <div className="h-[calc(3.25rem+env(safe-area-inset-bottom))] lg:hidden" aria-hidden />
        <MobileCallBar />
      </body>
    </html>
  );
}
