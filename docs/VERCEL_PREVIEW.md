# Deploy the review site to Vercel

The original error occurred because `npm run build` compiles theme CSS/JavaScript into `wordpress/wp-content/themes/anz-2027/assets/dist`. That directory is not a complete website: PHP and WordPress render the HTML. Setting it as Vercel's Output Directory would leave the pages missing.

The repository now includes a separate static review deployment, while keeping the native WordPress theme and forms intact.

## Vercel settings

- Root Directory: the repository root containing `package.json` and `vercel.json`.
- Framework Preset: Other (the checked-in configuration sets `framework: null`).
- Build Command: `npm run build:vercel`.
- Output Directory: `dist/site`.

`vercel.json` sets the command and output directory automatically. Commit and push `vercel.json`, the updated scripts/package files and the entire `preview/` folder, then redeploy the latest commit. Do not upload only the theme assets. No PHP install, local database, browser download or WordPress credentials are needed in the Vercel build.

## What is deployed

`preview/pages` contains 44 server-rendered page snapshots and a 404 page. The build copies these and the current theme assets, including the hero video, into `dist/site`. ZIP packages elsewhere in `dist` and PHP source files are outside this output and are not published. Internal links and assets are root-relative, with no localhost dependencies. Preview pages and response headers are noindex/nofollow, and robots.txt disallows crawling.

The Vercel preview uses genuine phone/email enquiry links. WordPress Forminator/Elementor scripts, forms, nonces and AJAX endpoints are removed from the exported pages. The original forms remain in the WordPress theme, where native plugins can process enquiries. WordPress administration, submissions, editing, and plugin features require WordPress hosting; this Vercel deployment is a static review, not a replacement WordPress backend.

## Refresh after editing

On the local machine, with the WordPress preview running:

```sh
npm run preview:export
npm run build:vercel
```

Commit the updated `preview/pages` and `preview/manifest.json` when PHP templates or WordPress content change. CSS/TypeScript/media changes are built/copied afresh by Vercel. For export on a different computer, set `ANZ_PREVIEW_ORIGIN` to its local WordPress URL and `ANZ_BROWSER_CHANNEL` to its installed Chromium channel.

The ordinary `npm run build` continues to build the native WordPress theme. Install that theme on WordPress hosting for the production CMS and original form integrations.

Official configuration reference: [Vercel build configuration](https://vercel.com/docs/project-configuration/vercel-json).

Local verification: `npm run build:vercel` completes successfully and creates `dist/site/index.html`. A plain static HTTP server served all 44 routes. Navigation, FAQs and hero playback pass; 1440/390/320px layouts have no overflow; no broken images or requests were found on the homepage. Output contains no PHP/ZIP files, and HTML has no localhost, form, AJAX or REST dependencies. Report: `qa/vercel-preview-results.json`. No remote Vercel deployment was performed.
