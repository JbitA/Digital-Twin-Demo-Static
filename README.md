# AhtiGlobe emergency static deployment

## Purpose

This deployment is the independent, known-good showcase used when the full PC-backed AhtiGlobe deployment is unavailable. It contains only the browser application and bundled demonstration data. It does not require Docker, the PC host, Cloudflare Tunnel, the C# mission service, the Rust telemetry path, or the Python weather service.

Static means that AhtiGlobe has no dependency on an operator-owned backend. It does not mean fully offline: OpenStreetMap tiles and other public browser-accessible resources can still require internet access. The interface must label bundled, modelled and unavailable data accurately.

Keep this deployment at a separate address from the full version, for example `demo.ahtiglobe.com` or a dedicated GitHub Pages repository. Do not overwrite it automatically when updating the full deployment.

## Release artifact

Deploy the contents of:

```text
nordic-asset-twin-v2.3.0-site.zip
```

The files inside the ZIP are already the publishing root. Upload `index.html`, `runtime-config.js`, `assets/`, `api/`, `.nojekyll`, and the other extracted files directly to the selected static host. Do not upload the containing ZIP directory as an extra path level.

## Required static configuration

The emergency package must have an empty API base in its root `runtime-config.js`:

```js
window.__NAT_RUNTIME_CONFIG__ = Object.freeze({
  apiBaseUrl: ""
});
```

An empty value selects the labelled static fallback. Do not use `deploy/github-pages/runtime-config.js.example` for this emergency deployment because that example points to the full backend.

## Build a fresh emergency package

Run these commands from the source package root:

```powershell
Remove-Item Env:NAT_API_BASE_URL -ErrorAction SilentlyContinue
npm ci
npm test
npm run build
python scripts/release.py
python scripts/release.py --check
```

Before publishing, open `dist/runtime-config.js` and verify that `apiBaseUrl` is empty. The generated site ZIP is written beside the source directory.

## GitHub Pages deployment

Use a repository or Pages project reserved for the emergency version. Publish the extracted site ZIP contents from the repository root or the configured Pages artifact root. If a custom fallback domain is used, keep its `CNAME` file in this package only.

The main repository workflow currently builds a frontend that targets the full API. It is therefore a full-deployment workflow, not the authority for this emergency package unless its build environment is deliberately changed and reviewed.

## Acceptance gate

Validate the emergency site while the PC backend and tunnel are stopped:

1. Load the site in a clean browser session.
2. Confirm the header reports fallback or demo state rather than a live backend.
3. Open the asset browser and inspect representative land, air and marine assets.
4. Plan and replay at least one bundled demonstration journey.
5. Confirm missing live providers do not block navigation or leave an endless loading state.
6. Test desktop and iPhone 12 portrait dimensions.
7. Confirm the console contains no credential, mixed-content or uncaught application errors.
8. Record the deployed URL, release version and site ZIP SHA-256.

Do not describe C# mission authority, native NOAA grid processing, live telemetry, live charging/fuel infrastructure, or tunneled provider adapters as available in this deployment.

## Rollback and preservation

Keep the last accepted site ZIP and its SHA-256 outside the full deployment directory. A rollback consists of republishing that exact ZIP. Do not rebuild during an emergency unless the preserved artifact is unavailable, because rebuilding changes the evidence being recovered.

