# Hero video — 1.8.1

The user supplied the six-second landscaping video and requested a dark overlay of 10–30%. The homepage hero media now uses this video with a uniform 20% black overlay, centred 16:9 framing and the existing bounded hero width. The hero text and surrounding content retain their layout. The caption links to services and does not identify the supplied generative scene as a completed ANZ project.

The original download remains untouched. A 1920×1080 H.264 MP4 derivative uses CRF 24, silent playback and fast-start metadata. It is 5,844,584 bytes versus the 31,140,194-byte source. The poster is extracted from the same clip. The video plays muted, inline and looped when visible; an accessible glass pause/play button controls playback. Offscreen and hidden-page playback pauses. Reduced-motion and data-saving preferences retain the still poster without requesting the MP4. A failed playback attempt leaves a play control; a media decoding error leaves the poster. With JavaScript disabled the poster remains visible.

Open Graph and fallback LocalBusiness imagery use the video poster. Source name and hash follow for traceability; no new external generation was performed.

{
  "source": "hf_20261030_135358_88044ff8-577c-44e3-8c6d-e47cd94e6883.mp4",
  "sha256": "0cf95692e83a7c5475c9af5b714a2fc6104483fa8ffe58dde2f7352ccb69ceb9"
}

Verification: production build and changed PHP lint pass. Edge and WebKit confirm inline muted playback, pause/resume, loop restart, offscreen pause, 20% overlay, no horizontal overflow at 1440/768/390/320px, zero hero accessibility violations and no MP4 request with reduced motion. See `qa/hero-video-results.json`.
