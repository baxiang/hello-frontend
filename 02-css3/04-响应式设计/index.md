# CSS3 响应式设计 ⭐⭐

> 媒体查询、移动优先、响应式布局与适配

---

## 学习目标

- 掌握媒体查询的语法和应用场景
- 理解移动优先的设计理念
- 学会响应式布局的核心技术（Flexbox/Grid 响应式、clamp 函数）
- 了解响应式图片和适配方案

---

## 生活化比喻

**响应式设计就像"变形金刚"**：

```
比喻对应：

┌──────────────────────────────────────────────────────┐
│                    变形金刚                           │
├──────────────────────────────────────────────────────┤
│                                                      │
│    响应式网页 = 变形金刚                              │
│    ─────────────────                                 │
│    同一个角色，不同形态                               │
│    - 手机上是紧凑形态（小屏幕优化）                    │
│    - 平板上是标准形态（中等屏幕）                     │
│    - 桌面上是完全形态（大屏幕展示所有能力）           │
│                                                      │
│    媒体查询 = 变形的触发条件                          │
│    ─────────────────                                 │
│    "当空间足够大时，展开所有功能"                     │
│    - min-width: 768px → 平板模式                     │
│    - min-width: 1200px → 桌面模式                    │
│                                                      │
│    移动优先 = 从最小形态开始设计                       │
│    ─────────────────                                 │
│    先设计最紧凑版本，再逐步扩展                       │
│    而不是先设计完整版再裁剪                           │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## L1 理解层：会用

### 媒体查询

**语法结构图：**

```
媒体查询语法：

@media 媒体类型 and (条件) {
    /* 满足条件时应用的样式 */
}

媒体类型：
screen      → 屏幕设备
print       → 打印设备
all         → 所有设备（默认）

条件：
min-width: 768px    → 视口宽度 ≥ 768px 时生效
max-width: 767px    → 视口宽度 ≤ 767px 时生效
orientation: portrait  → 竖屏
prefers-color-scheme: dark → 深色模式
```

**最简示例（1-3行）：**

```css
@media (min-width: 768px) {
    .container { max-width: 720px; margin: 0 auto; }
}
```

**详细示例：**

```css
/* 常用断点（参考 Bootstrap 5） */
/* xs: <576px, sm: ≥576px, md: ≥768px, lg: ≥992px, xl: ≥1200px, xxl: ≥1400px */

@media (min-width: 576px) { }  /* 平板及以上 */
@media (min-width: 768px) { }  /* 平板横屏及以上 */
@media (min-width: 992px) { }  /* 桌面 */
@media (min-width: 1200px) { } /* 大桌面 */

/* 多条件组合 */
@media screen and (min-width: 768px) and (max-width: 991px) {
    .sidebar { width: 200px; }
}

/* 特性查询 */
@media (prefers-color-scheme: dark) {
    body { background: #1a1a2e; color: #eee; }
}

@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms;
        transition-duration: 0.01ms;
    }
}
```

---

### 移动优先

**设计理念：**

```
两种策略对比：

移动优先（推荐）                    桌面优先
──────────────                     ───────
基础样式 = 移动端                   基础样式 = 桌面端
min-width 断点 ↑                    max-width 断点 ↓
从小到大逐步增强                    从大到小逐步降级
代码更少、性能更好                  移动端需覆盖大量桌面样式
```

**最简示例：**

```css
/* 移动优先：基础样式就是移动端 */
.container { padding: 0 15px; width: 100%; }

/* 大屏增强 */
@media (min-width: 768px) { .container { max-width: 720px; } }
@media (min-width: 992px) { .container { max-width: 960px; } }
```

**详细示例：**

```css
/* 导航栏：移动端默认垂直排列 */
.nav {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.nav-toggle { display: block; }   /* 汉堡菜单按钮 */
.nav-links  { display: none; }    /* 移动端默认隐藏链接 */
.nav-links.active { display: flex; }

/* 平板及以上：改为水平导航 */
@media (min-width: 768px) {
    .nav { flex-direction: row; justify-content: space-between; }
    .nav-toggle { display: none; }  /* 隐藏汉堡菜单 */
    .nav-links {
        display: flex;              /* 默认显示 */
        flex-direction: row;
        gap: 20px;
    }
}
```

---

### 响应式布局技术

**语法结构图：**

```
三种响应式布局方式：

流式布局（百分比）         Flexbox 响应式              Grid 响应式
───────────────           ─────────────               ─────────────
width: 50%                flex: 1 1 300px             grid-template-columns:
float: left               flex-wrap: wrap             repeat(auto-fill,
gap: 20px                 minmax(250px, 1fr))
```

**最简示例：**

```css
/* Flexbox 自动换行 */
.cards { display: flex; flex-wrap: wrap; gap: 20px; }
.card { flex: 1 1 300px; }

/* Grid 自动填充 */
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
}
```

**详细示例：**

```css
/* Grid 响应式网格 — 一行代码搞定 */
.gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
}

