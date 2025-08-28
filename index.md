---
layout: default
title: "Biblioteca de Novels"
---

<div class="reading-progress"></div>

<header class="header">
    <div class="nav-container">
        <a href="#" class="logo">📚 Biblioteca de Novels</a>
        <nav>
            <ul class="nav-menu">
                <li><a href="#home">Início</a></li>
                <li><a href="#novels">Novels</a></li>
                <li><a href="#about">Sobre</a></li>
            </ul>
        </nav>
        <button class="menu-toggle" onclick="toggleMobileMenu()">
            <i class="fas fa-bars"></i>
        </button>
    </div>
</header>

<div class="overlay" id="mobileOverlay" onclick="toggleMobileMenu()"></div>

<section class="hero" id="home">
    <div class="hero-content">
        <h1>Minha Biblioteca de Novels</h1>
        <p>Mergulhe em mundos épicos de aventura, cultivo e fantasia</p>
    </div>
</section>

<section class="novels-section" id="novels">
    <div class="container">
        <div class="novels-grid">
            
            <div class="novel-card">
                <div class="novel-image">
                    <div class="novel-image-icon">🌸</div>
                </div>
                <div class="novel-content">
                    <h3 class="novel-title">Era do Qi</h3>
                    <p class="novel-synopsis">
                        Lian, o irmão esquecido, e sua irmã prodígio Yue vivem em um mundo de cultivo. 
                        Uma jornada épica de crescimento, descobertas e superação em um universo místico onde o qi governa tudo.
                    </p>
                    <div class="novel-stats">
                        <div class="novel-stat">
                            <i class="fas fa-book"></i>
                            <span>3 Capítulos</span>
                        </div>
                        <div class="novel-stat">
                            <i class="fas fa-star"></i>
                            <span>Cultivo</span>
                        </div>
                    </div>
                    <a href="novel-qi/" class="btn-primary">
                        <i class="fas fa-play"></i>
                        Começar Leitura
                    </a>
                </div>
            </div>

            <div class="novel-card">
                <div class="novel-image">
                    <div class="novel-image-icon">🌑</div>
                </div>
                <div class="novel-content">
                    <h3 class="novel-title">Novel Sombria</h3>
                    <p class="novel-synopsis">
                        Mistério e vingança em um mundo de artes marciais sombrias. 
                        Segredos antigos e poderes proibidos aguardam aqueles corajosos o suficiente para desafiar as trevas.
                    </p>
                    <div class="novel-stats">
                        <div class="novel-stat">
                            <i class="fas fa-book"></i>
                            <span>Em breve</span>
                        </div>
                        <div class="novel-stat">
                            <i class="fas fa-skull"></i>
                            <span>Sombrio</span>
                        </div>
                    </div>
                    <a href="novel-sombria/" class="btn-primary">
                        <i class="fas fa-play"></i>
                        Começar Leitura
                    </a>
                </div>
            </div>

        </div>
    </div>
</section>

<section class="features-section">
    <div class="container">
        <div class="features-header">
            <h2>Recursos de Leitura Avançados</h2>
            <p>Experiência de leitura profissional com todas as funcionalidades que você precisa</p>
        </div>
        
        <div class="features-grid">
            <div class="feature-card">
                <div class="feature-icon"><i class="fas fa-search-plus"></i></div>
                <h3>Controle de Zoom</h3>
                <p>Ajuste o tamanho do texto para sua preferência de leitura com controles precisos</p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon"><i class="fas fa-palette"></i></div>
                <h3>Temas Personalizáveis</h3>
                <p>Modo noturno, sépia e outros temas para máximo conforto visual durante a leitura</p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon"><i class="fas fa-bookmark"></i></div>
                <h3>Progresso Automático</h3>
                <p>Nunca perca seu progresso de leitura com salvamento automático</p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon"><i class="fas fa-mobile-alt"></i></div>
                <h3>Totalmente Responsivo</h3>
                <p>Leia perfeitamente em qualquer dispositivo - desktop, tablet ou mobile</p>
            </div>
        </div>
    </div>
</section>

<footer class="footer">
    <div class="container">
        <div class="footer-content">
            <div class="footer-links">
                <a href="#"><i class="fas fa-home"></i> Início</a>
                <a href="#"><i class="fas fa-book"></i> Novels</a>
                <a href="#"><i class="fas fa-info-circle"></i> Sobre</a>
                <a href="#"><i class="fas fa-envelope"></i> Contato</a>
            </div>
        </div>
        <p>&copy; 2024 Minha Biblioteca de Novels. Todos os direitos reservados.</p>
    </div>
</footer>

<script>
// Menu mobile
function toggleMobileMenu() {
    const nav = document.querySelector('nav');
    const overlay = document.getElementById('mobileOverlay');
    const toggle = document.querySelector('.menu-toggle');
    
    nav.classList.toggle('active');
    overlay.classList.toggle('active');
    
    // Animação do botão
    const icon = toggle.querySelector('i');
    if (nav.classList.contains('active')) {
        icon.className = 'fas fa-times';
    } else {
        icon.className = 'fas fa-bars';
    }
}

// Smooth scroll para links da nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Fechar menu mobile se estiver aberto
            if (document.querySelector('nav').classList.contains('active')) {
                toggleMobileMenu();
            }
        }
    });
});

// Barra de progresso de leitura
window.addEventListener('scroll', function() {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let progress = (scrollTop / scrollHeight) * 100;
    document.documentElement.style.setProperty('--scroll', progress + '%');
});

// Animações de scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
    });
}, observerOptions);

// Observar cards e elementos
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.novel-card, .feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        observer.observe(card);
    });
});
</script>

<!-- CSS e JS externos -->
<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/style.css">
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
<script src="{{ site.baseurl }}/assets/js/main.js"></script>