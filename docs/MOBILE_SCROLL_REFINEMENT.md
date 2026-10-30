# Header and touch scrolling — 1.8.3

The user reported an unnatural white gradient above the video and unsmooth mobile scrolling. The full-width header background was a white-to-transparent linear gradient. It is now transparent, including the no-JavaScript home state. The logo has a small bounded glass backing, while the existing navigation and button glass remain. The video's uniform 30% dark overlay is unchanged.

Lenis had explicitly disabled touch synchronization. It now uses syncTouch with 1:1 movement while dragging and a short inertia tail (syncTouchLerp .12, touchInertiaExponent 1.35). CSS scroll-behavior does not compete with Lenis. Dialogs/native scroll areas remain excluded, modal opening pauses page scrolling and closing resumes it. Reduced motion still skips Lenis.

Touch-device reveals retain motion using small transforms and opacity. They omit per-word blur, continuous text-blur scrubbing, animated image clip paths and image scaling. Desktop effects stay intact. ScrollTrigger ignores the small mobile browser-toolbar resize cycle, and image/font refreshes are debounced to avoid repeated layout work.

Verification uses a touch-enabled mobile Chromium context and trusted CDP touch gestures: scrolling advances, continues briefly after release, remains monotonic, menu open/close stops/resumes Lenis, coarse-pointer headings have no blur, the header has no gradient, and reduced motion has no Lenis instance. At 390px there is no overflow or JavaScript error. See `qa/mobile-scroll-results.json`. These are emulated touch checks, not a physical-device frame-rate guarantee.

Implementation follows the installed Lenis option definitions and the [official Lenis documentation](https://github.com/darkroomengineering/lenis).
