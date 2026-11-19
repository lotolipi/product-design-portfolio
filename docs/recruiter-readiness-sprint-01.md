# Recruiter Readiness — Sprint 01

## Scope and evidence
Audited the `main` versions of `app/page.tsx`, `app/work/workatlas/page.tsx`, `app/resume/page.tsx`, and `components/contact-composer.tsx` on 2026-11-19. Findings below describe code, not measured recruiter behavior or a completed live-browser usability test.

## Verified baseline
- Homepage links to WorkAtlas, résumé, and contact through navigation; hero previously linked to work and about, not résumé.
- WorkAtlas introduction links to a PDF and GitHub; its footer already linked to résumé and contact.
- Résumé page has a downloadable A4 PDF link, WorkAtlas link, and contact link.
- Contact composer provides a mailto draft, direct email, and copy-email fallback; it does not send a message to a server.
- WorkAtlas clearly labels fictional/synthetic prototype data and manual checks, with no production impact claims.

## Changes prepared on this branch (P1–P2)
1. Homepage hero: replace secondary About CTA with direct résumé CTA; add an opportunity-oriented sentence without claiming job availability.
2. WorkAtlas hero: add résumé and contact CTAs adjacent to PDF and GitHub links; keep existing evidence text intact.
3. Contact: explicitly welcome hiring enquiries; retain form and copy-email fallback.

## Remaining QA and next sprint (not implemented)
- Verify all four WorkAtlas hero links visually on mobile and desktop; assess wrapping and tap targets.
- Verify homepage hero button balance and accessibility in light/dark modes.
- Confirm contact anchor behavior and mailto/copy fallback on devices.
- Confirm A4 PDF downloads successfully and matches the on-page résumé.
- Review case-study scanning hierarchy and frame captions; do not imply formal research or production metrics.
- Measure recruiter journey only after analytics instrumentation and privacy review; no conversion claims yet.

## Release guardrails
No new visuals, layout/CSS edits, sensitive client disclosures, production metrics, or changes to the WorkAtlas evidence boundaries. Do not merge or deploy without approval.
