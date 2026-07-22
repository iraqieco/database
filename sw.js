const CACHE_NAME = "iraqieco-v1";

const FILES = [
  "/database/",
  "/database/index.html",
  "/database/manifest.webmanifest",
  "/database/css/variables.css",
  "/database/css/reset.css",
  "/database/css/layout.css",
  "/database/css/components.css",
  "/database/css/utilities.css",
  "/database/css/index.css",
  "/database/css/dark.css",
  "/database/js/index.js",
  "/database/assets/icons/icon-512.png"
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
