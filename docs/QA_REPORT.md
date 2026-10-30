# QA report — local review release

Test environment: Windows, PHP 8.4.12, WordPress 7.1.4 downloaded from the official WordPress distribution, isolated SQLite integration, Edge/Chromium headless through Playwright. The test database is separate from production. All results below apply to this local environment unless stated otherwise.

## Verified

| Check | Result / evidence |
| --- | --- |
| Production frontend build | TypeScript check + Vite build passed |
| PHP syntax | All 25 theme/plugin PHP files passed lint in the current source build |
| ZIP install and activation | Theme files installed by native `Theme_Upgrader` under the local proof slug `anz-2027-proof`, recognized and activated; the editable development theme was then restored. `qa/zip-install.json` |
| Export structure | 531 WXR items; 38 published page records, four posts, 410 attachments |
| Live source crawl | All 42 existing page/article URLs returned HTTP 200 during read-only crawl. `content-migration/LIVE_SOURCE_CRAWL.csv` |
| Local content routes | All 44 routes returned HTTP 200 with one H1 and no broken images. `qa/results.json` |
| Route coverage | 38 retained page records + two new hubs + four retained article paths. Home is `/`; `/home/` is treated as the static-front-page alias. No source service/project URL is redirected away. |
| Responsive reflow | Six representative routes × nine widths = 54 checks, no horizontal overflow. Widths 1920, 1440, 1280, 1024, 768, 430, 390, 360, 320. |
| Automated accessibility | axe WCAG A/AA/2.1 AA tag checks found zero violations on Home, Workplace, Office Plant Rental, Projects, BHIVE and Contact in the final route suite. The animated homepage also passed its separate axe check. This is not a WCAG conformance declaration. |
| Motion | Actual lazy motion module and Satoshi font loading verified after correcting relative build URLs; Lenis initialized; pinned stage active on desktop. Fourteen forward/reverse scene states recorded. `qa/motion-results.json`, `qa/motion/` |
| Desktop walkthrough | Native wheel-driven video recorded in `qa/scroll-demo.webm`. |
| Reduced motion | Motion import skipped and scene content retained in normal document flow. Still captures use this mode so all content is visible. |
| No JavaScript | Homepage H1/content and native links present; a no-script navigation is supplied. |
| Filter | Commercial filter displays four source-labelled commercial projects. |
| Gallery | Opens, keyboard arrow control works, Escape closes, focus returns to the triggering photograph. |
| Mobile menu | Native dialog opens, Escape closes, background scroll is locked. |
| 404 | Unknown route returns actual HTTP 404 with designed recovery page. |
| Forminator | Required-field validation passed, source confirmation rendered after a valid synthetic submission, local entry ID 1 stored. All outgoing email blocked. |
| Browser errors | No page JavaScript exceptions in the route/scene results. |
| Local performance sample | Final unthrottled desktop Edge sample: LCP 1368 ms, CLS 0.0013066; approximately 532 KB transferred during the observed landing load; Satoshi loaded. `qa/performance.json`. |

The final sticky-header enhancement was followed by a targeted regression run: mega-menu opening/Escape closing, fixed header contrast state, mobile navigation, pergola material selection and 320px project reflow passed without JavaScript exceptions. The companion plugin ZIP also installed and activated locally.

Firefox automation did not progress to a page capture on this Windows host in two attempts and is unverified. A separate WebKit run passed Home, Workplace and BHIVE at 1440px and 390px: HTTP 200, one H1, Satoshi loaded and no horizontal overflow. Its desktop Lenis, pinned stage and text splitting initialized without JavaScript errors. See `qa/cross-browser.json` and `qa/cross-browser-attempts.json`. No claim is made about Safari on Apple hardware.

## Visual review

The initial spacious direction was rejected by the user. The replacement uses the requested custom shapes, small annotations, stronger typography, GSAP blur/reveal, smooth desktop scrolling, cursor/magnetic responses and project scrollytelling. Revised flagship stills are in `qa/screenshots/` and the overview is `qa/revised-flagships.jpg`. Earlier hero captures are retained in `qa/before/`.

