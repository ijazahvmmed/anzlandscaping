# Header and touch scrolling — 1.8.3

The user reported an unnatural white gradient above the video and unsmooth mobile scrolling. The full-width header background was a white-to-transparent linear gradient. It is now transparent, including the no-JavaScript home state. The logo has a small bounded glass backing, while the existing navigation and button glass remain. The video's uniform 30% dark overlay is unchanged.

Lenis had explicitly disabled touch synchronization. It now uses syncTouch with 1:1 movement while dragging and a short inertia tail (syncTouchLerp .12, touchInertiaExponent 1.35). CSS scroll-behavior does not compete with Lenis. Dialogs/native scroll areas remain excluded, modal opening pauses page scrolling and closing resumes it. Reduced motion still skips Lenis.

Touch-device reveals retain motion using small transforms and opacity. They omit per-word blur, continuous text-blur scrubbing, animated image clip paths and image scaling. Desktop effects stay intact. ScrollTrigger ignores the small mobile browser-toolbar resize cycle, and image/font refreshes are debounced to avoid repeated layout work.

Verification uses a touch-enabled mobile Chromium context and trusted CDP touch gestures: scrolling advances, continues briefly after release, remains monotonic, menu open/close stops/resumes Lenis, coarse-pointer headings have no blur, the header has no gradient, and reduced motion has no Lenis instance. At 390px there is no overflow or JavaScript error. See `qa/mobile-scroll-results.json`. These are emulated touch checks, not a physical-device frame-rate guarantee.

Implementation follows the installed Lenis option definitions and the [official Lenis documentation](https://github.com/darkroomengineering/lenis).

## Follow-up correction — 1.8.4

The user continued to encounter sudden stops on real mobile devices. The emulated short-swipe test in 1.8.3 did not establish reliable mobile momentum. That touch synchronization configuration is superseded: Lenis now initializes only for fine-pointer, hover-capable desktop input, with syncTouch disabled. Coarse-pointer/mobile devices have no Lenis instance, no JavaScript touch interception and no Lenis stop/start class. The browser owns touch movement and momentum. GSAP reveal enhancements remain, using the lightweight touch path.

Dialog scroll locks are reconciled from actual open dialogs, including pageshow/history restoration, so a stale modal-open class is cleared. Desktop Lenis also derives stopped state from open dialogs rather than arbitrary body class changes. Footer planting now responds to clicks/taps instead of pointerdown, so swiping across it does not start a canvas animation.

The replacement regression check exercises repeated swipes across hero, services, work, approach and the garden, three menu open/close cycles, history restoration, viewport resize, uncancelled touch events and continued desktop Lenis activation. Chromium uses trusted CDP touch gestures; WebKit tests native scrolling and lock recovery without claiming physical iOS gesture verification.

Verification completed against both local WordPress and the built Vercel static output. Both Chromium trusted-touch and WebKit native-scroll/lock-recovery checks pass, including five page regions, three repeated menu cycles, viewport resize and stale-lock recovery. No cancelled touchmove events or JavaScript errors were observed. Reports: `qa/mobile-scroll-wordpress-results.json` and `qa/mobile-scroll-results.json`. Production build 1.8.4 passes. Physical-device performance remains outside these automated checks.

## Momentum interruption correction — 1.8.5

Mobile no longer imports the GSAP/ScrollTrigger/Lenis bundle at all. The prior fix removed Lenis but left ScrollTrigger refresh callbacks after lazy-image and font loads. The installed ScrollTrigger refresh implementation records/restores scroll position; those writes are incompatible with uninterrupted native fling momentum. This was a plausible remaining interruption path, not established by the earlier short-swipe test.

Touch devices and viewports below 951px now load a separate 1.14KB reveal module using IntersectionObserver and Web Animations. It does not read/write scroll position, attach scroll listeners, refresh on image loads, pin sections, or split words. Cards and headings retain one-time opacity/transform reveals. Desktop motion stays unchanged. Content remains visible if scripts fail or motion is reduced.

The regression check now records mobile motion-chunk requests and instruments programmatic scroll writes while swiping through sections, in addition to menu and history recovery checks. This checks the missing failure mode rather than inferring success from movement alone.

1.8.5 Vercel-output regression result: Edge trusted touch gestures and WebKit native-scroll checks pass. Only the mobile-motion chunk was requested on mobile; no GSAP motion chunk, script-driven scroll writes, cancelled touchmove events or JavaScript errors were recorded. Desktop Lenis still initializes. Report: `qa/mobile-scroll-results.json`. This does not substitute for physical iOS/Android verification.
