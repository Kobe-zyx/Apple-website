// script.js

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // 1. 从 Local Storage 获取主题偏好
    const currentTheme = localStorage.getItem('theme');

    // 2. 检查用户系统偏好 (仅在没有 Local Storage 存储时应用)
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    // 根据存储或系统偏好设置初始主题
    if (currentTheme) {
        body.classList.add(currentTheme);
        // 更新按钮图标
        if (currentTheme === 'dark-mode') {
            themeToggle.textContent = '☀️'; // 太阳图标
        } else {
            themeToggle.textContent = '🌙'; // 月亮图标
        }
    } else if (prefersDarkMode) {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
        themeToggle.textContent = '☀️'; // 太阳图标
    } else {
        body.classList.remove('dark-mode'); // 确保默认是亮色模式
        localStorage.setItem('theme', 'light-mode');
        themeToggle.textContent = '🌙'; // 月亮图标
    }

    // 3. 监听切换按钮点击事件
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light-mode');
            themeToggle.textContent = '🌙'; // 切换到月亮图标
        } else {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
            themeToggle.textContent = '☀️'; // 切换到太阳图标
        }
    });

    // 平滑滚动动画的 CSS 属性已经在 style.css 的 body 元素中设置
    // scroll-behavior: smooth;
    // 这里不需要额外的JS代码来处理基本平滑滚动。
    // 如果是需要更复杂的平滑滚动（例如，考虑到固定导航栏的高度），
    // 那么需要在这里添加 JavaScript 逻辑来计算滚动位置。
    // 但对于一般的锚点跳转，CSS 属性已经足够。
});
