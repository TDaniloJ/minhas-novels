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
<div class="reader-toolbar visible" id="readerToolbar">
    <div class="toolbar-left">
        <button class="toolbar-btn" onclick="toggleSidebar()">
            <i class="fas fa-bars"></i>
            <span>Capítulos</span>
        </button>
        <button class="toolbar-btn" onclick="goHome()">
            <i class="fas fa-home"></i>
            <span>Início</span>
        </button>
    </div>
    
    <div class="progress-container">
        <div class="progress-bar">
            <div class="progress-fill" id="progressFill"></div>
        </div>
        <span class="progress-text">Capítulo 1 de 3</span>
    </div>
    
    <div class="toolbar-right">
        <button class="toolbar-btn" onclick="toggleSettings()">
            <i class="fas fa-cog"></i>
            <span>Config</span>
        </button>
        <button class="toolbar-btn" onclick="toggleFullscreen()">
            <i class="fas fa-expand"></i>
        </button>
    </div>
</div>

<!-- Sidebar de Navegação -->
<nav class="reader-sidebar" id="readerSidebar">
    <div class="sidebar-header">
        <h3><i class="fas fa-book"></i> Era do Qi</h3>
        <button class="close-sidebar" onclick="toggleSidebar()">
            <i class="fas fa-times"></i>
        </button>
    </div>
    
    <div class="sidebar-content">
        <div class="chapter-nav-section">
            <h4>📖 Capítulos</h4>
            <ul class="chapter-nav-list">
                <li class="current">
                    <a href="capitulo-01.html">
                        <i class="fas fa-play"></i>
                        <span>Capítulo 01 – O Irmão Esquecido</span>
                    </a>
                </li>
                <li>
                    <a href="capitulo-02.html">
                        <i class="fas fa-book-open"></i>
                        <span>Capítulo 02 – A Prodigiosa Irmã</span>
                    </a>
                </li>
                <li>
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
        <h3><i class="fas fa-cog"></i> Configurações</h3>
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
            <div class="setting-value" id="fontSizeValue">18px</div>
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
                <span>Capítulo 1</span>
            </div>
            <h1 class="chapter-title">Capítulo 01 – O Irmão Esquecido</h1>
            <div class="chapter-meta">
                <span><i class="fas fa-clock"></i> ~8 min de leitura</span>
                <span><i class="fas fa-eye"></i> 1.2k visualizações</span>
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

            <p>"Lian," disse o ancião com paciência cultivada por décadas de ensino, "a cozinha fica no lado oposto do complexo."</p>

            <div class="scene-divider">
                <i class="fas fa-star"></i>
                <span>🌸 A Irmã Prodígio</span>
                <i class="fas fa-star"></i>
            </div>

            <p>Enquanto isso, do outro lado do pátio de treinamento, Yue praticava suas formas com a espada. Cada movimento era preciso, cada corte cortava o ar com uma elegância mortal que fazia os discípulos mais novos pararem para assistir em silêncio respeitoso.</p>

            <p>Seus cabelos negros como a noite dançavam no vento, e seus olhos azuis brilhavam com uma intensidade que poucos conseguiam sustentar. No <span class="cultivation-level">Reino da Alma Marcial</span>, ela já havia alcançado o quinto nível - um feito impressionante para alguém de apenas dezessete anos.</p>

            <div class="technique-showcase">
                <h3><i class="fas fa-magic"></i> Técnica: Flor Branca Celestial</h3>
                <p>A técnica <em>"Flor Branca Celestial"</em> fluía de sua espada como pétalas de cerejeira no vento, cada pétala carregada com qi mortal o suficiente para cortar pedra. Uma habilidade lendária da Seita da Lua Crescente, passada apenas para discípulos de elite.</p>
            </div>

            <blockquote class="dialogue">
                <i class="fas fa-comment"></i>
                "Irmão, você se perdeu novamente?"
                <br><em>— perguntou Yue, aparecendo silenciosamente atrás de Lian.</em>
            </blockquote>

            <p>Lian se virou rapidamente, quase tropeçando nos próprios pés. Mesmo após tantos anos, ainda se surpreendia com a capacidade da irmã de aparecer e desaparecer como uma sombra.</p>

            <p>"Eu... eu estava indo para a cozinha," murmurou, as bochechas corando ligeiramente.</p>

            <p>Yue sorriu - um sorriso raro que ela reservava apenas para ele. "Venha, vou te levar. Mas primeiro..." ela parou e o estudou com atenção. "Seu cultivo está diferente hoje. Mais... estável."</p>

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

            <p>"Irmã," disse ele hesitante, "ontem à noite eu tive um sonho estranho. Havia um homem de cabelos dourados, e ele me ensinou uma técnica de respiração diferente..."</p>

            <p>Os olhos de Yue se estreitaram. Na Seita da Lua Crescente, sonhos com figuras desconhecidas ensinando técnicas não eram algo a ser ignorado. Especialmente quando o sonhador acordava com mudanças reais em seu cultivo.</p>

            <blockquote class="dialogue">
                <i class="fas fa-exclamation-triangle"></i>
                "Mostre-me essa técnica. Agora."
                <br><em>— sua voz assumiu o tom sério que usava durante o treinamento.</em>
            </blockquote>

            <p>Lian assentiu e fechou os olhos, reproduzindo a técnica de respiração do sonho. Imediatamente, o qi ao seu redor começou a se mover de maneira inusual, formando pequenos redemoinhos dourados que eram visíveis mesmo para observadores externos.</p>

            <div class="cultivation-display">
                <h4><i class="fas fa-dragon"></i> Manifestação de Qi</h4>
                <p>O ar ao redor de Lian começou a brilhar com uma luz dourada suave. Era como se pequenos fragmentos de sol estivessem dançando em torno dele, cada partícula carregada com uma pureza que cortava através das impurezas do qi ambiente.</p>
            </div>

            <p>Yue deu um passo para trás, chocada. Em todos os seus anos de cultivo, nunca havia visto nada parecido. O qi de Lian não apenas mudou de qualidade - ele parecia estar <em>purificando</em> o ambiente ao seu redor.</p>

            <p>"Isso... isso é impossível," murmurou ela, seus olhos azuis arregalados. "Qi dourado só deveria aparecer no <span class="cultivation-level">Reino da Formação do Núcleo</span> ou superior. Você ainda está no Reino da Condensação..."</p>

            <p>Mas as evidências estavam diante dela. Seu irmão 'inútil', que sempre teve dificuldades com as técnicas mais básicas, estava manifestando um fenômeno que muitos mestres levavam décadas para alcançar.</p>

            <div class="mystery-box">
                <h4><i class="fas fa-question-circle"></i> O Mistério do Qi Dourado</h4>
                <p>Na história das artes marciais, apenas lendas falavam de cultivadores capazes de manifestar qi dourado nos reinos inferiores. Essas pessoas eram conhecidas como <strong>Filhos do Céu</strong> - indivíduos escolhidos pelos próprios céus para transcender as limitações mortais.</p>
                <p><em>Mas será que Lian realmente é um desses lendários cultivadores, ou há algo mais sinistro por trás de seu súbito despertar?</em></p>
            </div>

        </div>

        <!-- Navegação entre Capítulos -->
        <footer class="chapter-footer">
            <div class="chapter-navigation">
                <div class="nav-btn disabled">
                    <i class="fas fa-ban"></i>
                    <div>
                        <span>Primeiro Capítulo</span>
                        <small>Não há anterior</small>
                    </div>
                </div>

                <div class="chapter-info-center">
                    <div class="chapter-progress">
                        <div class="progress-circle">
                            <span>1/3</span>
                        </div>
                        <small>Capítulos</small>
                    </div>
                </div>

                <a href="capitulo-02.html" class="nav-btn next">
                    <div>
                        <span>Próximo Capítulo</span>
                        <small>A Prodigiosa Irmã</small>
                    </div>
                    <i class="fas fa-chevron-right"></i>
                </a>
            </div>

            <div class="chapter-actions">
                <button class="action-btn" onclick="bookmarkChapter()">
                    <i class="fas fa-bookmark"></i>
                    Favoritar
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

            <div class="chapter-stats">
                <div class="stat">
                    <i class="fas fa-eye"></i>
                    <span>1,234 leituras</span>
                </div>
                <div class="stat">
                    <i class="fas fa-heart"></i>
                    <span>89 curtidas</span>
                </div>
                <div class="stat">
                    <i class="fas fa-clock"></i>
                    <span>Atualizado hoje</span>
                </div>
            </div>
        </footer>

    </article>
