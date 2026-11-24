import type { Metadata } from "next";
import markup from "./portfolio.html.json";
import ExperienceChallenge from "../ExperienceChallenge";

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
  const boundary = markup.indexOf("</header>", markup.indexOf('<header class="topbar"')) + "</header>".length;
  return <><link rel="stylesheet" href="/assets/portfolio.css" /><link rel="stylesheet" href="/assets/experience-layer.css" /><div dangerouslySetInnerHTML={{ __html: markup.slice(0,boundary) }} /><ExperienceChallenge kind="field-guide" /><div id="case-study-reading" dangerouslySetInnerHTML={{ __html: markup.slice(boundary) }} /></>;
}
