/* Generated application-shell worker. Caches only verified release files. */
const VERSION = "1b46571b775822c75731e7375f481f8477847ce5328da9cb2af7564cb082a20b";
const PREFIX = 'ahtiglobe-offline-' + encodeURIComponent(self.registration.scope) + '-';
const CACHE = PREFIX + VERSION + '-' + new URL(self.location.href).searchParams.get('download');
const META = new URL('offline-package-meta', self.registration.scope).href;
const MAX_BYTES = 8 * 1024 * 1024;
const LIFETIME = 7 * 24 * 60 * 60 * 1000;
const allowed = name => ['index.html','runtime-config.js','asset-manifest.json','VERSION'].includes(name) || /^assets\/[a-zA-Z0-9_-]+\.[a-f0-9]{16}\.(js|css|json|png|svg)$/.test(name);
async function limitedBody(response, limit) {
  const reader = response.body.getReader(), parts = []; let size = 0;
  try { while (true) { const {done,value} = await reader.read(); if (done) break; size += value.byteLength; if (size > limit) throw Error('Offline file exceeds declared size'); parts.push(value); } }
  finally { await reader.cancel(); }
  const body = new Uint8Array(size); let offset = 0;
  for (const part of parts) { body.set(part,offset); offset += part.byteLength; }
  return body;
}
self.addEventListener('install', event => event.waitUntil((async () => {
  try {
    const signal = AbortSignal.timeout(40000);
    const response = await fetch(new URL('offline-manifest.json',self.registration.scope),{cache:'no-store',signal});
    if (!response.ok) throw Error('Offline manifest unavailable');
    const manifest = JSON.parse(new TextDecoder().decode(await limitedBody(response,64*1024)));
    if (manifest.version !== VERSION || !Array.isArray(manifest.files) || manifest.files.length > 64) throw Error('Incompatible offline manifest');
    let total = 0; const names = new Set(); const cache = await caches.open(CACHE);
    for (const entry of manifest.files) {
      if (!allowed(entry.path) || names.has(entry.path) || !Number.isInteger(entry.bytes) || entry.bytes < 0 || !/^[a-f0-9]{64}$/.test(entry.sha256)) throw Error('Invalid offline file');
      names.add(entry.path); total += entry.bytes; if (total > MAX_BYTES) throw Error('Offline package exceeds 8 MiB');
      const url = new URL(entry.path,self.registration.scope), resource = await fetch(url,{cache:'no-store',signal});
      if (!resource.ok || resource.redirected) throw Error('Offline file unavailable');
      const body = await limitedBody(resource,entry.bytes);
      const digest = Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',body)),item=>item.toString(16).padStart(2,'0')).join('');
      if (body.byteLength !== entry.bytes || digest !== entry.sha256) throw Error('Offline file hash mismatch');
      const headers = new Headers(resource.headers); headers.delete('content-encoding'); headers.delete('content-length');
      await cache.put(url,new Response(body,{status:200,headers}));
    }
    for (const essential of ['index.html','runtime-config.js','asset-manifest.json','VERSION']) if (!names.has(essential)) throw Error('Incomplete offline package');
    await cache.put(META,new Response(JSON.stringify({version:VERSION,savedAt:Date.now(),bytes:total,expiresAfterDays:7}),{headers:{'content-type':'application/json'}}));
    await self.skipWaiting();
  } catch (error) { await caches.delete(CACHE); throw error; }
})()));
// Retry activation only after the install transaction published verified metadata.
self.addEventListener('message',event=>{
  if(event.data?.type!=='ACTIVATE_VERIFIED_PACKAGE')return;
  event.waitUntil((async()=>{
    const meta=await (await caches.open(CACHE)).match(META);
    if(meta && (await meta.json()).version===VERSION)await self.skipWaiting();
  })());
});
self.addEventListener('activate',event=>event.waitUntil((async()=>{
  for (const name of await caches.keys()) if (name.startsWith(PREFIX) && name !== CACHE) await caches.delete(name);
  await self.clients.claim();
})()));
self.addEventListener('fetch',event=>{
  const request=event.request,url=new URL(request.url),scope=new URL(self.registration.scope);
  if (request.cache==='no-store' || url.searchParams.has('offline-verify'))return;
  if (request.method !== 'GET' || url.origin !== scope.origin || !url.pathname.startsWith(scope.pathname)) return;
  const relative=url.pathname.slice(scope.pathname.length),navigation=request.mode==='navigate' && ['', 'index.html'].includes(relative);
  if (!navigation && !allowed(relative)) return;
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE),metaResponse=await cache.match(META),meta=metaResponse && await metaResponse.json();
    const valid=meta && meta.version===VERSION && Date.now()-meta.savedAt<=LIFETIME && Date.now()>=meta.savedAt;
    if (navigation || relative==='runtime-config.js') {
      try { const response = await fetch(request,{signal:AbortSignal.timeout(3000)}); if (!response.ok) throw Error('Application origin unavailable'); return response; }
      catch { if (!valid) return new Response('Offline application package unavailable or expired. Reconnect and download it again.',{status:503,headers:{'content-type':'text/plain'}}); return await cache.match(new URL(navigation?'index.html':relative,scope)) || new Response('Offline file unavailable',{status:503}); }
    }
    if (valid) { const cached=await cache.match(new URL(relative,scope)); if (cached) return cached; }
    return fetch(request);
  })());
});
