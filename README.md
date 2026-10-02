# Digital Twin — Mission Snapshot

**[Explore the prepared mission →](https://jbita.github.io/Digital-Twin-Demo-Static/)**

A small, self-contained mixed-fleet showcase: an airport shuttle, a logistics van with a loading stop, an inspection drone and a harbour support vessel. All plans are curated for **3 October 2026, 09:00 UTC**. Nothing is planned through an API when you open the page.

![Desktop mission snapshot](docs/showcase/desktop.png)

<details><summary>Phone preview</summary>

<img src="docs/showcase/phone.png" width="390" alt="Prepared mixed-fleet mission on a phone-sized browser" />

</details>

## The idea: a digital twin mission captured in time

The wider Digital Twin project treats a real-world map as an application workspace: assets have identities, capabilities, locations and operating constraints, and their activity can be examined together. The long-term direction is a shared spatial foundation for further applications using live and offline data. This repository demonstrates one small, concrete part of that idea: **how a mixed fleet's prepared activities can be understood on a map and replayed against one clock**.

This static edition is an interactive snapshot, rather than a screenshot or a live operations system. Its routes, mission inputs and model assumptions are prepared before publication and packaged with the viewer. Opening the page does not ask a server to plan a journey or retrieve fresh observations. You explore the same reviewed scenario every time, while playback computes intermediate positions and energy from the bundled plans.

That separation makes the public example dependable even when the operator's PC, routing provider or weather service is unavailable. It also avoids presenting synthetic road alternatives as if they were usable route plans. The car and van retain captured road geometry; arbitrary destinations and live-service controls have been removed from this edition.

## What the prepared fleet demonstrates

- **Airport shuttle — electric car:** a captured Helsinki-to-airport road journey demonstrates route distance, duration and battery use.
- **Logistics van — diesel:** two captured road legs connect Helsinki, Pasila and Vuosaari harbour. An eight-minute equipment-loading stop demonstrates movement, stationary dwell and idle consumption within one task.
- **Inspection drone — electric UAV:** an authored harbour inspection loop returns to its base, demonstrating a different movement domain and a tighter modelled energy reserve.
- **Harbour support vessel — diesel:** authored departure/transit waypoints demonstrate a marine asset with a time-based fuel model.

Each asset has a task, route basis, assumed payload, energy capacity and reserve threshold. Their durations differ. All start at the scenario epoch, and the shared mission ends when the longest task finishes; earlier arrivals remain at their endpoints. These are independent example tasks, not a claimed synchronized cargo-transfer operation.

## What you can learn from the viewer

Watch the fleet together, then select a twin to inspect its task and assumptions. Scrub directly to the van's loading stop or another asset's arrival, compare remaining energy against reserve, and isolate a selected path to reduce clutter. The **Brief** explains the scenario; **Evidence** distinguishes captured road data from authored paths and model estimates.

The purpose is to make the platform's base interactions understandable to someone seeing it for the first time: map-based asset selection, different asset domains, readable mission plans, time-based movement and explicit evidence. It does not claim that four examples establish operational accuracy or large-fleet scalability.

## Static showcase and full platform

**This repository** contains only the curated viewer and its prepared evidence. It has no live telemetry, weather ingestion, arbitrary journey planning, backend mission authority or asset/personnel access-right management. Its schematic map is bundled, so it does not depend on an online basemap either. Serving the site requires ordinary static file hosting; visitors simply open the demo link above.

The [full Digital Twin Demo repository](https://github.com/JbitA/Digital-Twin-Demo) contains the broader application and its PC-backed services. That edition is where new data, provider integrations and general planning workflows belong. The static edition is a deliberately bounded public demonstration of a reviewed scenario; the full edition's features and validation limits are documented separately.

**A snapshot is dated evidence.** The scenario clock begins at 09:00 UTC on 3 October 2026. Route acquisition time is recorded separately in the prepared data. Neither date makes the example a current observation of vehicles, roads, traffic or harbour conditions.

## Quick look

1. Select a twin in **Fleet** or on the map to inspect its task, duration, energy and reserve.
2. Press **Play mission**, pause, change playback speed or scrub the shared timeline. **Restart** returns to the prepared beginning.
3. Enable **Selected asset & path only** to isolate a task; switch it off to restore the fleet. Adjust asset size as needed.
4. **Fleet** frames current positions; **Route** frames the selected prepared path; **Reset** restores the map view.
5. Open **Brief** for the scenario or **Evidence** for sources and modelling limits.

The car and van use **captured road-network routes**, not random alternatives. Drone and marine paths are illustrative. Map context is a bundled schematic; no tiles, APIs, WebSockets, fonts or other external resources are loaded. Destinations are fixed so this edition presents a credible prepared example instead of an incomplete general-purpose planner.

## What is modelled

Route times exclude live traffic. Energy, payload, capacities and reserves are explicit demonstration assumptions. The van waits eight minutes in Pasila; the drone returns to base. Earlier arrivals stay at their destination while the remaining tasks continue. Tasks are independent and do not imply asset/cargo transfers. Flight airspace and marine clearance, depth and fairways are unvalidated. This is a demonstration, not operational navigation.

[Snapshot provenance](snapshot/PROVENANCE.md) · [Prepared data](snapshot/mission.json) · [Acceptance plan](MVP_PLAN.md)

## Technology & contributions

**JavaScript** provides a small dependency-free replay/model layer; **HTML/CSS and SVG** provide responsive controls and a bundled schematic map. This avoids the full application's map engine, backend services and runtime package dependencies. **JSON** retains prepared data and raw route evidence. **Python** checks release integrity in CI, and **YAML** publishes GitHub Pages; neither runs in the visitor's browser. C#, Rust and Python services belong to the [full platform](https://github.com/JbitA/Digital-Twin-Demo#languages-responsibilities-and-contribution-guide), not this viewer.

Contributions should preserve the prepared-data contract, source attribution and explicit assumptions. Validate geometry/timing/energy, desktop/phone interaction and zero external/API traffic before publishing. A new scenario requires fresh evidence, not enabling arbitrary routing. Update the prepared mission and raw route evidence together, document units and assumptions, regenerate screenshots and checksums, and run the [model, browser and integrity checks](tools/README.md). Keep runtime requests limited to the site’s own static files; all outside origins must remain blocked during acceptance. Four curated assets is this demonstration's scope, not a fleet-capacity benchmark.

Screenshots are browser captures; the phone layout is emulated. Road data © OpenStreetMap contributors (ODbL), routed with Valhalla. No additional third-party data rights are asserted.
