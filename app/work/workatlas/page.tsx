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
  return <><link rel="stylesheet" href="/assets/portfolio.css" /><link rel="stylesheet" href="/assets/experience-layer.css" /><div dangerouslySetInnerHTML={{ __html: markup.slice(0,boundary) }} /><ExperienceChallenge kind="workatlas" /><link rel="stylesheet" href="/assets/lvis-data.css" /><DataExperience kind="workatlas" /><section className="lvis-data" aria-labelledby="workatlas-evidence-title"><p className="lvis-kicker">Design evidence / Manual prototype checks</p><h2 id="workatlas-evidence-title">One system. Clear ownership.</h2><p>15 recorded checks: 14 reported passes and one initial failure. Follow-up retests excluded. These are not usability or business impact metrics.</p><figure style={{margin:0}}><a href="/projects/workatlas/editorial-evidence.svg"><img src="/projects/workatlas/editorial-evidence.svg" width={1200} height={1600} loading="lazy" style={{width:"100%",height:"auto",display:"block",borderRadius:16}} alt="Shared task architecture, blocker workflow, ownership correction and manual checks: Sprint 02, 3 passes; Sprint 03, 5 passes; Sprint 04, 4 passes and 1 initial failure; Sprint 05, 2 reported passes."/></a><figcaption>Open the full-size infographic. Independent prototype, synthetic scenarios.</figcaption></figure><p><a href="https://github.com/lotolipi/workatlas-enterprise-ux/blob/main/docs/VISUAL_EVIDENCE.md">Explore the detailed evidence and limitations</a></p></section><div id="case-study-reading" dangerouslySetInnerHTML={{ __html: markup.slice(boundary) }} /></>;
}
