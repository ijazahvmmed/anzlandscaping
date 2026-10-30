# Revised direction: Living, by design

The user rejected the first spacious architectural treatment and requested a more expressive Awwwards/Framer-style experience: heavier interaction, small editorial text, custom botanical shapes, GSAP reveals, brief text blur and a smooth scrolling feel. This direct feedback overrides the initial brief’s exclusions of decorative leaves, blur and certain ornamental annotations.

## Composition

**Current direction, 1.7.0:** a clear homepage sequence—what ANZ does, selected work, approach, ongoing care, enquiry. The user-approved header marquee is restored with factual service names and a pause control. There is one portfolio grid, six purposeful photographs, an animated approach disclosure and the interactive footer. Decorative slogans and image badges stay removed. See `HOMEPAGE_STRUCTURE.md`; earlier directions below are history.

- Deep botanical opening, actual white ANZ mark, restrained top navigation, lime enquiry action.
- Oversized two-line statement crosses an asymmetric photographic aperture. Small location/service annotations and a project link give the image context. A rotating orbit is an actual scroll link.
- Paper editorial chapter with a word-by-word scroll reveal and a custom outline leaf.
- Two independently composed service chapters with rounded photographic corners, short service links and contextual imagery.
- One bounded three-project pinned sequence, with masked image handovers, coupled captions, transient blur, progress line and reversible scrub.
- A scroll-driven type ribbon, drifting project collage, dark portfolio and a maintenance chapter using the real team photograph.
- Lime close and dark footer. No invented counters, awards, reviews or case-study outcomes.

The alternate directions considered were the original framed architectural monograph, a type-led botanical atlas, and this dark aperture composition. The user’s feedback selected an expressive motion direction rather than the original quiet treatment. The real Plotted Development curves and gardens become the large aperture’s material; the living practice is expressed through the custom leaf and planting/watering icons.

## Tokens

Ink `#183D2D`; deep `#10291F`; paper `#F1F1E9`; mist `#E5E8DC`; leaf `#CEE8A8`. Satoshi Regular/Medium, with Arial/Helvetica fallback. The static, unmodified Fontshare weights replace the original variable font after Windows WebKit rendered the axis incorrectly. Most body information is 12–16px, display hierarchy varies by chapter. Small annotations follow the explicit requested art direction. Buttons and interactive controls retain larger hit areas.

## Motion

Source: `src/motion.ts`. GSAP context scopes lifecycle; matchMedia handles desktop enhancements and cleanup. Lenis smooths wheel input at all viewport widths, including narrow desktop previews; touch retains native inertia. Its RAF uses the GSAP ticker, with lerp 0.07 and wheel multiplier 0.9. It stops while native modal dialogs are open. Reduced motion and save-data skip the motion module; all text and photographs remain server-rendered in normal document flow.

Heading words enter with a brief blur/y-offset, never permanently hidden by CSS. Initial animated opacity stays readable after the accessibility correction. The hero image settles and moves with scroll; the orbit rotates; pointer targets use a following cursor; selected actions have a modest magnetic response. Images reveal through masks rather than every section sharing a fade.

The project scene pins at ≥1280px with a fine pointer, for about two viewport heights. Phones show the three scenes sequentially. The ribbon, collage and outline leaf are scroll-linked. No WebGL, forced touch scrolling, preloader, blocking intro or SPA routing is used.

## Interaction layer — 1.0.2

`src/interactions.ts` provides the navigation and marquee controls without waiting for the larger GSAP bundle. The native menu dialog slides in over 620ms, with a 35ms link stagger and 520ms blur/position reveal. Close runs for 380ms before returning focus and resuming Lenis. Escape and close buttons share the same lifecycle; link navigation stays native and immediate.

Desktop service menus use a 420ms panel reveal and shorter staggered links, with a CSS closing transition. Button fills, arrows, pressed state and photographic hover crops share the same easing family. Supporting content enters in short coordinated groups rather than applying one fade to every section.

The reusable `template-parts/marquee.php` loops two matching groups seamlessly on Home and Insights. It runs only when enhanced, visible and permitted by motion preferences, with an explicit pause/resume control. Labels are available once to assistive technology; duplicate visual text is hidden from its reading order.

Cross-document View Transitions and intrinsic details-content transitions are progressive enhancements. Unsupported browsers retain ordinary WordPress navigation and native disclosures.

## Review state

The first direction was rejected. The user accepted the revised motion direction on 30 October 2026 and requested smaller, more hierarchical text plus Lenis smoothing. The follow-up introduces a shared type scale in `src/styles/typography.css`: desktop hero approximately 112px at 1440px, page titles approximately 73px, section headings approximately 48px, and card titles approximately 29px. Mobile scales reduce independently. Revised desktop/mobile screenshots and a recorded scene walkthrough are available under `qa/`. Visual taste is not claimed to be objectively “Awwwards quality.”

## Current update — 1.8.0

The user explicitly requested reuse of the existing homepage contents. Original services, benefits, business counters, client logos, certificates and publication material are restored with light editing. This supersedes earlier omissions of these published source items and the earlier six-photo/two-service-group homepage description. Source claims are retained, not independently verified; the expired KTCC membership is labelled 2023–2024. Current sequence: original hero, Why Choose ANZ and benefits, six services, Our Work, clients and recognition, Our Approach, ongoing care, visible questions, original available form, interactive footer. See [original content notes](ORIGINAL_HOME_CONTENT.md) for source mapping and SEO details.