/* 手动断点控制 */
.responsive-grid {
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr;       /* 移动端单列 */
}
@media (min-width: 576px) {
    .responsive-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 992px) {
    .responsive-grid { grid-template-columns: repeat(4, 1fr); }
}

/* 通用响应式容器 */
.container {
    width: 100%;
    padding: 0 15px;
    margin: 0 auto;
}
@media (min-width: 576px)  { .container { max-width: 540px; } }
@media (min-width: 768px)  { .container { max-width: 720px; } }
@media (min-width: 992px)  { .container { max-width: 960px; } }
@media (min-width: 1200px) { .container { max-width: 1140px; } }
```

---

### 响应式图片

**语法结构图：**

```
响应式图片方案：

HTML 方案                          CSS 方案
─────────                          ────────
<img srcset="..." sizes="...">     img { max-width: 100%; height: auto; }
<picture>
  <source media="..." srcset="...">
  <img src="...">
</picture>
```

**最简示例：**

```html
<!-- 根据屏幕密度加载不同图片 -->
<img src="small.jpg" srcset="small.jpg 1x, large.jpg 2x" alt="图片">

<!-- CSS 流体图片 -->
<style>img { max-width: 100%; height: auto; }</style>
```

**详细示例：**

```html
<!-- 根据视口宽度加载不同尺寸 -->
<img src="image-800.jpg"
     srcset="image-400.jpg 400w, image-800.jpg 800w, image-1200.jpg 1200w"
     sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
     alt="响应式图片">

<!-- 艺术指导：不同屏幕显示不同裁切 -->
<picture>
    <source media="(min-width: 1200px)" srcset="hero-desktop.jpg">
    <source media="(min-width: 768px)" srcset="hero-tablet.jpg">
    <img src="hero-mobile.jpg" alt="横幅图片">
</picture>

<!-- 不同格式优先 -->
<picture>
    <source type="image/avif" srcset="image.avif">
    <source type="image/webp" srcset="image.webp">
    <img src="image.jpg" alt="图片">
</picture>
```

---

### 响应式文本

**最简示例：**

```css
/* clamp() 流体字体 */
h1 { font-size: clamp(24px, 5vw, 48px); }
```

**详细示例：**

```css
/* 根字体随视口变化 */
html { font-size: clamp(14px, 1vw + 10px, 18px); }

/* 标题 */
h1 { font-size: clamp(24px, 5vw, 48px); }
h2 { font-size: clamp(20px, 4vw, 36px); }

/* 响应式间距 */
:root {
    --spacing: clamp(1rem, 2vw, 2rem);
}
.section { padding: calc(var(--spacing) * 2) 0; }
```

---

## L2 实践层：用好

### 最佳实践

| 实践 | 原因 | 示例 |
|------|------|------|
| 移动优先 | 代码更少、性能更好 | 基础样式 + min-width 断点 |
| 断点基于内容 | 不是基于设备 | 在布局"撑不住"时加断点 |
| Grid auto-fill | 一行代码实现响应式 | `repeat(auto-fill, minmax(250px, 1fr))` |
| clamp() 流体字号 | 无需断点 | `font-size: clamp(16px, 3vw, 24px)` |
| CSS 自定义属性 | 统一管理间距/字号 | `--spacing: clamp(1rem, 2vw, 2rem)` |
| 响应图片 | 节省带宽 | `srcset` + `sizes` |
| 安全区域适配 | iPhone 刘海屏 | `padding: env(safe-area-inset-bottom)` |

### 反模式：不要这样做

```css
/* ❌ 错误：基于特定设备设断点 */
@media (max-width: 768px) { } /* iPad 尺寸 */
/* 问题：设备尺寸每年更新，断点会过时 */

/* ✅ 正确：基于内容设断点 */
@media (min-width: 768px) {
    /* 当内容需要更多空间时 */
}
```

```css
/* ❌ 错误：用 px 做响应式字号 */
@media (max-width: 768px) { h1 { font-size: 24px; } }
@media (min-width: 769px) { h1 { font-size: 36px; } }
/* 问题：跳变感强，维护多个断点 */

/* ✅ 正确：用 clamp() 平滑过渡 */
h1 { font-size: clamp(24px, 5vw, 48px); }
```

```css
/* ❌ 错误：使用 float 做响应式布局 */
.column { width: 50%; float: left; }
/* 问题：需要清除浮动，难以控制间距 */

