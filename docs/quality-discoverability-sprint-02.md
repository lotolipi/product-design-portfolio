# Lotolipi Quality & Discoverability — Sprint 02

## Scope and evidence (19 November 2026)
Read-only inspection of production source on `main`, plus the two narrowly scoped improvements proposed on this branch. No browser Lighthouse run, Google Search Console data, real-device audit, or independent screen-reader testing has been performed. Do not label those tests as passed.

## SEO and indexing
- `app/layout.tsx`: metadataBase, home canonical, Open Graph metadata, Twitter card and index/follow robots metadata exist.
- WorkAtlas, résumé, Lottolov and privacy routes define their own canonical URLs. Confirm generated HTML canonical URLs on all routes before declaring this a pass; child metadata normally overrides the parent value in Next.js.
- `app/robots.ts` allows crawling and advertises the XML sitemap.
- `app/sitemap.ts` lists the home, WorkAtlas, résumé and Lottolov routes. This branch adds the privacy route.
- Confirm HTTP 200, indexability, sitemap output and canonical tags on the actual public domain. Inspect Search Console indexing and structured-data results separately; repository inspection cannot verify search-engine indexing.

## Accessibility
- Shared layout provides an English document language and a skip-to-content link.
- Pages include a `main#main-content` target; home and résumé have a single prominent H1; links and forms have accessible text/labels in reviewed source.
- Reduced-motion preference is accounted for in global CSS and the opening animation.
- This branch adds `aria-live="polite"` to the contact copy-email button, to expose its confirmation text to assistive technologies.
- Pending real browser checks: keyboard-only navigation, skip link focus, modal/overlay behavior, screen reader reading order, WCAG contrast for both themes, zoom at 200–400%, 320px width, and touch target sizing.

## Mobile and performance
- Responsive media rules exist, but this is not evidence of correct iPhone Safari rendering.
- Check iPhone Safari and Android Chrome for opening animation, illustration transforms, navigation overflow, sticky/fixed controls, form input zoom, and dark mode.
- Run Lighthouse mobile and desktop for /, /work/workatlas, /resume and /lottolov; record LCP, CLS, INP (field data if available), accessibility and SEO results. No numerical scores are claimed.
- Inspect image payloads and next/image opportunities only after establishing baseline. Avoid visual redesign or illustration replacement.

## Recruiter path
- Home features WorkAtlas and résumé CTA; WorkAtlas offers résumé/contact; résumé offers WorkAtlas/contact; home contact has mailto draft and copy-email fallback.
- Test end-to-end navigation and copy-email behavior on a real device, including when no email client is configured.
- Copy-email feedback is now announced via an aria-live region, but still requires manual assistive-technology verification.

## Release rules
This branch is a draft-only preparation. No production merge, manual Vercel deployment, visual redesign or change to original illustrations is authorized. Obtain approval after checks and preview review.