The user accepted the revised visual direction on 30 October 2026 and requested smaller typography with a clearer hierarchy and Lenis smoothing. Release 1.0.1 implements those refinements. No claim is made that it has won or meets a subjective Awwwards judging standard. Some source photos are modest resolution; the genuine library has been preserved rather than fabricating higher-resolution project results.

## 30 October typography and Lenis refinement — 1.0.1

- User accepted the motion direction and requested smaller text with a clearer hierarchy.
- Shared responsive scales now distinguish hero, page, section, chapter, card and lead text. At 1440px the homepage hero is about 112px, regular page titles 73px and section titles 48px; at 390px the corresponding sizes are about 52px, 37px and 30px.
- Lenis wheel smoothing now initializes at every viewport width, independently of the wide-screen visual-effects tier. Native touch inertia, modal scroll handling and reduced-motion fallback are retained.
- Actual wheel samples at 1440, 768 and 390px progressed from about 99px through 371px to 538px after a 600px wheel input, verifying interpolation rather than only checking for an initialized class.
- Modal stop/resume and reduced-motion native scrolling passed. The six representative routes passed 42 reflow checks at 1440, 1024, 768, 430, 390, 360 and 320px without horizontal overflow. The homepage axe scan found zero violations; no page JavaScript errors were recorded. Evidence: `qa/typography-scroll-results.json`.

## 30 October interaction refinement — 1.0.2

- Added an animated mobile drawer with staggered, blur-to-sharp link reveals, a controlled closing transition, focus restoration and Lenis suspension through the full close. Native link navigation is not delayed and open dialogs are cleared for browser back/forward caching.
- Desktop service dropdowns now reveal image/link groups together and fade away smoothly. Buttons have eased fill/arrow/press feedback; card imagery releases its GSAP transform after entering so hover zoom remains available.
- Added supporting-copy, portfolio-caption and service-row reveals. Linked animated headings retain their own accessible names.
- Home and Insights have a continuous botanical marquee. It pauses offscreen, while a modal is open, on viewport hover, or via the explicit Pause/Resume control. Reduced motion and no-JavaScript mode retain static, readable content.
- Added progressive native cross-document transitions and native details-content transitions where the browser supports them. No SPA navigation or exit-delay gate was introduced.
- Edge and Windows WebKit passed actual opening/closing animation checks, focus return, Lenis stop/resume, browser-back cleanup, moving marquee/controls, desktop dropdown transitions and button fill. Reduced-motion drawer close was immediate and marquee movement was disabled. Menu and Insights axe scans recorded zero violations; no page JavaScript exceptions occurred.
- Evidence: `qa/interaction-motion-results.json`, `qa/webkit-interaction-motion-results.json`, and `qa/menu-marquee-demo.webm`.

## Reslink reference and photographic refinement — 1.1.0

- Current layout follows the client's new reference principles: light canvas, centered compositions, compact navigation and contained visual panels, adapted to ANZ's actual branding/content.
- Equal image grids, centered covers and source-proportion containment replace oversized edge-to-edge pictures and decorative photo tilt. The pinned project scene is shorter and bounded.
- Five existing project photographs have user-approved realistic generative edits. Originals remain unchanged and are delivered separately from the edited masters. See `PHOTO_EDIT_PROMPTS.md` and `PHOTO_EDIT_REGISTER.json`.
- The 44-route crawl and 54 responsive checks pass without broken images or overflow. The six representative accessibility scans report zero violations. Fifteen explicit image-layout checks pass across five widths, confirming centered hero/cover frames, equal cards and image containment.
- Evidence: `qa/results.json`, `qa/image-layout-results.json`, updated scene/WebKit records and the reference refinement document.

## Remaining acceptance work

