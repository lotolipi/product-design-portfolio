import type { Metadata } from "next";


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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body id="top">{children}<GoogleAnalytics /></body></html>;
}
