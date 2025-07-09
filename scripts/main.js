if ("serviceWorker" in navigator) {// Mengecek apakah browser mendukung Service Worker
  window.addEventListener("load", () => {// Tunggu sampai seluruh halaman dimuat
    navigator.serviceWorker.register("sw.js")  // Registrasi service worker dari file sw.js di direktori yang sama
      .then(reg => console.log("Service Worker registered:", reg.scope))// Jika berhasil, tampilkan pesan dan scope-nya
      .catch(err => console.error("Service Worker registration failed:", err));// Jika gagal, tampilkan pesan error
  });
}