- A protected Hostinger clone with the real PHP/WP/plugins, Elementor Pro licence/binaries, current forms and uploads. Local SQLite is not proof of MySQL/hosting/plugin compatibility.
- Full Elementor submission parity, actual database entries, reCAPTCHA/honeypot, SMTP/inbox receipt and redirect testing. Forminator’s real inbox/anti-spam delivery also remains unverified.
- Six-source-route submission matrix, slow/offline/double-submit/notification failure checks and actual attribution/analytics deduplication. No production submissions occurred and no new conversion events were added.
- Real device touch/scroll testing, Safari on Apple hardware, manual screenreader and zoom checks, field performance/INP and throttled Lighthouse. Local lab figures are not field CWV or an assurance of a Lighthouse score.
- Source project publicity/photo rights, factual copy, physical contact details, service availability and legal policy approval.
- OTP/test pages are retained/noindex and excluded from navigation, but their production dependencies have not been verified or retired.
- All four duplicate article paths remain. Redirect/canonical consolidation is deliberately unperformed pending Search Console, backlink and ad-path evidence.
- SEO plugin output, existing tag containers, advertising destinations and production sitemap behavior need staging checks. The local preview intentionally sends noindex/nofollow.
- New hubs must be reviewed/published on staging. Activation does not create published pages or import data automatically.

Production has not been modified. This is a built and locally tested review release, with production acceptance work explicitly outstanding.

## Glass release — 1.2.0

The glass refinement builds successfully and the changed PHP files pass lint. Focused Edge and Windows WebKit tests pass: split-panel hover changes, centered exchanged arrows, sliding navigation lens, bounded dropdown, 15 representative route/width combinations per engine without overflow or broken photographs, headings clear of the header, desktop menu and mobile drawer axe scans with zero violations, reduced-motion ribbon static and no JavaScript errors. See qa/glass-results.json and qa/webkit-glass-results.json. Native Safari hardware remains unverified.

The 1.2.0 route regression sweep passed all 44 routes, 54 responsive cases and six representative accessibility scans. Gallery/filter/menu, focus restoration, no-JavaScript content and native 404 checks passed. The Edge and WebKit menu suites also passed drawer transitions, Lenis stop/resume, clean browser-back state, marquee pause/resume, disclosure animation and reduced motion, with zero page script errors.

The packaged 1.2.0 theme installed and activated successfully through native WordPress Theme_Upgrader under the local proof slug. The installed release passed the final navigation, sticky header, mobile drawer, material selector and 320px overflow smoke checks with no script errors. The editable development theme was restored afterward.

## Control fix — 1.2.1

Build and changed-header PHP lint passed. Focused Edge and WebKit checks passed 12 button/viewport combinations (hero and header actions at 1440, 390 and 320px). Resting, entering and hover states retain the right inset, panel bounds and label-to-icon clearance with no horizontal overflow. Both SVG disclosure controls open by keyboard and close with Escape. See qa/control-refinement-results.json. The preceding native ZIP-install proof applies to 1.2.0; this patch changes CSS and the disclosure SVG markup.

## Image fitting — 1.2.2

Build passed. Edge and WebKit checks passed 24 route/viewport combinations across Home, Projects, BHIVE and Workplace Greenery at 1440, 390 and 320px. Fixed photo frames use centered cover fitting with no horizontal overflow. Both engines retain contain fitting in the full-photo lightbox. See qa/image-fit-results.json and qa/fitted-project-images.png. This is a CSS-only patch.

## Landscaping footer — 1.3.0

