# Digital Twin — Mission Snapshot

**[Explore the prepared mission →](https://jbita.github.io/Digital-Twin-Demo-Static/)**

A small, self-contained mixed-fleet showcase: an airport shuttle, a logistics van with a loading stop, an inspection drone and a harbour support vessel. All plans are curated for **3 October 2026, 09:00 UTC**. Nothing is planned through an API when you open the page.

![Desktop mission snapshot](docs/showcase/desktop.png)

<details><summary>Phone preview</summary>

<img src="docs/showcase/phone.png" width="390" alt="Prepared mixed-fleet mission on a phone-sized browser" />

</details>

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

Contributions should preserve the prepared-data contract, source attribution and explicit assumptions. Validate geometry/timing/energy, desktop/phone interaction and zero external/API traffic before publishing. A new scenario requires fresh evidence, not enabling arbitrary routing. Four curated assets is this demonstration's scope, not a fleet-capacity benchmark.

Screenshots are browser captures; the phone layout is emulated. Road data © OpenStreetMap contributors (ODbL), routed with Valhalla. No additional third-party data rights are asserted.
