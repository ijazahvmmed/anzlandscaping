# ANZ — A Living Framework

Custom classic WordPress theme and a small companion editing plugin. PHP renders the pages; Vite compiles TypeScript, CSS, GSAP/ScrollTrigger and Lenis into static theme assets. Hostinger needs no Node process.

Current release: **1.8.3** — transparent header without the white fade, Lenis touch smoothing and lighter mobile reveals. See [mobile refinement notes](docs/MOBILE_SCROLL_REFINEMENT.md). Retains the rounded full-window hero video with overlaid headline/CTAs and a 30% dark overlay, muted inline looping, pause control and reduced-motion poster. Original homepage content, client logos, certificates and search metadata remain in place. See [hero video notes](docs/HERO_VIDEO.md). See [content restoration notes](docs/ORIGINAL_HOME_CONTENT.md). See [glass refinement notes](docs/GLASS_DESIGN_REFINEMENT.md).

## Local preview

The working preview is **http://127.0.0.1:8765/**. It uses an isolated WordPress/SQLite database in `.local/`, separate from the live ANZ website. Local indexing and outbound email are blocked.

On this computer, restart it from the project directory:

```powershell
& 'C:\Users\ijasa\scoop\apps\php\8.4.12\php.exe' -S 127.0.0.1:8765 -t .local/wordpress scripts/router.php
```

For a fresh local setup: run `python scripts/setup-local.py`, `python scripts/configure-local.py`, link/copy `wordpress/wp-content/themes/anz-2027` into the local WordPress themes folder, and run `scripts/seed-local.php` with PHP. The seed is guarded for a local environment and is **not a production migration**. Default test login: `anz-review` / `local-preview-only`, valid only for this localhost preview.

## Build

```powershell
npm.cmd ci
npm.cmd run build
./scripts/lint-php.ps1
python scripts/package.py
```

Change the PHP path in the lint script if needed. The source includes `package-lock.json`. `assets/dist` is already compiled in the theme ZIP. Relative Vite asset paths are essential for a theme installed in a WordPress subdirectory.

## Vercel preview

Vercel uses `vercel.json`: **Build Command** `npm run build:vercel`, **Output Directory** `dist/site`, **Framework** Other, and repository root as Root Directory. Commit `preview/` along with the configuration and scripts, then redeploy. This serves a static review of all 44 pages, with call/email enquiries. Native WordPress forms and administration still require WordPress hosting. The WordPress build remains `npm run build`.

After changing PHP templates or WordPress content, run `npm run preview:export` locally while WordPress is running, then commit the refreshed snapshots. See [Vercel deployment notes](docs/VERCEL_PREVIEW.md).

## Handoff files

- `dist/anz-2027-theme.zip`: theme only, with `anz-2027/style.css` at the ZIP root.
- `dist/anz-site-core-plugin.zip`: separate optional native editing fields and explicit draft-page setup.
- `dist/anz-2027-source.zip`: editable source, scripts, theme, plugin and documentation. No local database, dependencies, credentials from the live website, or full private WXR audit.
- `dist/anz-2027-review-evidence.zip`: route/interaction results, screenshots, forward/reverse scene captures and the scroll walkthrough.
- `dist/anz-2027-photo-edits.zip`: five user-approved, source-based photographic edits, their unchanged originals, associations and prompt notes.
- `docs/QA_REPORT.md`: verified checks and remaining acceptance work.
- `docs/INSTALL_STAGING_LAUNCH.md`: staging and rollback procedure.

## Editing

Keep the existing native pages, parent hierarchy, slugs and Yoast records. The theme maps the exact exported service/project paths to curated content; it does not register a replacement routing system. Featured Image overrides page covers. Install ANZ Site Core to edit introductions, supporting headings, additional body, scope, FAQ and WordPress gallery attachment IDs. Blank overrides use the audited defaults in `inc/catalogue.json`.

The two new pillar pages must be reviewed and published on staging before navigation is activated. Tools → ANZ setup creates missing **drafts** only. Neither theme nor plugin activation imports WXR, changes notification recipients or removes submissions.

The source defaults are new editorial drafts for review. Legal policies remain legacy content and require review; they are not newly approved policies. Project galleries are photo essays; scope, year, area and outcomes have not been invented.

## Forms

Primary enquiry uses the supported Elementor template shortcode for existing template **834**, with Elementor Pro forms available. Short quote uses Forminator **3743**. The systems stay separate. When the required plugin/template is unavailable, the theme shows real call/email options. It never simulates form success or copies plugin HTML into a custom handler.

Local Forminator test data are synthetic, mail transport is blocked, and test entry ID 1 is local only. Elementor Pro and real notification/inbox/anti-spam/tracking checks require a protected clone of the production environment.

## Assets and licenses

Photography was retrieved from URLs in the supplied ANZ export. Rights and project publicity approvals still need client confirmation. Supplied logos are preserved. Satoshi came directly from Fontshare with its FFL license included; this is a private ANZ website package, not a redistributable font/template product. Read `docs/ASSET_REGISTER.md` before reuse. GPL applies to the theme/plugin code; third-party fonts, photography and branding retain their respective terms.

## Verification

`node scripts/qa.mjs` uses installed Edge to crawl all 44 retained/new content routes and run representative responsive, axe and interaction checks. `node scripts/motion-qa.mjs` records the pinned scene forward and backward. `node scripts/capture.mjs` produces desktop/mobile stills with reduced motion so offscreen content can be reviewed. These local checks do not establish production readiness, device-wide performance or WCAG conformance.