</main>

<!-- Estilos específicos para elementos do capítulo -->
<style>
.character-thought {
    background: linear-gradient(135deg, rgba(52, 152, 219, 0.15), rgba(155, 89, 182, 0.15));
    border-left: 4px solid #3498db;
    padding: 1.5rem;
    margin: 2rem 0;
    border-radius: 0 15px 15px 0;
    font-style: italic;
    position: relative;
}

.character-thought::after {
    content: '💭';
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 1.5rem;
    opacity: 0.3;
}

.dialogue {
    background: linear-gradient(135deg, rgba(231, 76, 60, 0.15), rgba(230, 126, 34, 0.15));
    border-left: 4px solid #e74c3c;
    padding: 1.5rem;
    margin: 2rem 0;
    border-radius: 0 15px 15px 0;
    position: relative;
}

.dialogue::after {
    content: '💬';
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 1.5rem;
    opacity: 0.3;
}

.scene-divider {
    text-align: center;
    margin: 3rem 0;
    padding: 1.5rem;
    background: linear-gradient(45deg, var(--reader-accent), #9b59b6);
    color: white;
    border-radius: 25px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    box-shadow: 0 8px 25px rgba(52, 152, 219, 0.3);
    animation: pulse 2s infinite;
}

.technique-showcase {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    padding: 2rem;
    border-radius: 15px;
    margin: 2.5rem 0;
    position: relative;
    overflow: hidden;
}

.technique-showcase::before {
    content: '✨';
    position: absolute;
    top: 15px;
    right: 20px;
    font-size: 2rem;
    opacity: 0.3;
}

.technique-showcase h3 {
    color: white;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.power-awakening {
    background: linear-gradient(135deg, #f093fb, #f5576c);
    color: white;
    padding: 2rem;
    border-radius: 15px;
    margin: 2.5rem 0;
    position: relative;
    box-shadow: 0 10px 30px rgba(241, 87, 108, 0.3);
}

.power-awakening::before {
    content: '⚡';
    position: absolute;
    top: 15px;
    right: 20px;
    font-size: 2rem;
    opacity: 0.4;
}

.power-awakening h4 {
    color: white;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.cultivation-display {
    background: linear-gradient(135deg, #ffecd2, #fcb69f);
    color: #8b4513;
    padding: 2rem;
    border-radius: 15px;
    margin: 2.5rem 0;
    border: 2px solid #daa520;
    position: relative;
}

.cultivation-display::before {
    content: '🌟';
    position: absolute;
    top: 15px;
    right: 20px;
    font-size: 2rem;
    opacity: 0.4;
}

.cultivation-display h4 {
    color: #8b4513;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.mystery-box {
    background: linear-gradient(135deg, #2c3e50, #34495e);
    color: #ecf0f1;
    padding: 2rem;
    border-radius: 15px;
    margin: 2.5rem 0;
    border-left: 5px solid #f39c12;
    position: relative;
}

.mystery-box::before {
    content: '❓';
    position: absolute;
    top: 15px;
    right: 20px;
    font-size: 2rem;
    opacity: 0.3;
}

.mystery-box h4 {
    color: #f39c12;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.cultivation-level {
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
    padding: 3px 10px;
    border-radius: 12px;
    font-size: 0.9em;
    font-weight: bold;
    display: inline-block;
    margin: 0 2px;
}

.cultivation-term {
    color: var(--reader-accent);
    font-weight: 600;
    cursor: help;
    border-bottom: 1px dotted var(--reader-accent);
}

.chapter-footer {
    margin-top: 4rem;
    padding-top: 2rem;
    border-top: 2px solid rgba(52, 152, 219, 0.1);
}

.chapter-navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;
    gap: 2rem;
}

.nav-btn {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: var(--reader-accent);
    color: white;
    padding: 1.5rem 2rem;
    border-radius: 25px;
    text-decoration: none;
    transition: all 0.3s ease;
    min-width: 200px;
    box-shadow: 0 5px 15px rgba(52, 152, 219, 0.2);
}

.nav-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(52, 152, 219, 0.3);
}

.nav-btn.disabled {
    background: #bdc3c7;
    cursor: not-allowed;
    color: #7f8c8d;
}

.nav-btn.disabled:hover {
    transform: none;
    box-shadow: 0 5px 15px rgba(189, 195, 199, 0.2);
}

.chapter-info-center {
    text-align: center;
}

.progress-circle {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: var(--reader-accent);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.2rem;
    margin: 0 auto 0.5rem;
    box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
}

.chapter-actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
}

.action-btn {
    background: none;
    border: 2px solid var(--reader-accent);
    color: var(--reader-accent);
    padding: 12px 20px;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
}

.action-btn:hover {
    background: var(--reader-accent);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
}

.chapter-stats {
    display: flex;
    justify-content: center;
    gap: 3rem;
    font-size: 0.9rem;
    color: #666;
    flex-wrap: wrap;
}

.chapter-stats .stat {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.chapter-stats i {
    color: var(--reader-accent);
}

@media (max-width: 768px) {
    .chapter-navigation {
        flex-direction: column;
        gap: 1rem;
    }
    
    .nav-btn {
        width: 100%;
        justify-content: center;
    }
    
    .chapter-stats {
        gap: 1.5rem;
    }
    
    .scene-divider {
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .technique-showcase,
    .power-awakening,
    .cultivation-display,
    .mystery-box {
        padding: 1.5rem;
    }
}
</style>

<script>
// Todas as funções do reader aqui
let readerSettings = {
    fontSize: 18,
    theme: 'light',
    width: 800,
    lineHeight: 1.8
};

function loadReaderSettings() {
    const saved = localStorage.getItem('readerSettings');
    if (saved) {
        readerSettings = { ...readerSettings, ...JSON.parse(saved) };
    }
    applyReaderSettings();
}

function applyReaderSettings() {
    document.documentElement.style.setProperty('--reader-font-size', readerSettings.fontSize + 'px');
    document.documentElement.style.setProperty('--reader-width', readerSettings.width + 'px');
    document.documentElement.style.setProperty('--reader-line-height', readerSettings.lineHeight);
    document.body.setAttribute('data-theme', readerSettings.theme);
    
    if (document.getElementById('fontSizeSlider')) {
        document.getElementById('fontSizeSlider').value = readerSettings.fontSize;
        document.getElementById('fontSizeValue').textContent = readerSettings.fontSize + 'px';
        document.getElementById('widthSlider').value = readerSettings.width;
        document.getElementById('lineHeightSlider').value = readerSettings.lineHeight;
        
        document.querySelectorAll('.theme-option').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.theme === readerSettings.theme) {
                btn.classList.add('active');
            }
        });
    }
}

function saveReaderSettings() {
    localStorage.setItem('readerSettings', JSON.stringify(readerSettings));
}

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
        document.documentElement.requestFullscreen().catch(() => {});
    } else {
        document.exitFullscreen();
    }
}

