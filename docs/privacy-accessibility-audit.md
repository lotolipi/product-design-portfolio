# Lotolipi privacy, consent and accessibility audit
Date: 2026-11-16
Source: seo/phase-2-page-metadata (snapshot at branch creation)
Scope: repository source inspection, not live-browser accessibility testing or legal advice.

## Verified source observations
- No app/privacy, app/cookies or app/terms route in inspected repository tree.
- No cookie banner or consent-management component in inspected source tree.
- No Google Analytics script or GA4 package in inspected source tree; externally injected scripts or Vercel configuration are unverified.
- ContactComposer opens a mailto draft in the visitor's email application; no server submission in that component. The form uses visible labels and HTML required fields.
- ThemeToggle saves bright/dark choice to localStorage under lotolipi-theme; disclose this local preference storage.
- Some images have descriptive alt text, including WorkAtlas and Lottolov artwork. Full image and decorative SVG audit is pending.
- Lottolov sends visitors to external Payhip and Etsy shops; the portfolio does not implement its own checkout.
- Existing navigation uses accessible names and the HTML root specifies lang=en.

## Work proposed (not yet implemented)
1. Confirm hosting analytics, GA4 Measurement ID, and any externally injected tracking before deciding on a cookie banner and consent mode.
2. Add accurate privacy notice describing actual hosting logs, contact mailto, local theme preference, optional analytics and external destinations. Do not assert zero tracking without verifying hosting configuration.
3. Add a privacy contact and request/deletion process; distinguish information held by the site operator from data held by third-party shops.
4. Add a minimal footer privacy link and optional cookie notice; preserve layout, typography and light/dark themes.
5. Run keyboard-only testing, focus-visible review, automated contrast audit in both themes, image-alt review and reduced-motion review.
6. Review accessibility of third-party embeds and any new analytics scripts.
7. Verify claims and ensure portfolio evidence is not represented as production impact.

## Not automatically required
- Refund policy on this portfolio: purchases occur on external storefronts; check their respective policies.
- Terms page: consider if portfolio services or direct transactions are introduced.
- Cookie banner: conditional on actual tracking and applicable jurisdiction; don't introduce an unnecessary banner.

## Release guardrails
- This branch contains documentation only.
- Do not merge into main, deploy to Vercel, or add paid services without explicit approval.
- Legal notices require factual confirmation before publication.
