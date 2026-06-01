import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCallBar } from "@/components/layout/MobileCallBar";
import { ScrollProgress } from "@/components/ui/Motion";
import { JsonLd, localBusinessSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import { asset } from "@/lib/asset";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

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
    <html lang="en" className={`${sora.variable} ${inter.variable} antialiased`}>
      <body className="min-h-screen bg-graphite text-bone">
        <JsonLd data={localBusinessSchema()} />
        <link rel="preload" as="image" href={asset("/photos/hero-main.webp")} type="image/webp" fetchPriority="high" />
        <ScrollProgress />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-molten focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-void"
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
