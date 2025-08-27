// Barra de leitura
window.addEventListener('scroll', function() {
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let progress = (scrollTop / scrollHeight) * 100;
  document.documentElement.style.setProperty('--scroll', progress + '%');
});

// Menu colapsável em mobile
const menu = document.querySelector('nav');
document.querySelector('.menu-toggle')?.addEventListener('click', () => {
  menu.classList.toggle('active');
});
