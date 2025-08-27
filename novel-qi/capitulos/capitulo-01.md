---
layout: default
title: "Capítulo 01 – O Irmão Esquecido"
chapter: 1
total_chapters: 3
novel: "Era do Qi"
---

<!-- Elementos do Reader Profissional -->
<div class="reading-progress"></div>

<!-- Toolbar Superior -->
<div class="reader-toolbar" id="readerToolbar">
    <div class="toolbar-left">
        <button class="toolbar-btn" onclick="toggleSidebar()">
            <i class="fas fa-bars"></i>
            Capítulos
        </button>
        <button class="toolbar-btn" onclick="goHome()">
            <i class="fas fa-home"></i>
            Início
        </button>
    </div>
    
    <div class="progress-container">
        <div class="progress-bar">
            <div class="progress-fill" id="progressFill"></div>
        </div>
        <span class="progress-text" id="progressText">Capítulo {{ page.chapter }} de {{ page.total_chapters }}</span>
    </div>
    
    <div class="toolbar-right">
        <button class="toolbar-btn" onclick="toggleSettings()">
            <i class="fas fa-cog"></i>
            Configurações
        </button>
        <button class="toolbar-btn" onclick="toggleFullscreen()">
            <i class="fas fa-expand"></i>
        </button>
    </div>
</div>

<!-- Sidebar de Navegação -->
<nav class="reader-sidebar" id="readerSidebar">
    <div class="sidebar-header">
        <h3><i class="fas fa-book"></i> {{ page.novel }}</h3>
        <button class="close-sidebar" onclick="toggleSidebar()">
            <i class="fas fa-times"></i>
        </button>
    </div>
    
    <div class="sidebar-content">
        <div class="chapter-nav-section">
            <h4>📖 Capítulos</h4>
            <ul class="chapter-nav-list">
                <li class="{% if page.chapter == 1 %}current{% endif %}">
                    <a href="capitulo-01.html">
                        <i class="fas fa-play"></i>
                        <span>Capítulo 01 – O Irmão Esquecido</span>
                    </a>
                </li>
                <li class="{% if page.chapter == 2 %}current{% endif %}">
                    <a href="capitulo-02.html">
                        <i class="fas fa-book-open"></i>
                        <span>Capítulo 02 – A Prodigiosa Irmã</span>
                    </a>
                </li>
                <li class="{% if page.chapter == 3 %}current{% endif %}">
                    <a href="capitulo-03.html">
                        <i class="fas fa-star"></i>
                        <span>Capítulo 03 – Festival das Flores</span>
                    </a>
                </li>
            </ul>
        </div>
        
        <div class="extras-nav-section">
            <h4>🌍 Extras</h4>
            <ul class="chapter-nav-list">
                <li><a href="../extras/personagens.html"><i class="fas fa-users"></i> Personagens</a></li>
                <li><a href="../extras/tecnicas.html"><i class="fas fa-magic"></i> Técnicas</a></li>
                <li><a href="../extras/seitas.html"><i class="fas fa-temple"></i> Seitas</a></li>
            </ul>
        </div>
    </div>
</nav>

<!-- Painel de Configurações -->
<div class="reader-settings" id="readerSettings">
    <div class="settings-header">
        <h3><i class="fas fa-cog"></i> Configurações de Leitura</h3>
        <button class="close-settings" onclick="toggleSettings()">
            <i class="fas fa-times"></i>
        </button>
    </div>
    
    <div class="settings-content">
        <div class="setting-group">
            <h4><i class="fas fa-text-height"></i> Tamanho da Fonte</h4>
            <div class="slider-container">
                <i class="fas fa-font" style="font-size: 14px;"></i>
                <input type="range" id="fontSizeSlider" min="16" max="28" value="18" class="setting-slider">
                <i class="fas fa-font" style="font-size: 22px;"></i>
            </div>
            <span class="setting-value" id="fontSizeValue">18px</span>
        </div>

        <div class="setting-group">
            <h4><i class="fas fa-palette"></i> Tema</h4>
            <div class="theme-selector">
                <button class="theme-option active" data-theme="light" onclick="setTheme('light')">
                    <i class="fas fa-sun"></i>
                    Claro
                </button>
                <button class="theme-option" data-theme="dark" onclick="setTheme('dark')">
                    <i class="fas fa-moon"></i>
                    Escuro
                </button>
                <button class="theme-option" data-theme="sepia" onclick="setTheme('sepia')">
                    <i class="fas fa-leaf"></i>
                    Sépia
                </button>
            </div>
        </div>

        <div class="setting-group">
            <h4><i class="fas fa-arrows-alt-h"></i> Largura</h4>
            <div class="slider-container">
                <i class="fas fa-compress-alt"></i>
                <input type="range" id="widthSlider" min="600" max="1000" value="800" class="setting-slider">
                <i class="fas fa-expand-alt"></i>
            </div>
        </div>

        <div class="setting-group">
            <h4><i class="fas fa-align-justify"></i> Espaçamento</h4>
            <div class="slider-container">
                <span>1.5</span>
                <input type="range" id="lineHeightSlider" min="1.5" max="2.5" step="0.1" value="1.8" class="setting-slider">
                <span>2.5</span>
            </div>
        </div>
    </div>
