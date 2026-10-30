# Mobile sizing — 1.8.6

The user requested a smaller overall mobile header and a consistent, less oversized content hierarchy. A final mobile-only CSS layer applies at 650px and below; desktop styling and the native mobile scroll/reveal implementation stay unchanged.

Header height changes from 82px to 66px. The logo uses 64×40px (58×36px at 360px and below); header labels, icon panels and menu glyph are smaller. Controls retain a 44px minimum height. The logo still uses the full original viewBox and adaptive light/dark treatment.

Hero headings scale from 28–34px, chapter headings 26–28px, service/project/contact page titles 31–34px, card headings 21px and footer invitation 32px. Supporting copy uses 12–14px with readable line spacing. Card padding, FAQ rows, section gaps, metrics, menu typography and footer spacing follow the same compact hierarchy. Form inputs remain 16px to avoid automatic mobile input zoom.

Verification: production/Vercel build passes. Home, office plant rental, project index and contact layouts at 320/360/390/430px have no document overflow or header collisions. Header height and title sizes are measured in `qa/mobile-scale-results.json`. Screenshots: `qa/compact-mobile-hero.png`, `qa/compact-mobile-services.png`.
