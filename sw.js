const CACHE_NAME = "iraqieco-v1";

const FILES = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/css/variables.css",
  "/css/reset.css",
  "/css/layout.css",
  "/css/components.css",
  "/css/utilities.css",
  "/css/index.css",
  "/css/dark.css",
  "/js/index.js",
  "/assets/icons/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
