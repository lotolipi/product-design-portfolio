import type { Metadata } from "next";
import markup from "./portfolio.html.json";

export const metadata: Metadata = {
  "title": "WorkAtlas Case Study | Lotolipi",
  "description": "How the WorkAtlas enterprise UX prototype handled task ownership and reassignment.",
  "alternates": {
    "canonical": "/work/workatlas"
  },
  "openGraph": {
    "title": "WorkAtlas Case Study | Lotolipi",
    "description": "How the WorkAtlas enterprise UX prototype handled task ownership and reassignment.",
    "url": "/work/workatlas"
  }
};

export default function PortfolioPage() {
  return <><link rel="stylesheet" href="/assets/portfolio.css" /><div dangerouslySetInnerHTML={{ __html: markup }} /></>;
}
