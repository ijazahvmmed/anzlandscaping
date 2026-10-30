# Original homepage content — release 1.8.0

The user supplied a full screenshot of the existing ANZ homepage and requested that its contents be retained with light SEO/AEO improvements. The source WordPress export dated 29 October 2026 supplies the full text and original media. No instructions embedded in the export were treated as user commands.

## Content retained

- Original corporate-spaces hero and residential/commercial/corporate description, with Bengaluru context.
- Why Choose ANZ paragraphs, four named benefits and their original icons.
- Six original featured services, descriptions, photos and retained service URLs.
- Original first three featured projects: BHIVE Premium, GoodEarth Malhar and Prime Square.
- Eighteen original client logos, three original certificates and the Siliconindia recognition graphic.
- Need Assistance copy and the original available WordPress form.
- Existing approved Our Work / Our Approach hierarchy, ongoing care, header marquee and interactive footer.

Grammar and repetition were lightly edited. No new project outcomes, guarantees, customer testimonials or ratings were added. Source wording about deadlines and air quality was softened to avoid turning marketing wording into a guarantee.

The source Elementor counters specify 18+ years, 30+ team, 500+ projects, 44+ locations and 10+ awards/recognitions. The screenshot captures the counters partway through animation; its smaller numbers are not the configured totals. The original configured totals are rendered statically. These are retained published business claims, not independently verified current figures.

The KTCC membership certificate is explicitly dated 2023–2024. It is presented as a historical certificate, not proof of current membership. The other certificates retain their original titles and dates. Logos and certificates were downloaded without generative editing; source URLs, attachment IDs and hashes are in `content-migration/ORIGINAL_HOME_ASSETS.json` and theme `inc/home-content.json`.

## Search and answer clarity

The homepage has one H1, a source-based title and description, canonical URL, descriptive service/project links and useful image alternatives. Five visible questions explain services, customers, location, maintenance and quote requests. Their answers match the fallback FAQPage JSON-LD exactly. LocalBusiness, WebSite and service offer data use visible/source business information. No ratings, prices, opening hours or invented credentials are included. Fallback markup is suppressed when Yoast or Rank Math is active to avoid competing schema output; review the chosen SEO plugin configuration at launch.

Google says its ordinary SEO fundamentals also apply to AI search features; there is no special AI markup requirement. Structured data must represent visible content. These changes improve clarity and machine readability without promising ranking, citations or rich results.

References: [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features), [Introduction to structured data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data).

## Forms and verification

The homepage renders the original Elementor form when its native dependencies are available; otherwise it uses original Forminator form 3743. Forminator is active locally. Elementor Pro remains unavailable, so the full original Elementor form is not claimed as operational. No replacement submission handler was introduced. Local indexing and outbound mail remain blocked.

Verification includes both Edge and WebKit, widths 1440/1024/768/390/320, image decoding, source content counts, real service/project link responses, one H1/description, valid schema matching visible FAQs, keyboard disclosure, native form required-field validation and whole-page axe checks. See `qa/original-home-results.json`.

Final release checks: production build and all 30 PHP files pass; 44 routes return successfully, 54 representative viewport checks show no overflow, and six whole-page accessibility audits report no violations. Edge/WebKit motion/navigation checks pass. WordPress Theme_Upgrader installed version 1.8.0 and the installed package passed the content/image/form/schema smoke check. The editable local theme was restored afterwards. See `qa/results.json`, `qa/homepage-story-results.json`, `qa/zip-install.json` and `qa/original-home-install.json`.