</div>

<!-- Overlay -->
<div class="reader-overlay" id="readerOverlay" onclick="closeAllPanels()"></div>

<!-- Conteúdo Principal -->
<main class="reader-content" id="readerContent">
    <article class="chapter-article">
        
        <!-- Header do Capítulo -->
        <header class="chapter-header">
            <div class="chapter-breadcrumb">
                <a href="../">Era do Qi</a>
                <i class="fas fa-chevron-right"></i>
                <span>Capítulo {{ page.chapter }}</span>
            </div>
            <h1 class="chapter-title">{{ page.title }}</h1>
            <div class="chapter-meta">
                <span><i class="fas fa-clock"></i> ~10 min de leitura</span>
                <span><i class="fas fa-calendar"></i> Atualizado hoje</span>
            </div>
        </header>

        <!-- Conteúdo do Capítulo -->
        <div class="chapter-body">
            
            <p>Lian acordou cedo, cabelos prateados bagunçados refletindo o sol matinal que filtrava através da janela de papel de arroz. O jovem esfregou os olhos sonolento, ainda tentando se orientar no quarto modesto que dividia com sua irmã gêmea.</p>

            <blockquote class="character-thought">
                <i class="fas fa-quote-left"></i>
                "Hoje vou direto para a cozinha… sem me perder!"
                <i class="fas fa-quote-right"></i>
                <br><em>— murmurava para si mesmo, determinado.</em>
            </blockquote>

            <p>Três minutos depois, estava na <strong>sala de reuniões dos anciãos</strong>, completamente perdido e sendo observado por cinco mestres que o encaravam com uma mistura de diversão e exasperação.</p>

            <p>Mestre Chen, o mais velho entre eles, suspirou profundamente enquanto observava o jovem de cabelos prateados parado no meio da sala, claramente confuso sobre como havia chegado ali.</p>

            <div class="scene-divider">
                <i class="fas fa-star"></i>
                <span>🌸 A Irmã Prodígio</span>
                <i class="fas fa-star"></i>
            </div>

            <p>Enquanto isso, do outro lado do pátio de treinamento, Yue praticava suas formas com a espada. Cada movimento era preciso, cada corte cortava o ar com uma elegância mortal que fazia os discípulos mais novos pararem para assistir em silêncio respeitoso.</p>

            <p>Seus cabelos negros como a noite dançavam no vento, e seus olhos azuis brilhavam com uma intensidade que poucos conseguiam sustentar. No <span class="cultivation-level">Reino da Alma Marcial</span>, ela já havia alcançado o quinto nível - um feito impressionante para alguém de apenas dezessete anos.</p>

            <div class="technique-showcase">
                <h3><i class="fas fa-magic"></i> Técnica: Flor Branca Celestial</h3>
                <p>A técnica fluía de sua espada como pétalas de cerejeira no vento, cada pétala carregada com qi mortal o suficiente para cortar pedra. Uma habilidade lendária da Seita da Lua Crescente.</p>
            </div>

            <blockquote class="dialogue">
                <i class="fas fa-comment"></i>
                "Irmão, você se perdeu novamente?"
                <br><em>— perguntou Yue, aparecendo silenciosamente atrás de Lian.</em>
            </blockquote>

            <p>Lian se virou rapidamente, quase tropeçando nos próprios pés. Mesmo após tantos anos, ainda se surpreendia com a capacidade da irmã de aparecer e desaparecer como uma sombra.</p>

            <p>"Eu... eu estava indo para a cozinha," murmurou, as bochechas corando ligeiramente.</p>

            <div class="scene-divider">
                <i class="fas fa-bolt"></i>
                <span>⚡ Um Despertar Inesperado</span>
                <i class="fas fa-bolt"></i>
            </div>

            <p>Era verdade. Algo havia mudado durante a noite. Lian podia sentir o qi fluindo de maneira diferente em seus <span class="cultivation-term">meridianos</span>, mais suave, mais controlado. No <span class="cultivation-level">Reino da Condensação de Qi</span>, ele havia estado preso no segundo nível por meses, mas agora...</p>

            <div class="power-awakening">
                <h4><i class="fas fa-gem"></i> Despertar de Poder</h4>
                <p>Uma energia estranha pulsava em seu <strong>dantian</strong>, diferente de qualquer coisa que já havia experimentado. Não era mais poderosa necessariamente, mas tinha uma qualidade única - como se fosse mais <em>pura</em> que o qi comum.</p>
            </div>

            <p>Yue deu um passo para trás, chocada. Em todos os seus anos de cultivo, nunca havia visto qi dourado se manifestar de forma tão pura em alguém do Reino da Condensação.</p>

        </div>

        <!-- Navegação entre Capítulos -->
        <footer class="chapter-footer">
            <div class="chapter-navigation">
                {% if page.chapter > 1 %}
                    <a href="capitulo-{{ page.chapter | minus: 1 | prepend: '0' | slice: -2, 2 }}.html" class="nav-btn prev">
                        <i class="fas fa-chevron-left"></i>
                        <div>
                            <span>Capítulo Anterior</span>
                            <small>Capítulo {{ page.chapter | minus: 1 }}</small>
                        </div>
                    </a>
                {% else %}
                    <div class="nav-btn disabled">
                        <i class="fas fa-ban"></i>
                        <div>
                            <span>Primeiro Capítulo</span>
                            <small>Não há anterior</small>
                        </div>
                    </div>
                {% endif %}

                <div class="chapter-info-center">
                    <div class="chapter-progress">
                        <div class="progress-circle">
                            <span>{{ page.chapter }}/{{ page.total_chapters }}</span>
                        </div>
                    </div>
                </div>

                {% if page.chapter < page.total_chapters %}
                    <a href="capitulo-{{ page.chapter | plus: 1 | prepend: '0' | slice: -2, 2 }}.html" class="nav-btn next">
                        <div>
                            <span>Próximo Capítulo</span>
                            <small>Capítulo {{ page.chapter | plus: 1 }}</small>
                        </div>
                        <i class="fas fa-chevron-right"></i>
                    </a>
                {% else %}
                    <div class="nav-btn disabled">
                        <div>
                            <span>Último Capítulo</span>
                            <small>Fim da história</small>
                        </div>
                        <i class="fas fa-flag-checkered"></i>
                    </div>
                {% endif %}
            </div>

            <div class="chapter-actions">
                <button class="action-btn" onclick="bookmarkChapter()">
                    <i class="fas fa-bookmark"></i>
                    Marcar
                </button>
                <button class="action-btn" onclick="shareChapter()">
                    <i class="fas fa-share"></i>
                    Compartilhar
                </button>
                <button class="action-btn" onclick="reportIssue()">
                    <i class="fas fa-flag"></i>
                    Reportar
                </button>
            </div>
        </footer>

    </article>
