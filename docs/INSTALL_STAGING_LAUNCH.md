# Staging, activation and rollback

## Prerequisites

1. Restore-test a full production backup: database, uploads, active theme, plugins and configuration. The supplied WXR is not a backup.
2. Clone production into protected, non-indexed Hostinger staging. Keep SMTP/test recipients and conversion events isolated. Retain Elementor/Elementor Pro, Forminator, Yoast and current security/tracking plugins.
3. Record PHP/WP/plugin versions, front-page and posts-page IDs, current theme, menus, form placement and redirect behavior. Production compatibility is not implied by the local PHP 8.4/WordPress test.
4. Confirm asset rights, contact details, project naming/publicity, new copy and the revised visual/motion direction. Review legacy legal copy and OTP dependencies.

## Install

1. Upload `anz-2027-theme.zip` through Appearance → Themes → Add New → Upload. Keep the previous theme installed.
2. Optionally upload/activate `anz-site-core-plugin.zip` separately. It provides fields, not replacement form processing.
3. Use Tools → ANZ setup to create missing pillar drafts. Review/publish `/workplace-greenery/` and `/landscape-design-execution/` before exposing their links.
4. Confirm native front page ID 10 and posts page ID 699 against the actual clone. Do not blindly reset IDs if the clone differs. Keep service parent 693 and project parent 695 where the existing database uses them.
5. Activate only on staging. Do not import the WXR over existing content or replace the live database with the local seed.
6. Validate all 44 content paths and `/home/` canonical handling, images, legal pages, native search/404, plugin assets and browser history. Check existing advertising destinations and redirects from Search Console/GA4/ad accounts, which were not supplied.

## Forms and tracking gate

- Verify actual primary form placements and template 834 vs 874/1953/2068/4050. Keep notification recipients, reCAPTCHA keys and plugin actions intact.
- Verify long-form field options, required flags, database entry, actual inbox receipt, redirect and failure states from Home/contact/workplace/office rental/commercial landscaping/one other service.
- Verify Forminator 3743 independently, including spam checks and actual inbox arrival. A local test with blocked mail is not evidence of notification delivery.
- The theme adds no lead conversion event and does not treat a thank-you-page visit as a conversion. Inventory existing tags, verify real acceptance signals and deduplication before changing tracking.
- Resolve the existing Elementor redirect value `thank you` in staging. Do not rewrite source recipients or secrets as part of theme installation.

## Production window

Obtain explicit launch approval after staging acceptance. Take a fresh backup immediately before activation. Install the vetted theme and approved plugin files only; avoid database replacement that could erase recent leads. Recheck priority routes, approved real submissions, image paths, indexing and ad destinations. Monitor logs and lead delivery after release.

## Rollback

Reactivate the previous theme. Keep the existing form plugins active and submissions intact. The ANZ theme/plugin has no activation-time data migration, so reverting the theme does not require undoing page conversions. Unpublish the two newly added hubs only if appropriate and approved. If any database or plugin configuration was changed separately, restore using the verified backup process while preserving leads received since backup. Flush permalinks only when a verified routing change requires it.

## Local preview

The mail guard and SQLite integration are **local-only support files** and are excluded from the theme and companion ZIPs. Never upload the local database, `wp-config.php`, local test credentials, seed script or mail guard to production.
