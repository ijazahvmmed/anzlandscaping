# Source-based photo editing — 30 October 2026

Method: built-in imagegen editing with the original local photograph supplied as the edit target. The user explicitly approved generative edits provided they remain realistic, after an initial test was reviewed. These are AI-assisted, source-based photographic enhancements, not unaltered source originals. Fine textures and small details may be reconstructed. They must not be used as dimensional construction records.

The originals remain in `wordpress/wp-content/themes/anz-2027/assets/media/`. Website variants are in `assets/media/edited/`. Full edited masters are saved locally in `output/photo-edits/`. The runtime selects an edited variant only when a matching file is present. Native WordPress uploaded/featured images keep their normal media handling.

## 2415 — Salarpuria Sattva pergola

- Original: `assets/media/2415.webp`
- Website edit: `assets/media/edited/2415.webp`
- Master: `output/photo-edits/2415-enhanced.png`
- Prompt: Edit the existing ANZ project photograph, not a reference for a new scene. Conservatively level and correct architectural verticals, center the existing pergola composition, balance sunlight/shadows and neutralize the cast. Preserve the recognizable camera viewpoint, pergola/beam arrangement, glazing, lattice wall, tree, sofa/chairs, golden counter, lawn, plants, walls and adjoining buildings. Keep realistic natural texture, 4:3 landscape framing, minor edge crop only. No new scene, architecture, landscaping, text or watermark.

## 2397 — Plotted Development amphitheatre

- Original: `assets/media/2397.webp`
- Website edit: `assets/media/edited/2397.webp`
- Master: `output/photo-edits/2397-enhanced.png`
- Prompt: Correct this exact source photograph into a realistic professional landscape/architecture photograph. Retain the recognizable amphitheatre, curved concrete terraces, paths, gazebo, lawns, trees, surrounding urban buildings, camera viewpoint and composition. Subtly level and correct perspective, recover natural shadow detail, balance white balance, preserve daytime/cloudy sky and realistic greens. No sky replacement, new site features, people, structures or water. Keep wide 16:9 framing and source identity; no text/watermark.

## 2304 — BHIVE green wall

- Original: `assets/media/2304.webp`
- Website edit: `assets/media/edited/2304.webp`
- Master: `output/photo-edits/2304-enhanced.png`
- Prompt: Edit the exact existing BHIVE project photograph, not a different building. Straighten architectural verticals and mild perspective convergence, balance exposure/white balance and improve natural definition in the planting. Preserve the recognizable long green wall and planting pattern, palms/planters, facades/windows, assembly sign, extinguisher, ramp/steps/handrails, paving and partial signage. Retain the same viewpoint and wide source framing. Do not invent or relocate major objects, vegetation, logos, equipment or architecture; keep plausible daylight rather than a render.

## 2350 — GoodEarth Malhar glass enclosure

- Original: `assets/media/2350.webp`
- Website edit: `assets/media/edited/2350.webp`
- Master: `output/photo-edits/2350-enhanced.png`
- Prompt: Realistic source-based architectural photo correction of the same enclosure. Correct roll and principal verticals, balance exposure and remove the yellow/green cast. Retain the same viewing angle, wooden beams/glass, lattice wall, existing pots/plants, deck, house wall, corridor, cabinet and cleaning tools. No new structure or redesigned site; natural daylight, landscape 4:3, modest rectification crop only.

## 2365 — Prime Square

- Original: `assets/media/2365.webp`
- Website edit: `assets/media/edited/2365.webp`
- Master: `output/photo-edits/2365-enhanced.png`
- Prompt: Realistic source-based architecture retouch of the same building and grounds. Correct upward convergence and center the existing building while retaining its recognizable massing, floors/balconies/windows, facade, rooftop, site walls/ramp, planting beds, trees, lawn and surroundings. Keep daytime/cloudy-blue sky and original viewpoint; natural tonal balance and restrained greens, no replacement architecture or added site elements, landscape 4:3.

## Layout treatment

No photo is tilted as decoration. The new layout uses centered, bounded image frames with `object-fit: contain` for project images, equal columns, and preserved image orientation. The hero uses the source’s natural wide ratio. Curated images are framed to show their actual content instead of being enlarged to cover a full viewport.
