// script.js

document.addEventListener('DOMContentLoaded', () => {
    // 获取DOM元素
    const themeToggle = document.getElementById('theme-toggle'); // 主题切换按钮
    const body = document.body; // body 元素
    const backToTopButton = document.getElementById('back-to-top'); // 回到顶部按钮
    const navbar = document.querySelector('.navbar'); // 导航栏元素 (用于计算偏移量)

    // --- 主题切换逻辑 ---

    // 1. 从 Local Storage 获取用户之前选择的主题
    const currentTheme = localStorage.getItem('theme');

    // 2. 检查用户系统的主题偏好 (仅在 Local Storage 没有存储时作为默认值)
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    // 根据存储或系统偏好设置初始主题
    if (currentTheme) {
        body.classList.add(currentTheme);
        // 更新按钮图标以反映当前主题
        if (currentTheme === 'dark-mode') {
            themeToggle.textContent = '☀️'; // 太阳图标表示当前是暗模式，点击可切换到亮模式
        } else {
            themeToggle.textContent = '🌙'; // 月亮图标表示当前是亮模式，点击可切换到暗模式
        }
    } else if (prefersDarkMode) {
        // 如果没有存储，但系统偏好是暗模式
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode'); // 存储暗模式偏好
        themeToggle.textContent = '☀️'; // 太阳图标
    } else {
        // 如果没有存储，且系统偏好不是暗模式 (或不支持 prefers-color-scheme)
        body.classList.remove('dark-mode'); // 确保默认是亮色模式
        localStorage.setItem('theme', 'light-mode'); // 存储亮模式偏好
        themeToggle.textContent = '🌙'; // 月亮图标
    }

    // 3. 监听主题切换按钮点击事件
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            // 如果当前是暗模式，则切换到亮模式
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light-mode');
            themeToggle.textContent = '🌙'; // 切换到月亮图标
        } else {
            // 如果当前是亮模式，则切换到暗模式
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
            themeToggle.textContent = '☀️'; // 切换到太阳图标
        }
    });

    // --- 回到顶部按钮逻辑 ---

    // 监听页面滚动事件
    window.addEventListener('scroll', () => {
        // 当页面向下滚动超过视口高度的 1/4 时显示按钮
        // (您也可以调整这个阈值，例如 window.innerHeight / 2 或一个固定像素值)
        if (window.scrollY > window.innerHeight / 4) {
            backToTopButton.classList.add('show'); // 添加 'show' 类来显示按钮
        } else {
            backToTopButton.classList.remove('show'); // 移除 'show' 类来隐藏按钮
        }
    });

    // 监听回到顶部按钮点击事件
    backToTopButton.addEventListener('click', () => {
        // 使用 window.scrollTo 方法实现平滑滚动到页面顶部 (top: 0)
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // 启用平滑滚动效果
        });
    });

    // --- 平滑滚动导航链接逻辑 ---
    // 选中所有 href 属性以 '#' 开头的链接 (内部锚点链接)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // 为每个锚点链接添加点击事件监听器
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // 阻止链接的默认跳转行为 (例如，直接跳到锚点而不平滑滚动)

            const targetId = this.getAttribute('href'); // 获取链接的 href 值 (例如 "#about")

            if (targetId === '#') {
                // 特殊处理点击 logo 或只包含 '#' 的链接，使其平滑滚动到页面顶部
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                // 找到对应的目标元素 (例如 id="about" 的 section)
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    // 获取导航栏的高度，以便在滚动时从目标位置减去，防止内容被导航栏遮挡
                    const headerOffset = navbar ? navbar.offsetHeight : 0; // 如果导航栏存在则获取其高度，否则为0
                    
                    // 计算目标元素相对于文档顶部的精确位置
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    
                    // 最终的滚动位置 = 目标元素位置 - 导航栏高度
                    const offsetPosition = elementPosition - headerOffset;

                    // 使用 window.scrollTo 实现平滑滚动到计算出的位置
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth' // 启用平滑滚动效果
                    });
                }
            }
        });
    });
});
