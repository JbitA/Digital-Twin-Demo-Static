"""Validate the prebuilt static payload; no application server is started."""
from pathlib import Path
import hashlib, json, re
root = Path(__file__).resolve().parents[1]
assert not (root / "CNAME").exists(), "This showcase uses its GitHub Pages address"
config = (root / "runtime-config.js").read_text(encoding="utf-8")
assert 'apiBaseUrl:""' in config and 'staticOnly:true' in config
for entry in (root / "SHA256SUMS.txt").read_text().splitlines():
    expected, name = entry.split("  ", 1)
    target = (root / name).resolve()
    assert root in target.parents, name
    assert hashlib.sha256(target.read_bytes()).hexdigest() == expected, name
manifest = json.loads((root / "offline-manifest.json").read_text())
for entry in manifest["files"]:
    data = (root / entry["path"]).read_bytes()
    assert len(data) == entry["bytes"], entry["path"]
    assert hashlib.sha256(data).hexdigest() == entry["sha256"], entry["path"]
readme = (root / "README.md").read_text(encoding="utf-8")
for groups in re.findall(r'\]\(([^)]+)\)|src="([^"]+)"', readme):
    target = next(item for item in groups if item)
    if "://" not in target:
        assert (root / target.split("#")[0]).exists(), target
print("PASS static-only configuration, GitHub Pages address, package hashes, offline manifest and README links")
