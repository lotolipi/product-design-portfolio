# WorkAtlas image and PDF link audit

Date: 2026-11-16
Scope: Repository existence and Google Drive permission metadata. No merge or deployment.

## Image references
The portfolio component `components/workatlas-image.tsx` builds the image path `/projects/workatlas/frame-0N.png` for N=1..6. All six corresponding files were found on the preparation branch:

- `public/projects/workatlas/frame-01.png`
- `public/projects/workatlas/frame-02.png`
- `public/projects/workatlas/frame-03.png`
- `public/projects/workatlas/frame-04.png`
- `public/projects/workatlas/frame-05.png`
- `public/projects/workatlas/frame-06.png`

Repository presence was confirmed by GitHub file fetch, not by rendering the PNGs or by checking deployed HTTP status. The component's error fallback does not prove deployed availability.

## Google Drive exports
- Case study PDF: `1hbOIAZaUfbbNq1OZzaKGkB7WqoYDD5S7`, `WorkAtlas_CaseStudy_Final.pdf`, 3,373,893 bytes. Google Drive reports `anyone` / `reader` permission.
- Frame export ZIP: `1ZQUW4DRGkSy2FIiUbKQWMeeOwhLmPy0M`, `WorkAtlas_CaseStudy_Exports.zip`, 1,829,848 bytes. Google Drive reports `anyone` / `reader` permission.

Permission metadata establishes link sharing, but not successful anonymous download, PDF rendering, or file-content correctness.

## Outstanding checks
1. After deployment, confirm each `https://www.lotolipi.space/projects/workatlas/frame-0N.png` returns a successful response and displays the correct frame.
2. Confirm the six images visually match their chapter labels and that the PNG click-through works on mobile.
3. Open the PDF and ZIP in a signed-out browser to confirm link access and usable contents.
4. Confirm no social/SEO metadata changes disrupt the WorkAtlas page after the pending branch is merged and deployed.

## Outcome
No missing repository image assets or restricted Drive permission entries were found. **Live render and anonymous link usability remain unverified.**
