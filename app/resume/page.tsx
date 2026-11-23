import type { Metadata } from "next";
import markup from "./portfolio.html.json";

export const metadata: Metadata = {
  "title": "Shilpi Mishra, R\u00e9sum\u00e9 | Lotolipi",
  "description": "Experience, education and a downloadable one-page r\u00e9sum\u00e9.",
  "alternates": {
    "canonical": "/resume"
  },
  "openGraph": {
    "title": "Shilpi Mishra, R\u00e9sum\u00e9 | Lotolipi",
    "description": "Experience, education and a downloadable one-page r\u00e9sum\u00e9.",
    "url": "/resume"
  }
};

export default function PortfolioPage() {
  return <><link rel="stylesheet" href="/assets/portfolio.css" /><div dangerouslySetInnerHTML={{ __html: markup }} /></>;
}
