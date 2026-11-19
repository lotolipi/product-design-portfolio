# Lotolipi post-release QA — Prototype 01 and recruiter integration

## Verified
- Production Vercel deployment dpl_HDJpDjzVXnayifqMVRvbXPuNUmP3 is READY for main commit 78cfe09d844f5fe21a83c25ffbc42a1fea61cd97.
- Prototype 01's original illustration components are present on main; opening motion runs on page load unless prefers-reduced-motion is enabled.
- PR #17 is diverged from main (four commits ahead, two behind) and GitHub reports it non-mergeable. Its homepage edit overlaps Prototype 01.
- Main CSS animated SVG groups using translate/scale, potentially overriding the groups' authored SVG transform attributes and displacing illustrated panels.

## Prepared on this branch
- Reapplied recruiter hero copy and résumé CTA directly onto current main without removing OpeningMotion or original artwork.
- Carried forward PR #17 WorkAtlas hero résumé/contact CTAs and recruiter-oriented contact copy.
- Replaced SVG group movement with opacity-only motion to preserve authored illustration transforms.
- No layout redesign, illustration swap, or production deployment.

## Still requires browser/device verification
- iPhone Safari at 375px and 390px: full reload shows opening, no clipping or artwork displacement, CTA remains tappable.
- Desktop 1440px and tablet 768px: opening and hero sequencing, responsive layout and horizontal overflow.
- Light and dark mode: original illustrations and black eye details unchanged.
- Reduce Motion enabled: opening absent and content fully usable.
- Navigation: home → WorkAtlas → résumé → contact; PDF and copy-email interactions.
- Screen-reader and keyboard checks: opening aria-hidden, focus remains usable.
- Avoid treating successful CI as evidence of visual QA.

## Release guardrails
- Keep PR #17 open until the integration strategy is approved; do not merge it directly into main.
- Do not merge or deploy this QA branch without explicit approval.
