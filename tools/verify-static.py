from pathlib import Path
import hashlib,json,re
root=Path(__file__).resolve().parents[1]
assert not (root/'CNAME').exists()
assert not (root/'runtime-config.js').exists()
html=(root/'index.html').read_text(encoding='utf-8-sig')
assert "connect-src 'none'" in html and "worker-src 'none'" in html
assert not re.search(r'(?:src|href)=["\']https?://',html)
for entry in (root/'SHA256SUMS.txt').read_text().splitlines():
 expected,name=entry.split('  ',1);p=(root/name).resolve();assert root in p.parents;assert hashlib.sha256(p.read_bytes()).hexdigest()==expected,name
for groups in re.findall(r'\]\(([^)]+)\)|src="([^"]+)"',(root/'README.md').read_text(encoding='utf-8-sig')):
 target=next(x for x in groups if x)
 if '://' not in target:assert (root/target.split('#')[0]).exists(),target
for name in ['assets/app.js','assets/model.js','assets/mission.js']:
 text=(root/name).read_text(encoding='utf-8-sig');assert not re.search(r'\bfetch\s*\(|new\s+WebSocket',text),name
 assert all(url=='http://www.w3.org/2000/svg' for url in re.findall(r'https?://[^\'\"\s]+',text)),name
print('PASS package hashes, README links, no remote resources, no API code and restrictive CSP')
