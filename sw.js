const CACHE_NAME = "portfolio-cache-v1";// Nama cache yang digunakan untuk menyimpan aset
// Daftar file yang akan disimpan ke cache saat instalasi Service Worker
const urlsToCache = [
  "/",// Halaman root
  "/index.html",// Halaman utama
  "/skills.html",// Halaman keahlian
  "/manifest.json",// File manifest PWA
  "/sw.js",// File Service Worker itu sendiri
  "/images/profil.jpg",// Gambar profil
  "/images/html.jpg",// Gambar ikon HTML
  "/images/css.jpg",// Gambar ikon CSS
  "/images/java.jpg",// Gambar ikon Java
  "images/bootstrap.jpg",// Gambar ikon Bootstrap (tanpa slash depan, sebaiknya konsisten)
  "images/figma.jpg",// Gambar ikon Figma
];
// Event 'install' akan berjalan saat pertama kali Service Worker diinstall
// Tujuannya untuk menyimpan file ke dalam cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      return Promise.all(
        urlsToCache.map(async url => {
          try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`${response.statusText} (${response.status})`);
            await cache.put(url, response.clone());
            console.log(` Cached: ${url}`);
          } catch (err) {
            console.error(` Gagal cache: ${url} →`, err.message);
          }
        })
      );
    })
  );
});
// Event 'activate' digunakan untuk membersihkan cache lama yang tidak sesuai dengan CACHE_NAME
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);// Hapus cache yang lama
        })
      )
    )
  );
});
// Event 'fetch' akan menangani setiap permintaan jaringan
// Pertama cari di cache, jika tidak ada maka ambil dari internet
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request); // Pakai cache kalau ada, kalau tidak fetch
    }).catch(() => {
      return caches.match("/portofolio/index.html");// Fallback jika fetch gagal (offline)
    })
  );
});
