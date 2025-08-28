// Verificação de autenticação
function checkAuth() {
    if (!localStorage.getItem('adminAuth')) {
        window.location.href = 'login.html';
    }
}

// Carregar novels do localStorage ou arquivo JSON
async function loadNovels() {
    try {
        const response = await fetch('../_data/novels.json');
        const novels = await response.json();
        const select = document.getElementById('novelSelect');
        
        novels.forEach(novel => {
            const option = document.createElement('option');
            option.value = novel.id;
            option.textContent = novel.title;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao carregar novels:', error);
    }
}

// Salvar novo capítulo
async function saveChapter(formData) {
    const chapter = {
        id: Date.now(),
        novel: formData.get('novel'),
        number: formData.get('number'),
        title: formData.get('title'),
        content: formData.get('content'),
        created: new Date().toISOString()
    };

    // Salvar no localStorage
    const chapters = JSON.parse(localStorage.getItem('chapters') || '[]');
    chapters.push(chapter);
    localStorage.setItem('chapters', JSON.stringify(chapters));

    // Gerar arquivo Markdown
    const markdown = generateChapterMarkdown(chapter);
    
    // Download do arquivo
    downloadMarkdown(markdown, `capitulo-${chapter.number}.md`);
}

// Gerar Markdown do capítulo
function generateChapterMarkdown(chapter) {
    return `---
layout: chapter
title: "${chapter.title}"
chapter: ${chapter.number}
novel: "${chapter.novel}"
---

${chapter.content}
`;
}

// Download do arquivo Markdown
function downloadMarkdown(content, filename) {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    loadNovels();
    
    document.getElementById('newChapterForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        saveChapter(formData);
    });
});

function logout() {
    localStorage.removeItem('adminAuth');
    window.location.href = 'login.html';
}