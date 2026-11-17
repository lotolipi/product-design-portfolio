# Lotolipi accessibility and analytics release gate

Updated: 16 November 2026. Scope: audit/privacy-accessibility-2026-11.

## Confirmed from source
- Global skip link points to focusable `#main-content` on homepage, privacy, Lottolov, WorkAtlas and résumé pages.
- CSS contains `:focus-visible` styling and `prefers-reduced-motion` overrides; coverage and actual contrast remain unverified.
- Theme toggle is a button, exposes its intended next action through `aria-label`, and persists the selection in localStorage (`lotolipi-theme`).
- Contact form labels all four fields, uses browser-required validation, and opens a mailto draft; it does not submit to a website API.
- WorkAtlas imagery has descriptive alt strings, and the chapter navigation is labelled.
- The branch's GitHub Actions production build and TypeScript check passed in runs 43828678739 and 43829216346.

## Browser QA (automated mobile scan performed; manual checks still required)
Test each of /, /privacy, /lottolov, /work/workatlas and /resume in bright and dark modes, at desktop width and 375px mobile width.

1. Tab from page load: skip link becomes visible and Enter moves focus to main content; next Tab proceeds logically.
2. Every navigation, footer, outbound link and theme control has visible focus, no clipped text, and sufficient touch targets.
3. Screen-reader landmarks and headings form a meaningful hierarchy; decorative artwork is not announced unnecessarily; informative visuals have meaningful descriptions.
4. Check WCAG AA text contrast (4.5:1 for normal text, 3:1 for large text) and non-text UI contrast (3:1) on both themes, including hover/focus states.
5. With reduced-motion preference enabled, check no unnecessary motion remains.
6. On homepage: submit contact form with empty and malformed email fields; ensure validation; verify valid submission opens only an email draft and does not send automatically.
7. On WorkAtlas: check all six images load and image-opening links work.
8. On résumé: verify readable layout and Print → Save as PDF output.
9. Check mobile horizontal overflow, navigation wrapping, Lottolov galleries, privacy-page headings, and footer links.

Automated Chromium/axe scan on 16 November 2026 (run 43829216379): all five routes in bright and dark modes at 375px showed one main landmark and one skip link each, with no document horizontal overflow. The scan failed on color-contrast violations on homepage, Lottolov and WorkAtlas and label-content-name-mismatch across all routes. The latter has a source-level correction on the audit branch; further browser verification is pending. This scan does not cover the desktop viewport, actual assistive technology, or manual keyboard and print checks. Record screenshots, browser/OS, failures and fixes before marking manual checks passed.

## Analytics/privacy gate
- Source inspection does not prove whether GA4, Vercel Analytics, hosting request logs or injected scripts are active in production.
- Verify deployed page network requests and Vercel project integrations/environment variables. Record any GA4 Measurement ID privately, not in public audit notes.
- If optional non-essential tracking is active or planned, assess applicable consent and disclosure requirements before enabling it. Do not add a generic cookie banner without identifying actual technologies.
- Confirm the published privacy notice accurately describes the services and data handling.

## Release gate
Do not merge or deploy until browser QA is recorded, analytics/privacy facts are verified, and the owner approves the release. No legal-compliance certification is claimed.

## 17 November 2026 release-candidate checkpoint
- Latest preview deployment for commit `dce9bd3cc9aa45f47e30d50ce6a424fa57dcd0b8` was confirmed **READY** on the correct Vercel project `product-design-portfolio-9dwd`, preview URL: https://product-design-portfolio-9dwd-ap11ty8fg-lottolov.vercel.app/work/workatlas.
- Owner approved proceeding with the **next necessary QA work** after the WorkAtlas dark-mode refinements. This is not recorded as approval to merge or deploy production.
- GitHub commit-specific workflow lookup returned no runs for the latest SHA; earlier successful runs do not certify this SHA.
- Source audit: `app/layout.tsx` contains no GA4 injection; Vercel project environment-variable listing returned no entries, and project integration listing returned no entries. These observations do **not** establish that production network traffic contains no analytics.
- Theme toggle source uses a button, dynamic accessible name, `aria-pressed`, and `lotolipi-theme` local storage. Latest browser verification of labels, contrast, keyboard use, and dark-mode presentation is still required.
- Existing 16 November automated axe failures (color contrast and label/content-name mismatch) remain **open pending a fresh scan**, despite subsequent source changes.
- Remaining hard gates: fresh automated accessibility scan in both themes on all five routes, manual desktop/keyboard/reduced-motion check, production/preview network request inspection and privacy disclosure review, latest-SHA CI confirmation, and explicit final production-release authorization.
- **Do not merge, promote, or manually deploy production** until all hard gates have evidence and owner authorizes release.