The release build and footer PHP lint passed. Version 1.3.0 installed and activated with native Theme_Upgrader locally; the editable development theme was restored afterward. Sixteen footer checks passed on that installed release in Edge and WebKit: 1440/1024/768/390/320px reflow, no footer or page overflow, four retained legal links and contact email, zero scoped axe WCAG violations on desktop/mobile, completed reveal and functional back-to-top with Lenis. No script errors. Evidence: qa/footer-results.json and qa/*-footer-*.png. No production changes.

## Service accordion motion — 1.3.1

TypeScript/Vite build passed. The mobile service disclosure now has native details/summary semantics enhanced by a measured height animation, a 15-link stagger, transient blur, reversible closing and a rotating SVG chevron. Keyboard focus and inertness follow the requested open state. Closing the menu resets the disclosure. Reduced motion changes state immediately. Without JavaScript the native disclosure remains usable. Edge and WebKit tests passed opening/closing intermediate states, all 15 service links, rapid reversals, Enter/Space handling, Escape menu reset, reduced-motion opening/closing, zero scoped WCAG axe violations and zero script errors. See qa/accordion-results.json, scripts/accordion-qa.mjs and qa/service-accordion-demo.webm. This is a frontend-only patch; native ZIP-install proof remains from 1.3.0.

## Original WordPress forms — 1.4.0

Build and changed PHP lint passed. Original Forminator quote form 3743 is now visible in the contact-page form card. Strict comparison confirms its stored configuration still matches the supplied export. Native required-field validation rejected an empty submission; a local synthetic submission received the original confirmation and created entry 2. Outbound email was blocked by the local mail guard; delivery is not verified. Fourteen Edge/WebKit UI checks passed, with no overflow, duplicate form, fallback block, axe violation or script error. Original Elementor templates 834/874/1953/2068/4050 were restored locally without overwriting existing records. The full enquiry form remains unavailable until Elementor Pro is supplied; its runtime and submission behavior are unverified. Native ZIP-install proof remains from 1.3.0.

## Complete logo fitting — 1.4.1

Build and PHP helper lint passed. The original transparent WebP artwork is unchanged. A native SVG viewBox frames its complete painted bounds with an 8px source-space safety margin; no negative image offsets or cropping containers remain in the header/footer. Custom WordPress logos use a contained static image layout. Eighteen Edge/WebKit viewport checks passed from 320 through 1920px, verifying the full painted logo stays inside both link frames with no header control collisions or page overflow. See qa/brand-results.json and qa/*-brand-*.png. Native ZIP-install proof remains from 1.3.0.

## Compact projects and interactive footer — 1.5.0

The project-perspectives pin has been removed. All three cards, project names and links stay in document flow; image heights are 170–210px on desktop/tablet and 200px on mobile. Edge and WebKit checks passed five widths (1440/1024/768/390/320px), no pin wrapper, no overflow, three cards and four legal links. The custom garden passed visible canvas growth, button and pointer planting, pointer-driven bending, reset, keyboard activation, reduced-motion settling, whole-page axe with zero violations and zero script errors. Browser Back and JavaScript-disabled checks passed in both engines. Version 1.5.0 installed and activated through native Theme_Upgrader locally; navigation/fallback tests ran on that installed release and the editable source theme was restored. See qa/creative-footer-results.json, qa/garden-navigation-results.json and qa/zip-install.json. No production changes.

## Image and editorial cleanup — 1.6.0

Build and all PHP lint passed. The media scan and visual review found baked white side borders in photos 3835 and 3845; shared inline-SVG framing removes the borders without modifying their raster files. Decorative overlines, badges, project counters, floating cursor and navigation microtext were removed; 15 service headlines and secondary page headings were rewritten as service descriptions. The 44-route/54-reflow sweep passed with six zero-violation axe scans, filter/gallery/menu/no-JavaScript and 404 checks. Thirty-six focused Edge/WebKit checks passed on the installed 1.6.0 release across Home, Workplace, Services and FRP Planters at 1440/390/320px: expected image viewports, no flagged filler, no badges or custom cursor, no overflow, zero axe violations and no script errors. Native Theme_Upgrader install/activation passed and the editable theme was restored. See qa/editorial-cleanup-results.json, qa/photo-border-audit.json and docs/EDITORIAL_IMAGE_CLEANUP.md. Production untouched.

## Homepage hierarchy and header marquee — 1.7.0

TypeScript/Vite build and changed-template PHP lint passed. The homepage now follows What we do / Our work / Our approach / Ongoing care / Enquiry, with one three-project grid and six purposeful photos. The duplicate portfolio grid and detached collage are removed. Header ticker movement, pause/resume, reduced motion, process disclosure animation and keyboard opening/closing passed in Edge and WebKit. Eighteen focused checks passed across 1920/1440/1024/768/390/320px, including heading order, exact project/image counts, no broken homepage links, no header collisions or overflow, zero whole-page axe violations and no script errors. Mobile service-disclosure regression checks also passed in both engines. The 44-route/54-reflow sweep passed with six zero-violation axe scans and gallery/filter/menu/no-JavaScript/404 behavior. The 1.7.0 package installed and activated using native Theme_Upgrader; focused tests passed on the installed release and the editable theme was restored. See qa/homepage-story-results.json, qa/results.json, qa/accordion-results.json and qa/zip-install.json. Production untouched.
