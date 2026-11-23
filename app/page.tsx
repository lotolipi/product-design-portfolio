import type { Metadata } from "next";
import markup from "./portfolio.html.json";

export const metadata: Metadata = {
  "title": "Lotolipi | Shilpi Mishra, Product Designer",
  "description": "Product design portfolio of Shilpi Mishra.",
  "alternates": {
    "canonical": "/"
  },
  "openGraph": {
    "title": "Lotolipi | Shilpi Mishra, Product Designer",
    "description": "Product design portfolio of Shilpi Mishra.",
    "url": "/"
  }
};

export default function PortfolioPage() {
  return <><link rel="stylesheet" href="/assets/portfolio.css" /><div dangerouslySetInnerHTML={{ __html: markup }} /></>;
}