function goHome() {
    window.location.href = '../';
}

function bookmarkChapter() {
    const bookmarks = JSON.parse(localStorage.getItem('novelBookmarks') || '[]');
    const bookmark = {
        novel: 'Era do Qi',
        chapter: 1,
        title: 'Capítulo 01 – O Irmão Esquecido',
        url: window.location.href,
        date: new Date().toISOString()
    };
    
    bookmarks.push(bookmark);
    localStorage.setItem('novelBookmarks', JSON.stringify(bookmarks));
    
    alert('✅ Capítulo adicionado aos favoritos!');
}

function shareChapter() {
    if (navigator.share) {
        navigator.share({
            title: 'Era do Qi - Capítulo 01',
            text: 'Leia este incrível capítulo de cultivação!',
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(window.location.href);
        alert('🔗 Link copiado para a área de transferência!');
    }
}

function reportIssue() {
    const issue = prompt('Descreva o problema encontrado:', '');
    if (issue) {
        // Aqui você salvaria o report ou enviaria para um servidor
        alert('📝 Problema reportado com sucesso! Obrigado pelo feedback.');
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    loadReaderSettings();
    
    // Sliders
    const fontSlider = document.getElementById('fontSizeSlider');
    const widthSlider = document.getElementById('widthSlider');
    const lineHeightSlider = document.getElementById('lineHeightSlider');
    
    if (fontSlider) {
        fontSlider.addEventListener('input', (e) => {
            readerSettings.fontSize = parseInt(e.target.value);
            applyReaderSettings();
            saveReaderSettings();
        });
    }
    
    if (widthSlider) {
        widthSlider.addEventListener('input', (e) => {
            readerSettings.width = parseInt(e.target.value);
            applyReaderSettings();
            saveReaderSettings();
        });
    }
    
    if (lineHeightSlider) {
        lineHeightSlider.addEventListener('input', (e) => {
            readerSettings.lineHeight = parseFloat(e.target.value);
            applyReaderSettings();
            saveReaderSettings();
        });
    }
    
    // Barra de progresso
    function updateProgress() {
        const scrolled = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? (scrolled / maxScroll) * 100 : 0;
        
        document.getElementById('progressFill').style.width = progress + '%';
        document.documentElement.style.setProperty('--scroll', progress + '%');
    }
    
    window.addEventListener('scroll', updateProgress);
    updateProgress();
});

// Controles de teclado
document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    
    switch(e.key.toLowerCase()) {
        case 'arrowleft':
            // Ir para capítulo anterior (não há neste caso)
            break;
        case 'arrowright':
            // Ir para próximo capítulo
            window.location.href = 'capitulo-02.html';
            break;
        case 'escape':
            closeAllPanels();
            break;
        case 't':
            e.preventDefault();
            toggleSettings();
            break;
        case 'm':
            e.preventDefault();
            toggleSidebar();
            break;
        case 'f':
            e.preventDefault();
            toggleFullscreen();
            break;
        case 'b':
            e.preventDefault();
            bookmarkChapter();
            break;
    }
});

// Auto-hide toolbar
let toolbarTimer;
function showToolbar() {
    const toolbar = document.getElementById('readerToolbar');
    if (toolbar) {
        toolbar.classList.add('visible');
        clearTimeout(toolbarTimer);
        toolbarTimer = setTimeout(() => {
            if (!document.getElementById('readerSettings').classList.contains('active')) {
                toolbar.classList.remove('visible');
            }
        }, 3000);
    }
}

document.addEventListener('mousemove', showToolbar);
document.addEventListener('scroll', showToolbar);

// Tooltips para termos de cultivo
document.querySelectorAll('.cultivation-term').forEach(term => {
    term.addEventListener('mouseenter', function() {
        // Aqui você pode adicionar tooltips explicativos
    });
});
</script>

<!-- Incluir FontAwesome e CSS -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
<link rel="stylesheet" href="../../assets/css/style.css">