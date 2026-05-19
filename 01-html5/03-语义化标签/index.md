# HTML5 语义化标签 ⭐⭐

> 语义化标签、页面结构、SEO 与无障碍设计

---

## 学习目标

- 理解语义化的概念和重要性
- 掌握 HTML5 语义化标签的正确使用
- 能构建结构清晰、SEO 友好的页面
- 理解无障碍设计的基本原则

---

## 生活化比喻

**语义化就像"给房间贴标签"**：

```
比喻对应：

┌──────────────────────────────────────────────────────┐
│                    房间布局                           │
├──────────────────────────────────────────────────────┤
│                                                      │
│    没有语义化                 有语义化               │
│    ──────────               ────────                │
│                                                      │
│    <div id="header">         <header>               │
│      这是哪里？               这是入口大厅 ✓          │
│    </div>                    </header>               │
│                                                      │
│    <div class="nav">         <nav>                  │
│      这是什么？               这是走廊导航 ✓          │
│    </div>                    </nav>                  │
│                                                      │
│    <div class="content">     <main>                 │
│      这是干嘛的？             这是主要房间 ✓          │
│    </div>                    </main>                 │
│                                                      │
│    机器看不懂                 机器能理解              │
│    SEO 差                     SEO 好                 │
│    无障碍差                   无障碍好               │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## L1 理解层：会用

### 3.1 什么是语义化

**概念定义：**

```
语义化定义：

HTML 语义化 = 用恰当的标签表达内容含义

┌──────────────────────────────────────────────────────┐
│                                                      │
│  非语义化                     语义化                 │
│  ──────────                  ────────                │
│                                                      │
│  <div>标题</div>            <h1>标题</h1>            │
│  问题：机器不知道是标题      正确：这是最重要的标题   │
│                                                      │
│  <div class="nav">          <nav>                   │
│  问题：需要额外说明          正确：这是导航区域       │
│                                                      │
│  <div onclick="...">        <button>                │
│  问题：不是按钮元素          正确：这是一个按钮       │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**最简示例（对比）：**

```html
<!-- ❌ 非语义化 -->
<div class="header">
    <div class="nav">
        <div class="item"><a href="/">首页</a></div>
    </div>
</div>

<!-- ✅ 语义化 -->
<header>
    <nav>
        <ul>
            <li><a href="/">首页</a></li>
        </ul>
    </nav>
</header>
```

---

### 3.2 页面结构标签

**语法结构图：**

```
语义化标签关系图：

<body>
├── <header>          ← 页面头部（Logo、导航、搜索）
│   └── <nav>         ← 主导航
│
├── <main>            ← 主要内容（每页唯一）
│   ├── <article>     ← 独立文章（可单独分发）
│   │   ├── <header>  ← 文章头部
│   │   ├── <section> ← 文章章节
│   │   └── <footer>  ← 文章底部
│   │
│   ├── <section>     ← 内容分区（主题分组）
│   └── <aside>       ← 侧边栏（相关内容）
│
└── <footer>          ← 页面底部（版权、联系）
```

**最简示例：**

```html
<header>头部</header>
<main>主要内容</main>
<footer>底部</footer>
```

**详细示例：**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>语义化页面</title>
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="/">首页</a></li>
                <li><a href="/about">关于</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <article>
            <h1>文章标题</h1>
            <section>
                <h2>第一节</h2>
                <p>内容...</p>
            </section>
        </article>
        <aside>相关内容</aside>
    </main>

    <footer>
        <p>&copy; 2024</p>
    </footer>
</body>
</html>
```

---

### 3.3 常用语义化标签

**标签分类：**

```
语义化标签分类：

页面结构类                     内容标记类                     交互类
───────────                   ───────────                   ───────
<header> → 页面/区块头部       <h1-h6> → 标题层级            <button> → 按钮
<nav>    → 导航区域            <p>      → 段落               <details> → 折叠
<main>   → 主要内容            <ul/ol>  → 列表               <dialog>  → 对话框
<article>→ 独立文章            <figure> → 图片/代码块
<section>→ 内容分区            <time>   → 时间
<aside>  → 侧边栏              <address>→ 联系信息
<footer> → 页面/区块底部       <mark>   → 高亮标记
                              <progress>→ 进度条
