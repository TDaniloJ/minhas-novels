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