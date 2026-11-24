import type { Metadata } from "next";
import markup from "./portfolio.html.json";
import ExperienceChallenge from "../ExperienceChallenge";

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
  const boundary = markup.indexOf("</header>", markup.indexOf('<header class="topbar"')) + "</header>".length;
  return <><link rel="stylesheet" href="/assets/portfolio.css" /><link rel="stylesheet" href="/assets/experience-layer.css" /><div dangerouslySetInnerHTML={{ __html: markup.slice(0,boundary) }} /><ExperienceChallenge kind="signal" /><div id="case-study-reading" dangerouslySetInnerHTML={{ __html: markup.slice(boundary) }} /></>;
}
