import type { Metadata } from "next";
import markup from "./portfolio.html.json";

export const metadata: Metadata = {
  "title": "Lottolov Print Studio | Lotolipi",
  "description": "Original botanical prints and illustrations by Shilpi Mishra.",
  "alternates": {
    "canonical": "/lottolov"
  },
  "openGraph": {
    "title": "Lottolov Print Studio | Lotolipi",
    "description": "Original botanical prints and illustrations by Shilpi Mishra.",
    "url": "/lottolov"
  }
};

export default function PortfolioPage() {
  return <><link rel="stylesheet" href="/assets/portfolio.css" /><div dangerouslySetInnerHTML={{ __html: markup }} /></>;
}
