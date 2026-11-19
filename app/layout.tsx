import "./illustrations.css";
import "./motion-phase-2.css";
import PhaseTwoMotion from "../components/motion/phase-two-motion";
import type { Metadata } from "next";
import "./globals.css";
import ThemeToggle from "../components/theme-toggle";
import GoogleAnalytics from "../components/google-analytics";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lotolipi.space"),
  title: {
    default: "Shilpi Mishra — Product Designer",
    template: "%s",
  },
  description: "I design complex products that feel clear. Enterprise UX, design systems and data experiences.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Lotolipi",
    title: "Shilpi Mishra — Product Designer",
    description: "I design complex products that feel clear. Enterprise UX, design systems and data experiences.",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><a className="loto-skip-link" href="#main-content">Skip to main content</a>{children}<PhaseTwoMotion/><ThemeToggle/><GoogleAnalytics/></body></html>}
