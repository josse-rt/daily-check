const CACHE_NAME = 'cartillas-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './assets/pdfs/12-015-51-01.pdf',
  './assets/pdfs/12-021-12-01.pdf',
  './assets/pdfs/12-021-12-02.pdf',
  './assets/pdfs/12-021-21-01.pdf',
  './assets/pdfs/21-001-02-02.pdf',
  './assets/pdfs/21-001-02-03.pdf',
  './assets/pdfs/21-001-04-01_transit.pdf',
  './assets/pdfs/21-001-04-01.pdf',
  './assets/pdfs/24-054-00-01.pdf',
  './assets/pdfs/24-054-06-01.pdf',
  './assets/pdfs/72-001-03-01.pdf',
  './assets/pdfs/72-001-03-02.pdf',
];
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)))));
});
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => resp || fetch(event.request))
  );
});