</main>

<!-- Atalhos de Teclado (Info) -->
<div class="keyboard-shortcuts" id="keyboardHelp">
    <h4><i class="fas fa-keyboard"></i> Atalhos de Teclado</h4>
    <div class="shortcuts-grid">
        <div><kbd>←</kbd> <kbd>→</kbd> Navegar capítulos</div>
        <div><kbd>T</kbd> Configurações</div>
        <div><kbd>M</kbd> Menu</div>
        <div><kbd>F</kbd> Tela cheia</div>
        <div><kbd>Esc</kbd> Fechar painéis</div>
    </div>
</div>

<style>
/* Estilos específicos do reader */
[data-theme="light"] {
    --reader-bg: #faf7f0;
    --reader-text: #2c3e50;
    --reader-accent: #3498db;
}

[data-theme="dark"] {
    --reader-bg: #1a1a1a;
    --reader-text: #e0e0e0;
    --reader-accent: #64b5f6;
}

[data-theme="sepia"] {
    --reader-bg: #f4f1e8;
    --reader-text: #5c4b37;
    --reader-accent: #8d6e63;
}

.reader-content {
    max-width: var(--reader-width, 800px);
    margin: 100px auto 0;
    padding: 2rem;
    background: var(--reader-bg, #faf7f0);
    color: var(--reader-text, #2c3e50);
    font-size: var(--reader-font-size, 18px);
    line-height: var(--reader-line-height, 1.8);
    transition: all 0.3s ease;
}

.chapter-article {
    background: white;
    border-radius: 20px;
    padding: 3rem;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

[data-theme="dark"] .chapter-article {
    background: #2c2c2c;
}

[data-theme="sepia"] .chapter-article {
    background: #faf8f3;
}

.chapter-header {
    text-align: center;
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 2px solid var(--reader-accent);
}

.chapter-breadcrumb {
    color: #666;
    margin-bottom: 1rem;
    font-size: 14px;
}

.chapter-breadcrumb a {
    color: var(--reader-accent);
    text-decoration: none;
}

.chapter-title {
    font-size: 2.5rem;
    color: var(--reader-accent);
    margin-bottom: 1rem;
    font-weight: 700;
}

.chapter-meta {
    color: #888;
    display: flex;
    gap: 2rem;
    justify-content: center;
    flex-wrap: wrap;
}

.chapter-body p {
    margin-bottom: 1.5rem;
    text-align: justify;
}

.character-thought {
    background: linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(155, 89, 182, 0.1));
    border-left: 4px solid #3498db;
    padding: 1.5rem;
    margin: 2rem 0;
    border-radius: 0 10px 10px 0;
    font-style: italic;
}

.dialogue {
    background: linear-gradient(135deg, rgba(231, 76, 60, 0.1), rgba(230, 126, 34, 0.1));
    border-left: 4px solid #e74c3c;
    padding: 1.5rem;
    margin: 2rem 0;
    border-radius: 0 10px 10px 0;
}

.scene-divider {
    text-align: center;
    margin: 3rem 0;
    padding: 1rem;
    background: var(--reader-accent);
    color: white;
    border-radius: 25px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
}

.technique-showcase {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    padding: 2rem;
    border-radius: 15px;
    margin: 2rem 0;
}

.technique-showcase h3 {
    color: white;
    margin-bottom: 1rem;
}

.power-awakening {
    background: linear-gradient(135deg, #f093fb, #f5576c);
    color: white;
    padding: 2rem;
    border-radius: 15px;
    margin: 2rem 0;
}

.power-awakening h4 {
    color: white;
    margin-bottom: 1rem;
}

.cultivation-level {
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 0.9em;
    font-weight: bold;
}

.cultivation-term {
    color: var(--reader-accent);
    font-weight: 600;
    cursor: help;
}

.chapter-navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 3rem 0;
    gap: 2rem;
}

.nav-btn {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: var(--reader-accent);
    color: white;
    padding: 1rem 2rem;
    border-radius: 25px;
    text-decoration: none;
    transition: all 0.3s ease;
    min-width: 200px;
}

.nav-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(52, 152, 219, 0.3);
}

.nav-btn.disabled {
    background: #bdc3c7;
    cursor: not-allowed;
}

.nav-btn.disabled:hover {
    transform: none;
    box-shadow: none;
}

.chapter-info-center {
    text-align: center;
}

.progress-circle {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: var(--reader-accent);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin: 0 auto;
}

.chapter-actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid #eee;
}

