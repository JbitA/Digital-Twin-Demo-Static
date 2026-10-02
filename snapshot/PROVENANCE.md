# Snapshot provenance and limits

Scenario epoch: 3 October 2026, 09:00 UTC. Road geometry and base travel times were captured during preparation through the existing Valhalla routing gateway; the raw responses are bundled under `routes/`. These use OpenStreetMap-derived road data. No route request occurs when viewing or playing this site. Capture time is recorded in `mission.json` and is distinct from the scenario clock.

Ground coordinates retain the provider's six-decimal polyline geometry; routes snap to road-accessible endpoints. Length/duration use the returned trip summaries. The van has two road legs and an explicitly authored 480-second loading stop. Captured times exclude live traffic and cannot describe future conditions. No alternate/random road routes are offered.

Flight/marine coordinates, schedules, profiles, payloads, consumption, capacities and reserve thresholds are authored demonstration assumptions. They are not observations, calibrated equipment specifications, safe flight plans or safe navigation routes. Vehicle energy is distance × fixed consumption; loading idle consumption is rate × hours; vessel consumption is 18 L/h × transit hours. Replay interpolates by cumulative geometric distance within each timed leg, not actual measured speeds. Arrived assets remain at destination; the drone returns to base. Tasks run independently with no claimed cargo transfers or synchronized dependencies.

The map is an original schematic backdrop, not downloaded imagery or a complete basemap. Grey corridors are the captured route geometries, not a full road network. Geography, coastline and labels are approximate context; only route coordinates carry provider geometry. Do not use the depiction to judge land/sea clearance. No tiles, fonts, CDN files, telemetry, APIs or other outside sources are requested at runtime.

Road source attribution: OpenStreetMap contributors, https://www.openstreetmap.org/copyright (ODbL), routed using Valhalla. Preserve attribution and the source responses when redistributing this derivative demonstration. No new rights to third-party inputs or upstream application assets are asserted.
