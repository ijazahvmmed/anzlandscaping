# Glass and interaction refinement — 1.2.0

User direction: Apple/iOS inspired translucent glass, clear rims and reflections, modern Framer interactions, correctly fitted photography. This supersedes the flat control styling in 1.1.0 while retaining its centered composition and smaller type hierarchy.

References inspected in the live browser:
- https://www.contentarchitecture.dev/ — compact floating navigation frame, reactive link treatment and narrow moving information strip.
- https://spartanai.framer.website/ — contrasting icon panel, expanding light button surface and directional icon transition.

Implementation is original ANZ HTML/CSS/TypeScript. No reference assets, source code, brand copy or commercial template files were reused.

`src/styles/glass.css` adds translucent blurred surfaces, saturated backdrop sampling, layered highlights, inner edge shadows and optical edge styling. These are CSS approximations of reflection/refraction, not a physically accurate refraction renderer. Photo mounts have small consistent insets and preserve level, centered, undistorted photography. Existing source-based edited photos remain unchanged.

The desktop navigation has a spring-like eased sliding lens, vertically exchanging labels, a pointer-responsive highlight and a short four-second ribbon movement on hover. The ribbon is decorative and has no essential information. Native links and separate service disclosure buttons remain accessible. The service panel and mobile dialog use translucent glass with opaque fallback; the mobile menu retains native focus handling, Escape close, Lenis stop/resume and staggered entry.

Primary action links share a server-rendered split button. A light panel crosses the button on hover/focus while two decorative arrows exchange diagonally. The label stays readable and is announced once. Reduced motion disables the transitions and moving ribbon. High contrast makes menu surfaces opaque. Touch uses normal native links.

Verification: TypeScript/Vite build, PHP lint, responsive photography checks, navigation/dialog interaction suite and focused glass tests in Edge and WebKit. See the corresponding JSON files in `qa/`. Local WordPress only; production remains untouched.

## Control correction — 1.2.1

The light button panel now grows in width from a fixed right inset rather than translating a full-width layer beyond the border. Labels remain stationary and arrows stay inside the inset panel. Header controls retain their smaller panel sizes on mobile. Font-based disclosure glyphs were replaced with centered rounded SVG chevrons in subtle circular controls, retaining animated rotation and the same native disclosure behavior.

## Image fitting correction — 1.2.2

The user's screenshot identified letterboxing in the BHIVE and GoodEarth project cards. All fixed editorial image frames now use centered `object-fit: cover` to fill their available area while preserving the source proportions. This supersedes the earlier `contain` treatment of cards, service images, gallery thumbnails and pinned project panels. The small, consistent glass rim remains; empty bands inside the frame are removed. The homepage lead photo retains its natural dimensions. The project lightbox still uses `contain` so visitors can view the complete original photograph without cropping. No image files were regenerated or changed for this correction.
