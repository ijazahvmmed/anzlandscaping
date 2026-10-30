# A footer rooted in landscaping — 1.3.0

The user requested footer.gallery inspiration and an ANZ-specific footer. That domain did not resolve. A focused search found the curated gallery at https://www.footer.design/. Its Northeast Tomato and Harvest Hall pages were inspected in the browser:

- https://www.footer.design/sites/northeast-tomato — compact contacts and brand-led sign-off.
- https://www.footer.design/sites/harvest-hall — structured small text with an illustrated lower edge.

The ANZ implementation uses original typography, copy and custom SVG botanical contour artwork rather than reference assets. Deep botanical green, a sage split-panel contact action, thin glass rims and existing motion link the footer to the current site. The modest heading anchors the upper half; grouped native links and the retained contact/address/policy details remain available without JavaScript. No social profiles, availability claims or subscriptions were invented.

`footer.php` renders the shared footer on all theme pages. `src/styles/footer.css` handles responsive layouts and hover/focus treatments. `src/motion.ts` adds a one-time staggered reveal and a gentle rise of the botanical illustration. Reduced-motion and no-JavaScript use the static layout; back-to-top stays a native anchor and Lenis enhances it where available.

Checks: production TypeScript/Vite build, footer PHP lint and `scripts/footer-qa.mjs` for Edge and WebKit at 1440, 1024, 768, 390 and 320px, scoped WCAG axe scans, reveal completion, retained legal/contact links and back-to-top. Results are local only, in `qa/footer-results.json`.


## Interactive revision — 1.5.0 (current)

The user found the decorative landscaping strip insufficiently creative and the pinned project photographs too large and unclear. The earlier footer description is historical. The current footer includes an original interactive typographic garden: plants grow over a large decorative “grow.” word, gently bend toward pointer movement, and can be planted by clicking/tapping or using a native keyboard-accessible button. A reset control starts the garden again. The actual ANZ logo, compact contact grid, policy links and conversation CTA remain separate and legible.

The animated gallery at https://www.footer.design/styles/animated was reviewed, particularly https://www.footer.design/sites/dirt and https://www.footer.design/sites/aperios-design for expressive typography and interaction-led closing panels. No reference artwork, fonts, assets or code were copied. ANZ uses a custom Canvas 2D botanical generator rather than their visual effects.

`src/footer-garden.ts` draws the garden at a device pixel ratio capped at two. Growth settles after 1.3 seconds and pointer response settles within one second of the last input; animation stops offscreen. There is no endless ambient loop or scroll trap. Reduced motion renders additions immediately. JavaScript-disabled visitors retain the static typographic panel and all contact/navigation links, without fake interactive controls. The page restores interaction after browser back-cache returns.

The former pinned project chapter is now a three-column desktop grid with 170–210px images, actual project names, brief captions and native project links always present. Mobile stacks the three cards with 200px images. GSAP provides restrained card entry reveals. `src/styles/creative-footer.css` defines both compositions and supersedes the earlier pinned image sizing.

Tests: `scripts/creative-footer-qa.mjs` (also the current motion QA entry point) covers both Edge and WebKit, plant creation, pointer response, reset, keyboard activation, reduced-motion settling, five responsive widths, three bounded unpinned project cards, preserved policy links, whole-page axe and page script errors. A clean demonstration is saved as `qa/creative-footer-walkthrough.webm`.
