// public/sw.js

const CACHE_NAME = "image-video-cache-v1";
const CACHE_DURATION = 2 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Skip chrome-extension URLs and non-GET requests
  if (url.protocol === "chrome-extension:" || event.request.method !== "GET") {
    return;
  }

  // Check if the request is for an image in the images folder
  if (
    url.pathname.startsWith("/images/") ||
    url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)
  ) {
    event.respondWith(
      caches
        .open(CACHE_NAME)
        .then((cache) => {
          return cache.match(event.request).then((response) => {
            if (response) {
              const fetchDate = new Date(response.headers.get("sw-fetched-on"));
              if (
                fetchDate &&
                new Date().getTime() - fetchDate.getTime() < CACHE_DURATION
              ) {
                return response;
              }
            }

            return fetch(event.request)
              .then((networkResponse) => {
                if (networkResponse.ok) {
                  const clonedResponse = networkResponse.clone();
                  const headers = new Headers(clonedResponse.headers);
                  headers.append("sw-fetched-on", new Date().toUTCString());
                  return clonedResponse
                    .blob()
                    .then((body) => {
                      return new Response(body, { headers: headers });
                    })
                    .then((responseToCache) => {
                      cache
                        .put(event.request, responseToCache)
                        .catch((error) => {
                          console.error("Cache put error:", error);
                        });
                      return networkResponse;
                    });
                }
                return networkResponse;
              })
              .catch(() => {
                return (
                  response ||
                  new Response("Network error occurred", {
                    status: 408,
                    headers: { "Content-Type": "text/plain" },
                  })
                );
              });
          });
        })
        .catch((error) => {
          console.error("Cache open error:", error);
          return fetch(event.request);
        })
    );
  }
});

// Background sync for fetching new images
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-new-images") {
    event.waitUntil(
      fetch("/api/list-images") // Endpoint that returns a list of all image URLs in the images folder
        .then((response) => response.json())
        .then((imageUrls) => {
          return caches.open(CACHE_NAME).then((cache) => {
            return Promise.all(
              imageUrls.map((imageUrl) =>
                fetch(imageUrl)
                  .then((response) => cache.put(imageUrl, response))
                  .catch((error) =>
                    console.error("Failed to cache:", imageUrl, error)
                  )
              )
            );
          });
        })
        .catch((error) => console.error("Sync failed:", error))
    );
  }
});
