# Client reference refinement — 30 October 2026 / 1.1.0

Reference: [Reslink](https://www.reslink.org/), supplied by the user as the client's updated design-language preference. The homepage and subsequent compositions were inspected visually, alongside public page content. Useful principles: light neutral canvas, compact centered navigation, centered hero typography, contained visual panels, deliberate negative space and modular content. No Reslink copy, images, product mockups or source code were reused.

## Layout changes

- Replaced the dark oversized offscreen hero aperture with a centered, bounded wide project photograph, readable supporting copy and a compact primary action.
- Balanced column widths, restrained corner radii and consistent horizontal spacing across home, services, pillars, projects, case studies, About, Insights and Contact.
- Project index and photographic galleries use equal two-column grids; an odd final item is centered. Phones use a single consistent column.
- Project photos use centered `contain` framing to preserve their actual proportions and full content. Photo panels have bounded dimensions instead of filling most of the viewport.
- Removed decorative image rotation, collage imbalance and aggressive zoom/parallax. The three-photo About composition has equally sized aligned frames. Motion remains in text/image reveals, menus, buttons and a smaller contained project sequence.
- Retained the genuine ANZ logo, green accents, existing routes and forms. Source content and enquiry handling are unchanged.

## Source-based photo edits

The user explicitly approved realistic generative edits after discussing the possibility of reconstructed details. Five existing source photos were edited with the built-in imagegen tool: Plotted Development amphitheatre (2397), BHIVE green wall (2304), Salarpuria Sattva pergola (2415), GoodEarth enclosure (2350), and Prime Square (2365).

These are realistic, recognizable source-based enhancements, not new project designs or unaltered raw photographs. They improve framing/perspective, exposure, natural clarity and white balance; fine details may be reconstructed. All original files are retained, and edited masters are kept separately in `output/photo-edits/`. The optimized website variants live in `assets/media/edited/`.

The selected Sattva and Plotted Development cover images were also curated from their existing project galleries to use the improved wider architectural views. No project association was invented.

See `PHOTO_EDIT_PROMPTS.md`, `content-migration/PHOTO_EDIT_REGISTER.json` and `dist/anz-2027-photo-edits.zip` for prompts, source associations, original files and edited masters.

## Local verification

- TypeScript/Vite build and PHP lint pass.
- 44 routes and 54 representative responsive checks passed; representative axe checks found zero violations.
- 15 explicit image-layout cases across 1440, 1024, 768, 390 and 320px passed centering/equal-card-width/containment/overflow checks.
- Updated scene, WebKit and install results are stored with the QA evidence. Production staging, real mail and Elementor Pro acceptance remain separate outstanding checks.
