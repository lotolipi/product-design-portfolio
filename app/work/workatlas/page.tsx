import EditorialEvidence from "./EditorialEvidence";
import DataExperience from "../DataExperience";
import type { Metadata } from "next";
import markup from "./portfolio.html.json";
import ExperienceChallenge from "../ExperienceChallenge";

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
  const boundary = markup.indexOf("</header>", markup.indexOf('<header class="topbar"')) + "</header>".length;
  return <><link rel="stylesheet" href="/assets/portfolio.css" /><link rel="stylesheet" href="/assets/experience-layer.css" /><div dangerouslySetInnerHTML={{ __html: markup.slice(0,boundary) }} /><ExperienceChallenge kind="workatlas" /><link rel="stylesheet" href="/assets/lvis-data.css" /><DataExperience kind="workatlas" /><EditorialEvidence /><div id="case-study-reading" dangerouslySetInnerHTML={{ __html: markup.slice(boundary) }} /></>;
}
