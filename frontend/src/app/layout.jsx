import { Playfair_Display, Inter } from "next/font/google";
import Navbar from "@components/layout/Navbar.jsx";
import Footer from "@components/layout/Footer.jsx";
import FloatingActions from "@components/layout/FloatingActions.jsx";
import { SITE_URL } from "@lib/constants.js";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

/**
 * Default metadata for every page. Individual pages override `title`
 * and `description` via their own `export const metadata` or
 * `generateMetadata()` — this is the SEO foundation the old Vite SPA
 * couldn't provide, since a client-only app can't inject per-page
 * <title>/<meta> tags into the HTML a crawler first sees.
 */
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Opulent Homes | Premium Real Estate in Mira Road, Bhayandar & Mumbai",
    template: "%s | Opulent Homes",
  },
  description:
    "Opulent Homes curates ultra-premium, verified real estate listings across Mira Road, Bhayandar, and Mumbai. Vetted builders, transparent pricing, dedicated advisors.",
  icons: {
    icon: "/opulent-icon.png",
    apple: "/opulent-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "Opulent Homes",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col bg-ivory">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
