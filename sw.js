const CACHE_NAME = "logos-quest-v1";
const ASSETS = [
  "/Logos-quest-all/",
  "/Logos-quest-all/index.html",
  "/Logos-quest-all/quiz.html",
  "/Logos-quest-all/leaderboard.html",
  "/Logos-quest-all/icon-512.png",
  "/Logos-quest-all/manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
