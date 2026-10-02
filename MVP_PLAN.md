# Curated static MVP — acceptance gates

1. Bundle a fixed four-asset scenario and retain captured road responses. Ground paths must match those responses, not random synthetic alternatives.
2. Replace the full application with a small map, fleet inspector, shared replay, focus/size controls and evidence panel. No arbitrary planning, live-provider controls, dependencies or CDN assets.
3. Validate units, energy/reserve, durations, endpoint continuity, loading-stop dwell, arrival persistence and replay restart with deterministic model tests.
4. Verify desktop and phone layouts in Chromium and WebKit: selection, pause/play, scrubbing, completion, focus restoration, framing, keyboard access and no horizontal overflow. Exercise widths 320–1440 px.
5. Capture all network requests; allow only same-origin static package files. Prohibit API, WebSocket and external requests. Re-run with all external origins blocked.
6. Verify package integrity and GitHub Pages subpath behaviour, push only after gates pass, wait for CI and verify the published site. Preserve the prior accepted static checkout outside the repository.

Limits: schematic map, fixed payload/consumption assumptions, provider base times without live traffic, illustrative flight/marine paths. No operational safety or unrestricted fleet-capacity claim.
