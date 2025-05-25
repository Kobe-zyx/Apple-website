document.addEventListener('DOMContentLoaded', function() {
    // 主题切换逻辑 (保持不变)
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    } else {
        themeToggle.textContent = '🌙';
    }

    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = '☀️';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = '🌙';
        }
    });

    // 导航栏滚动高亮逻辑 (保持不变)
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');
    const navbarHeight = document.querySelector('.navbar').offsetHeight || 0;

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 10;
            const sectionBottom = sectionTop + section.clientHeight;

            if (pageYOffset >= sectionTop && pageYOffset < sectionBottom) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href').split('#')[1];

            const isBlogPostPage = window.location.pathname.includes('/blog/');

            if (isBlogPostPage && linkHref === 'blog') {
                link.classList.add('active');
            } else if (!isBlogPostPage && linkHref === currentSectionId) {
                link.classList.add('active');
            } else if (window.location.pathname.endsWith('index.html') && linkHref === 'home' && currentSectionId === 'home') {
                link.classList.add('active');
            } else if (window.location.pathname === '/' && linkHref === 'home' && currentSectionId === 'home') {
                link.classList.add('active');
            }
        });
    });

    // 回到顶部按钮逻辑 (保持不变)
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 每日一言逻辑 (保持不变)
    const quoteText = document.getElementById('quote-text');
    const quoteFrom = document.getElementById('quote-from');

    function fetchDailyQuote() {
        const quotes = [
            { text: "未来属于那些相信梦想之美的人。", from: "埃莉诺·罗斯福" },
            { text: "唯一能做出伟大工作的方法就是热爱你所做的一切。", from: "史蒂夫·乔布斯" },
            { text: "生活就像骑自行车。为了保持平衡，你必须不断前进。", from: "阿尔伯特·爱因斯坦" },
            { text: "不要满足于现状，追求卓越，直到梦想成真。", from: "Kobe Bryant" },
            { text: "人生并非等待风暴过去，而是学会在雨中起舞。", from: "维维安·格林" },
            { text: "创新是区分领导者和追随者的关键。", from: "史蒂夫·乔布斯" },
            { text: "如果你不能飞，那就跑；如果你不能跑，那就走；如果你不能走，那就爬。但无论你做什么，你都必须不断前进。", from: "马丁·路德·金" },
            { text: "成功不是最终的，失败也不是致命的：最重要的是继续前进的勇气。", from: "温斯顿·丘吉尔" },
            { text: "成为你想在世界上看到的变化。", from: "圣雄甘地" },
            { text: "最好的报复是巨大的成功。", from: "弗兰克·辛纳特拉" }
        ];

        const randomIndex = Math.floor(Math.random() * quotes.length);
        const dailyQuote = quotes[randomIndex];

        quoteText.textContent = `"${dailyQuote.text}"`;
        quoteFrom.textContent = `- ${dailyQuote.from}`;
    }

    fetchDailyQuote();

    // *** 新增：导航链接平滑滚动逻辑 ***
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const targetId = href.split('#')[1]; // 获取哈希部分，例如 'home', 'about'

            // 检查链接是否是内部哈希链接 (例如 #home, #about)
            if (targetId) {
                // 阻止默认的即时跳转
                e.preventDefault();

                // 如果当前页面不是 index.html，则先跳转到 index.html
                if (!window.location.pathname.endsWith('index.html') && window.location.pathname !== '/') {
                    window.location.href = '../index.html' + href; // 跳转到首页并带上哈希
                } else {
                    // 如果已经在 index.html，则直接平滑滚动
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - navbarHeight, // 考虑导航栏高度
                            behavior: 'smooth'
                        });
                        // 更新 URL 哈希，但不触发页面重新加载
                        history.pushState(null, '', href);
                    }
                }
            }
            // 如果 href 没有哈希 (例如指向 /blog/ai-edu.html)，则让浏览器执行默认跳转 (不阻止)
            // 这些外部链接本身就不需要平滑滚动到本页面
        });
    });

    // 确保页面加载后，导航栏高亮和滚动位置正确
    // 对于首页，初始高亮会在滚动监听器中处理
    // 对于博文页面，导航栏上的 '博文' 链接已经手动设置为 active
    window.dispatchEvent(new Event('scroll')); // 触发一次滚动事件，设置初始高亮
});
