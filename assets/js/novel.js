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