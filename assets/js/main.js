// Menu mobile
function toggleMobileMenu() {
  const nav = document.getElementById('siteNav');
  const overlay = document.getElementById('mobileOverlay');
  const toggle = document.querySelector('.menu-toggle');
  if (!nav || !overlay || !toggle) return;

  nav.classList.toggle('active');
  overlay.classList.toggle('active');

  const icon = toggle.querySelector('i');
  icon.className = nav.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
}
window.toggleMobileMenu = toggleMobileMenu; // expõe para onclick

// Smooth scroll (só se o alvo existir)
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const target = document.querySelector(link.getAttribute('href'));
  if (!target) return;
  e.preventDefault();
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const nav = document.getElementById('siteNav');
  if (nav?.classList.contains('active')) toggleMobileMenu();
});

// Barra de progresso
window.addEventListener('scroll', () => {
  const top = document.documentElement.scrollTop || document.body.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const pct = height > 0 ? (top / height) * 100 : 0;
  document.documentElement.style.setProperty('--scroll', pct + '%');
});

// Animações de entrada
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.novel-card, .feature-card').forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    observer.observe(el);
  });
});