```

**最简示例：**

```html
<!-- 页面结构 -->
<header></header>
<nav></nav>
<main></main>
<footer></footer>

<!-- 内容标记 -->
<h1>标题</h1>
<p>段落</p>
<time datetime="2024-01-15">2024年1月</time>
```

---

### 3.4 header 标签

**语法结构图：**

```
header 结构：

<header>
│
├─ Logo/标题            ← 网站/文章标识
├─ <nav>                ← 导航（可选）
├─ <h1>                 ← 标题（可选）
└─ 搜索框等             ← 其他头部元素
│
注意：
- 不应包含 footer、address
- 可以用于页面或 article/section
```

**最简示例：**

```html
<header>
    <h1>网站名称</h1>
    <nav>导航</nav>
</header>
```

**详细示例：**

```html
<!-- 页面头部 -->
<header>
    <a href="/" class="logo">
        <img src="logo.png" alt="网站Logo">
    </a>
    <nav aria-label="主导航">
        <ul>
            <li><a href="/">首页</a></li>
            <li><a href="/products">产品</a></li>
        </ul>
    </nav>
    <form role="search">
        <input type="search" placeholder="搜索...">
    </form>
</header>

<!-- 文章头部 -->
<article>
    <header>
        <h1>文章标题</h1>
        <p>作者：张三 | <time datetime="2024-01-15">2024年1月</time></p>
    </header>
</article>
```

---

### 3.5 nav 标签

**语法结构图：**

```
nav 结构：

<nav aria-label="导航名称">
│
├─ <ul>/<ol>            ← 导航列表（推荐）
│   └─ <li><a>          ← 导航项
│
适用场景：
- 主导航
- 面包屑
- 页脚导航
- 文章目录
```

**最简示例：**

```html
<nav>
    <ul>
        <li><a href="/">首页</a></li>
        <li><a href="/about">关于</a></li>
    </ul>
</nav>
```

**详细示例：**

```html
<!-- 主导航 -->
<nav aria-label="主导航">
    <ul>
        <li><a href="/" aria-current="page">首页</a></li>
        <li><a href="/products">产品</a></li>
        <li><a href="/about">关于</a></li>
    </ul>
</nav>

<!-- 面包屑 -->
<nav aria-label="面包屑">
    <ol>
        <li><a href="/">首页</a></li>
        <li><a href="/products">产品</a></li>
        <li>当前页面</li>
    </ol>
</nav>

<!-- 多个导航时用 aria-label 区分 -->
<nav aria-label="主导航">...</nav>
<nav aria-label="页脚导航">...</nav>
```

---

### 3.6 main 标签

**语法结构图：**

```
main 规则：

<main id="main-content">
│
重要规则：
├─ 每个页面只能有一个 main
├─ 不能嵌套在其他语义化元素中
├─ 不能包含 header/nav/footer（页面级）
└─ 不能被嵌套
```

**最简示例：**

```html
<main id="main-content">
    <article>文章内容</article>
</main>
```

**详细示例：**

```html
<!-- ✅ 正确用法 -->
<body>
    <header>...</header>
    <nav>...</nav>
    <main id="main-content">
        <article>...</article>
    </main>
    <footer>...</footer>
</body>

<!-- 无障碍跳过导航 -->
<a href="#main-content" class="skip-link">跳到主要内容</a>
<nav>...</nav>
<main id="main-content">...</main>
```

---

### 3.7 article 标签

**语法结构图：**

```
article 特点：

<article>
│
特点：内容独立、可单独分发
│
├─ 博客文章
├─ 新闻报道
├─ 用户评论
└─ 产品卡片
│
判断标准：能否独立存在？
```

**最简示例：**

```html
<article>
    <h1>文章标题</h1>
    <p>内容...</p>
