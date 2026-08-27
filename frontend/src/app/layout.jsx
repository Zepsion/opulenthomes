import { Inter } from "next/font/google";
import Navbar from "@components/layout/Navbar.jsx";
import Footer from "@components/layout/Footer.jsx";
import FloatingActions from "@components/layout/FloatingActions.jsx";
import { SITE_URL } from "@lib/constants.js";
import "./globals.css";

// ── Site font: SINGLE SOURCE OF TRUTH ─────────────────────────────
// Poore website ka font yahin se decide hota hai. Future mein change
// karna ho? Bas neeche `Inter` ki jagah doosra next/font import likho —
// baaki kahin kuch nahi badalna padega.
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans", // body text
  display: "swap",
});

const interDisplay = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display", // headings (pehle Playfair Display tha)
  display: "swap",
});

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
    <html lang="en" className={`${inter.variable} ${interDisplay.variable}`}>
      <body className="flex min-h-screen flex-col bg-ivory">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}