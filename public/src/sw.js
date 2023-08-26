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
        "/src/js/app.js",
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

//  ****** MY Block ***//////
self.addEventListener("fetch", (event) => {
  console.log("[Service Worker] Fetch data...", event);
  event.respondWith(
    caches.match(event.request).then((res) => {
      if (res) {
        console.log(res);
        return res;
      }
      return fetch(event.request).then((res) => {
        console.log("Respone for Dynamic Caches Fetch", res);
        return caches.open("Dynamic").then((cache) => {
          console.log(cache,"chach from responese fetch data")
          cache.put(event.request.url, res.clone());
          return res;
        });
      });
    })
  );
});
//  ****** MY Block ***//////

// *****Stackoverflow Block

// self.addEventListener("fetch", function (event) {
//   console.log(event);
//   event.respondWith(
//     caches.open("mysite-dynamic").then(function (cache) {
//       return cache.match(event.request).then(function (response) {
//         var fetchPromise = fetch(event.request).then(function (networkResponse) {
//           cache.put(event.request, networkResponse.clone());
//           return networkResponse;
//         });
//         return response || fetchPromise;
//       });
//     })
//   );
// });
