# Form audit

Two systems are present in the supplied sources and remain separate.

## Elementor

- Main library template 834, with related form templates 874, 1953, 2068 and 4050.
- Main fields: full name; email and phone required; requirement and budget required; optional message; reCAPTCHA v3 and honeypot.
- Existing requirement options: Terrace Garden, Vertical Garden, Villa Landscape, Pergola and Roofing, Office Landscape, Resort and Farm House, Commercial Landscaping, Landscape Designing, Other Services.
- Existing budgets: 1–5, 5–10, 10–15, 15–25, 25–35, 35–45 lakh; 50 lakh and above. Actual field values remain plugin-owned.
- Existing actions: save-to-database, email, redirect. The configured redirect text `thank you` needs runtime resolution.
- Recipients differ between templates. They are not copied to frontend JavaScript or changed by this implementation.
- Theme adapter uses `[elementor-template id="834"]` only with the Pro forms module, a published template and rendered form markup. Otherwise real phone/email fallback is displayed.
- **Not verified:** Pro licensing/binaries, actual active placements, inbox receipt, anti-spam behavior, database entries, redirect and conversion deduplication on the production clone.

## Forminator

- Existing quote form 3743. Required Full Name and Phone; phone validation set to `none` in the source. AJAX and submission storage enabled; Akismet configured in source.
- Theme adapter uses `[forminator_form id="3743"]`. The contact page displays the original quote form openly when Elementor Pro is unavailable. When the original full form renders, the short quote form remains separately available under “Prefer a quick quote request?”
- Source configuration imported only into the isolated local database. Original recipient configuration retained; a local-only mail filter blocks all transmissions.
- Empty submission rejected with both required-field messages. Synthetic valid submission produced the plugin’s source confirmation and local stored entry ID **1**. See `qa/forminator-result.json` and `qa/forminator-storage.json`.
- **Not verified:** actual inbox arrival, production SMTP, effective Akismet coverage, source attribution and analytics. The local confirmation proves local processing/storage only.

No new undocumented submission endpoint, mailto form handler, fake success screen or thank-you-page conversion event was introduced. No live form was submitted.

## Original forms restoration — 1.4.0

The local preview now displays Forminator 3743 directly instead of a phone/email placeholder. Its source configuration is unchanged (strict comparison against the original export passed), including fields, actions, recipient settings and success text. Plugin processing, validation and storage are used; there is no custom submission handler. The latest local synthetic submission created entry 2; outbound mail remains blocked locally. This does not verify inbox delivery.

Original Elementor templates 834, 874, 1953, 2068 and 4050 and their metadata were restored into the local database. The guarded restoration script skips existing records and refuses non-local environments. It reads the supplied private audit, which is deliberately excluded from delivery archives. Elementor Pro is absent locally, so the full original form is NOT yet rendered or submission-tested. A user-provided plugin ZIP is still needed (and Elementor core if not installed). The theme automatically prefers template 834 once its original Pro form actually renders. It never fabricates fields or substitutes the short form as a working full enquiry form.

Edge and WebKit presentation checks cover 1440/768/390/320px, one visible original quote instance, no fallback block, retained source name/phone inputs, zero overflow, zero whole-page WCAG axe violations and no script errors. See qa/original-form-ui-results.json and qa/original-forms-restoration.json.