</article>
```

**详细示例：**

```html
<!-- 博客文章 -->
<article>
    <header>
        <h1>文章标题</h1>
        <time datetime="2024-01-15">2024年1月15日</time>
    </header>
    <p>文章内容...</p>
    <footer>
        <p>标签：<a href="#">HTML</a></p>
    </footer>
</article>

<!-- 用户评论 -->
<article>
    <header>
        <span>张三</span>
        <time datetime="2024-01-15T10:30">2小时前</time>
    </header>
    <p>评论内容...</p>
</article>
```

---

### 3.8 section 标签

**语法结构图：**

```
section 特点：

<section>
│
特点：主题分组、通常需要标题
│
├─ 文章章节
├─ 页面功能区
└─ 内容分组
│
注意：应有标题，不要仅作容器
```

**最简示例：**

```html
<section>
    <h2>章节标题</h2>
    <p>内容...</p>
</section>
```

**详细示例：**

```html
<!-- 文章章节 -->
<article>
    <h1>完整教程</h1>
    <section>
        <h2>第一章</h2>
        <p>内容...</p>
    </section>
    <section>
        <h2>第二章</h2>
        <p>内容...</p>
    </section>
</article>

<!-- 页面功能区 -->
<main>
    <section aria-labelledby="products-heading">
        <h2 id="products-heading">产品介绍</h2>
        <p>产品内容...</p>
    </section>
    <section aria-labelledby="features-heading">
        <h2 id="features-heading">功能特性</h2>
        <ul><li>特性1</li></ul>
    </section>
</main>
```

---

### 3.9 aside 标签

**语法结构图：**

```
aside 特点：

<aside>
│
特点：相关但独立的内容
│
├─ 侧边栏
├─ 相关文章
├─ 广告区域
└─ 文章注释/小知识
```

**最简示例：**

```html
<aside>
    <h3>相关文章</h3>
    <ul><li><a href="#">文章1</a></li></ul>
</aside>
```

**详细示例：**

```html
<!-- 侧边栏 -->
<aside>
    <nav aria-label="文章目录">
        <h3>目录</h3>
        <ul>
            <li><a href="#section1">第一章</a></li>
            <li><a href="#section2">第二章</a></li>
        </ul>
    </nav>
    <section>
        <h3>推荐阅读</h3>
        <ul><li><a href="#">相关文章</a></li></ul>
    </section>
</aside>

<!-- 行内相关内容 -->
<article>
    <p>正文内容...</p>
    <aside>
        <p><strong>小知识：</strong>补充说明</p>
    </aside>
</article>
```

---

### 3.10 footer 标签

**语法结构图：**

```
footer 内容：

<footer>
│
常见内容：
├─ 版权信息
├─ 相关链接
├─ 联系方式（address）
└─ 社交媒体链接
│
可用于：页面、article、section
```

**最简示例：**

```html
<footer>
    <p>&copy; 2024 公司名称</p>
</footer>
```

**详细示例：**

```html
<!-- 页面页脚 -->
<footer>
    <nav>
        <a href="/privacy">隐私政策</a>
        <a href="/terms">使用条款</a>
    </nav>
    <address>
        邮箱：<a href="mailto:info@example.com">info@example.com</a>
    </address>
    <p>&copy; 2024 公司名称</p>
</footer>

<!-- 文章页脚 -->
<article>
    <p>文章内容...</p>
    <footer>
        <p>标签：<a href="/tags/html">#HTML</a></p>
        <p>最后更新：<time datetime="2024-01-15">2024年1月</time></p>
    </footer>
</article>
```

---

### 3.11 其他语义化标签

**语法结构图：**

```
其他语义标签：

