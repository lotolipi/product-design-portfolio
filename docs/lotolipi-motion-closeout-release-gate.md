# Lotolipi portfolio closeout — release gate (20 November 2026)

## Scope and decisions
- Approved: branded opening once per browser tab session; preserve existing original illustrations, black eye details in dark mode, typography, palette, layout, routes and content.
- PR #23 consolidates existing hero choreography with the scroll reveals proposed in older draft PR #14. Do not merge PRs #14 or #15 into main: both were created from older main and their motion overlaps with code already present. Leave them open until PR #23 is approved and merged; then close as superseded, unmerged.
- No production merge or deployment was authorized in this closeout phase.

## Source-grounded checks
| Gate | Evidence | Status |
| --- | --- | --- |
| Motion branches compared | PR #14 adds section observer and competing hero CSS; PR #15 adds opening and hero choreography, portions of which already exist on main | Reviewed |
| Once-per-session opening | sessionStorage key `loto-md02-intro-seen`; optional intro skipped if storage blocked; reduced-motion exits early | Implemented in PR #23; browser behavior untested |
| Editorial scroll reveals | One-time IntersectionObserver, reduced-motion/print CSS, no new assets | Implemented in PR #23; browser behavior untested |
| Public domain ownership | `lotolipi.space` verified in Vercel team with Vercel nameservers | Verified configuration |
| Project domain routing | `www.lotolipi.space` and apex redirect belong to `product-design-portfolio-9dwd`, not `product-design-portfolio` | Verified configuration |
| Preview build for public-domain project | PR #23 commit ec349429, `product-design-portfolio-9dwd` preview READY | Passed build only |
| Other Vercel project preview | Same commit; second project still BUILDING on first status check | Pending at time of record |
| Public HTTP routes | Live URL not reachable from available external fetch environment | Not verified; do not infer outage |
| Search Console indexing | No Search Console property/URL Inspection result inspected | Not verified |
| Lighthouse and Core Web Vitals | No Lighthouse report collected | Not verified |
| Original eye color, both themes, iPhone and reduced motion | No browser screenshots or device QA collected for PR #23 | Not verified |

## Required release QA
1. Preview on iPhone Safari and desktop, light and dark. Check original illustrations and black eye shapes visually.
2. In one tab session, load homepage twice: branded intro first time only. In a new tab session, intro may appear again. Check storage-disabled and reduced-motion cases.
3. Scroll all homepage sections, check one-time reveals, no missing content, focus visibility, print and keyboard navigation.
4. Run Lighthouse mobile/desktop and check console errors; record measured results, not estimates.
5. Verify live HTTP status for homepage, /workatlas, /resume, /privacy, /robots.txt, /sitemap.xml, canonical metadata and outbound resume/contact links.
6. Check Search Console URL Inspection separately; a successful build or sitemap does not prove indexing.
7. Once PR #23 is approved, recheck both Vercel checks, squash-merge PR #23 only, confirm automatic production deployment on the domain-serving project, and then close #14/#15 as superseded. Never manually deploy.

## Open decisions
No further visual direction decisions required. Remaining work is verification and release approval, not new design or another prototype.
