import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, JetBrains_Mono } from "next/font/google";
import "../styles/globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import content from "@/data/content.json";

/* ============================================================
   FONT CONFIGURATION
   To change fonts, update the Google Fonts imports below.
   ============================================================ */
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
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

/* ============================================================
   SEO METADATA — Edit via /data/content.json → site section
   ============================================================ */
export const metadata: Metadata = {
  title: content.site.title,
  description: content.site.description,
  metadataBase: new URL(content.site.url),
  openGraph: {
    title: content.site.title,
    description: content.site.description,
    url: content.site.url,
    siteName: "Gerald M. Gumahad Portfolio",
    images: [{ url: content.site.ogImage, width: 1200, height: 630 }],
    type: "website",
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
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="dark"
      suppressHydrationWarning
    >
      <body
        className={`${playfair.variable} ${dmSans.variable} ${jetbrains.variable} font-body antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
