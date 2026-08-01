import type { Metadata } from "next";
import { Playfair_Display, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "../styles/globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import SiteChrome from "@/components/ui/SiteChrome";
import content from "@/data/content.json";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});


export const metadata: Metadata = {
  title: content.site.title,
  description: content.site.description,
  keywords: [
    "Gerald Gumahad",
    "SEO specialist Cebu",
    "SEO specialist Philippines",
    "data analyst Philippines",
    "AEO GEO optimization",
    "technical SEO",
    "Semrush audits",
    "Google Search Console",
    "data analytics portfolio",
  ],
  authors: [{ name: "Gerald Gumahad", url: content.site.url }],
  creator: "Gerald Gumahad",
  metadataBase: new URL(content.site.url),
  alternates: { canonical: "/" },
  openGraph: {
    title: content.site.title,
    description: content.site.description,
    url: content.site.url,
    siteName: "Gerald Gumahad — Portfolio",
    images: [{ url: content.site.ogImage, width: 1200, height: 630, alt: "Gerald Gumahad — SEO Specialist & Data Analyst" }],
    type: "website",
    locale: "en_PH",
  },
  twitter: {
    card: "summary_large_image",
    title: content.site.title,
    description: content.site.description,
    images: [content.site.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

/* ============================================================
   STRUCTURED DATA (JSON-LD) — Person + Website + ProfileAEO
   Written for AEO/GEO: gives AI search (ChatGPT, Perplexity,
   Google AI Overviews) an unambiguous, machine-readable answer
   to "who is Gerald Gumahad" and "what does he do."
   ============================================================ */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${content.site.url}/#person`,
  name: "Gerald Gumahad",
  alternateName: "GG",
  url: content.site.url,
  image: `${content.site.url}${content.about.image}`,
  jobTitle: ["SEO Specialist", "Data Analyst"],
  description: content.site.description,
  address: { "@type": "PostalAddress", addressLocality: "Cebu City", addressRegion: "Central Visayas", addressCountry: "PH" },
  knowsAbout: [
    "Search Engine Optimization",
    "Technical SEO",
    "AI Search Optimization (AEO/GEO)",
    "Data Analysis",
    "Google Analytics 4",
    "Power BI",
    "Semrush",
    "Excel VBA",
  ],
  sameAs: [],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${content.site.url}/#website`,
  url: content.site.url,
  name: "Gerald Gumahad — Portfolio",
  description: content.site.description,
  publisher: { "@id": `${content.site.url}/#person` },
  inLanguage: "en-PH",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Google Analytics — Measurement ID: G-9DGGR17GN7 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9DGGR17GN7"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9DGGR17GN7');
          `}
        </Script>
        <Script id="ld-person" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(personSchema)}
        </Script>
        <Script id="ld-website" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(websiteSchema)}
        </Script>
      </head>
      <body
        className={`${playfair.variable} ${plexSans.variable} ${jetbrains.variable} font-body antialiased`}
      >
        <ThemeProvider>
          <SiteChrome>{children}</SiteChrome>
        </ThemeProvider>
      </body>
    </html>
  );
}
