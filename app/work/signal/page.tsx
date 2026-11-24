import type { Metadata } from "next";
import markup from "./portfolio.html.json";

export const metadata: Metadata = {
  "title": "Signal Case Study | Lotolipi",
  "description": "Designing an evidence-led workspace for a beverage launch decision.",
  "alternates": {
    "canonical": "/work/signal"
  },
  "openGraph": {
    "title": "Signal Case Study | Lotolipi",
    "description": "Designing an evidence-led workspace for a beverage launch decision.",
    "url": "/work/signal"
  }
};

export default function PortfolioPage() {
  return <><link rel="stylesheet" href="/assets/portfolio.css" /><div dangerouslySetInnerHTML={{ __html: markup }} /></>;
}
