window.__NAT_BOOTSTRAP_STATE__ = 'LOADING_MODULE';
// Static-only network policy. Local package files and OSM image tiles are allowed.
const nativeFetch=globalThis.fetch.bind(globalThis);
globalThis.fetch=(input,options)=>{
 const url=new URL(input instanceof Request?input.url:String(input),document.baseURI);
 const scope=new URL('./',document.baseURI);
 const localFile=url.origin===scope.origin&&url.pathname.startsWith(scope.pathname)&&/\.(?:json|js|css|svg|png|html)$/.test(url.pathname)&&(!options?.method||options.method==='GET');
 const tile=url.origin==='https://tile.openstreetmap.org'&&/^\/\d+\/\d+\/\d+\.png$/.test(url.pathname);
 if(!localFile&&!tile)return Promise.reject(new Error('Static demo: API requests disabled'));
 return nativeFetch(input,options);
};


const status = document.getElementById('startupStatus');
let failed = false;

function fail(error) {
  if (failed) return;
  failed = true;
  window.__NAT_BOOTSTRAP_STATE__ = 'FAILED';
  status.hidden = false;
  status.setAttribute('role', 'alert');
  status.textContent = 'APPLICATION FAILED TO INITIALISE. ' + (location.protocol === 'file:'
    ? 'Serve the dist folder over HTTP; direct file opening is unsupported. '
    : 'Reload the page or try deterministic demo mode. ') + (error?.message || 'Startup timed out.');
  const link = document.createElement('a');
  link.href = '?mode=demo&reload=1';
  link.textContent = ' Open demo mode';
  status.append(link);
  console.error('[NAT bootstrap]', error);
}

const timer = setTimeout(() => fail(new Error('Startup exceeded 50 seconds.')), 50000);
import('./app.65d8396e28849178.js').then(module => {
  if (failed) throw new Error('Startup deadline exceeded; reload to retry.');
  return module.bootstrap();
}).then(() => {
  if (!failed) status.hidden = true;
}).catch(fail).finally(() => clearTimeout(timer));
