const STATIC_NAME_VERSION = "static-v3";

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(STATIC_NAME_VERSION).then(async (cache) => {
      let statusCaches;
      const staticCaches = [
        "/",
        "/index.html",
        "/help/index.html",
        "/favicon.ico",
        "/src/css/app.css",
        "/src/css/feed.css",
        "/src/css/help.css",
        "/scr/js/app.js",
        "/src/js/feed.js",
        "/src/js/material.min.js",
      ];
      try {
        statusCaches = await cache.addAll(staticCaches);
      } catch (err) {
        staticCaches.forEach((req) => cache.add(req));
      }
      console.log(statusCaches);
      return statusCaches;
    })
  );
});

self.addEventListener("activate", function (event) {
  console.log("[Service Worker] Activating Service Worker ...", event);
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== STATIC_NAME_VERSION && key !== "Dynamic") return caches.delete(key);
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => {
      if (res) {
        console.log(res);
        return res;
      }
      return fetch(event.request).then((res) => {
        console.log("Respone for Dynamic Caches Fetch", res);
        return caches.open("Dynamic").then(async (cache) => {
          cache.put(event.request.url, res.clone());
          return res;
        });
      });
    })
  );
});