内容标记类                     媒体类                       交互类
──────────                    ───────                     ───────
<time>     → 时间             <figure>   → 图片/代码块    <details> → 折叠内容
<address>  → 联系信息         <figcaption>→ 说明文字      <summary> → 折叠标题
<mark>     → 高亮标记                                    <dialog>  → 对话框
<progress> → 进度条
<meter>    → 量表
```

**最简示例：**

```html
<time datetime="2024-01-15">2024年1月</time>
<figure><img src="photo.jpg" alt="照片"><figcaption>说明</figcaption></figure>
<details><summary>标题</summary>内容</details>
```

**详细示例：**

```html
<!-- time 标签 -->
<time datetime="2024-01-15">2024年1月15日</time>
<time datetime="2024-01-15T14:30">下午2:30</time>
<time datetime="PT5M">5分钟</time>

<!-- figure 和 figcaption -->
<figure>
    <img src="chart.png" alt="数据图表">
    <figcaption>图1：销售额对比</figcaption>
</figure>

<!-- details 和 summary -->
<details>
    <summary>常见问题</summary>
    <p>详细解答...</p>
</details>

<!-- progress 和 meter -->
<progress value="70" max="100">70%</progress>
<meter value="0.7" min="0" max="1">70%</meter>
```

---

## L2 实践层：用好

### 最佳实践

| 实践 | 原因 | 示例 |
|------|------|------|
| main 每页唯一 | 无障碍访问、SEO | `<main id="main-content">` |
| section 有标题 | 结构清晰 | `<section><h2>标题</h2></section>` |
| 多个 nav 用 aria-label 区分 | 无障碍友好 | `aria-label="主导航"` |
| article 内容独立 | 可单独分发 | 博客文章、评论 |
| time 用 datetime | 机器可读 | `datetime="2024-01-15"` |

### 反模式：不要这样做

```html
<!-- ❌ 错误：多个 main -->
<main>内容1</main>
<main>内容2</main>
<!-- 问题：无障碍访问混乱 -->

<!-- ✅ 正确：只有一个 main -->
<main>
    <section>内容1</section>
    <section>内容2</section>
</main>
```

```html
<!-- ❌ 错误：section 无标题 -->
<section>
    <p>一些内容</p>
</section>
<!-- 问题：结构不清晰 -->

<!-- ✅ 正确：section 有标题 -->
<section>
    <h2>章节标题</h2>
    <p>内容...</p>
</section>
```

```html
<!-- ❌ 错误：仅为样式用语义标签 -->
<section class="wrapper">
    <p>仅为容器</p>
</section>
<!-- 问题：滥用语义标签 -->

<!-- ✅ 正确：样式容器用 div -->
<div class="wrapper">
    <p>仅为容器</p>
</div>
```

```html
<!-- ❌ 错误：标题跳级 -->
<h1>主标题</h1>
<h3>小节标题</h3>
<!-- 问题：无障碍访问问题、SEO差 -->

<!-- ✅ 正确：标题按层级 -->
<h1>主标题</h1>
<h2>章节标题</h2>
<h3>小节标题</h3>
```

### 适用场景

| 场景 | 推荐做法 | 原因 |
|------|---------|------|
| 博客文章 | `<article>` | 内容独立可分发 |
| 页面分区 | `<section>` + 标题 | 主题分组 |
| 侧边栏 | `<aside>` | 相关但独立的内容 |
| 导航区 | `<nav>` + `<ul>` | 无障碍友好 |
| 仅为容器 | `<div>` | 无语义需求 |

---

## L3 专家层：深入

### article vs section vs div

```
三者区别判断：

┌──────────────────────────────────────────────────────┐
│                                                      │
│  问题：这段内容是什么性质？                           │
│                                                      │
│  ├─ 能独立分发？（RSS、复制到其他网站）               │
│  │   └─ YES → <article>                             │
│  │                                                   │
│  ├─ 是主题分组？有标题？                             │
│  │   └─ YES → <section>                             │
│  │                                                   │
│  ├─ 仅是样式/布局容器？                              │
│  │   └─ YES → <div>                                 │
│  │                                                   │
└──────────────────────────────────────────────────────┘
```

### 语义化对 SEO 的影响

```
SEO 影响流程：

┌──────────────────────────────────────────────────────┐
│  搜索引擎爬虫                                         │
│  ───────────                                         │
│  解析 HTML → 提取内容 → 理解结构 → 建立索引           │
└──────────────────────────────────────────────────────┘
          ↓
