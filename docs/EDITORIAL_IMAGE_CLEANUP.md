# Image framing and copy cleanup — 1.6.0

The user identified remaining white-sided photography and too many ornamental text annotations. This release removes those details from the rendered templates rather than hiding them behind CSS.

## Image audit

All bundled top-level WebP assets were scanned for nearly uniform white edge strips and flagged candidates were visually inspected. Two plant photos, 3845 (the white office planters) and 3835 (the dark FRP planters), have approximately 300px of white space baked into each side of their 1600 × 1000 source raster. Asset 509 is an unused line-art illustration, not a padded photograph, and was left untouched.

`anz_photo()` now frames the real 1000 × 1000 photograph within an inline SVG viewport. Original pixels and files stay unchanged; no generative edits or stretched subjects are introduced. This applies consistently in the homepage service chapter, workplace hero, service directory, dropdown and FRP detail. The main plant photos retain a square display so their leaves and planters can be seen together. Service preview swapping handles both native images and framed sources.

Evidence: `qa/photo-border-audit.json`, `qa/editorial-cleanup-results.json`, and `qa/*-clean-workplace.png`.

## Removed or simplified

- “Nature, precisely placed”, “A living framework — ANZ” and similar decorative section overlines.
- 01/02 practice captions, 01/03 project counts and the “living workplace” image badge.
- The floating Discover cursor and the repeated microtext ribbon below navigation.
- Repetitive hero, footer, form and about-page slogans without practical information.
- Vague service headings such as “A greener working day” and “The living layer”, replaced with concise descriptions of the service. The content generator was updated too.

Project names, image descriptions, categories, service links, filter status, form labels, contact details, accessibility names and policy links remain. The single hero brand line and interactive garden artwork remain; instructions beside the garden controls are functional. Navigation motion, menu accordion, button effects, Lenis, card reveals and interactive planting are retained.

The responsive audit also exposed an occasional WebKit ResizeObserver warning. Resize-dependent writes for navigation and the canvas are now deferred to the next animation frame to avoid synchronous observer feedback.

Checks: TypeScript/Vite, all PHP lint, 44-route regression and 54 reflow cases, six representative full-page axe scans, and focused Edge/WebKit checks of four affected routes at 1440/390/320px. See `QA_REPORT.md` for release validation and install evidence.
