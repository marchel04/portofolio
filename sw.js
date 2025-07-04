const CACHE_NAME = "portfolio-cache-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/skills.html",
  "/manifest.json",
  "/sw.js",
  "/images/profil.jpg",
  "/images/html.jpg",
  "/images/css.jpg",
  "/images/java.jpg",
  "images/bootstrap.jpg",
  "images/figma.jpg",
];

// Gunakan fetch manual agar bisa log file mana yang gagal
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      return Promise.all(
        urlsToCache.map(async url => {
          try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`${response.statusText} (${response.status})`);
            await cache.put(url, response.clone());
            console.log(`✅ Cached: ${url}`);
          } catch (err) {
            console.error(`❌ Gagal cache: ${url} →`, err.message);
          }
        })
      );
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    }).catch(() => {
      return caches.match("/portofolio/index.html");
    })
  );
});
