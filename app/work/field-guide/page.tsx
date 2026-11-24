import type { Metadata } from "next";
import markup from "./portfolio.html.json";

export const metadata: Metadata = {
  "title": "Field Guide Case Study | Lotolipi",
  "description": "Designing a flexible exhibition route around time, interests and access.",
  "alternates": {
    "canonical": "/work/field-guide"
  },
  "openGraph": {
    "title": "Field Guide Case Study | Lotolipi",
    "description": "Designing a flexible exhibition route around time, interests and access.",
    "url": "/work/field-guide"
  }
};

export default function PortfolioPage() {
  return <><link rel="stylesheet" href="/assets/portfolio.css" /><div dangerouslySetInnerHTML={{ __html: markup }} /></>;
}
