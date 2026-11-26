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
  return <><link rel="stylesheet" href="/assets/portfolio.css" /><style>{"@media(max-width:47rem){\n#case-studies.work{padding-block:56px 48px}\n#case-studies>.wrap{padding-inline:24px}\n#case-studies .work-head{margin:0 0 32px;text-align:left}\n#case-studies #studies-title{font-size:clamp(2.5rem,10vw,2.75rem);line-height:1.08;letter-spacing:-.045em;margin:0;animation:none;transform:none}\n#case-studies .study-index{display:grid;grid-template-columns:minmax(0,1fr);gap:0}\n#case-studies .study-index article{min-width:0;margin:0;padding:0 0 24px}\n#case-studies .study-index article+article{border-top:1px solid currentColor;border-color:color-mix(in srgb,currentColor 20%,transparent);padding-top:28px}\n#case-studies .study-index article>a{display:grid;grid-template-columns:minmax(0,1fr);gap:0;text-decoration:none;color:inherit}\n#case-studies .study-index img{display:block;width:100%;height:auto;aspect-ratio:16/10;object-fit:contain;border-radius:12px;margin:0 0 18px}\n#case-studies .study-index .label{font-size:.8125rem;font-weight:500;line-height:1.4;letter-spacing:.01em;margin:0 0 6px;color:inherit}\n#case-studies .study-index h3{font-size:clamp(1.75rem,7.5vw,2rem);line-height:1.12;letter-spacing:-.035em;margin:0 0 8px}\n#case-studies .study-index p:not(.label){font-size:1rem;line-height:1.5;margin:0;max-width:40ch}\n#case-studies .study-index .inline-link{font-size:.875rem;font-weight:550;min-height:44px;margin:4px 0 0;text-decoration:none;justify-self:start}\n#case-studies .study-index a:focus-visible{outline:2px solid currentColor;outline-offset:4px}\n#case-studies .social-context{border-top:1px solid currentColor;border-color:color-mix(in srgb,currentColor 20%,transparent);margin:0;padding:20px 0 0;font-size:.875rem}\n#case-studies .social-context .inline-link{font-weight:500;line-height:1.5;overflow-wrap:anywhere}\n}"}</style><div dangerouslySetInnerHTML={{ __html: markup }} /></>;
}