/* ✅ 正确：用 Flexbox 或 Grid */
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
}
```

### 适用场景

| 场景 | 推荐方案 | 原因 |
|------|---------|------|
| 卡片列表 | Grid auto-fill | 自动换行，代码最少 |
| 导航栏 | Flexbox + 断点 | 移动端折叠，桌面展开 |
| 文章排版 | clamp() 字号 + 百分比宽度 | 平滑响应 |
| 后台仪表盘 | Grid + 手动断点 | 精确控制布局 |
| 图片展示 | picture + srcset | 带宽优化 |
| 全屏 Hero | 百分比 + clamp() | 全尺寸适配 |

---

## L3 专家层：深入

### 浏览器如何处理媒体查询

```
媒体查询处理流程：

┌──────────────────────────────────────────────────────┐
│  步骤 1：解析媒体查询                                 │
│  ──────────────                                      │
│  读取 @media 规则，提取条件和对应样式                 │
└──────────────────────────────────────────────────────┘
          ↓
┌──────────────────────────────────────────────────────┐
│  步骤 2：匹配当前视口                                 │
│  ──────────────                                      │
│  比较视口宽度/方向/特性与查询条件                     │
│  满足条件 → 将样式加入 CSSOM                          │
└──────────────────────────────────────────────────────┘
          ↓
