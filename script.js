// script.js

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const backToTopButton = document.getElementById('back-to-top'); // 获取回到顶部按钮
 
    // --- 主题切换逻辑 ---
    const currentTheme = localStorage.getItem('theme');
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; 

    if (currentTheme) {
        body.classList.add(currentTheme);
        if (currentTheme === 'dark-mode') {
            themeToggle.textContent = '☀️';
        } else {
            themeToggle.textContent = '🌙';
        }
    } else if (prefersDarkMode) {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
        themeToggle.textContent = '☀️';
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light-mode');
        themeToggle.textContent = '🌙';
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light-mode');
            themeToggle.textContent = '🌙';
        } else {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
            themeToggle.textContent = '☀️';
        }
    });

    // --- 回到顶部按钮逻辑 ---
    // 监听页面滚动事件
    window.addEventListener('scroll', () => {
        // 当页面滚动超过视口高度的 1/4 时显示按钮
        if (window.scrollY > window.innerHeight / 4) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    // 监听回到顶部按钮点击事件
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // 使用平滑滚动
        });
    });
});