.action-btn {
    background: none;
    border: 2px solid var(--reader-accent);
    color: var(--reader-accent);
    padding: 10px 20px;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
}

.action-btn:hover {
    background: var(--reader-accent);
    color: white;
}

@media (max-width: 768px) {
    .reader-content {
        margin-top: 80px;
        padding: 1rem;
    }
    
    .chapter-article {
        padding: 2rem;
    }
    
    .chapter-navigation {
        flex-direction: column;
    }
    
    .nav-btn {
        width: 100%;
        justify-content: center;
    }
    
    .chapter-actions {
        flex-wrap: wrap;
    }
}
</style>

<script>
// Configurações do reader
let readerSettings = {
    fontSize: 18,
    theme: 'light',
    width: 800,
    lineHeight: 1.8
};

// Carregar configurações salvas
function loadReaderSettings() {
    const saved = localStorage.getItem('readerSettings');
    if (saved) {
        readerSettings = { ...readerSettings, ...JSON.parse(saved) };
    }
    applyReaderSettings();
}

// Aplicar configurações
function applyReaderSettings() {
    document.documentElement.style.setProperty('--reader-font-size', readerSettings.fontSize + 'px');
    document.documentElement.style.setProperty('--reader-width', readerSettings.width + 'px');
    document.documentElement.style.setProperty('--reader-line-height', readerSettings.lineHeight);
    document.body.setAttribute('data-theme', readerSettings.theme);
    
    // Atualizar controles
    document.getElementById('fontSizeSlider').value = readerSettings.fontSize;
    document.getElementById('fontSizeValue').textContent = readerSettings.fontSize + 'px';
    document.getElementById('widthSlider').value = readerSettings.width;
    document.getElementById('lineHeightSlider').value = readerSettings.lineHeight;
    
    // Atualizar tema ativo
    document.querySelectorAll('.theme-option').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.theme === readerSettings.theme) {
            btn.classList.add('active');
        }
    });
}