┌──────────────────────────────────────────────────────┐
│  步骤 3：视口变化时重新匹配                           │
│  ──────────────                                      │
│  窗口 resize → 重新评估所有媒体查询                    │
│  不匹配的样式从 CSSOM 中移除                          │
└──────────────────────────────────────────────────────┘
```

### 性能考量

| 操作 | 性能影响 | 说明 |
|------|---------|------|
| 媒体查询本身 | 极低 | CSS 解析阶段处理 |
| 太多断点 | 中等 | 增加 CSS 体积，解析变慢 |
| 频繁 resize 触发 JS | 高 | 需要用 debounce/throttle |
| srcset 图片选择 | 低 | 浏览器自动优化 |
| 过多 picture 元素 | 中等 | 增加 DOM 复杂度 |

### 设计动机

**为什么推荐移动优先？**

| 设计选择 | 原因 | 影响 |
|----------|------|------|
| 移动优先 + min-width | 基础样式即移动端，大屏是增强 | 代码自然增长，无覆盖冲突 |
| 桌面优先 + max-width | 基础样式即桌面，需要额外覆盖移动端 | 多一套覆盖规则，代码冗余 |
| 基于内容设断点 | 适应所有设备，包括未来新设备 | 断点更稳定、可维护 |
| 基于设备设断点 | 只适配已知设备 | 新设备出现需更新断点 |

### 知识关联

```
响应式设计关联：

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  媒体查询   │────→│  移动优先   │────→│  响应式布局 │
│  条件判断   │     │  设计策略   │     │  Flex/Grid  │
└─────────────┘     └─────────────┘     └─────────────┘
       │                    │                    │
       ↓                    ↓                    ↓
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  响应式图片 │     │  流体排版   │     │  无障碍适配 │
│  srcset     │     │  clamp()    │     │  reduced-   │
│  picture    │     │  vw/rem     │     │  motion     │
└─────────────┘     └─────────────┘     └─────────────┘
```

---

## 术语定义

| 术语 | 定义 | 示例 |
|------|------|------|
| **响应式设计** | 一个网站适配多种屏幕尺寸的设计方法 | 同一套代码在手机和桌面都可用 |
| **媒体查询** | CSS 条件规则，根据设备特性应用不同样式 | `@media (min-width: 768px) { ... }` |
| **断点（Breakpoint）** | 布局需要改变的临界屏幕宽度 | `@media (min-width: 768px)` |
| **移动优先** | 先写移动端样式，再通过断点为大屏增强 | 基础样式 + min-width |
| **流体布局** | 使用百分比等相对单位，随容器变化 | `width: 50%` |
| **clamp()** | CSS 函数，限定值在最小和最大之间 | `clamp(16px, 3vw, 24px)` |
| **视口（Viewport）** | 浏览器可见区域的大小 | `<meta name="viewport" content="...">` |
| **srcset** | HTML 属性，指定不同尺寸图片源 | `srcset="small.jpg 400w, large.jpg 800w"` |
| **安全区域** | 设备特殊区域（刘海、底部横条）之外的安全显示范围 | `env(safe-area-inset-bottom)` |

---

## 实践练习

### 练习：响应式卡片页面

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>响应式卡片页面</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --primary: #6366f1;
            --dark: #1e293b;
            --gray: #64748b;
            --light: #f8fafc;
            --spacing: clamp(1rem, 2vw, 2rem);
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            background: var(--light);
            color: var(--dark);
            line-height: 1.6;
        }

        /* 导航栏 — 移动优先 */
        .navbar {
            background: #fff;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            padding: var(--spacing);
        }

        .navbar-inner {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            align-items: center;
        }

        .logo {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--primary);
        }

        .nav-links {
            display: flex;
            gap: 1.5rem;
            list-style: none;
        }

        .nav-links a {
            text-decoration: none;
            color: var(--dark);
            font-weight: 500;
            transition: color 0.3s;
        }

        .nav-links a:hover { color: var(--primary); }

        /* Hero 区域 */
        .hero {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #fff;
            text-align: center;
            padding: clamp(3rem, 10vw, 6rem) var(--spacing);
        }

        .hero h1 {
            font-size: clamp(1.75rem, 5vw, 3rem);
            margin-bottom: 1rem;
        }

        .hero p {
            font-size: clamp(1rem, 2vw, 1.25rem);
            opacity: 0.9;
            max-width: 600px;
            margin: 0 auto;
        }

        /* 卡片网格 — Grid 自动填充 */
        .cards {
            max-width: 1200px;
            margin: 0 auto;
            padding: var(--spacing);
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.5rem;
        }

        .card {
            background: #fff;
            border-radius: 12px;
            padding: 1.5rem;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            transition: transform 0.3s, box-shadow 0.3s;
        }

        .card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 24px rgba(0,0,0,0.12);
        }

        .card h3 {
            font-size: 1.25rem;
            margin-bottom: 0.5rem;
        }

        .card p { color: var(--gray); }

        /* 页脚 */
        .footer {
            background: var(--dark);
            color: #fff;
            text-align: center;
            padding: var(--spacing);
            margin-top: var(--spacing);
        }

        /* 平板及以上：导航改为水平 */
        @media (min-width: 768px) {
            .navbar-inner {
                flex-direction: row;
                justify-content: space-between;
            }
        }
    </style>
</head>
<body>
    <nav class="navbar">
        <div class="navbar-inner">
            <span class="logo">Brand</span>
            <ul class="nav-links">
                <li><a href="#">首页</a></li>
                <li><a href="#">产品</a></li>
                <li><a href="#">关于</a></li>
                <li><a href="#">联系</a></li>
            </ul>
        </div>
    </nav>

    <section class="hero">
        <h1>打造出色体验</h1>
        <p>使用响应式设计，让网站在任何设备上都表现完美</p>
    </section>

    <section class="cards">
        <article class="card">
            <h3>快速高效</h3>
            <p>采用最新技术，确保性能卓越</p>
        </article>
        <article class="card">
            <h3>精美设计</h3>
            <p>追求极致视觉体验</p>
        </article>
        <article class="card">
            <h3>响应式布局</h3>
            <p>完美适配各种设备</p>
        </article>
    </section>

    <footer class="footer">
        <p>&copy; 2026 Brand. All rights reserved.</p>
    </footer>
</body>
</html>
```

---

## 常见问题

### Q1：断点应该如何选择？

**答：** 根据内容决定，而不是特定设备：

```css
/* 不推荐：针对特定设备 */
@media (max-width: 768px) { } /* iPad */

/* 推荐：根据内容自然布局 */
@media (min-width: 768px) {
    /* 当内容需要更多空间时再加断点 */
}
```

### Q2：viewport meta 标签怎么用？

```html
<!-- 标准写法（必须） -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- 禁止缩放（不推荐，影响无障碍） -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

### Q3：rem 和 em 如何选择？

```css
/* rem：相对根元素，适合全局控制 */
html { font-size: 16px; }
body { font-size: 1rem; }  /* 16px */

/* em：相对父元素，适合组件内部 */
.button {
    font-size: 1em;
    padding: 0.5em 1em;  /* 相对按钮字体大小 */
}
```

### Q4：如何处理安全区域（iPhone 刘海屏）？

```css
/* 使用 env() */
.safe-area {
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
}

/* 带后备值 */
.safe-area {
    padding-bottom: max(20px, env(safe-area-inset-bottom));
}
```

---

## 学习资源

- [MDN 媒体查询](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Media_queries) ⭐ 官方权威
- [MDN 响应式设计](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [Can I use](https://caniuse.com/) - 兼容性查询
- [Responsive Design Patterns](https://www.smashingmagazine.com/2012/01/responsive-web-design-what-why-and-how/)
