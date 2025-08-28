---
layout: default
title: "Capítulo 02 – A Prodigiosa Irmã"
chapter: 2
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
            
            <p>Ao acordar, o jovem de cabelos prateados se levantou e saiu correndo para o quarto.</p>

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

<!-- Estilos e scripts específicos da capitulo -->
<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/capitulo.css">
<script src="{{ site.baseurl }}/assets/js/capitulo.js" defer></script>