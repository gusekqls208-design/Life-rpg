const CACHE='life-rpg-winter-arc-v51';
const FILES=[
  './','./index.html',
  './styles.css','./styles.css?v=32',
  './app.js','./app.js?v=44',
  './manifest.webmanifest','./placeholder.svg','./icon.svg',
  './stage01_cutout.png','./stage02_cutout.png','./stage03_cutout.png',
  './stage04_cutout.png','./stage05_cutout.png','./stage06_cutout.png',
  './stage07_cutout.png','./stage08_cutout.png','./stage09_cutout.png',
  './stage10_cutout.png'
];

self.addEventListener('install',event=>{
  event.waitUntil((async()=>{
    const cache=await caches.open(CACHE);
    await cache.addAll(FILES);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(key=>key.startsWith('life-rpg-winter-arc-')&&key!==CACHE).map(key=>caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  const isAppAsset=url.pathname.endsWith('/app.js')||url.pathname.endsWith('/styles.css');

  if(event.request.mode==='navigate'){
    event.respondWith(fetch(event.request).then(response=>{
      if(response&&response.ok){
        const copy=response.clone();
        caches.open(CACHE).then(cache=>cache.put(new URL('./index.html',self.registration.scope).toString(),copy));
      }
      return response;
    }).catch(()=>caches.match(new URL('./index.html',self.registration.scope).toString())));
    return;
  }

  if(isAppAsset){
    event.respondWith(fetch(event.request).then(response=>{
      if(response&&response.ok){
        const copy=response.clone();
        caches.open(CACHE).then(cache=>cache.put(event.request,copy));
      }
      return response;
    }).catch(()=>caches.match(event.request)));
    return;
  }

  event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request).then(response=>{
    if(response&&response.ok){
      const copy=response.clone();
      caches.open(CACHE).then(cache=>cache.put(event.request,copy));
    }
    return response;
  }).catch(()=>caches.match('./index.html'))));
});
