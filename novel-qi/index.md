---
layout: default
title: "Era do Qi"
---

<div class="reading-progress"></div>
<button class="menu-toggle" onclick="toggleSidebar()">
    <i class="fas fa-bars"></i>
</button>

<!-- Sidebar de Navegação -->
<nav id="sidebar">
    <h3><i class="fas fa-book"></i> Era do Qi</h3>
    <ul class="chapter-list">
        <li onclick="window.location.href='capitulos/capitulo-01.html'">
            <i class="fas fa-play"></i> Capítulo 01 – O Irmão Esquecido
        </li>
        <li onclick="window.location.href='capitulos/capitulo-02.html'">
            <i class="fas fa-lock"></i> Capítulo 02 – A Prodigiosa Irmã
        </li>
        <li onclick="window.location.href='capitulos/capitulo-03.html'">
            <i class="fas fa-lock"></i> Capítulo 03 – Festival das Flores
        </li>
    </ul>
    
    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.2);">
        <h4>🌍 Extras</h4>
        <ul class="chapter-list">
            <li onclick="window.location.href='extras/personagens.html'">
                <i class="fas fa-users"></i> Personagens
            </li>
            <li onclick="window.location.href='extras/tecnicas.html'">
                <i class="fas fa-magic"></i> Técnicas e Poderes
            </li>
            <li onclick="window.location.href='extras/seitas.html'">
                <i class="fas fa-temple"></i> Seitas
            </li>
        </ul>
    </div>
</nav>

<div class="overlay" id="overlay" onclick="closeSidebar()"></div>

<main>
    <div class="chapter-header">
        <h1 class="chapter-title">🌸 Era do Qi</h1>
        <div class="chapter-meta">
            <span><i class="fas fa-user"></i> Protagonista: Lian</span>
            <span><i class="fas fa-star"></i> Gênero: Cultivo</span>
            <span><i class="fas fa-book"></i> 3 Capítulos</span>
        </div>
    </div>

    <div class="novel-cover">
        <div class="cover-placeholder">
            <i class="fas fa-book-open"></i>
            <p>Capa da Novel</p>
        </div>
    </div>

    <div class="novel-description">
        <h2>📖 Sinopse</h2>
        <p>
            Bem-vindo à história épica de <strong>Lian</strong>, o irmão esquecido, e sua irmã gêmea 
            <strong>Yue</strong>, uma prodígio incomparável no mundo do cultivo.
        </p>
        
        <p>
            Em um universo onde o Qi governa tudo, onde seitas poderosas dominam continentes inteiros 
            e onde a força determina o destino, Lian sempre foi visto como o irmão fraco, ofuscado 
            pelo brilho de sua irmã.
        </p>

        <blockquote>
            <i class="fas fa-quote-left"></i>
            "No Reino da Condensação de Qi, mesmo o menor passo pode mudar o destino de mundos inteiros."
            <i class="fas fa-quote-right"></i>
        </blockquote>

        <p>
            Mas quando sonhos misteriosos começam a revelar técnicas antigas e um poder dourado 
            desperta em seu dantian, Lian descobrirá que ser esquecido pode ser exatamente a 
            vantagem que ele precisava.
        </p>
    </div>

    <div class="quick-access">
        <h2>🚀 Acesso Rápido</h2>
        <div class="quick-buttons">
            <a href="capitulos/capitulo-01.html" class="btn-primary large">
                <i class="fas fa-play"></i>
                Começar do Capítulo 1
            </a>
            <a href="extras/personagens.html" class="btn-secondary">
                <i class="fas fa-users"></i>
                Conhecer Personagens
            </a>
        </div>
    </div>

    <div class="chapters-preview">
        <h2>📚 Capítulos Disponíveis</h2>
        
        <div class="chapter-card">
            <div class="chapter-number">01</div>
            <div class="chapter-info">
                <h3>O Irmão Esquecido</h3>
                <p>Lian acorda perdido novamente, mas algo mudou durante a noite. Um poder estranho desperta...</p>
                <div class="chapter-stats">
                    <span><i class="fas fa-clock"></i> ~10 min</span>
                    <span><i class="fas fa-eye"></i> Disponível</span>
                </div>
            </div>
            <a href="capitulos/capitulo-01.html" class="btn-read">
                <i class="fas fa-book-open"></i>
                Ler
            </a>
        </div>

        <div class="chapter-card locked">
            <div class="chapter-number">02</div>
            <div class="chapter-info">
                <h3>A Prodigiosa Irmã</h3>
                <p>Yue percebe mudanças no cultivo de Lian e decide investigar o mistério...</p>
                <div class="chapter-stats">
                    <span><i class="fas fa-lock"></i> Em breve</span>
                </div>
            </div>
            <div class="btn-read disabled">
                <i class="fas fa-lock"></i>
                Bloqueado
            </div>
        </div>

        <div class="chapter-card locked">
            <div class="chapter-number">03</div>
            <div class="chapter-info">
                <h3>Festival das Flores Espirituais</h3>
                <p>O grande festival onde Lian descobrirá seus verdadeiros poderes...</p>
                <div class="chapter-stats">
                    <span><i class="fas fa-lock"></i> Em breve</span>
                </div>
            </div>
            <div class="btn-read disabled">
                <i class="fas fa-lock"></i>
                Bloqueado
            </div>
        </div>
    </div>

    <div class="back-nav">
        <a href="../" class="btn-back">
            <i class="fas fa-arrow-left"></i>
            Voltar ao Catálogo de Novels
        </a>
    </div>