┌──────────────────────────────────────────────────────┐
│  语义化页面                                           │
│  ───────────                                         │
│  <h1> → 页面主题（权重最高）                          │
│  <article> → 独立内容单元                             │
│  <nav> → 导航链接（理解网站结构）                     │
│  <main> → 主要内容区域                               │
│                                                      │
│  结果：内容理解准确、排名更好                         │
└──────────────────────────────────────────────────────┘
          ↓
┌──────────────────────────────────────────────────────┐
│  非语义化页面                                         │
│  ───────────                                         │
│  全是 <div> → 无法理解内容结构                        │
│  依赖 id/class → 不稳定                              │
│                                                      │
│  结果：内容理解困难、排名较差                         │
└──────────────────────────────────────────────────────┘
```

### 无障碍设计

```
无障碍访问流程：

┌──────────────────────────────────────────────────────┐
│  屏幕阅读器                                           │
│  ───────────                                         │
│  读取 HTML → 理解语义 → 朗读内容 → 导航跳转           │
└──────────────────────────────────────────────────────┘
          ↓
┌──────────────────────────────────────────────────────┐
│  语义化的好处                                         │
│  ───────────                                         │
│  <nav> → 用户可直接跳转到导航                         │
│  <main> → 用户可跳过导航直达内容                      │
│  <article> → 用户知道这是独立文章                     │
│  <h1-h6> → 用户可按标题导航                           │
│                                                      │
│  结果：视障用户可高效浏览网页                         │
└──────────────────────────────────────────────────────┘
```

### 设计动机

**为什么需要语义化标签？**

| 设计选择 | 原因 | 影响 |
|----------|------|------|
| `<main>` 唯一 | 无障碍直接跳转 | 视障用户效率提升 |
| `<nav>` 语义化 | 屏幕阅读器识别导航 | 快速跳转 |
| `<article>` 独立 | 内容可单独分发 | RSS、SEO友好 |
| `<h1>` 唯一 | SEO权重集中 | 搜索排名更好 |

---

## 知识关联图

```
语义化知识关联：

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   HTML      │────→│   SEO       │────→│   搜索排名  │
│   语义化    │     │   优化      │     │   提升      │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │
       ↓                   ↓
┌─────────────┐     ┌─────────────┐
│   无障碍    │     │   代码      │
│   设计      │     │   可维护    │
└─────────────┘     └─────────────┘