// Salvar configurações
function saveReaderSettings() {
    localStorage.setItem('readerSettings', JSON.stringify(readerSettings));
}

// Funções de interface
function toggleSidebar() {
    document.getElementById('readerSidebar').classList.toggle('active');
    document.getElementById('readerOverlay').classList.toggle('active');
}

function toggleSettings() {
    document.getElementById('readerSettings').classList.toggle('active');
    document.getElementById('readerOverlay').classList.toggle('active');
}

function closeAllPanels() {
    document.getElementById('readerSidebar').classList.remove('active');
    document.getElementById('readerSettings').classList.remove('active');
    document.getElementById('readerOverlay').classList.remove('active');
}

function setTheme(theme) {
    readerSettings.theme = theme;
    applyReaderSettings();
    saveReaderSettings();
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

function goHome() {
    window.location.href = '../';
}

// Event listeners para sliders
document.getElementById('fontSizeSlider').addEventListener('input', (e) => {
    readerSettings.fontSize = parseInt(e.target.value);
    applyReaderSettings();
    saveReaderSettings();
});

document.getElementById('widthSlider').addEventListener('input', (e) => {
    readerSettings.width = parseInt(e.target.value);
    applyReaderSettings();
    saveReaderSettings();
});

document.getElementById('lineHeightSlider').addEventListener('input', (e) => {
    readerSettings.lineHeight = parseFloat(e.target.value);
    applyReaderSettings();
    saveReaderSettings();
});

// Controles de teclado
document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT') return;
    
    switch(e.key.toLowerCase()) {
        case 'arrowleft':
            // Navegar para capítulo anterior
            const prevBtn = document.querySelector('.nav-btn.prev');
            if (prevBtn) prevBtn.click();
            break;
        case 'arrowright':
            // Navegar para próximo capítulo
            const nextBtn = document.querySelector('.nav-btn.next');
            if (nextBtn) nextBtn.click();
            break;
        case 'escape':
            closeAllPanels();
            break;
        case 't':
            toggleSettings();
            break;
        case 'm':
            toggleSidebar();
            break;
        case 'f':
            toggleFullscreen();
            break;
    }
});

// Barra de progresso
function updateReadingProgress() {
    const scrolled = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? (scrolled / maxScroll) * 100 : 0;
    
    document.getElementById('progressFill').style.width = progress + '%';
    document.documentElement.style.setProperty('--scroll', progress + '%');
}

window.addEventListener('scroll', updateReadingProgress);

// Auto-hide toolbar
let toolbarTimer;
function showToolbar() {
    document.getElementById('readerToolbar').classList.add('visible');
    clearTimeout(toolbarTimer);
    toolbarTimer = setTimeout(() => {
        if (!document.getElementById('readerSettings').classList.contains('active')) {
            document.getElementById('readerToolbar').classList.remove('visible');
        }
    }, 3000);
}

document.addEventListener('mousemove', showToolbar);
document.addEventListener('scroll', showToolbar);

// Funções extras
function bookmarkChapter() {
    alert('Capítulo marcado como favorito!');
}

function shareChapter() {
    if (navigator.share) {
        navigator.share({
            title: document.title,
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(window.location.href);
        alert('Link copiado para a área de transferência!');
    }
}

function reportIssue() {
    alert('Função de reportar problema será implementada em breve.');
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    loadReaderSettings();
    updateReadingProgress();
    showToolbar();
});
</script>

<!-- Incluir CSS e JS -->
<link rel="stylesheet" href="../assets/css/style.css">
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
<script src="../assets/js/main.js"></script>