</main>

<style>
/* Estilos específicos para a página da novel */
.novel-cover {
    text-align: center;
    margin: 2rem 0 3rem;
}

.cover-placeholder {
    width: 300px;
    height: 400px;
    background: var(--bg-gradient);
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    color: white;
    box-shadow: var(--card-shadow);
    transition: var(--transition);
}

.cover-placeholder:hover {
    transform: scale(1.05);
}

.cover-placeholder i {
    font-size: 4rem;
    margin-bottom: 1rem;
}

.novel-description {
    background: white;
    padding: 3rem;
    border-radius: 20px;
    box-shadow: var(--card-shadow);
    margin: 3rem 0;
}

.quick-access {
    text-align: center;
    margin: 3rem 0;
}

.quick-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 2rem;
}

.btn-primary.large {
    padding: 20px 40px;
    font-size: 1.2rem;
    font-weight: bold;
}

.btn-secondary {
    background: linear-gradient(45deg, #95a5a6, #bdc3c7);
    color: white;
    padding: 15px 30px;
    border: none;
    border-radius: 25px;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    transition: var(--transition);
}

.btn-secondary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(149, 165, 166, 0.3);
}

.chapters-preview {
    margin: 3rem 0;
}

.chapter-card {
    display: flex;
    align-items: center;
    background: white;
    border-radius: 15px;
    padding: 2rem;
    margin: 1.5rem 0;
    box-shadow: var(--card-shadow);
    transition: var(--transition);
    border-left: 5px solid var(--secondary);
}

.chapter-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.chapter-card.locked {
    opacity: 0.6;
    border-left-color: #bdc3c7;
}

.chapter-card.locked:hover {
    transform: none;
}

.chapter-number {
    font-size: 3rem;
    font-weight: bold;
    color: var(--secondary);
    margin-right: 2rem;
    min-width: 80px;
    text-align: center;
}

.chapter-card.locked .chapter-number {
    color: #bdc3c7;
}

.chapter-info {
    flex: 1;
}

.chapter-info h3 {
    color: var(--primary);
    margin-bottom: 0.5rem;
}

.chapter-info p {
    color: #666;
    margin-bottom: 1rem;
}

.chapter-stats {
    display: flex;
    gap: 2rem;
    font-size: 0.9rem;
    color: #888;
}

.btn-read {
    background: var(--secondary);
    color: white;
    padding: 12px 20px;
    border-radius: 20px;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: var(--transition);
    min-width: 100px;
    justify-content: center;
}

.btn-read:hover {
    background: var(--primary);
    transform: scale(1.05);
}

.btn-read.disabled {
    background: #bdc3c7;
    cursor: not-allowed;
}

.back-nav {
    text-align: center;
    margin: 4rem 0 2rem;
}

.btn-back {
    background: var(--primary);
    color: white;
    padding: 15px 30px;
    border-radius: 25px;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    transition: var(--transition);
}

.btn-back:hover {
    background: var(--secondary);
    transform: translateY(-2px);
}

@media (max-width: 768px) {
    .chapter-card {
        flex-direction: column;
        text-align: center;
        gap: 1rem;
    }
    
    .chapter-number {
        margin: 0;
    }
    
    .quick-buttons {
        flex-direction: column;
        align-items: center;
    }
    
    .novel-description {
        padding: 2rem;
    }
}
</style>

<script>
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const toggle = document.querySelector('.menu-toggle');
    
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    
    const icon = toggle.querySelector('i');
    if (sidebar.classList.contains('active')) {
        icon.className = 'fas fa-times';
    } else {
        icon.className = 'fas fa-bars';
    }
}

function closeSidebar() {
    document.getElementById('sidebar').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
    document.querySelector('.menu-toggle i').className = 'fas fa-bars';
}

// Barra de progresso
window.addEventListener('scroll', function() {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let progress = (scrollTop / scrollHeight) * 100;
    document.documentElement.style.setProperty('--scroll', progress + '%');
});
</script>

<link rel="stylesheet" href="../assets/css/style.css">
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">