关联说明：
- HTML 语义化 → SEO：搜索引擎更好理解内容结构
- HTML 语义化 → 无障碍：屏幕阅读器准确朗读页面
- HTML 语义化 → 可维护：代码结构清晰、易于理解
```

---

## 术语定义

| 术语 | 定义 | 示例 |
|------|------|------|
| **语义化** | 用恰当的标签表达内容含义 | `<header>` 表示头部区域 |
| **header** | 页面或区块的头部区域 | `<header><h1>网站名</h1></header>` |
| **nav** | 导航链接区域 | `<nav><ul><li><a>链接</a></li></ul></nav>` |
| **main** | 页面主要内容（唯一） | `<main id="main-content">` |
| **article** | 独立、可分发的内容单元 | 博客文章、新闻报道、评论 |
| **section** | 主题分组的内容区块 | `<section><h2>章节</h2></section>` |
| **aside** | 相关但独立的内容 | 侧边栏、相关文章、广告 |
| **footer** | 页面或区块的底部区域 | 版权信息、联系方式 |
| **figure** | 自包含的内容（图片、代码） | `<figure><img><figcaption></figure>` |
| **figcaption** | figure 的说明文字 | 图片说明、代码说明 |
| **time** | 时间或日期标记 | `<time datetime="2024-01-15">` |
| **ARIA** | 无障碍富互联网应用属性 | `aria-label="主导航"` |

---

## 实践练习

### 练习：博客页面结构

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>语义化博客页面</title>
</head>
<body>
    <!-- 跳过导航链接 -->
    <a href="#main-content" class="skip-link">跳到主要内容</a>

    <!-- 页面头部 -->
    <header>
        <a href="/" class="logo">
            <img src="logo.png" alt="博客Logo">
        </a>
        <nav aria-label="主导航">
            <ul>
                <li><a href="/" aria-current="page">首页</a></li>
                <li><a href="/articles">文章</a></li>
                <li><a href="/about">关于</a></li>
            </ul>
        </nav>
        <form role="search">
            <input type="search" placeholder="搜索...">
            <button type="submit">搜索</button>
        </form>
    </header>

    <!-- 主要内容 -->
    <main id="main-content">
        <article>
            <header>
                <h1>HTML5 语义化标签指南</h1>
                <p>
                    作者：张三 |
                    <time datetime="2024-01-15">2024年1月15日</time>
                </p>
            </header>

            <figure>
                <img src="cover.jpg" alt="封面图">
                <figcaption>语义化结构示意图</figcaption>
            </figure>

            <section>
                <h2>什么是语义化</h2>
                <p>语义化是指用恰当的标签表达内容含义...</p>
            </section>

            <section>
                <h2>常用标签</h2>
                <p>常用语义化标签包括 header、nav、main...</p>
            </section>

            <aside>
                <h3>相关文章</h3>
                <ul>
                    <li><a href="#">CSS布局教程</a></li>
                    <li><a href="#">JavaScript入门</a></li>
                </ul>
            </aside>

            <footer>
                <p>标签：<a href="/tags/html">#HTML5</a></p>
            </footer>
        </article>

        <!-- 评论区域 -->
        <section>
            <h2>评论</h2>
            <article>
                <header>
                    <span>李四</span>
                    <time datetime="2024-01-15T10:30">2小时前</time>
                </header>
                <p>写得很好！</p>
            </article>
        </section>
    </main>

    <!-- 侧边栏 -->
    <aside>
        <section>
            <h3>热门文章</h3>
            <ul>
                <li><a href="#">React Hooks详解</a></li>
                <li><a href="#">TypeScript入门</a></li>
            </ul>
        </section>
    </aside>

    <!-- 页面底部 -->
    <footer>
        <nav aria-label="页脚导航">
            <a href="/privacy">隐私政策</a>
            <a href="/terms">使用条款</a>
        </nav>
        <address>
            邮箱：<a href="mailto:info@example.com">info@example.com</a>
        </address>
        <p>&copy; 2024 我的博客</p>
    </footer>
</body>
</html>
```

---

## 常见问题

### Q1：div 和 section 如何选择？

**原因：** 语义需求不同。

| 对比 | div | section |
|------|-----|---------|
| 用途 | 样式/布局容器 | 主题分组 |
| 标题 | 不需要 | 应该有标题 |
| 语义 | 无语义 | 有语义 |

**判断：** 仅做容器用 div，内容分组用 section。

### Q2：article 和 section 的区别？

**原因：** 独立性不同。

| 对比 | article | section |
|------|---------|---------|
| 独立性 | 可单独分发 | 需要上下文 |
| 例子 | 博客文章、评论 | 章节、功能区 |

**判断：** 能独立存在用 article，否则用 section。

### Q3：一个页面可以有多个 header 吗？

**原因：** header 可用于不同层级。

**答案：** 可以。
- 页面级 `<header>`：网站头部
- `<article>` 内 `<header>`：文章头部
- `<section>` 内 `<header>`：区块头部

### Q4：为什么要用语义化标签？

**原因：** 三大好处。

| 好处 | 说明 |
|------|------|
| SEO | 搜索引擎更好理解内容 |
| 无障碍 | 屏幕阅读器准确朗读 |
| 可维护 | 代码结构清晰易懂 |

---

## 学习资源

- [MDN 语义化指南](https://developer.mozilla.org/zh-CN/docs/Glossary/Semantics) ⭐ 官方权威
- [HTML5 语义化](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element) - 标签参考
- [Web.dev 无障碍](https://web.dev/learn/accessibility/) - 无障碍设计

---

