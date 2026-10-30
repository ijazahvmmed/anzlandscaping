# A coherent ANZ homepage — 1.7.0

The user explicitly preferred the header marquee and requested an understandable Our Work / Our Approach hierarchy instead of disconnected text and images. This supersedes the previous removal of the header ticker.

## Content sequence

1. **Hero:** landscaping and workplace greenery, the Bengaluru context, a quote action and an anchor to actual work. The source-based Plotted Development image is clearly named.
2. **What we do:** two service groups—landscape design/execution and workplace greenery—with short explanations and native links to retained service URLs. No unrelated decorative photography.
3. **Our work:** one grid of three real projects, BHIVE Premium, GoodEarth Malhar and Salarpuria Sattva. Names and source categories stay visible. The second project grid and detached photo collage have been removed.
4. **Our approach:** site, scope and ongoing care, using a keyboard-accessible animated disclosure. The office-plant image illustrates selection/placement and has a practical caption.
5. **Ongoing care:** maintenance copy paired with the original ANZ maintenance team photograph.
6. **Enquiry and footer:** contact action followed by retained contact details, policy links and the interactive garden.

The main homepage uses six photographs rather than fourteen. Actual project names, service names and informative image captions replace decorative microcopy. The copy describes services and planning considerations; it does not introduce claims about results, guarantees, dates or credentials.

## Motion and navigation

The glass header has a continuous, slow service ticker with duplicate decorative groups for a seamless loop. A native 24px pause/resume control is labelled for assistive technology. Reduced motion leaves a static strip, and modal/open dropdown states pause the movement. It remains within desktop navigation, as in the previously approved version.

Existing blur reveals, image reveals, Lenis and button/menu interactions are retained. Service cards and process rows enter with restrained motion. The approach uses the same measured, reversible height-animation helper as the mobile service disclosure, with unique control IDs. No-JavaScript visitors get native details/summary and all service/project links. The footer garden remains independently interactive.

Implementation: `front-page.php`, `src/styles/homepage.css`, shared disclosure and header-ticker enhancements in `src/interactions.ts`. The final CSS layer controls the new homepage without changing service/project templates.

Verification: Edge and WebKit checks cover 1920/1440/1024/768/390/320px, header collisions, heading sequence, image and project counts, actual internal link responses, process keyboard and animated states, ticker movement/pause/resume, reduced motion, whole-page axe and script errors. See `qa/homepage-story-results.json`. Current screenshots and walkthrough are included with the review evidence.

## Current update — 1.8.0

The user explicitly requested reuse of the existing homepage contents. Original services, benefits, business counters, client logos, certificates and publication material are restored with light editing. This supersedes earlier omissions of these published source items and the earlier six-photo/two-service-group homepage description. Source claims are retained, not independently verified; the expired KTCC membership is labelled 2023–2024. Current sequence: original hero, Why Choose ANZ and benefits, six services, Our Work, clients and recognition, Our Approach, ongoing care, visible questions, original available form, interactive footer. See [original content notes](ORIGINAL_HOME_CONTENT.md) for source mapping and SEO details.
