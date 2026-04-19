# 个人主页项目 ⭐

> 纯 HTML + CSS + 基础 JavaScript

---

## 项目目标

- 验证 HTML 语义化标签掌握
- 验证 CSS Flexbox/Grid 布局能力
- 验证基础 JS 交互实现

---

## 项目结构

```
personal-site/
├── index.html          ← 主页
├── about.html          ← 关于页
├── css/
│   └── style.css       ← 样式
├── js/
│   └── main.js         ← 交互
└── images/             ← 图片资源
```

---

## L1 实现：基础版本

### HTML 结构

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>张三 - 前端开发</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <!-- 导航 -->
    <header class="header">
        <nav class="nav">
            <a href="/" class="logo">张三</a>
            <ul class="nav-links">
                <li><a href="#home">首页</a></li>
                <li><a href="#about">关于</a></li>
                <li><a href="#projects">项目</a></li>
                <li><a href="#contact">联系</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <!-- Hero 区域 -->
        <section id="home" class="hero">
            <div class="hero-content">
                <h1>你好，我是张三</h1>
                <p class="subtitle">前端开发工程师</p>
                <a href="#projects" class="btn">查看项目</a>
            </div>
        </section>

        <!-- 关于 -->
        <section id="about" class="about">
            <h2>关于我</h2>
            <p>热爱前端开发，专注于用户体验和代码质量。</p>
            <div class="skills">
                <span class="skill">HTML5</span>
                <span class="skill">CSS3</span>
                <span class="skill">JavaScript</span>
                <span class="skill">React</span>
            </div>
        </section>

        <!-- 项目展示 -->
        <section id="projects" class="projects">
            <h2>我的项目</h2>
            <div class="project-grid">
                <article class="project-card">
                    <h3>个人博客</h3>
                    <p>使用 Next.js 构建的技术博客</p>
                    <a href="#" class="btn-small">查看</a>
                </article>
                <article class="project-card">
                    <h3>Todo 应用</h3>
                    <p>TypeScript + React 实现的任务管理</p>
                    <a href="#" class="btn-small">查看</a>
                </article>
                <article class="project-card">
                    <h3>天气应用</h3>
                    <p>调用 API 的实时天气查询</p>
                    <a href="#" class="btn-small">查看</a>
                </article>
            </div>
        </section>

        <!-- 联系 -->
        <section id="contact" class="contact">
            <h2>联系我</h2>
            <form class="contact-form" id="contactForm">
                <div class="form-group">
                    <label for="name">姓名</label>
                    <input type="text" id="name" required>
                </div>
                <div class="form-group">
                    <label for="email">邮箱</label>
                    <input type="email" id="email" required>
                </div>
                <div class="form-group">
                    <label for="message">留言</label>
                    <textarea id="message" rows="4" required></textarea>
                </div>
                <button type="submit" class="btn">发送</button>
            </form>
        </section>
    </main>

    <footer class="footer">
        <p>&copy; 2026 张三。保留所有权利。</p>
    </footer>

    <script src="js/main.js"></script>
</body>
</html>
```

---

### CSS 样式

```css
/* css/style.css */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --primary: #3b82f6;
    --dark: #1f2937;
    --light: #f9fafb;
    --gray: #6b7280;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    line-height: 1.6;
    color: var(--dark);
}

/* 导航 */
.header {
    position: fixed;
    top: 0;
    width: 100%;
    background: white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    z-index: 100;
}

.nav {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--primary);
    text-decoration: none;
}

.nav-links {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-links a {
    text-decoration: none;
    color: var(--dark);
    transition: color 0.3s;
}

.nav-links a:hover {
    color: var(--primary);
}

/* Hero */
.hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    text-align: center;
    padding: 2rem;
}

.hero h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.subtitle {
    font-size: 1.25rem;
    opacity: 0.9;
    margin-bottom: 2rem;
}

/* 按钮 */
.btn {
    display: inline-block;
    padding: 0.75rem 2rem;
    background: white;
    color: var(--primary);
    text-decoration: none;
    border-radius: 30px;
    font-weight: bold;
    transition: transform 0.3s;
}

.btn:hover {
    transform: translateY(-2px);
}

/* 区域通用 */
section {
    padding: 5rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

section h2 {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 3rem;
}

/* 技能标签 */
.skills {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
    margin-top: 2rem;
}

.skill {
    padding: 0.5rem 1rem;
    background: var(--light);
    border: 1px solid #e5e7eb;
    border-radius: 20px;
    font-size: 0.875rem;
}

/* 项目网格 */
.project-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.project-card {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: transform 0.3s, box-shadow 0.3s;
}

.project-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.1);
}

.project-card h3 {
    margin-bottom: 0.5rem;
    color: var(--primary);
}

.project-card p {
    color: var(--gray);
    margin-bottom: 1rem;
}

.btn-small {
    color: var(--primary);
    text-decoration: none;
    font-weight: bold;
}

/* 表单 */
.contact-form {
    max-width: 600px;
    margin: 0 auto;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    font-size: 1rem;
}

.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* 页脚 */
.footer {
    background: var(--dark);
    color: white;
    text-align: center;
    padding: 2rem;
}

/* 响应式 */
@media (max-width: 768px) {
    .hero h1 { font-size: 2rem; }
    .nav-links { display: none; }
    section { padding: 3rem 1rem; }
}
```

---

### JavaScript 交互

```javascript
// js/main.js

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// 表单提交
const form = document.getElementById('contactForm');
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        alert('请填写所有字段');
        return;
    }

    // 模拟提交
    const btn = form.querySelector('button');
    btn.textContent = '发送中...';
    btn.disabled = true;

    setTimeout(() => {
        alert('消息已发送！');
        form.reset();
        btn.textContent = '发送';
        btn.disabled = false;
    }, 1000);
});

// 导航滚动高亮
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const top = section.offsetTop - 100;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);

        if (link) {
            if (scrollY >= top && scrollY < top + height) {
                link.style.color = 'var(--primary)';
            } else {
                link.style.color = '';
            }
        }
    });
});
```

---

## 能力检验清单

- [ ] 能独立写出完整的 HTML5 页面结构
- [ ] 能使用 Flexbox 实现导航栏布局
- [ ] 能使用 Grid 实现卡片网格布局
- [ ] 能实现平滑滚动和表单验证
- [ ] 能实现响应式设计（移动端适配）
- [ ] 能通过 Lighthouse 基础审计

---

## 扩展挑战

1. **添加暗黑模式切换**
2. **添加滚动动画（元素进入视口时淡入）**
3. **添加移动端汉堡菜单**
4. **部署到 GitHub Pages**

---

## 学习资源

- [GitHub Pages 部署指南](https://pages.github.com/)
- [Lighthouse 性能审计](https://developer.chrome.com/docs/lighthouse/overview/)
