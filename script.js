// Ambil elemen penting
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');

// Toggle menu mobile
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Tutup menu saat klik link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Scroll effects: navbar dan back-to-top
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  navbar.classList.toggle('scrolled', scrolled > 100);
  backToTop.classList.toggle('show', scrolled > 300);
});

// Tombol kembali ke atas
backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Smooth scroll saat klik anchor
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    const y = target.offsetTop - navbar.offsetHeight;
    window.scrollTo({ top: y, behavior: 'smooth' });
  });
});
