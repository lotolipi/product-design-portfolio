# Lotolipi Sprint 03 — Quality, discoverability and recruiter journey

Audit date: 20 November 2026. Scope: read-only source review of GitHub `main` and attempted public URL inspection. **No real-device, Lighthouse or Search Console results are represented as verified.**

## SEO and indexing
- `app/layout.tsx` defines the production metadata base, home canonical, Open Graph and index/follow directives.
- WorkAtlas, résumé, Lottolov and privacy pages define route-specific canonical metadata; confirm actual generated canonical tags on the live site.
- `app/robots.ts` allows crawlers and references `/sitemap.xml`. `app/sitemap.ts` includes home, WorkAtlas, résumé, Lottolov and privacy.
- The homepage includes Person JSON-LD. Verify Google's interpretation in Rich Results Test and Search Console.
- **Not verified:** Google indexing, URL inspection, actual search visibility, HTTP status and rendered HTML. Public URL inspection from the available external checker failed; this is not proof the site is offline.
- Change in this branch: privacy page gains route-specific Open Graph metadata, avoiding generic homepage sharing information.

## Mobile and accessibility
- Source includes a skip-to-main link, `html lang="en"`, responsive CSS, explicit alt text for reviewed case-study images, labelled contact fields, reduced-motion handling and a theme toggle with an accessible name and pressed state.
- Change in this branch: the homepage featured-work and contact sections now reference their visible heading IDs with `aria-labelledby`.
- **Not verified:** iPhone Safari or Android rendering, touch targets, text zoom, horizontal overflow, contrast, keyboard navigation, focus order, VoiceOver/TalkBack, and actual reduced-motion behavior.

## Performance
- Source includes an opening animation and multiple image-heavy sections. No performance regression or optimization is asserted without measurement.
- **Not verified:** Lighthouse mobile/desktop scores, LCP, CLS, INP, transfer sizes, image decode cost or Core Web Vitals field data.
- Baseline checklist: test `/`, `/work/workatlas`, `/resume`, `/lottolov` on mobile and desktop. Capture screenshots and network traces before considering image/animation changes.

## Recruiter journey
- Homepage → WorkAtlas featured case study and résumé.
- WorkAtlas → résumé and contact; résumé → WorkAtlas and contact.
- Contact composer opens a prefilled `mailto:` draft, and offers direct email and copy-email fallback. Copy feedback uses `aria-live="polite"`.
- Content correctly distinguishes WorkAtlas prototype scenarios from formal research, production security testing and business impact.
- **Not verified:** whether every external PDF destination is reachable, mail client availability, mobile click behavior, and end-to-end recruiter conversion.

## Manual acceptance checklist before any merge
1. Open all five canonical routes and verify HTTP 200, titles, canonical links, robots and social metadata.
2. Inspect Search Console coverage/URL Inspection for homepage, WorkAtlas and résumé. Request indexing only when warranted.
3. Test at 320px, 375px, 390px and desktop, in bright and dark modes, including original illustration eyes.
4. Test keyboard-only navigation, skip link, headings, form labels, theme toggle, copy-email feedback and reduced-motion.
5. Run mobile and desktop Lighthouse; record raw metrics and any real defects.
6. Complete homepage → WorkAtlas → résumé → contact and verify all outbound links.
7. Verify Vercel preview checks; obtain explicit approval before merging or deploying.

No design changes, production deployments, or claims of unmeasured performance gains are included in this sprint.
